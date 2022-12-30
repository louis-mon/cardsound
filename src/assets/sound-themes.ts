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
  accordeon: 3,
  banjos: 3,
  bowser: 3,
  cornemuse: 3,
  cristal_baschet: 3,
  didgeridoo: 3,
  flute: 3,
  gimbarde: 3,
  gong: 3,
  guitare: 3,
  harmonica: 3,
  harpe: 3,
  harry_potter: 3,
  mario: 3,
  orgue: 3,
  pokemon: 3,
  saxophone: 3,
  seigneur_des_anneaux: 3,
  sonic: 3,
  tetris: 3,
  triangle: 3,
  udu: 3,
  xylophone: 3,
  yoshi: 3,
  zelda: 3,
});

export type SoundThemeKey = keyof typeof soundThemes;
