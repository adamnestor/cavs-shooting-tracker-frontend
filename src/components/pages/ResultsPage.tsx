import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Test } from "../../types/Test";
import type { Player } from "../../types/Player";
import { Button } from "../common/Button";
import { TestResultRow } from "../common/TestResultRow";
import API_URL from "../../config/api";

export function ResultsPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tests
    fetch(`${API_URL}/api/tests`)
      .then((res) => res.json())
      .then((data) => setTests(data));

    // Fetch players for filter dropdown
    fetch(`${API_URL}/api/players`)
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  const filteredTests = selectedPlayerId
    ? tests.filter((test) => test.player.id === selectedPlayerId)
    : tests;

  const getLastThreeTests = (
    currentTestId: number,
    playerId: number
  ): Test[] => {
    const currentTestIndex = tests.findIndex(
      (test) => test.id === currentTestId
    );

    return tests
      .filter((test) => test.player.id === playerId)
      .slice(currentTestIndex + 1, currentTestIndex + 4);
  };

  return (
    <div className="px-4">
      <div className="text-center">
        <h1 className="text-[#6F263D] text-2xl md:text-3xl lg:text-4xl font-bold pt-6 mb-8">
          Past Test Results
        </h1>
      </div>

      {/* Player Filter */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-6">
        <label className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <span className="font-semibold bg-white px-4 py-2 rounded shadow whitespace-nowrap">
            Filter by Player:
          </span>
          <select
            value={selectedPlayerId || ""}
            onChange={(e) =>
              setSelectedPlayerId(
                e.target.value ? parseInt(e.target.value) : null
              )
            }
            className="border rounded px-3 py-2 w-full sm:w-auto"
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

      {/* Results Table */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 overflow-x-auto">
        {filteredTests.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No test results found.
          </p>
        ) : (
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-100">
                <th
                  className="px-2 md:px-4 py-3 text-left border-b font-semibold text-sm md:text-base"
                  title="Player name and test date. Click zone tests to see breakdown"
                >
                  Player
                </th>
                <th
                  className="px-2 md:px-4 py-3 text-center border-b font-semibold text-sm md:text-base"
                  title="Shots made out of total attempts"
                >
                  Made/Shots
                </th>
                <th
                  className="px-2 md:px-4 py-3 text-center border-b font-semibold text-sm md:text-base"
                  title="Comparison to last 3 tests (±5% threshold)"
                >
                  Trend
                </th>
                <th
                  className="px-2 md:px-4 py-3 text-center border-b font-semibold text-sm md:text-base"
                  title="Time to complete test (MM:SS)"
                >
                  Duration
                </th>
                <th
                  className="px-2 md:px-4 py-3 text-center border-b font-semibold text-sm md:text-base"
                  title="Shots per minute"
                >
                  Pace
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTests.map((test) => (
                <TestResultRow
                  key={test.id}
                  test={test}
                  lastThreeTests={getLastThreeTests(test.id, test.player.id)}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="text-center pt-6 pb-6">
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </div>
    </div>
  );
}
