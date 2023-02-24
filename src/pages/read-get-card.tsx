import * as React from "react";
import * as _ from "lodash";
import { Box, Typography } from "@mui/material";
import { addNewState, notifE, useCurrentState } from "../state/state-e";
import { Structure } from "./structure";
import { GiveCardStep, PlayerState } from "../state/app-state";
import { readCard } from "../utils/read";
import { hasPlayerWon } from "../utils/distribution";
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
      if (_.includes(player.cards, soundCard)) {
        notifE.set({
          text: "Choisis une carte d'un autre joueur!",
          severity: "error",
        });
      } else {
        sounds(soundCard).play();
        addNewState(() => {
          const players: PlayerState[] = currentState.players.map((p) => ({
            ...p,
            cards: p.cards.map((c) =>
              c === step.card ? soundCard : c === soundCard ? step.card : c
            ),
          }));

          const fromPlayer = currentState.players.findIndex((p) =>
            _.includes(p.cards, soundCard)
          );

          notifE.set({
            text: `Joueur ${step.playerTurn + 1} a pris la carte ${
              soundCard + 1
            } au joueur ${fromPlayer + 1}`,
            severity: "success",
          });

          return {
            step: hasPlayerWon(players.find((p) => p.theme === player.theme)!)
              ? {
                  type: "player-complete",
                  playerTurn: step.playerTurn,
                }
              : {
                  type: "give-card",
                  card: soundCard,
                  playerTurn:
                    (step.playerTurn + 1) % currentState.players.length,
                },
            players,
          };
        });
      }
    }
  };
};

export const ReadGetCard = () => {
  const currentState = useCurrentState();
  const step = currentState.step as GiveCardStep;
  const onScan = useOnScan();
  return (
    <Structure onScan={onScan} top={<TopActionButtons />}>
      <Typography variant={"h4"} sx={{ mt: 4, textAlign: "center" }}>
        <Box m={2}>Joueur {step.playerTurn + 1}:</Box>
        Récupère une autre carte sur ce même joueur et la scanne
      </Typography>
    </Structure>
  );
};
