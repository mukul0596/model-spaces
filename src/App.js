import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Home from "./pages/Home";
import ModelSpace from "./pages/ModelSpace";

const App = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<ModelSpace />} />
      </Routes>
    </Box>
  );
};

export default App;
