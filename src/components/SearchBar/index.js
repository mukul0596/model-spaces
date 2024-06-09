import React from "react";
import { useSearchParams } from "react-router-dom";
import _ from "lodash";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = React.useState(
    searchParams.get("search") || ""
  );

  const handleSearch = _.debounce(
    () =>
      setSearchParams((searchParams) => {
        searchParams.delete("search");
        if (searchText) {
          searchParams.set("search", searchText);
        }
        return searchParams;
      }),
    300
  );

  React.useEffect(() => {
    handleSearch();
  }, [searchText]);

  return (
    <TextField
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      variant="outlined"
      size="small"
      placeholder="Search..."
      autoComplete="off"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
