import * as React from "react";

import {
  startGame,
  useGetCurrentAddPlayer,
  useNextPlayer,
} from "../state/add-player";
import { Button, Typography } from "@mui/material";
import { Structure } from "./structure";

export const ReadPlayer = () => {
  const nextPlayer = useNextPlayer();
  const current = useGetCurrentAddPlayer();
  return (
    <Structure onScan={nextPlayer}>
      <Typography sx={{ my: 3 }} variant="h4">
        Joueur {current.index + 1} scanne sa carte thème
      </Typography>
      <Button sx={{ m: 2 }} variant="contained" onClick={startGame}>
        Commencer
      </Button>
    </Structure>
  );
};
