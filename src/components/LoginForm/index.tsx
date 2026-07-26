import { JSX } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, FieldProps } from "formik";
import { Alert, Typography } from "@mui/material";

import Input from "components/common/Input";
import Button from "components/common/Button";
import { publicPaths } from "configs/routePaths";
import { login } from "features/auth/authSlice";
import { useAppDispatch } from "hooks/reduxHooks";

import getStyles from "./styles";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const classes = getStyles();

  const handleSubmit = (data: FormData) => {
    dispatch(login({ ...data }));
  };

  return (
    <div style={classes.container}>
      <Typography variant="h2" sx={classes.heading}>
        Login
      </Typography>
      <Alert severity="info" sx={{ marginBottom: "2rem" }}>
        For demo please use credentials:
        <div>&#x2022; Email: {process.env.REACT_APP_EMAIL_DEMO}</div>
        <div>&#x2022; Password: {process.env.REACT_APP_PASSWORD_DEMO}</div>
      </Alert>
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
            <Button type="submit" fullWidth sx={{ margin: "2rem 0" }}>
              Login
            </Button>
          </form>
        )}
      </Formik>
      <div style={{ textAlign: "center" }}>
        <Link to={publicPaths.register}>Or register</Link>
      </div>
    </div>
  );
};

export default LoginForm;
