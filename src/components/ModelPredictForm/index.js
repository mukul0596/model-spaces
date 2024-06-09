import React from "react";
import { INPUT_TYPES } from "../../constants/inputTypes";
import { Button, Stack, TextField } from "@mui/material";
import InputFile from "../common/InputFile";
import InputBool from "../common/InputBool";
import { toBase64 } from "../../utils/fileEncoding";

const ModelPredictForm = ({
  inputs,
  formData,
  setFormData,
  handleFormSubmit,
}) => {
  const handleTextFieldChange = (event) =>
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

  const handleBoolFieldChange = (event) =>
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.checked,
    }));

  const handleFileFieldChange = async (event) => {
    const file = event?.target?.files?.[0];
    if (!file) {
      return;
    }
    const base64File = await toBase64(file);
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: base64File,
    }));
  };

  const renderInput = ({ name, description, type, required }) => {
    if (type === INPUT_TYPES.TEXT) {
      return (
        <TextField
          key={name}
          label={name}
          name={name}
          helperText={description}
          required={required}
          size="small"
          fullWidth
          value={formData[name]}
          onChange={handleTextFieldChange}
        />
      );
    } else if (type === INPUT_TYPES.NUMBER) {
      return (
        <TextField
          key={name}
          type="number"
          label={name}
          name={name}
          helperText={description}
          required={required}
          size="small"
          fullWidth
          value={formData[name]}
          onChange={handleTextFieldChange}
        />
      );
    } else if (type === INPUT_TYPES.BOOL) {
      return (
        <InputBool
          key={name}
          name={name}
          description={description}
          inputProps={{ name }}
          value={formData[name]}
          onChange={handleBoolFieldChange}
        />
      );
    } else if (type === INPUT_TYPES.AUDIO || type === INPUT_TYPES.IMAGE) {
      return (
        <InputFile
          key={name}
          type={type}
          name={name}
          description={description}
          required={required}
          inputProps={{
            name,
            accept:
              type === INPUT_TYPES.IMAGE
                ? "image/*"
                : type === INPUT_TYPES.AUDIO
                ? "audio/*"
                : "",
          }}
          value={formData[name]}
          onChange={handleFileFieldChange}
        />
      );
    }
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <Stack spacing={3} alignItems="flex-end">
        {inputs?.map((input) => renderInput(input))}
        <Button type="submit" variant="contained" sx={{ minWidth: 120 }}>
          Predict
        </Button>
      </Stack>
    </form>
  );
};

export default ModelPredictForm;
