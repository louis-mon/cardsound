import { SoundThemeKey } from "../assets/sound-themes";

export type PlayerState = {
  theme: SoundThemeKey;
  cards: number[];
};

export type AddPlayerStep = {
  type: "add-player";
};

export type CardMove = {
  card: number;
  playerTurn: number;
};

export type GiveCardStep = CardMove & {
  type: "give-card";
};

export type GetCardStep = CardMove & {
  type: "get-card";
};

export type PlayerCompleteStep = {
  type: "player-complete";
  playerTurn: number;
};

export type GameStep =
  | AddPlayerStep
  | GiveCardStep
  | GetCardStep
  | PlayerCompleteStep;

export type GameState = {
  players: PlayerState[];
  step: GameStep;
};

export type GameConfig = {
  cardPerPlayer: number;
};

export type AppState = {
  states: GameState[];
  config: GameConfig;
};
