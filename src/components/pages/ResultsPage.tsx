import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Test } from "../../types/Test";
import { Button } from "../common/Button";
import { TestResultRow } from "../common/TestResultRow";

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
      <div className="text-center">
        <h1 className="text-[#860038] text-3xl font-bold mt-6 mb-6">
          Past Test Results
        </h1>
      </div>
      <div className="max-w-6xl mx-auto px-8 space-y-4">
        {tests.map((test) => (
          <TestResultRow key={test.id} test={test} />
        ))}
      </div>
      <div className="text-center mt-6 mb-6">
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </div>
    </div>
  );
}
