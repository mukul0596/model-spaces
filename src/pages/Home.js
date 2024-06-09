import React from "react";
import { useSearchParams } from "react-router-dom";
import _ from "lodash";
import { Alert, AlertTitle, Hidden, Stack, Typography } from "@mui/material";
import useAxios from "../hooks/useAxios";
import { isError, isLoading, isSuccess } from "../utils/statusHelpers";
import CardList from "../components/GridList";
import Card from "../components/ModelCard";
import CardSkeleton from "../components/ModelCard/CardSkeleton";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [searchParams] = useSearchParams();
  const [{ data, error, status }] = useAxios({
    method: "GET",
    url: "/model-spaces",
  });

  let filteredData = data?.data ? [...data.data] : [];
  const searchText = searchParams.get("search")?.trim()?.toLowerCase();
  if (searchText) {
    filteredData = filteredData?.filter(
      (mdoel) =>
        mdoel?.name?.toLowerCase?.()?.includes?.(searchText) ||
        mdoel?.description?.toLowerCase?.()?.includes?.(searchText)
    );
  }

  const renderContent = () => {
    if (isLoading(status)) {
      return (
        <CardList
          items={new Array(3).fill(null)}
          ItemComponent={CardSkeleton}
          itemsPerRow={{
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
          }}
          gapBetweenItems={4}
        />
      );
    } else if (isSuccess(status)) {
      return (
        <CardList
          items={filteredData}
          sourceName="data"
          ItemComponent={Card}
          itemsPerRow={{
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
          }}
          gapBetweenItems={4}
        />
      );
    } else if (isError(status)) {
      return (
        <Alert variant="outlined" severity="error">
          <AlertTitle>Error</AlertTitle>
          {error?.message}
          <br />
          {error?.response?.data?.detail
            ? `Message: ${error.response.data.detail}`
            : null}
        </Alert>
      );
    }
  };

  return (
    <Stack spacing={4}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={2}>
          <img src="/simplismart-logo.png" alt="LOGO" height={50} />
          <Hidden smDown>
            <Typography variant="h4">Model Spaces</Typography>
          </Hidden>
        </Stack>
        <SearchBar />
      </Stack>
      {renderContent()}
    </Stack>
  );
};

export default Home;
