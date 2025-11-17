import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../common/Button";
import { PlayerRow } from "../common/PlayerRow";
import { AddPlayerModal } from "../common/AddPlayerModal";
import { EditPlayerModal } from "../common/EditPlayerModal";
import type { Player } from "../../types/Player";

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
      ? "http://localhost:3000/api/players?includeArchived=true"
      : "http://localhost:3000/api/players";

    fetch(url)
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, [showArchived]);

  // Add Player
  const handleAddPlayer = async (playerData: Omit<Player, "id" | "active">) => {
    const response = await fetch("http://localhost:3000/api/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(playerData),
    });
    const newPlayer = await response.json();
    setPlayers([...players, newPlayer]);
  };

  // Update player
  const handleUpdatePlayer = async (updatedPlayer: Player) => {
    await fetch(`http://localhost:3000/api/players/${updatedPlayer.id}`, {
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
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-[#860038] text-3xl font-bold">
        Cavs Shooting Tracker
      </h1>
      <h3 className="text-[#041e42] text-xl font-bold">
        Three-Point Shooting Test
      </h3>

      {/* Test Type Selection */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="standard"
            checked={testType === "standard"}
            onChange={(e) => setTestType(e.target.value as "standard")}
            className="w-4 h-4"
          />
          <span className="font-semibold">Standard Test (100 shots)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="zone"
            checked={testType === "zone"}
            onChange={(e) => setTestType(e.target.value as "zone")}
            className="w-4 h-4"
          />
          <span className="font-semibold">Zone Test (5 zones × 20 shots)</span>
        </label>
      </div>

      {/* Player Section Section */}
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Select a Player:</h2>
          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showArchived}
                onChange={(e) => setShowAchived(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Show Archived</span>
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
