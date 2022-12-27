import * as React from "react";
import { Button, Typography } from "@mui/material";
import { useCurrentState } from "../state/state-e";
import { Structure } from "./structure";
import { PlayerCompleteStep } from "../state/app-state";
import { startGame } from "../state/add-player";

export const PlayerComplete = () => {
  const currentState = useCurrentState();
  const step = currentState.step as PlayerCompleteStep;
  return (
    <Structure>
      <Typography variant="h4" sx={{ m: 6, textAlign: "center" }}>
        Congratulations Player {step.playerTurn + 1}, you won the game!
      </Typography>
      <Button sx={{ m: 2 }} variant="contained" onClick={startGame}>
        Start game
      </Button>
    </Structure>
  );
};
