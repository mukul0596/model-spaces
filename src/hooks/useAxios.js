import React from "react";
import axios from "axios";
import { REQUEST_STATUS } from "../constants/requestStatus";

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

customAxios.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };
    newConfig.mode = "no-cors";
    newConfig.metadata = { startTime: new Date() };
    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);
customAxios.interceptors.response.use(
  (response) => {
    const newRes = { ...response };
    newRes.config.metadata.endTime = new Date();
    newRes.data.duration =
      newRes.config.metadata.endTime - newRes.config.metadata.startTime;
    return newRes;
  },
  (error) => {
    const newError = { ...error };
    newError.config.metadata.endTime = new Date();
    newError.duration =
      newError.config.metadata.endTime - newError.config.metadata.startTime;
    return Promise.reject(newError);
  }
);

const useAxios = (axiosConfig, options = { manual: false }) => {
  const [data, setData] = React.useState();
  const [error, setError] = React.useState();
  const [status, setStatus] = React.useState(
    options.manual ? REQUEST_STATUS.IDLE : REQUEST_STATUS.LOADING
  );

  const executeRequest = React.useCallback(
    async (config) => {
      try {
        setStatus(REQUEST_STATUS.LOADING);
        const response = await customAxios({ ...axiosConfig, ...config });
        setStatus(REQUEST_STATUS.SUCCESS);
        console.log(response);
        setData(response?.data);
      } catch (error) {
        setStatus(REQUEST_STATUS.ERROR);
        setError(error);
      }
    },
    [axiosConfig]
  );

  React.useEffect(() => {
    if (!options.manual) {
      executeRequest();
    }
  }, []);

  return [{ data, error, status }, executeRequest];
};

export default useAxios;
