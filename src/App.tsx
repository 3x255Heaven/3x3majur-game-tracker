import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { GameDisplay } from "./components/GameDisplay";
import { GameManage } from "./components/GameManage";
import { GameShootClock } from "./components/GameShootClock";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/game-overview" element={<GameDisplay />} />
        <Route path="/game-manage" element={<GameManage />} />
        <Route path="/game-shoot-clock" element={<GameShootClock />} />
      </Routes>
    </Router>
  );
}

export default App;
