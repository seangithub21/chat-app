import { JSX } from "react";
import { Navigate } from "react-router-dom";

import { privatePaths } from "configs/routePaths";

interface Props {
  children?: JSX.Element;
}

const PublicRoute = ({ children }: Props): JSX.Element => {
  if (localStorage.getItem("ca-ue")) {
    return <Navigate to={privatePaths.messages} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
