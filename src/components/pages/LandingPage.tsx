import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../common/Button";
import { PlayerRow } from "../common/PlayerRow";
import { AddPlayerModal } from "../common/modals/AddPlayerModal";
import { EditPlayerModal } from "../common/modals/EditPlayerModal";
import type { Player } from "../../types/Player";
import type { SavedTest } from "../../types/SavedTest";
import API_URL from "../../config/api";

export function LandingPage() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [testType, setTestType] = useState<"standard" | "zone">("standard");
  const [showArchived, setShowAchived] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);

  // Fetch players
  useEffect(() => {
    const url = showArchived
      ? `${API_URL}/api/players?includeArchived=true`
      : `${API_URL}/api/players`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, [showArchived]);

  // Check for saved test on mount
  useEffect(() => {
    const saved = localStorage.getItem("activeTest");
    if (!saved) return;

    const parsedTest: SavedTest = JSON.parse(saved);

    // Check if stale
    const savedTime = new Date(parsedTest.timestamp);
    const hoursDiff =
      (new Date().getTime() - savedTime.getTime()) / (1000 * 60 * 60);

    if (hoursDiff > 24) {
      localStorage.removeItem("activeTest");
      return;
    }

    const shouldResume = window.confirm(
      `Resume previous test for ${parsedTest.player.firstName} ${
        parsedTest.player.lastName
      }? Progress: ${parsedTest.madeCount || 0}/${
        parsedTest.attemptedCount || 0
      } shots`
    );

    if (shouldResume) {
      const route = parsedTest.testType === "zone" ? "/test/zone" : "/test";
      navigate(route, { state: { player: parsedTest.player } });
    } else {
      localStorage.removeItem("activeTest");
    }
  }, [navigate]);

  // Add Player
  const handleAddPlayer = async (playerData: Omit<Player, "id" | "active">) => {
    const response = await fetch(`${API_URL}/api/players`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(playerData),
    });
    const newPlayer = await response.json();
    setPlayers([...players, newPlayer]);
  };

  // Update player
  const handleUpdatePlayer = async (updatedPlayer: Player) => {
    await fetch(`${API_URL}/api/players/${updatedPlayer.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPlayer),
    });
    setPlayers(
      players.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p))
    );
  };

  // Edit player
  const handleEditClick = (player: Player) => {
    setEditingPlayer(player);
    setShowEditModal(true);
  };

  // Start test
  const handleStartTest = () => {
    const selectedPlayer = players.find((p) => p.id === selectedPlayerId);
    if (selectedPlayer) {
      const path = testType === "zone" ? "/test/zone" : "/test";
      navigate(path, { state: { player: selectedPlayer, testType } });
    }
  };

  const displayedPlayers = showArchived
    ? players
    : players.filter((p) => p.active);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 md:px-8">
      <h1 className="text-[#6F263D] text-3xl md:text-4xl lg:text-5xl font-cavsHeader font-bold drop-shadow-md mt-6 text-center">
        CAVS SHOOTING TRACKER
      </h1>
      <h3 className="text-[#121212] text-xl md:text-2xl lg:text-3xl font-cavsHeader font-bold drop-shadow-md text-center mb-8">
        THREE-POINT SHOOTING TEST
      </h3>

      {/* Test Type Selection */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 bg-white/80 backdrop-blur-sm px-4 md:px-6 py-4 rounded-xl shadow-md w-full max-w-2xl justify-center">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="standard"
            checked={testType === "standard"}
            onChange={(e) => setTestType(e.target.value as "standard")}
            className="w-5 h-5 md:w-4 md:h-4"
          />
          <span className="font-semibold text-[#121212] text-sm md:text-base">
            Standard Test (100 shots)
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="zone"
            checked={testType === "zone"}
            onChange={(e) => setTestType(e.target.value as "zone")}
            className="w-5 h-5 md:w-4 md:h-4"
          />
          <span className="font-semibold text-[#121212] text-sm md:text-base">
            Zone Test (5 zones × 20 shots)
          </span>
        </label>
      </div>

      {/* Player Section */}
      <div className="w-full max-w-2xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
          <h2 className="text-xl md:text-2xl font-bold text-[#6F263D]">
            Select a Player:
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center w-full md:w-auto">
            <label className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
              <input
                type="checkbox"
                checked={showArchived}
                onChange={(e) => setShowAchived(e.target.checked)}
                className="w-5 h-5 md:w-4 md:h-4"
              />
              <span className="text-sm font-medium">Show Archived</span>
            </label>
            <Button onClick={() => setShowAddModal(true)} variant="secondary">
              + Add Player
            </Button>
          </div>
        </div>

        {/* Player List */}
        <div className="space-y-2 mb-6">
          {displayedPlayers.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No players yet. Add a player to get started!
            </p>
          ) : (
            displayedPlayers.map((player) => (
              <PlayerRow
                key={player.id}
                player={player}
                isSelected={selectedPlayerId === player.id}
                onSelect={() => setSelectedPlayerId(player.id)}
                onEdit={() => handleEditClick(player)}
              />
            ))
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Button
            onClick={handleStartTest}
            variant={selectedPlayerId ? "primary" : "inactive"}
          >
            Start Test
          </Button>
          <Button onClick={() => navigate("/results")} variant="secondary">
            View Past Results
          </Button>
        </div>

        {/* Modals */}
        <AddPlayerModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddPlayer}
        />
        <EditPlayerModal
          key={editingPlayer?.id}
          isOpen={showEditModal}
          player={editingPlayer}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdatePlayer}
        />
      </div>
    </div>
  );
}
