import * as React from "react";
import * as _ from "lodash";
import { Typography } from "@mui/material";
import {
  addNewState,
  assignE,
  notifE,
  useCurrentState,
} from "../state/state-e";
import { Structure } from "./structure";
import { GiveCardStep } from "../state/app-state";
import { readCard } from "../utils/read";
import { useSounds } from "../assets/use-sounds";

const useOnScan = () => {
  const currentState = useCurrentState();
  const step = currentState.step as GiveCardStep;
  const player = currentState.players[step.playerTurn];
  const sounds = useSounds();
  return (data: any) => {
    if (!data) return;
    const card = readCard("sound", data);
    if ("data" in card) {
      const soundCard = card.data;
      if (!_.includes(player.cards, soundCard)) {
        notifE.set({ text: "Choose one of your cards!", severity: "error" });
      } else {
        sounds(soundCard).play();
        notifE.set({
          text: `Player ${step.playerTurn + 1} gives card ${soundCard + 1}`,
          severity: "success",
        });
        addNewState(() => ({
          step: {
            type: "get-card",
            card: soundCard,
            playerTurn: step.playerTurn,
          },
        }));
      }
    }
  };
};

export const ReadGive = () => {
  const currentState = useCurrentState();
  const step = currentState.step as GiveCardStep;
  const onScan = useOnScan();
  return (
    <Structure onScan={onScan}>
      <Typography variant={"h4"} sx={{ mt: 4 }}>
        Player {step.playerTurn + 1} choose a card, scan it and give it to
        another player
      </Typography>
    </Structure>
  );
};
