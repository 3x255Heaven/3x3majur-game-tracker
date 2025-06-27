import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { GameDisplay } from "./components/GameDisplay";
import { GameManage } from "./components/GameManage";
import { GameShootClock } from "./components/GameShootClock";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/game-manage" replace />} />
        <Route path="/game-overview" element={<GameDisplay />} />
        <Route path="/game-manage" element={<GameManage />} />
        <Route path="/game-shoot-clock" element={<GameShootClock />} />
      </Routes>
    </Router>
  );
}

export default App;
