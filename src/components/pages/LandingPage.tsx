import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-[#860038] text-3xl font-bold">
        Cavs Shooting Tracker
      </h1>
      <h3 className="text-[#041e42] text-xl font-bold">
        Three-Point Shooting Test
      </h3>
      <div className="flex gap-4">
        <Button onClick={() => navigate("/test")}>Start Test</Button>
        <Button onClick={() => navigate("/results")} variant="secondary">
          View Past Results
        </Button>
      </div>
    </div>
  );
}
