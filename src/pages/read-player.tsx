import * as React from "react";

import {
  startGame,
  useGetCurrentAddPlayer,
  useNextPlayer,
} from "../state/add-player";
import { Box, Button, Typography } from "@mui/material";
import { Structure } from "./structure";

export const ReadPlayer = () => {
  const nextPlayer = useNextPlayer();
  const current = useGetCurrentAddPlayer();
  return (
    <Structure onScan={nextPlayer}>
      <Typography sx={{ my: 3, textAlign: "center" }} variant="h4">
        <Box m={2}>Joueur {current.index + 1}:</Box>
        Scanne sa carte thème
      </Typography>
      <Button sx={{ m: 2 }} variant="contained" onClick={startGame}>
        Commencer
      </Button>
    </Structure>
  );
};
