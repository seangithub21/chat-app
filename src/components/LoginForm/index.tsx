import { JSX } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, FieldProps } from "formik";
import { Typography } from "@mui/material";

import { publicPaths } from "configs/routePaths";
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
    <div style={classes.container}>
      <Typography variant="h4">Log in</Typography>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="email">
              {({ field }: FieldProps) => (
                <Input field={field} label="Email" fullWidth />
              )}
            </Field>
            <Field name="password">
              {({ field }: FieldProps) => (
                <Input field={field} label="Password" fullWidth />
              )}
            </Field>
            <Button type="submit">Login</Button>
          </form>
        )}
      </Formik>
      <Link to={publicPaths.signup}>Or sign up</Link>
    </div>
  );
};

export default LoginForm;
