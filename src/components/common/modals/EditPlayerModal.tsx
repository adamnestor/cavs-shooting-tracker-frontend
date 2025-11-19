import { useState } from "react";
import { Button } from "./Button";
import type { Player, Position } from "../../types/Player";

interface EditPlayerModalProps {
  isOpen: boolean;
  player: Player | null;
  onClose: () => void;
  onUpdate: (player: Player) => void;
}

export function EditPlayerModal({
  isOpen,
  player,
  onClose,
  onUpdate,
}: EditPlayerModalProps) {
  const [firstName, setFirstName] = useState(player?.firstName || "");
  const [lastName, setLastName] = useState(player?.lastName || "");
  const [jerseyNumber, setJerseyNumber] = useState(
    player?.jerseyNumber.toString() || ""
  );
  const [position, setPosition] = useState<Position>(
    (player?.position as Position) || "Guard"
  );

  if (!isOpen || !player) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      ...player,
      firstName,
      lastName,
      jerseyNumber: parseInt(jerseyNumber),
      position,
    });
    onClose();
  };

  const handleArchiveToggle = () => {
    onUpdate({
      ...player,
      active: !player.active,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
        <h2 className="text-2xl font-bold text-[#860038] mb-4">Edit Player</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Jersey Number
            </label>
            <input
              type="number"
              value={jerseyNumber}
              onChange={(e) => setJerseyNumber(e.target.value)}
              required
              min="0"
              max="99"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Position</label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value as Position)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Guard">Guard</option>
              <option value="Forward">Forward</option>
              <option value="Center">Center</option>
            </select>
          </div>
          <div className="flex gap-3 mt-6">
            <Button type="submit">Save Changes</Button>
            <Button onClick={onClose} variant="secondary">
              Cancel
            </Button>
          </div>
          <hr className="my-4" />
          <Button onClick={handleArchiveToggle} variant="danger">
            {player.active ? "Archive Player" : "Reactivate Player"}
          </Button>
        </form>
      </div>
    </div>
  );
}
