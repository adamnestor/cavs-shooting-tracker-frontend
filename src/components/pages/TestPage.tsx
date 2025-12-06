import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../common/Button";
import { StatDisplay } from "../common/StatDisplay";
import type { Player } from "../../types/Player";
import type { SavedTest } from "../../types/SavedTest";
import API_URL from "../../config/api";

export function TestPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const MIN_SWIPE_DISTANCE = 50;

  const [AttemptedCount, SetAttemptCount] = useState(0);
  const [MadeCount, SetMadeCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(new Date().toISOString());
  const [endTime, setEndTime] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [player, setPlayer] = useState<Player | null>(
    location.state?.player || null
  );

  useEffect(() => {
    const saved = localStorage.getItem("activeTest");

    if (saved) {
      const parsedTest: SavedTest = JSON.parse(saved);

      // Check if stale
      const savedTime = new Date(parsedTest.timestamp);
      const hoursDiff =
        (new Date().getTime() - savedTime.getTime()) / (1000 * 60 * 60);

      if (hoursDiff > 24) {
        localStorage.removeItem("activeTest");
      } else if (parsedTest.testType === "standard") {
        const shouldResume = window.confirm(
          `Resume previous test for ${parsedTest.player.firstName} ${parsedTest.player.lastName}? Progress: ${parsedTest.madeCount}/${parsedTest.attemptedCount} shots`
        );

        if (shouldResume) {
          setPlayer(parsedTest.player);
          SetAttemptCount(parsedTest.attemptedCount!);
          SetMadeCount(parsedTest.madeCount!);
          return;
        } else {
          localStorage.removeItem("activeTest");
        }
      }
    }

    // Only redirect if no saved test was resumed AND no player from route
    if (!location.state?.player) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveToLocalStorage = (attempted: number, made: number) => {
    if (!player) return;

    const SavedTest: SavedTest = {
      testType: "standard",
      player,
      startTime,
      timestamp: new Date().toISOString(),
      attemptedCount: attempted,
      madeCount: made,
    };
    localStorage.setItem("activeTest", JSON.stringify(SavedTest));
  };

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

    saveToLocalStorage(newCount, MadeCount + 1);

    if (newCount === 100) {
      setIsComplete(true);
      setEndTime(new Date().toISOString());
    }
  }

  function handleMiss() {
    const newCount = AttemptedCount + 1;
    SetAttemptCount(newCount);

    saveToLocalStorage(newCount, MadeCount);

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
    if (!player) return;

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

  if (!player) {
    return null;
  }

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
