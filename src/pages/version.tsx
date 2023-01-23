import * as React from "react";
import { Box } from "@mui/system";

export const Version = () => {
  return (
    <Box sx={{ position: "fixed", bottom: "10", right: "10" }}>
      v{process.env.REACT_APP_VERSION}
    </Box>
  );
};
