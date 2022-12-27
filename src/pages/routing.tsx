import * as React from "react";
import { useCurrentState } from "../state/state-e";
import { PlayerComplete } from "./player-complete";
import { ReadGetCard } from "./read-get-card";
import { ReadGive } from "./read-give";
import { ReadPlayer } from "./read-player";

export const Routing = () => {
  const st = useCurrentState();
  switch (st.step.type) {
    case "add-player":
      return <ReadPlayer />;
    case "give-card":
      return <ReadGive />;
    case "get-card":
      return <ReadGetCard />;
    case "player-complete":
      return <PlayerComplete />;
  }
};
