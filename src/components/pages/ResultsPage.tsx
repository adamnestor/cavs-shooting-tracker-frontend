import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Test } from "../../types/Test";
import type { Player } from "../../types/Player";
import { Button } from "../common/Button";
import { TestResultRow } from "../common/TestResultRow";

export function ResultsPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tests
    fetch("http://localhost:3000/api/tests")
      .then((res) => res.json())
      .then((data) => setTests(data));

    // Fetch players for filter dropdown
    fetch("http://localhost:3000/api/players")
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  const filteredTests = selectedPlayerId
    ? tests.filter((test) => test.player.id === selectedPlayerId)
    : tests;

  return (
    <div>
      <div className="text-center">
        <h1 className="text-[#860038] text-3xl font-bold mt-6 mb-6">
          Past Test Results
        </h1>
      </div>

      {/* Player Filter */}
      <div className="max-w-6xl mx-auto px-8 mb-4">
        <label className="flex items-center gap-3">
          <span className="font-semibold">Filter by Player:</span>
          <select
            value={selectedPlayerId || ""}
            onChange={(e) =>
              setSelectedPlayerId(
                e.target.value ? parseInt(e.target.value) : null
              )
            }
            className="border rounded px-3 py-2"
          >
            <option value="">All Players</option>
            {players.map((player) => (
              <option key={player.id} value={player.id}>
                {player.firstName} {player.lastName}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Results List */}
      <div className="max-w-6xl mx-auto px-8 space-y-4">
        {filteredTests.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No test results found.
          </p>
        ) : (
          filteredTests.map((test) => (
            <TestResultRow key={test.id} test={test} />
          ))
        )}
      </div>

      <div className="text-center mt-6 mb-6">
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </div>
    </div>
  );
}
