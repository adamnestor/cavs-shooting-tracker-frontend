import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button";

export function LandingPage() {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate(`/test`);
  };

  const handleViewPastResults = () => {
    navigate(`/results`);
  };

  return (
    <div>
      <h3>Cavs Shooting Tracker</h3>
      <Button onClick={handleStartTest}>Start Test</Button>
      <Button onClick={handleViewPastResults}>View Past Results</Button>
    </div>
  );
}
