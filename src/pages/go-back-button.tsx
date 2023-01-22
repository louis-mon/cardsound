import * as React from "react";
import { Button, Typography } from "@mui/material";
import { stateE } from "../state/state-e";
import { GameStep } from "../state/app-state";
import { ArrowBack } from "@mui/icons-material";

export const GoBackButton = () => {
  const states = stateE.use().states;
  const allowedSteps: GameStep["type"][] = ["get-card", "give-card"];
  const canGoBack =
    states.length > 1 &&
    allowedSteps.includes(states[states.length - 2].step.type);
  return (
    canGoBack && (
      <Button
        variant={"contained"}
        startIcon={<ArrowBack />}
        onClick={() => {
          stateE.set((old) => ({
            ...old,
            states: old.states.slice(0, old.states.length - 1),
          }));
        }}
      >
        <Typography variant={"button"}>Oops scan précédent</Typography>
      </Button>
    )
  );
};
