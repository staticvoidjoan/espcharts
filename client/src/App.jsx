import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import espchartLogo from "./assets/espchlogo.png";
import "./App.css";

//Components
import Player from "./Components/Player/Player";
import EditPlayer from "./Components/Player/EditPlayer";

function App() {
  const [count, setCount] = useState(0);

  return (
      // <div>
      //   <img src={espchartLogo} className="logo" alt="logo" />
      // </div>
      
      <Routes>
        <Route path="/" element={<Player />} />
        <Route path="/edit/:id" element={<EditPlayer />} />
      </Routes>
   
  );
}

export default App;
