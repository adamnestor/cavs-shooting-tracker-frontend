interface StatDisplayProps {
  label: string;
  value: number | string;
}

export function StatDisplay({ label, value }: StatDisplayProps) {
  return (
    <div className="border border-[#041e42] rounded-lg p-4 text-center shadow-md">
      <p className="text-xl text-gray-600 uppercase">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}
