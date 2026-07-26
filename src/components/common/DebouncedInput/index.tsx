import { JSX, useRef } from "react";
import { TextFieldProps } from "@mui/material";

import Input from "../Input";

type DebounceProps = {
  handleDebounce: (value: string) => void;
  debounceTimeout?: number;
} & TextFieldProps;

const DebouncedInput = (props: DebounceProps): JSX.Element => {
  const timerRef = useRef<number>();
  const { handleDebounce, debounceTimeout, ...rest } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      handleDebounce(event.target.value);
    }, debounceTimeout || 1000);
  };

  return <Input {...rest} onChange={handleChange} />;
};

export default DebouncedInput;
