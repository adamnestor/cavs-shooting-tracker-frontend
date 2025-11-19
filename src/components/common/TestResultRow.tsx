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
        className="bg-white hover:bg-gray-100 transition cursor-pointer"
        onClick={() => isZoneTest && setIsExpanded(!isExpanded)}
      >
        <td className="px-2 md:px-4 py-3 border-b">
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
            <div>
              <p className="text-base md:text-lg font-cavsBody font-bold text-[#6F263D]">
                {test.player.firstName} {test.player.lastName}
              </p>
              <p className="text-xs md:text-md font-cavsBody font-semibold text-gray-600">
                {new Date(test.startTime).toLocaleDateString()}
              </p>
            </div>
            {isZoneTest && (
              <span className="text-xs md:text-md text-gray-500 md:ml-2 flex items-center gap-1">
                Zone Results
                {isExpanded ? (
                  <ChevronUp size={14} className="md:hidden" />
                ) : (
                  <ChevronDown size={14} className="md:hidden" />
                )}
                {isExpanded ? (
                  <ChevronUp size={16} className="hidden md:inline" />
                ) : (
                  <ChevronDown size={16} className="hidden md:inline" />
                )}
              </span>
            )}
          </div>
        </td>
        <td className="px-2 md:px-4 py-3 border-b text-center font-bold text-base md:text-lg">
          {test.made}/{test.shots}
        </td>
        <td className="px-2 md:px-4 py-3 border-b text-center">
          <TrendIcon className={`inline ${trendColor}`} size={18} />
        </td>
        <td className="px-2 md:px-4 py-3 border-b text-center text-sm md:text-base">
          {duration}
        </td>
        <td className="px-2 md:px-4 py-3 border-b text-center text-sm md:text-base">
          {pace}
        </td>
      </tr>

      {/* Expandable Zone Stats Row */}
      {isExpanded && isZoneTest && (
        <tr>
          <td colSpan={5} className="px-2 md:px-4 py-4 bg-gray-50 border-b">
            <div className="text-sm overflow-x-auto">
              <p className="font-semibold text-[#121212] mb-2">
                Zone Breakdown:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-4">
                {test.zoneStats.map((zoneStat) => (
                  <div
                    key={zoneStat.zone}
                    className="border rounded p-2 bg-white text-center min-w-[100px]"
                  >
                    <p className="font-semibold text-xs text-gray-700 truncate">
                      {zoneStat.zone}
                    </p>
                    <p className="text-base md:text-lg font-bold text-[#6F263D]">
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
