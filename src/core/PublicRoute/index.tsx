import { JSX } from "react";
import { Navigate } from "react-router-dom";

import { auth } from "configs/firebase";
import { privatePaths } from "configs/routePaths";

interface Props {
  children?: JSX.Element;
}

const PublicRoute = ({ children }: Props): JSX.Element => {
  // TODO: Is redirect needed here? Already covered in App.tsx useEffect()
  if (auth.currentUser) {
    return <Navigate to={privatePaths.chats} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
