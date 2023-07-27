import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import espchartLogo from "/home/joanshameti/Documents/espcharts/client/src/assets/espchlogo.png";
import "./App.css";

//Page Components
import NavBar from "./Components/Layout/Header/NavBar";


//Pages
import Home from "./Components/Pages/Home/Home"
import Contact from "./Components/Pages/Contact/Contact"

//Functionality Components
import Player from "./Components/Player/Player";
import EditPlayer from "./Components/Player/EditPlayer";
import AddPlayer from "./Components/Player/AddPlayer";
import ViewBox from "./Components/Player/ViewBox";
import Tournament from "./Components/Tournament/Tournament"
import Team from "./Components/Teams/Teams"
import ViewTeamBox from "./Components/Teams/ViewTeamBox";
import AddTeam from "./Components/Teams/AddTeam";

function App() {
  return (
    <div>
      <NavBar />
 <div>
          <img src={espchartLogo} className="logo" alt="logo" />
        </div>
      <main>
        
       
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/tournament" element={<Tournament />}/>
          <Route path="/team" element={<Team />}/>
          <Route path="/team/add" element={<AddTeam />} />
          <Route path="/team/view/:id" element={<ViewTeamBox />} />
          <Route path="/contact" element={<Contact />}/>
          <Route path="/player" element={<Player />}/>
          <Route path="/player/edit/:id" element={<EditPlayer />} />
          <Route path="/player/add" element={<AddPlayer />} />
          <Route path="/player/view/:id" element={<ViewBox />} />
        </Routes>
      </main> 
    </div>
  );
}

export default App;
