import { JSX } from "react";
import { Navigate } from "react-router-dom";

import { privatePaths } from "configs/routePaths";
import { getUserData } from "utils/localStorage";

interface Props {
  children?: JSX.Element;
}

const PublicRoute = ({ children }: Props): JSX.Element => {
  if (getUserData()) {
    return <Navigate to={privatePaths.chats} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
