interface StatDisplayProps {
  label: string;
  value: number | string;
}

export function StatDisplay({ label, value }: StatDisplayProps) {
  return (
    <div className="border border-[#041e42] rounded-lg p-6 text-center shadow-md">
      <p className="text-sm text-gray-600 uppercase">{label}</p>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
}
