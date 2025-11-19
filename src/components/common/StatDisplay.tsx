interface StatDisplayProps {
  label: string;
  value: number | string;
}

export function StatDisplay({ label, value }: StatDisplayProps) {
  return (
    <div className="border-2 border-[#121212] rounded-lg p-3 md:p-4 bg-white text-center shadow-md min-w-[100px]">
      <p className="text-sm md:text-xl text-#121212 font-cavsBody font-semibold uppercase">
        {label}
      </p>
      <p className="text-2xl md:text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}
