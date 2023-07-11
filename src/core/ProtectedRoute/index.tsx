import { JSX } from "react";
import { Navigate } from "react-router-dom";

import { publicPaths } from "configs/routePaths";
import { USER_EMAIL } from "constants/localStorage";

interface Props {
  children?: JSX.Element;
}

const ProtectedRoute = ({ children }: Props): JSX.Element => {
  if (!localStorage.getItem(USER_EMAIL)) {
    return <Navigate to={publicPaths.login} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
