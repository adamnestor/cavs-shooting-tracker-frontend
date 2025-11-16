import type { Test } from "../types/Test";

// Calculate duration in milliseconds
function getDurationMs(startTime: string, endTime: string): number {
  return new Date(endTime).getTime() - new Date(startTime).getTime();
}

// Calculate duration in MM:SS format
export function calculateDuration(startTime: string, endTime: string): string {
  const durationMs = getDurationMs(startTime, endTime);
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Calculate pace (shots per minute)
export function calculatePace(
  shots: number,
  startTime: string,
  endTime: string
): string {
  const durationMs = getDurationMs(startTime, endTime);
  const durationMinutes = durationMs / 60000;
  const pace = shots / durationMinutes;
  return pace.toFixed(1);
}

// Calculate trend compared to last 3 tests (±5% threshold)
export function calculateTrend(
  currentMade: number,
  lastThreeTests: Test[]
): "up" | "down" | "stable" {
  if (lastThreeTests.length === 0) return "stable";

  const average =
    lastThreeTests.reduce((sum, test) => sum + test.made, 0) /
    lastThreeTests.length;
  const difference = currentMade - average;
  const percentDiff = (difference / average) * 100;

  if (percentDiff >= 5) return "up";
  if (percentDiff <= -5) return "down";
  return "stable";
}
