import { soundThemes } from "./sound-themes";
import _ from "lodash";
import useSound from "use-sound";
import { assignE } from "../state/state-e";

const allSounds = _.sortBy(
  _.flatMap(soundThemes, (x) => x.cards),
  (x) => x.sound
);

export const useSounds = () => {
  const dist = assignE.use();
  const hooks = _.fromPairs(
    allSounds.map((x) => [x.sound, useSound(`sound/${x.sound}.mp3`)])
  );
  return (card: number) => {
    const [play, options] = hooks[dist[card].card];
    return { play, options };
  };
};
