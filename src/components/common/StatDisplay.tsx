interface StatDisplayProps {
  label: string;
  value: number | string;
}

export function StatDisplay({ label, value }: StatDisplayProps) {
  return (
    <div className="border-2 border-[#041e42] rounded-lg p-4 bg-white text-center shadow-md">
      <p className="text-xl text-#041e42 font-cavsBody font-semibold uppercase">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}
