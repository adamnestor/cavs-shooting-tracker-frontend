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
      className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition cursor-pointer"
    >
      <input
        type="radio"
        checked={isSelected}
        onChange={() => {}}
        disabled={!player.active}
        className="w-5 h-5 flex-shrink-0 pointer-events-none"
      />
      <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 md:gap-6 min-w-0">
        <span
          className={`font-bold text-base md:text-lg truncate ${
            !player.active ? "text-gray-400" : "text-[#121212]"
          }`}
        >
          {player.firstName} {player.lastName}
        </span>
        <span
          className={`font-bold text-base md:text-lg flex-shrink-0 ${
            !player.active ? "text-gray-400" : "text-[#6F263D]"
          }`}
        >
          {player.jerseyNumber}
        </span>
        <span
          className={`font-semibold text-sm md:text-lg flex-shrink-0 ${
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
        className="p-2 text-[#121212] hover:text-[#6F263D] transition rounded flex-shrink-0"
      >
        <Pencil size={18} />
      </button>
    </div>
  );
}
