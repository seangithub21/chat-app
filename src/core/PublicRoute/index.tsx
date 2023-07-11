import { JSX } from "react";
import { Navigate } from "react-router-dom";

import { privatePaths } from "configs/routePaths";
import { USER_EMAIL } from "constants/localStorage";

interface Props {
  children?: JSX.Element;
}

const PublicRoute = ({ children }: Props): JSX.Element => {
  if (localStorage.getItem(USER_EMAIL)) {
    return <Navigate to={privatePaths.messages} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
