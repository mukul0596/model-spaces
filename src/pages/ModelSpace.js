import React from "react";
import { useParams } from "react-router-dom";
import {
  Alert,
  AlertTitle,
  Box,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import useAxios from "../hooks/useAxios";
import {
  isError,
  isLoading,
  isNotIdle,
  isSuccess,
} from "../utils/statusHelpers";
import ModelPredictForm from "../components/ModelPredictForm";
import { INPUT_TYPES } from "../constants/inputTypes";
import ModelPredictResponse from "../components/ModelPredictResponse";

const ModelSpace = () => {
  const { id } = useParams();
  const [{ data, error, status }] = useAxios({
    method: "GET",
    url: `/model-spaces/${id}`,
  });
  const [formData, setFormData] = React.useState();

  React.useEffect(() => {
    const defaultFormData = {};
    data?.data?.inputs.forEach((input) => {
      if (input?.default) {
        defaultFormData[input.name] = input.default;
      } else if (input?.type === INPUT_TYPES.BOOL) {
        defaultFormData[input.name] = false;
      } else {
        defaultFormData[input.name] = "";
      }
    });
    setFormData(defaultFormData);
  }, [data?.data]);

  const AVATAR_SIZE = 120;

  const [
    { data: submitData, error: submitError, status: submitStatus },
    executeSubmit,
  ] = useAxios(
    {
      method: "POST",
      url: `/model-spaces/${id}/predict`,
    },
    { manual: true }
  );

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    executeSubmit({ data: formData });
  };

  const renderTitle = () => {
    if (isLoading(status)) {
      return <Skeleton width={320} />;
    } else if (isSuccess(status)) {
      return data?.data?.name;
    }
  };

  const renderDescription = () => {
    if (isLoading(status)) {
      return _.times(3, () => <Skeleton key={uuidv4()} />);
    } else if (isSuccess(status)) {
      return data?.data?.description;
    }
  };

  const renderAvatar = () => {
    if (isLoading(status)) {
      return (
        <Skeleton
          variant="rectangular"
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
        />
      );
    } else if (isSuccess(status)) {
      return <img src={data?.data?.avatar} height={AVATAR_SIZE} />;
    }
  };

  return isError(status) ? (
    <Alert variant="outlined" severity="error">
      <AlertTitle>Error</AlertTitle>
      {error?.message}
      <br />
      {error?.response?.data?.detail
        ? `Message: ${error.response.data.detail}`
        : null}
    </Alert>
  ) : (
    <Stack spacing={3}>
      <Stack
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { sm: "space-between" },
          alignItems: { sm: "center" },
          gap: { xs: 2, sm: 3 },
        }}
      >
        <Stack spacing={1} flex={1}>
          <Typography variant="h5">{renderTitle()}</Typography>
          <Typography variant="body2">{renderDescription()}</Typography>
        </Stack>
        <Box display="flex" justifyContent="center">
          {renderAvatar()}
        </Box>
      </Stack>
      {isLoading(status) ? (
        <Skeleton variant="rectangular" width="100%" height={420} />
      ) : (
        <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 } }}>
          <ModelPredictForm
            inputs={data?.data?.inputs}
            formData={formData}
            setFormData={setFormData}
            handleFormSubmit={handleFormSubmit}
          />

          {isNotIdle(submitStatus) && (
            <Box py={3}>
              <Divider />
            </Box>
          )}
          {isLoading(submitStatus) || isSuccess(submitStatus) ? (
            <ModelPredictResponse
              status={submitStatus}
              outputs={data?.data?.outputs}
              data={submitData?.data}
              responseTime={submitData?.duration}
            />
          ) : isError(submitStatus) ? (
            <Alert variant="outlined" severity="error">
              <AlertTitle>Error</AlertTitle>
              {submitError?.message}
              <br />
              {submitError?.response?.data?.detail
                ? `Message: ${submitError.response.data.detail}`
                : null}
            </Alert>
          ) : null}
        </Paper>
      )}
    </Stack>
  );
};

export default ModelSpace;
