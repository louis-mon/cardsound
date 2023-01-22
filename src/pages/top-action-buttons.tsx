import * as React from "react";
import { GoBackButton } from "./go-back-button";
import { Box } from "@mui/material";
import { ReplayButton } from "./replay-button";

export const TopActionButtons = () => {
  return (
    <Box
      sx={{
        width: "100%",
        m: 3,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <GoBackButton />
      <ReplayButton />
    </Box>
  );
};
