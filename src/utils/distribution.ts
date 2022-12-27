import { PlayerState } from "../state/app-state";
import * as _ from "lodash";
import { assignE, getCardPerPlayer } from "../state/state-e";
import { soundThemes } from "../assets/sound-themes";

export type SoundCard = { theme: string; card: string };
export type CardAssign = Record<number, SoundCard>;

const indexToPlayer = (i: number): number => Math.floor(i / getCardPerPlayer());

export const distributeCards = ({
  themes,
}: {
  themes: string[];
}): CardAssign => {
  const cardPerPlayer = getCardPerPlayer();
  const cards = _.range(cardPerPlayer * themes.length);
  const d: CardAssign = _.fromPairs(
    cards.map((i) => {
      const themeIndex = indexToPlayer(i);
      const soundIndex = i - themeIndex * cardPerPlayer;
      return [
        i,
        {
          theme: themes[themeIndex],
          card: soundThemes[themes[themeIndex]].cards[soundIndex].sound,
        },
      ];
    })
  );
  const playerOfTheme = (theme: string) => _.indexOf(themes, theme);
  cards.forEach((card) => {
    const current = d[card];
    const playerOfCurrentTheme = playerOfTheme(current.theme);
    const currentPlayer = indexToPlayer(card);
    if (playerOfCurrentTheme === currentPlayer) {
      const selectableCards = cards.filter((other) => {
        const otherTheme = d[other];
        const otherPlayer = indexToPlayer(other);
        const playerOfOtherTheme = playerOfTheme(otherTheme.theme);
        return (
          otherPlayer != currentPlayer && playerOfOtherTheme !== currentPlayer
        );
      });
      const selected = selectableCards[_.random(selectableCards.length - 1)];
      d[card] = d[selected];
      d[selected] = current;
    }
  });
  return d;
};

export const hasPlayerWon = (player: PlayerState) => {
  const d = assignE.get();
  return player.cards.every((c) => d[c].theme === player.theme);
};

export const monteCarlo = () => {
  const themes = ["a", "b", "c", "d", "e"];

  const probas = _.fromPairs(
    themes.map((t) => [
      t,
      _.fromPairs(_.range(themes.length).map((i) => [i, 0])),
    ])
  );
  _.range(10000).forEach(() => {
    const d = distributeCards({ themes });
    _.forEach(d, (v, k) => {
      const player = indexToPlayer(+k);
      probas[v.theme][player] = 1 + probas?.[v.theme][player];
    });
  });
  return _.mapValues(probas, (v, k) =>
    _.mapValues(v, (p, player) => p / _.sum(_.values(v)))
  );
};
