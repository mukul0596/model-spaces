import React from "react";
import JsonView from "react18-json-view";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {
  Box,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { INPUT_TYPES } from "../../constants/inputTypes";
import { isLoading } from "../../utils/statusHelpers";
import "react18-json-view/src/style.css";

const ModelPredictResponse = ({ status, outputs, data, responseTime }) => {
  const responseRef = React.useRef();
  const scrollToResponse = () => {
    const { current } = responseRef;
    if (current !== null) {
      current.scrollIntoView({ behavior: "smooth" });
    }
  };
  React.useEffect(() => {
    scrollToResponse();
  }, []);

  const renderOutput = ({ name, type }) => {
    if (type === INPUT_TYPES?.TEXT || type === INPUT_TYPES?.NUMBER) {
      return (
        <Typography variant="body1">
          {isLoading(status) ? <Skeleton width={320} /> : data?.[name]}
        </Typography>
      );
    } else if (type === INPUT_TYPES?.BOOL) {
      return (
        <Typography variant="body1">
          {isLoading(status) ? (
            <Skeleton width={60} />
          ) : data?.[name] ? (
            "YES"
          ) : (
            "NO"
          )}
        </Typography>
      );
    } else if (type === INPUT_TYPES?.IMAGE) {
      return isLoading(status) ? (
        <Skeleton variant="rectangular" width={200} height={200} />
      ) : (
        <img src={data?.[name]} alt="Predicted Image" width={200} />
      );
    } else if (type === INPUT_TYPES?.IMAGES) {
      return isLoading(status) ? (
        <Skeleton variant="rectangular" width={200} height={200} />
      ) : (
        <Stack direction="row" spacing={2}>
          {data?.[name]?.map((imgBase64) => (
            <img src={imgBase64} alt="Predicted Image" width={200} />
          ))}
        </Stack>
      );
    } else if (type === INPUT_TYPES?.AUDIO) {
      return isLoading(status) ? (
        <Skeleton variant="rectangular" width={300} height={54} />
      ) : (
        <audio controls src={data?.[name]} />
      );
    }
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={0}>
        <Typography variant="h6" ref={responseRef}>
          Response
        </Typography>
        <Stack direction="row" spacing={1}>
          <Typography variant="body2" color="text.secondary">
            Time Taken:{" "}
          </Typography>

          {isLoading(status) ? (
            <Skeleton width={60} />
          ) : (
            <Typography variant="body2">{responseTime} ms</Typography>
          )}
        </Stack>
      </Stack>

      <Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              variant="outlined"
              elevation={0}
              sx={{ p: 2, height: "100%" }}
            >
              {isLoading(status) ? (
                _.times(3, (i) => <Skeleton key={uuidv4()} />)
              ) : (
                <JsonView src={data} />
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              variant="outlined"
              elevation={0}
              sx={{ p: 2, height: "100%" }}
            >
              {outputs?.map((output) => (
                <Stack spacing={0.5}>
                  <Stack direction="row" spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                      {output?.name}
                    </Typography>
                    <Tooltip title={output?.description} arrow>
                      <InfoOutlinedIcon
                        fontSize="small"
                        sx={{ color: "text.secondary" }}
                      />
                    </Tooltip>
                  </Stack>
                  {renderOutput(output)}
                </Stack>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default ModelPredictResponse;
