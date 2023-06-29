import { JSX } from "react";
import { FieldInputProps } from "formik";
import { TextField, TextFieldProps } from "@mui/material";

type Props = {
  field?: FieldInputProps<any>;
} & TextFieldProps;

const Input = ({ helperText, field, ...props }: Props): JSX.Element => {
  return (
    <TextField
      size="small"
      helperText={helperText || " "}
      {...field}
      {...props}
    />
  );
};

export default Input;
