export type CardData = {
  theme: string;
  sound: number;
};

export type TokenKind = keyof CardData;

export const readCard = <T extends TokenKind>(
  t: T,
  data: any
): { data: CardData[T] } | { error: string } => {
  try {
    const json = JSON.parse(data);
    if (!(t in json)) {
      return { error: "Invalid card" };
    }
    return { data: json[t] };
  } catch {
    return { error: "Invalid card" };
  }
};
