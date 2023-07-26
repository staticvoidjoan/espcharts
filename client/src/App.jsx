import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import espchartLogo from "./assets/espchlogo.png";
import "./App.css";

//Components
import Player from "./Components/Player/Player";
import EditPlayer from "./Components/Player/EditPlayer";
import AddPlayer from "./Components/Player/AddPlayer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>
        <img src={espchartLogo} className="logo" alt="logo" />
      </div>

      <Routes>
        <Route path="/" element={<Player />} />
        <Route path="/edit/:id" element={<EditPlayer />} />
        <Route path="/add" element={<AddPlayer />} />
      </Routes>
    </div>
  );
}

export default App;
