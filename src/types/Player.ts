export type Position = "Guard" | "Forward" | "Center";

export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  jerseyNumber: number;
  position: Position;
  active: boolean;
}
