import { JSX } from "react";
import { FieldInputProps } from "formik";
import { TextField, TextFieldProps } from "@mui/material";

type Props = {
  field?: FieldInputProps<any>;
} & TextFieldProps;

const Input = ({
  helperText,
  field,
  variant,
  ...props
}: Props): JSX.Element => {
  return (
    <TextField
      helperText={helperText || " "}
      size="small"
      variant={variant || "standard"}
      {...field}
      {...props}
    />
  );
};

export default Input;
