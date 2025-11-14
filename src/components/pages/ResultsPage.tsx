import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Test } from "../../types/Test";
import { Button } from "../common/Button";

export function ResultsPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/tests")
      .then((res) => res.json())
      .then((data) => setTests(data));
  }, []);

  return (
    <div>
      <h2>Past Test Results</h2>

      {tests.length === 0 ? (
        <p>No tests yet</p>
      ) : (
        tests.map((test) => (
          <div key={test.id}>
            <p>Date: {new Date(test.startTime).toLocaleDateString()}</p>
            <p>Time: {new Date(test.startTime).toLocaleTimeString()}</p>
            <p>Result: {test.made}/100</p>
          </div>
        ))
      )}

      <Button onClick={() => navigate("/")}>Back to Home</Button>
    </div>
  );
}
