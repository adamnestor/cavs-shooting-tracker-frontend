import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../common/Button";
import { PlayerRow } from "../common/PlayerRow";
import { AddPlayerModal } from "../common/AddPlayerModal";
import { EditPlayerModal } from "../common/EditPlayerModal";
import type { Player } from "../../types/Player";
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
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-[#860038] text-5xl font-cavsHeader font-bold drop-shadow-md mt-6">
        CAVS SHOOTING TRACKER
      </h1>
      <h3 className="text-[#041e42] text-3xl font-cavsHeader font-bold drop-shadow-md">
        THREE-POINT SHOOTING TEST
      </h3>

      {/* Test Type Selection */}
      <div className="flex gap-6 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-xl shadow-md">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="standard"
            checked={testType === "standard"}
            onChange={(e) => setTestType(e.target.value as "standard")}
            className="w-4 h-4"
          />
          <span className="font-semibold text-[#041e42]">
            Standard Test (100 shots)
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="zone"
            checked={testType === "zone"}
            onChange={(e) => setTestType(e.target.value as "zone")}
            className="w-4 h-4"
          />
          <span className="font-semibold text-[#041e42]">
            Zone Test (5 zones × 20 shots)
          </span>
        </label>
      </div>

      {/* Player Section Section */}
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#860038]">
            Select a Player:
          </h2>
          <div className="flex gap-3 items-center">
            <label className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
              <input
                type="checkbox"
                checked={showArchived}
                onChange={(e) => setShowAchived(e.target.checked)}
                className="w-4 h-4"
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
        <div className="flex gap-4">
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
