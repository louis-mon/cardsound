import { SoundThemeKey, soundThemes } from "../assets/sound-themes";
import { readCard } from "../utils/read";
import {
  addNewState,
  assignE,
  getCardPerPlayer,
  getCurrentState,
  notifE,
  useCurrentState,
} from "./state-e";
import * as _ from "lodash";
import { useRef } from "react";
import { distributeCards } from "../utils/distribution";

export const addValidPlayer = (plTheme: SoundThemeKey) =>
  addNewState((lastState) => ({
    players: [
      ...lastState.players,
      {
        theme: plTheme,
        cards: [],
      },
    ],
    step: { type: "add-player" },
  }));

export const useNextPlayer = () => {
  const current = useCurrentState();
  const lastData = useRef(null);
  return (data: any) => {
    if (!data || data === lastData.current) return;
    lastData.current = data;
    const th = readCard("theme", data);
    if ("data" in th) {
      if (th.data in soundThemes) {
        const alreadyUsed = current.players.some((p) => p.theme === th.data);
        if (alreadyUsed)
          notifE.set({ text: "Theme already used", severity: "error" });
        else {
          notifE.set({ text: "Player scanned!", severity: "success" });
          addValidPlayer(th.data as SoundThemeKey);
        }
      } else {
        notifE.set({ text: "Unknown theme", severity: "error" });
      }
    }
  };
};

export const startGame = () => {
  assignE.set(
    distributeCards({ themes: getCurrentState().players.map((p) => p.theme) })
  );
  addNewState((s) => {
    const cardPerPlayer = getCardPerPlayer();
    return {
      step: { type: "give-card", card: 0, playerTurn: 0 },
      players: s.players.map((p, i) => ({
        ...p,
        cards: _.range(i * cardPerPlayer, (i + 1) * cardPerPlayer),
      })),
    };
  });
};

export const useGetCurrentAddPlayer = () => {
  const state = useCurrentState();

  return {
    index: state.players.length,
    lastPlayer: _.last(state.players),
  };
};
