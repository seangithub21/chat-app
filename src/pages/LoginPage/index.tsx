import { JSX } from "react";

import LoginForm from "components/LoginForm";

import getStyles from "./styles";

const LoginPage = (): JSX.Element => {
  const classes = getStyles();

  return (
    <div style={classes.container}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
