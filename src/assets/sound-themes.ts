import _ from "lodash";

export type SoundFamilyDef = {
  cards: Array<{
    sound: string;
  }>;
};

const f = <T extends Record<string, number>>(s: T) =>
  _.mapValues(
    s,
    (v, k): SoundFamilyDef => ({
      cards: _.range(3).map((i) => ({
        sound: `${k}-${String(i + 1).padStart(3, "0")}`,
      })),
    })
  ) as Record<keyof T, SoundFamilyDef>;

export const soundThemes = f({
  mario: 3,
  zelda: 3,
  yoshi: 3,
  bowser: 3,
  pokemon: 3,
});

export type SoundThemeKey = keyof typeof soundThemes;
