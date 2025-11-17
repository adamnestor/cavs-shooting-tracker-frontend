import type { Player } from "./Player";
import type { ZoneStat } from "./ZoneStat";

export interface Test {
  id: number;
  startTime: string;
  endTime: string;
  shots: number;
  made: number;
  playerId: number;
  player: Player;
  testType: string;
  zoneStats: ZoneStat[];
}
