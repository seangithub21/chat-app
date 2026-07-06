import { JSX, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";

import { setUser } from "features/auth/authSlice";
// TODO: Chats
// import { setChats } from "features/chats/chatsSlice";
import Layout from "components/Layout";
import { auth, db } from "configs/firebase";
import { publicPaths } from "configs/routePaths";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";

interface Props {
  children?: JSX.Element;
}

const ProtectedRoute = ({ children }: Props): JSX.Element => {
  const { user: reduxUser } = useAppSelector((state) => state.auth);
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

  // TODO: Chats
  // ================================================================

  // // Subscribe to user's chats updates
  // useEffect(() => {
  //   const userId = getUserData()?.uid;
  //   if (userId) {
  //     const chatsQuery = query(
  //       collection(db, "chats"),
  //       or(
  //         where("participants.participant1.uid", "==", userId),
  //         where("participants.participant2.uid", "==", userId)
  //       )
  //     );

  //     const unsubscribe = onSnapshot(chatsQuery, (chatsQuerySnapshot) => {
  //       let foundChats: any = {};
  //       chatsQuerySnapshot.forEach((chatDoc) => {
  //         foundChats[chatDoc.id] = {
  //           ...chatDoc.data(),
  //           timestamp: chatDoc.data().timestamp?.toDate().toString(),
  //         };
  //       });
  //       dispatch(setChats(foundChats));
  //     });

  //     return () => unsubscribe();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (!auth.currentUser) {
    return <Navigate to={publicPaths.login} replace />;
  }

  return reduxUser ? <Layout>{children}</Layout> : <div>Loading...</div>;
};

export default ProtectedRoute;
