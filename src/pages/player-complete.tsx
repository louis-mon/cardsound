import * as React from "react";
import { Button, Typography } from "@mui/material";
import { initialState, stateE, useCurrentState } from "../state/state-e";
import { Structure } from "./structure";
import { PlayerCompleteStep } from "../state/app-state";
import { startGame } from "../state/add-player";

export const PlayerComplete = () => {
  const currentState = useCurrentState();
  const step = currentState.step as PlayerCompleteStep;

  const resetAll = () => stateE.set(() => initialState);

  return (
    <Structure>
      <Typography variant="h4" sx={{ m: 6, textAlign: "center" }}>
        Congratulations Player {step.playerTurn + 1}, you won the game!
      </Typography>

      <Button sx={{ m: 4 }} variant="contained" onClick={resetAll}>
        <Typography variant="h5">Go back to start screen</Typography>
      </Button>
    </Structure>
  );
};
