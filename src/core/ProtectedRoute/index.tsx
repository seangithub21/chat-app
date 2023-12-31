import { JSX, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { initializeUser, setUser } from "features/auth/authSlice";
import { useAppDispatch } from "hooks/reduxHooks";
import { publicPaths } from "configs/routePaths";
import { auth } from "configs/firebase";
import { getUserData } from "utils/localStorage";
import Layout from "components/Layout";

interface Props {
  children?: JSX.Element;
}

const ProtectedRoute = ({ children }: Props): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(JSON.parse(JSON.stringify(user))));
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

  if (!getUserData()) {
    return <Navigate to={publicPaths.login} replace />;
  }

  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;
