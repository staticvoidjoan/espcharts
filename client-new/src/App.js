import "./App.css";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import PacmanLoader from "react-spinners/PacmanLoader";

// Layout
import NavBar from "./layout/navbar/NavBar";
import Footer from "./layout/footer/Footer";

// Pages
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";


// Player Components
import Players from "./components/players/Players";
import ViewPlayer from "./components/players/ViewPlayer";
import AddPlayer from "./components/players/AddPlayer";
import EditPlayer from "./components/players/EditPlayer";



//Team Components
import Teams from "./components/teams/Teams";
import ViewTeam from "./components/teams/ViewTeam";
import AddTeam from "./components/teams/AddTeam";



function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // Get the current location

  useEffect(() => {
    setLoading(true);
  
    // Check if the location's pathname is in the loadingPaths array
    const isMainRoute = loadingPaths.some(path => location.pathname.includes(path));
  
    if (isMainRoute) {
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 1200);
  
      return () => {
        clearTimeout(timeout);
      };
    } else {
      setLoading(false); // Don't show spinner for non-main routes
    }
  }, [location]);
  // Define paths where you want to show the loading spinner
  const loadingPaths = ['/players', '/player/view', '/players/add'];

  return (
    <div className="App">
      <NavBar />
      {(loading && loadingPaths.includes(location.pathname)) ? (
        <div className="spinner-container">
          <PacmanLoader color={'#ca28ba'} loading={loading} size={35} />
        </div>
      ) : (
        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Players  */}
            <Route path="/players" element={<Players />} />
            <Route path="/players/add" element={<AddPlayer />} />
            <Route path="/player/view/:id" element={<ViewPlayer />} />
            <Route path="/player/edit/:id" element={<EditPlayer/>}/>

            {/* Team */}
            <Route path="/teams" element={<Teams />}/>
            <Route path="/team/view/:id" element={<ViewTeam/>}/>
            <Route path="/teams/add" element={<AddTeam/>}/>


            {/* Pages */}
            <Route path="/contact" element={<Contact />} />

            <Route path="*" element={<Navigate to ="/" replace/>}/>
          </Routes>
        </main>
      )}
      <Footer />
    </div>
  );
}

export default App;
