import { useState } from "react";
import { Button } from "../common/Button";

export function TestPage() {
  const [AttemptedCount, SetAttemptCount] = useState(0);
  const [MadeCount, SetMadeCount] = useState(0);

  function handleMade() {
    SetAttemptCount((prev) => prev + 1);
    SetMadeCount((prev) => prev + 1);
  }

  function handleMiss() {
    SetAttemptCount((prev) => prev + 1);
  }

  return (
    <div>
      <p>Shots Attempted: {AttemptedCount}</p>
      <p>Shots Made: {MadeCount}</p>
      <p>
        Percentage:{" "}
        {AttemptedCount === 0
          ? 0
          : Math.round((MadeCount / AttemptedCount) * 100)}
        %
      </p>
      <Button onClick={handleMade} variant="success">
        Made
      </Button>
      <Button onClick={handleMiss} variant="danger">
        Miss
      </Button>
    </div>
  );
}
