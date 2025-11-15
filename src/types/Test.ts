import type { Player } from "./Player";

export interface Test {
  id: number;
  startTime: string;
  shots: number;
  made: number;
  playerId: number;
  player: Player;
}
