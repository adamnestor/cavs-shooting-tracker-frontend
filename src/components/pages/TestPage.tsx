import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../common/Button";
import { StatDisplay } from "../common/StatDisplay";
import type { Player } from "../../types/Player";

export function TestPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const player = location.state?.player as Player;

  const [AttemptedCount, SetAttemptCount] = useState(0);
  const [MadeCount, SetMadeCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(new Date().toISOString());

  // Redirect if no player selected
  if (!player) {
    navigate("/");
    return null;
  }

  function handleMade() {
    const newCount = AttemptedCount + 1;
    SetAttemptCount(newCount);
    SetMadeCount((prev) => prev + 1);

    if (newCount === 100) {
      setIsComplete(true);
    }
  }

  function handleMiss() {
    const newCount = AttemptedCount + 1;
    SetAttemptCount(newCount);

    if (newCount === 100) {
      setIsComplete(true);
    }
  }

  const percentage =
    AttemptedCount === 0 ? 0 : Math.round((MadeCount / AttemptedCount) * 100);

  const handleSave = async () => {
    await fetch("http://localhost:3000/api/tests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startTime,
        shots: AttemptedCount,
        made: MadeCount,
        playerId: player.id,
      }),
    });
    navigate(`/results`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-[#860038] text-3xl font-bold">
        Three-Point Shooting Test
      </h1>
      <h3 className="text-[#041e42] text-xl font semibold">
        Testing: {player.firstName} {player.lastName} #{player.jerseyNumber}
      </h3>
      <div className="flex gap-4">
        <StatDisplay label="Shots" value={AttemptedCount} />
        <StatDisplay label="Made" value={MadeCount} />
        <StatDisplay label="PCT %" value={`${percentage}%`} />
      </div>
      {!isComplete ? (
        <div className="flex gap-4">
          <Button onClick={handleMade} variant="success">
            Made
          </Button>
          <Button onClick={handleMiss} variant="danger">
            Miss
          </Button>
        </div>
      ) : (
        <Button onClick={handleSave}>Save Results</Button>
      )}
    </div>
  );
}
