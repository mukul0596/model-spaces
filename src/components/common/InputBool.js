import React from "react";
import { Stack, Switch, Typography } from "@mui/material";

const InputBool = ({
  name,
  description,
  required,
  value = false,
  onChange,
  inputProps,
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      <Stack spacing={0.5}>
        <Typography variant="body1">
          {name} {required && "*"}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ pl: "14px" }}
        >
          {description}
        </Typography>
      </Stack>
      <Switch
        required={required}
        value={value}
        onChange={onChange}
        {...inputProps}
      />
    </Stack>
  );
};

export default InputBool;
