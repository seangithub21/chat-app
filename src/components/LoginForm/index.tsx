import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, FieldProps } from "formik";
import { Typography } from "@mui/material";

import { login } from "features/auth/authSlice";
import { useAppDispatch } from "hooks/reduxHooks";
import Input from "components/common/Input";
import Button from "components/common/Button";

import getStyles from "./styles";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = (): JSX.Element => {
  const classes = getStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (data: FormData) => {
    dispatch(login({ ...data, navigate }));
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleSubmit}
      enableReinitialize
    >
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
          <Button type="submit">Login</Button>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
