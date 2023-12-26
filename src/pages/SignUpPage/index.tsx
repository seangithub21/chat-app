import { JSX } from "react";

import SignUpForm from "components/SignUpForm";

import getStyles from "./styles";

const SignUpPage = (): JSX.Element => {
  const classes = getStyles();

  return (
    <div style={classes.container}>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
