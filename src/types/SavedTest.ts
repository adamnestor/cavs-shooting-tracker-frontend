import type { Player } from "./Player";
import type { Zone } from "./ZoneStat";

export interface SavedTest {
  testType: "standard" | "zone";
  player: Player;
  startTime: string;
  timestamp: string; // When saved to localStorage

  // For standard tests
  attemptedCount?: number;
  madeCount?: number;

  // For zone tests
  activeZone?: Zone | null;
  zoneData?: Record<Zone, { made: number; shots: number }>;
}
