import type { Test } from "../../types/Test";

interface TestResultRowProps {
  test: Test;
}

export function TestResultRow({ test }: TestResultRowProps) {
  return (
    <div className="border rounded-lg p-4 flex justify-between items-center shadow-md hover:shadow-xl hover:border=[#fdbb30] transition-all duration-200 cursor-pointer">
      <div>
        <p className=" text-xl font-semibold text-[#6d002d]">
          {test.player.firstName} {test.player.lastName}
        </p>
        <p className="font-semibold text-[#041e42]">
          {new Date(test.startTime).toLocaleDateString()}
        </p>
      </div>
      <p className="text-2xl font-bold text-[#041e42]">{test.made}/100</p>
    </div>
  );
}
