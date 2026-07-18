import { JSX, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import Layout from "components/Layout";
import { auth, db } from "configs/firebase";
import { publicPaths } from "configs/routePaths";
import { setUser } from "features/auth/authSlice";
import { setChats } from "features/chats/chatsSlice";
import { setMessages } from "features/messages/messagesSlice";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { getCurrentChatId } from "utils/sessionStorage";

interface Props {
  children?: JSX.Element;
}

const ProtectedRoute = ({ children }: Props): JSX.Element => {
  const [currentChatOpen, setCurrentChatOpen] = useState<string>("");
  const { user: reduxUser } = useAppSelector((state) => state.auth);
  const { messages: reduxMessages } = useAppSelector((state) => state.messages);
  const dispatch = useAppDispatch();

  // Subscribe to user document updates
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, `users/${auth.currentUser?.uid}`),
      (userDoc) => {
        dispatch(setUser(userDoc.data()));
      },
    );

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Subscribe to user's chats updates
  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      const chatsQuery = query(
        collection(db, "chats"),
        where("participantIds", "array-contains", `${userId}`),
      );

      const unsubscribe = onSnapshot(chatsQuery, (chatsQuerySnapshot) => {
        let foundChats: any = {};
        chatsQuerySnapshot.forEach((chatDoc) => {
          foundChats[chatDoc.id] = {
            ...chatDoc.data(),
            timestamp: chatDoc.data().timestamp?.toDate().toString(),
          };
        });
        dispatch(setChats(foundChats));
      });

      return () => unsubscribe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Subscribe to current chat's messages updates
  useEffect(() => {
    const chatId = getCurrentChatId() || "";
    if (chatId) {
      const messagesQuery = query(
        collection(db, `chats/${chatId}/messages`),
        orderBy("timestamp", "desc"),
        limit(10),
      );

      const unsubscribe = onSnapshot(messagesQuery, (messagesQuerySnapshot) => {
        let messages: any = {};
        messagesQuerySnapshot.forEach((messageDoc) => {
          messages[messageDoc.id] = {
            ...messageDoc.data(),
            timestamp: messageDoc.data().timestamp?.toDate().toString(),
          };
        });
        // setMessages only on page reload
        !reduxMessages && dispatch(setMessages(messages));
      });

      return () => unsubscribe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChatOpen]);

  if (!auth.currentUser) {
    return <Navigate to={publicPaths.login} replace />;
  }

  return reduxUser ? (
    <Layout
      currentChatOpen={currentChatOpen}
      setCurrentChatOpen={setCurrentChatOpen}
    >
      {children}
    </Layout>
  ) : (
    <div>Loading...</div>
  );
};

export default ProtectedRoute;
