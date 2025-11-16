import type { Test } from "../../types/Test";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  calculateDuration,
  calculatePace,
  calculateTrend,
} from "../../utils/testCalculations";

interface TestResultRowProps {
  test: Test;
  lastThreeTests: Test[];
}

export function TestResultRow({ test, lastThreeTests }: TestResultRowProps) {
  const duration = calculateDuration(test.startTime, test.endTime);
  const pace = calculatePace(test.shots, test.startTime, test.endTime);
  const trend = calculateTrend(test.made, lastThreeTests);

  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor =
    trend === "up"
      ? "text-green-600"
      : trend === "down"
      ? "text-red-600"
      : "text-gray-600";

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-4 py-3 border-b">
        <p className="font-bold text-[#860038]">
          {test.player.firstName} {test.player.lastName}
        </p>
        <p className="text-sm text-gray-600">
          {new Date(test.startTime).toLocaleDateString()}
        </p>
      </td>
      <td className="px-4 py-3 border-b text-center font-bold text-lg">
        {test.made}/{test.shots}
      </td>
      <td className="px-4 py-3 border-b text-center">
        <TrendIcon className={`inline ${trendColor}`} size={20} />
      </td>
      <td className="px-4 py-3 border-b text-center">{duration}</td>
      <td className="px-4 py-3 border-b text-center">{pace}</td>
    </tr>
  );
}
