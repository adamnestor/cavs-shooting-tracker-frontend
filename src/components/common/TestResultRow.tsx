import { useState } from "react";
import type { Test } from "../../types/Test";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
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
  const [isExpanded, setIsExpanded] = useState(false);
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

  const isZoneTest = test.testType === "zone" && test.zoneStats.length > 0;

  return (
    <>
      <tr
        className="hover:bg-gray-50 transition cursor-pointer"
        onClick={() => isZoneTest && setIsExpanded(!isExpanded)}
      >
        <td className="px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <div>
              <p className="font-bold text-[#860038]">
                {test.player.firstName} {test.player.lastName}
              </p>
              <p className="text-sm text-gray-600">
                {new Date(test.startTime).toLocaleDateString()}
              </p>
            </div>
            {isZoneTest && (
              <span className="text-xs text-gray-500 ml-2 flex items-center gap-1">
                Zone Results
                {isExpanded ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </span>
            )}
          </div>
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

      {/* Expandable Zone Stats Row */}
      {isExpanded && isZoneTest && (
        <tr>
          <td colSpan={5} className="px-4 py-4 bg-gray-50 border-b">
            <div className="text-sm">
              <p className="font-semibold text-[#041e42] mb-2">
                Zone Breakdown:
              </p>
              <div className="grid grid-cols-5 gap-4">
                {test.zoneStats.map((zoneStat) => (
                  <div
                    key={zoneStat.zone}
                    className="border rounded p-2 bg-white text-center"
                  >
                    <p className="font-semibold text-xs text-gray-700">
                      {zoneStat.zone}
                    </p>
                    <p className="text-lg font-bold text-[#860038]">
                      {zoneStat.made}/{zoneStat.shots}
                    </p>
                    <p className="text-xs text-gray-600">
                      {Math.round((zoneStat.made / zoneStat.shots) * 100)}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
