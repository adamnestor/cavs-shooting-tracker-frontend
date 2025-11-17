import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/pages/LandingPage";
import { TestPage } from "./components/pages/TestPage";
import { ZoneTestPage } from "./components/pages/ZoneTestPage";
import { ResultsPage } from "./components/pages/ResultsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/test/zone" element={<ZoneTestPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
