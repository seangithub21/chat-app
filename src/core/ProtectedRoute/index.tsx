import { JSX, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  onSnapshot,
  or,
  query,
  where,
} from "firebase/firestore";

import { initializeUser, setUser } from "features/auth/authSlice";
import { setChats } from "features/chats/chatsSlice";
import { useAppDispatch } from "hooks/reduxHooks";
import { publicPaths } from "configs/routePaths";
import { auth, db } from "configs/firebase";
import { getUserData } from "utils/localStorage";
import Layout from "components/Layout";

interface Props {
  children?: JSX.Element;
}

const ProtectedRoute = ({ children }: Props): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Subscribe to user's auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(initializeUser({ uid: user.uid, email: user.email }));
      } else {
        dispatch(setUser({}));
        localStorage.clear();
        navigate(publicPaths.login);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Subscribe to user's data updates
  useEffect(() => {
    const userId = getUserData()?.uid;
    const unsubscribe = onSnapshot(doc(db, `users/${userId}`), (userDoc) => {
      dispatch(setUser(userDoc.data()));
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Subscribe to user's chats updates
  useEffect(() => {
    const userId = getUserData()?.uid;
    if (userId) {
      const chatsQuery = query(
        collection(db, "chats"),
        or(
          where("participants.participant1.uid", "==", userId),
          where("participants.participant2.uid", "==", userId)
        )
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

  if (!getUserData()) {
    return <Navigate to={publicPaths.login} replace />;
  }

  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;
