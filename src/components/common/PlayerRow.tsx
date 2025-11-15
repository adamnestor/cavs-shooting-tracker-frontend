import type { Player } from "../../types/Player";
import { Pencil } from "lucide-react";

interface PlayerRowProps {
  player: Player;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
}

export function PlayerRow({
  player,
  isSelected,
  onSelect,
  onEdit,
}: PlayerRowProps) {
  return (
    <div className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50 transition">
      <input
        type="radio"
        checked={isSelected}
        onChange={onSelect}
        disabled={!player.active}
        className="w-5 h-5 cursor-pointer"
      />
      <div className="flex-1 flex items-center gap-6">
        <span
          className={`font-semibold ${
            !player.active ? "text-gray-400" : "text-[#041e42]"
          }`}
        >
          {player.firstName} {player.lastName}
        </span>
        <span
          className={`${!player.active ? "text-gray-400" : "text-[#860038]"}`}
        >
          {player.jerseyNumber}
        </span>
        <span
          className={`${!player.active ? "text-gray-400" : "text-gray-600"}`}
        >
          {player.position}
        </span>
      </div>
      <button
        onClick={onEdit}
        className="p-2 text-[#041e42] hover:text-[#860038] transition rounded"
      >
        <Pencil size={18} />
      </button>
    </div>
  );
}
