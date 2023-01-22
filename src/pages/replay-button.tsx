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
  return (
    canReplay && (
      <Button
        variant={"contained"}
        startIcon={<Replay />}
        onClick={() => {
          const lastStep = getCurrentState().step as CardMove;
          sounds(lastStep.card).play();
        }}
      >
        <Typography variant={"button"}>Rejouer dernier son</Typography>
      </Button>
    )
  );
};
