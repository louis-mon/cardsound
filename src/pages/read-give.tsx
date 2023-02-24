import * as React from "react";
import * as _ from "lodash";
import { Box, Typography } from "@mui/material";
import { addNewState, notifE, useCurrentState } from "../state/state-e";
import { Structure } from "./structure";
import { GiveCardStep } from "../state/app-state";
import { readCard } from "../utils/read";
import { useSounds } from "../assets/use-sounds";
import { TopActionButtons } from "./top-action-buttons";

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
        notifE.set({ text: "Choisis une de tes cartes!", severity: "error" });
      } else {
        sounds(soundCard).play();
        notifE.set({
          text: `Joueur ${step.playerTurn + 1} a donné la carte ${
            soundCard + 1
          }`,
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
    <Structure onScan={onScan} top={<TopActionButtons />}>
      <Typography variant={"h4"} sx={{ mt: 4, textAlign: "center" }}>
        <Box m={2}>Joueur {step.playerTurn + 1}:</Box>

        <div>
          Choisit une de ses cartes carte, la scanne et la donne à un autre
          joueur
        </div>
      </Typography>
    </Structure>
  );
};
