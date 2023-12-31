import { JSX } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "configs/firebase";
import { privatePaths } from "configs/routePaths";
import Button from "components/common/Button";

interface Props {
  children?: JSX.Element;
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div>
      Layout
      <Link to={privatePaths.contacts}>Contacts</Link>
      <Link to={privatePaths.chats}>Chats</Link>
      {children}
      <Button onClick={() => signOut(auth)}>Sign out</Button>
    </div>
  );
};

export default Layout;
