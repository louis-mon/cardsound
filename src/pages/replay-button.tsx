import * as React from "react";
import { Button, Typography } from "@mui/material";
import { getCurrentState, stateE } from "../state/state-e";
import { CardMove, GameStep } from "../state/app-state";
import { useSounds } from "../assets/use-sounds";
import { Replay } from "@mui/icons-material";

export const ReplayButton = () => {
  const states = stateE.use().states;
  const sounds = useSounds();
  const allowedSteps: GameStep["type"][] = ["get-card", "give-card"];
  const canReplay =
    states.length > 1 &&
    allowedSteps.includes(states[states.length - 2].step.type);
  if (!canReplay) return null;
  return (
    <Button
      variant={"contained"}
      startIcon={<Replay />}
      sx={{ textTransform: "unset !important" }}
      onClick={() => {
        const lastStep = getCurrentState().step as CardMove;
        sounds(lastStep.card).play();
      }}
    >
      <Typography variant={"body2"}>Rejouer dernier son</Typography>
    </Button>
  );
};
