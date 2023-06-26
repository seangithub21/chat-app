import { JSX } from "react";
import { Navigate } from "react-router-dom";

import { publicPaths } from "configs/routePaths";

interface Props {
  children?: JSX.Element;
}

const ProtectedRoute = ({ children }: Props): JSX.Element => {
  if (!localStorage.getItem("token")) {
    return <Navigate to={publicPaths.login} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
