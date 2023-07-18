import { JSX } from "react";
import { signOut } from "firebase/auth";

import { auth } from "configs/firebase";
import Button from "components/common/Button";

interface Props {
  children?: JSX.Element;
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div>
      Layout {children}
      <Button onClick={() => signOut(auth)}>Sign out</Button>
    </div>
  );
};

export default Layout;
