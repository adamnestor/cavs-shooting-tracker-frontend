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
    <div
      onClick={onSelect}
      className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition cursor-pointer"
    >
      <input
        type="radio"
        checked={isSelected}
        onChange={() => {}}
        disabled={!player.active}
        className="w-5 h-5 pointer-events-none"
      />
      <div className="flex-1 flex items-center gap-6">
        <span
          className={`font-bold text-lg ${
            !player.active ? "text-gray-400" : "text-[#041e42]"
          }`}
        >
          {player.firstName} {player.lastName}
        </span>
        <span
          className={`font-bold text lg ${
            !player.active ? "text-gray-400" : "text-[#860038]"
          }`}
        >
          {player.jerseyNumber}
        </span>
        <span
          className={`font-semibold text-lg ${
            !player.active ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {player.position}
        </span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="p-2 text-[#041e42] hover:text-[#860038] transition rounded"
      >
        <Pencil size={18} />
      </button>
    </div>
  );
}
