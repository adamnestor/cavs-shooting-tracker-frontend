import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../common/Button";
import { StatDisplay } from "../common/StatDisplay";
import type { Player } from "../../types/Player";
import type { Zone } from "../../types/ZoneStat";
import API_URL from "../../config/api";

const ZONES: Zone[] = [
  "Left Corner",
  "Left Wing",
  "Top of Key",
  "Right Wing",
  "Right Corner",
];

export function ZoneTestPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const player = location.state?.player as Player;

  const [startTime] = useState(new Date().toISOString());
  const [activeZone, setActiveZone] = useState<Zone | null>(null);
  const [zoneData, setZoneData] = useState<
    Record<Zone, { made: number; shots: number }>
  >({
    "Left Corner": { made: 0, shots: 0 },
    "Left Wing": { made: 0, shots: 0 },
    "Top of Key": { made: 0, shots: 0 },
    "Right Wing": { made: 0, shots: 0 },
    "Right Corner": { made: 0, shots: 0 },
  });

  if (!player) {
    navigate("/");
    return null;
  }

  const totalShots = Object.values(zoneData).reduce(
    (sum, zone) => sum + zone.shots,
    0
  );
  const totalMade = Object.values(zoneData).reduce(
    (sum, zone) => sum + zone.made,
    0
  );
  const percentage =
    totalShots === 0 ? 0 : Math.round((totalMade / totalShots) * 100);

  const isZoneComplete = (zone: Zone) => zoneData[zone].shots >= 20;
  const allZonesComplete = ZONES.every(isZoneComplete);

  const handleZoneSelect = (zone: Zone) => {
    if (!isZoneComplete(zone)) {
      setActiveZone(zone);
    }
  };

  const handleMade = () => {
    if (!activeZone) return;
    setZoneData((prev) => ({
      ...prev,
      [activeZone]: {
        made: prev[activeZone].made + 1,
        shots: prev[activeZone].shots + 1,
      },
    }));

    // Check if zone is now complete
    if (zoneData[activeZone].shots + 1 >= 20) {
      setActiveZone(null);
    }
  };

  const handleMiss = () => {
    if (!activeZone) return;
    setZoneData((prev) => ({
      ...prev,
      [activeZone]: {
        ...prev[activeZone],
        shots: prev[activeZone].shots + 1,
      },
    }));

    // Check if zone is now complete
    if (zoneData[activeZone].shots + 1 >= 20) {
      setActiveZone(null);
    }
  };

  const handleSave = async () => {
    const endTime = new Date().toISOString();

    // Transform zoneData into array for backend
    const zoneStats = ZONES.map((zone) => ({
      zone,
      made: zoneData[zone].made,
      shots: zoneData[zone].shots,
    }));

    await fetch(`${API_URL}/api/tests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startTime,
        endTime,
        shots: totalShots,
        made: totalMade,
        playerId: player.id,
        testType: "zone",
        zoneStats,
      }),
    });
    navigate("/results");
  };

  const getZoneButtonStyle = (zone: Zone) => {
    const isComplete = isZoneComplete(zone);
    const isActive = activeZone === zone;

    if (isComplete) {
      return "bg-gray-300 text-gray-600 border-4 border-[#6F263D] cursor-not-allowed";
    }
    if (isActive) {
      return "bg-[#6F263D] text-white border-4 border-[#FFB300] shadow-lg";
    }
    return "bg-[#121212] text-white border-4 border-transparent hover:border-[#FFB300] cursor-pointer";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 py-4">
      <h1 className="text-[#6F263D] text-2xl md:text-3xl lg:text-4xl font-cavsHeader font-bold drop-shadow-md text-center">
        ZONE SHOOTING TEST
      </h1>
      <p className="text-[#121212] text-xl md:text-2xl lg:text-3xl font-CavsBody font-semibold drop-shadow-sm text-center mb-8">
        Testing: {player.firstName} {player.lastName} #{player.jerseyNumber}
      </p>

      {/* Main Container - Side by Side */}
      <div className="flex gap-6 md:gap-8 lg:gap-12 items-start w-full px-4 md:px-6 lg:px-12 mt-8">
        {/* Left Side - Court with Zone Buttons */}
        <div
          className="relative w-[350px] md:w-[450px] lg:w-[500px] h-[280px] md:h-[320px] lg:h-[350px] bg-cover flex flex-col items-center justify-start gap-4 md:gap-5 lg:gap-6 p-6 md:p-7 lg:p-8 rounded-lg flex-shrink-0 shadow-md"
          style={{
            backgroundImage: "url('/nba-half-court.png')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "350px auto",
            backgroundColor: "#ffffff",
          }}
        >
          {/* Top row - Top of Key */}
          <button
            onClick={() => handleZoneSelect("Top of Key")}
            disabled={isZoneComplete("Top of Key")}
            className={`px-6 md:px-8 py-2 rounded-lg font-bold text-sm md:text-base transition ${getZoneButtonStyle(
              "Top of Key"
            )}`}
          >
            Top of Key
            <br />
            <span className="text-xs md:text-sm">
              {zoneData["Top of Key"].made}/{zoneData["Top of Key"].shots}
            </span>
          </button>

          {/* Middle row - Wings */}
          <div className="flex gap-32 md:gap-36 lg:gap-40">
            <button
              onClick={() => handleZoneSelect("Left Wing")}
              disabled={isZoneComplete("Left Wing")}
              className={`px-6 md:px-8 py-2 rounded-lg font-bold text-sm md:text-base transition -ml-8 md:-ml-10 ${getZoneButtonStyle(
                "Left Wing"
              )}`}
            >
              Left Wing
              <br />
              <span className="text-xs md:text-sm">
                {zoneData["Left Wing"].made}/{zoneData["Left Wing"].shots}
              </span>
            </button>
            <button
              onClick={() => handleZoneSelect("Right Wing")}
              disabled={isZoneComplete("Right Wing")}
              className={`px-6 md:px-8 py-2 rounded-lg font-bold text-sm md:text-base transition -mr-10 md:-mr-12 ${getZoneButtonStyle(
                "Right Wing"
              )}`}
            >
              Right Wing
              <br />
              <span className="text-xs md:text-sm">
                {zoneData["Right Wing"].made}/{zoneData["Right Wing"].shots}
              </span>
            </button>
          </div>

          {/* Bottom row - Corners */}
          <div className="flex gap-32 md:gap-36 lg:gap-40">
            <button
              onClick={() => handleZoneSelect("Left Corner")}
              disabled={isZoneComplete("Left Corner")}
              className={`px-6 md:px-8 py-2 rounded-lg font-bold text-sm md:text-base transition -ml-8 md:-ml-10 ${getZoneButtonStyle(
                "Left Corner"
              )}`}
            >
              Left Corner
              <br />
              <span className="text-xs md:text-sm">
                {zoneData["Left Corner"].made}/{zoneData["Left Corner"].shots}
              </span>
            </button>
            <button
              onClick={() => handleZoneSelect("Right Corner")}
              disabled={isZoneComplete("Right Corner")}
              className={`px-6 md:px-8 py-2 rounded-lg font-bold text-sm md:text-base transition -mr-10 md:-mr-12 ${getZoneButtonStyle(
                "Right Corner"
              )}`}
            >
              Right Corner
              <br />
              <span className="text-xs md:text-sm">
                {zoneData["Right Corner"].made}/{zoneData["Right Corner"].shots}
              </span>
            </button>
          </div>
        </div>

        {/* Right Side - Stats and Controls */}
        <div className="flex flex-col gap-6 items-center flex-1 min-w-0">
          {/* Overall Stats */}
          <div className="flex flex-col md:flex-row gap-4">
            <StatDisplay label="Shots" value={totalShots} />
            <StatDisplay label="Made" value={totalMade} />
            <StatDisplay label="PCT %" value={`${percentage}%`} />
          </div>

          {/* Active Zone Display */}
          {activeZone && (
            <div className="border-2 border-[#6F263D] rounded-lg p-3 bg-white w-full max-w-sm">
              <p className="text-base md:text-lg font-semibold font-cavsBody text-[#121212] mb-1">
                Active Zone: {activeZone}
              </p>
              <p className="text-sm md:text-md font-semibold font-cavsBody text-gray-600">
                Progress: {zoneData[activeZone].made}/
                {zoneData[activeZone].shots} (
                {zoneData[activeZone].shots === 0
                  ? 0
                  : Math.round(
                      (zoneData[activeZone].made / zoneData[activeZone].shots) *
                        100
                    )}
                %)
              </p>
            </div>
          )}

          {/* Made/Miss Buttons or Complete */}
          {!allZonesComplete ? (
            activeZone ? (
              <div className="flex gap-4">
                <Button onClick={handleMade} variant="success" size="large">
                  Made
                </Button>
                <Button onClick={handleMiss} variant="danger" size="large">
                  Miss
                </Button>
              </div>
            ) : (
              <p className="text-gray-500 italic text-center text-sm md:text-base">
                Select a zone to begin
              </p>
            )
          ) : (
            <Button onClick={handleSave}>Save Results</Button>
          )}
        </div>
      </div>
    </div>
  );
}
