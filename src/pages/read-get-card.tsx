import * as React from "react";
import * as _ from "lodash";
import { Typography } from "@mui/material";
import { addNewState, notifE, useCurrentState } from "../state/state-e";
import { Structure } from "./structure";
import { GiveCardStep, PlayerState } from "../state/app-state";
import { readCard } from "../utils/read";
import { hasPlayerWon } from "../utils/distribution";
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
      if (_.includes(player.cards, soundCard)) {
        notifE.set({
          text: "Choose a card from the other player!",
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
            text: `Player ${fromPlayer + 1} gives card ${soundCard + 1} to ${
              step.playerTurn + 1
            }`,
            severity: "success",
          });

          return {
            step: hasPlayerWon(players.find((p) => p.theme === player.theme))
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
    <Structure onScan={onScan}>
      <Typography variant={"h4"} sx={{ mt: 4 }}>
        Player {step.playerTurn + 1} take a card from the other player
      </Typography>
    </Structure>
  );
};
