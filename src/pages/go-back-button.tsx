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
  if (!canGoBack) return null;
  return (
    <Button
      variant={"contained"}
      startIcon={<ArrowBack />}
      sx={{ textTransform: "unset !important" }}
      onClick={() => {
        stateE.set((old) => ({
          ...old,
          states: old.states.slice(0, old.states.length - 1),
        }));
      }}
    >
      <Typography variant={"body2"}>Oups scan précédent</Typography>
    </Button>
  );
};
