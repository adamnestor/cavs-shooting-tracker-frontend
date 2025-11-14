import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h3>Cavs Shooting Tracker</h3>
      <Button onClick={() => navigate("/test")}>Start Test</Button>
      <Button onClick={() => navigate("/results")}>View Past Results</Button>
    </div>
  );
}
