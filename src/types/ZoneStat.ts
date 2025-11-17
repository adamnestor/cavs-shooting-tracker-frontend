export type Zone =
  | "Left Corner"
  | "Left Wing"
  | "Top of Key"
  | "Right Wing"
  | "Right Corner";

export interface ZoneStat {
  id: number;
  testId: number;
  zone: Zone;
  made: number;
  shots: number;
}
