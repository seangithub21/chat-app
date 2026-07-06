import { JSX } from "react";

import RegisterForm from "components/RegisterForm";

import getStyles from "./styles";

const RegisterPage = (): JSX.Element => {
  const classes = getStyles();

  return (
    <div style={classes.container}>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
