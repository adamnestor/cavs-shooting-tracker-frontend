import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../common/Button";
import { StatDisplay } from "../common/StatDisplay";
import type { Player } from "../../types/Player";
import API_URL from "../../config/api";

export function TestPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const player = location.state?.player as Player;
  const MIN_SWIPE_DISTANCE = 50;

  const [AttemptedCount, SetAttemptCount] = useState(0);
  const [MadeCount, SetMadeCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(new Date().toISOString());
  const [endTime, setEndTime] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);

  // Redirect if no player selected
  if (!player) {
    navigate("/");
    return null;
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
    setIsSwiping(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    setTouchEnd(e.targetTouches[0].clientY);
    setIsSwiping(true);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > MIN_SWIPE_DISTANCE;
    const isDownSwipe = distance < -MIN_SWIPE_DISTANCE;

    if (isDownSwipe) {
      handleMade();
    } else if (isUpSwipe) {
      handleMiss();
    }

    setTimeout(() => setIsSwiping(false), 100);
  };

  function handleMade() {
    const newCount = AttemptedCount + 1;
    SetAttemptCount(newCount);
    SetMadeCount((prev) => prev + 1);

    if (newCount === 100) {
      setIsComplete(true);
      setEndTime(new Date().toISOString());
    }
  }

  function handleMiss() {
    const newCount = AttemptedCount + 1;
    SetAttemptCount(newCount);

    if (newCount === 100) {
      setIsComplete(true);
      setEndTime(new Date().toISOString());
    }
  }

  const handleMadeClick = () => {
    if (isSwiping) return;
    handleMade();
  };

  const handleMissClick = () => {
    if (isSwiping) return;
    handleMiss();
  };

  const percentage =
    AttemptedCount === 0 ? 0 : Math.round((MadeCount / AttemptedCount) * 100);

  const handleSave = async () => {
    await fetch(`${API_URL}/api/tests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startTime,
        endTime,
        shots: AttemptedCount,
        made: MadeCount,
        playerId: player.id,
      }),
    });
    navigate(`/results`);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen gap-6 px-4"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <h1 className="text-[#6F263D] text-2xl md:text-3xl lg:text-4xl font-cavsHeader font-bold drop-shadow-md text-center">
        THREE-POINT SHOOTING TEST
      </h1>
      <h3 className="text-[#121212] text-xl md:text-2xl lg:text-3xl font-cavsHeader font-semibold drop-shadow-sm text-center mb-8">
        Testing: {player.firstName} {player.lastName} #{player.jerseyNumber}
      </h3>
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <StatDisplay label="Shots" value={AttemptedCount} />
        <StatDisplay label="Made" value={MadeCount} />
        <StatDisplay label="PCT %" value={`${percentage}%`} />
      </div>
      {!isComplete ? (
        <div className="flex flex-col sm:flex-row gap-4 px-4 mx-auto">
          <Button onClick={handleMadeClick} variant="success" size="large">
            Made
          </Button>
          <Button onClick={handleMissClick} variant="danger" size="large">
            Miss
          </Button>
        </div>
      ) : (
        <Button onClick={handleSave}>Save Results</Button>
      )}
    </div>
  );
}
