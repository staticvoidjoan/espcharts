import NavBar from "./layout/navbar/NavBar";
import "./App.css";
import { Route, Routes } from "react-router-dom";


//Pages
import Home from "./pages/home/Home"

//Player Components
import Players from "./components/players/Players";
import ViewPlayer from "./components/players/ViewPlayer";


function App() {
  return (
    <div className="App">
      <NavBar/>
      <main>
        
         <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/players" element={<Players/>}/>
            <Route path="/player/view/:id" element={<ViewPlayer/>}/>
          </Routes>
      </main>
    </div>
  );
}

export default App;
