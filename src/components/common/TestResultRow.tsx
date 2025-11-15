import type { Test } from "../../types/Test";

interface TestResultRowProps {
  test: Test;
}

export function TestResultRow({ test }: TestResultRowProps) {
  return (
    <div className="border rounded-lg p-4 flex justify-between items-center">
      <div>
        <p>{new Date(test.startTime).toLocaleDateString()}</p>
        <p>{new Date(test.startTime).toLocaleTimeString()}</p>
      </div>
      <p className="text-2xl font-bold">{test.made}/100</p>
    </div>
  );
}
