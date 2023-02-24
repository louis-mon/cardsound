import * as React from "react";
import * as _ from "lodash";
import { entity } from "simpler-state";
import { AppState, GameState } from "./app-state";
import { AlertProps } from "@mui/material";
import { CardAssign } from "../utils/distribution";

export const initialState: AppState = {
  states: [
    {
      players: [],
      step: {
        type: "add-player",
      },
    },
  ],
  config: {
    cardPerPlayer: 3,
  },
};

export const stateE = entity<AppState>(initialState);

export const assignE = entity<CardAssign>({});

export const getCardPerPlayer = () => stateE.get().config.cardPerPlayer;

export const notifE = entity<{
  text: string;
  severity: AlertProps["severity"];
} | null>(null);

export const getCurrentState = () => _.last(stateE.get().states)!;
export const useCurrentState = () => _.last(stateE.use().states)!;

export const addNewState = (f: (lastState: GameState) => Partial<GameState>) =>
  stateE.set((old) => {
    const lastState = old.states[old.states.length - 1];
    const newState: GameState = {
      ...lastState,
      ...f(lastState),
    };
    return {
      ...old,
      states: [...old.states, newState],
    };
  });
