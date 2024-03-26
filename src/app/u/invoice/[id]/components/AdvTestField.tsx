import { TextField, TextFieldProps } from "@mui/material";
import { useCallback, useState } from "react";


export default function AdvTextField(props: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const onBlur = useCallback(function () {
    setFocused(false);
  }, []);

  const onFocus = useCallback(function () {
    setFocused(true);
  }, []);
  return (
    <TextField
      {...props}
      size="small"
      inputProps={{
        ...props.inputProps,
        style: {
          textAlign: "right",
          ...props.inputProps?.style,
        },
      }}
      sx={{
        textAlign: "right",
        border: "none",
        "& fieldset": { border: focused ? "" : "none" },
        ...props.sx,
      }}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
}
