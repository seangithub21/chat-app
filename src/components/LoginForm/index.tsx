import { JSX } from "react";
import { Formik, Field, FieldProps } from "formik";
import { Typography } from "@mui/material";

import Input from "components/common/Input";
import Button from "components/common/Button";

import getStyles from "./styles";

interface FormikData {
  email: string;
}

const LoginForm = (): JSX.Element => {
  const classes = getStyles();

  const handleSubmit = (data: FormikData) => {
    console.log(data);
  };

  return (
    <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} style={classes.form}>
          <Typography variant="h4">Log in</Typography>
          <Field name="email">
            {({ field }: FieldProps) => (
              <Input field={field} fullWidth variant="standard" />
            )}
          </Field>
          <Field name="password">
            {({ field }: FieldProps) => (
              <Input field={field} fullWidth variant="standard" />
            )}
          </Field>
          <Button onClick={handleSubmit}>Login</Button>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
