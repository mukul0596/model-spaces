import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { INPUT_TYPES } from "../../constants/inputTypes";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const InputFile = ({
  type,
  name,
  description,
  required,
  onChange,
  inputProps,
}) => {
  const [fileName, setFileName] = React.useState("");
  return (
    <Stack
      sx={{
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: { sm: "space-between" },
        alignItems: { sm: "center" },
        gap: 1,
      }}
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
      <Stack spacing={0.5}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          noWrap
        >
          Upload file
          <VisuallyHiddenInput
            type="file"
            required={required}
            onChange={(event) => {
              setFileName(event?.target?.files?.[0]?.name || "");
              onChange(event);
            }}
            {...inputProps}
          />
        </Button>
        <Typography variant="caption" color="text.secondary" align="center">
          {fileName ||
            `Accepts only ${
              type === INPUT_TYPES.IMAGE
                ? "image"
                : type === INPUT_TYPES.AUDIO
                ? "audio"
                : ""
            }`}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default InputFile;
