import "./App.css";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import Amplify from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
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
import EditTeam from "./components/teams/EditTeam";

// Tournament Components
import Tournament from "./components/Tournament/Tournament";
import ViewTournament from "./components/Tournament/ViewTournament";
import AddTournament from "./components/Tournament/AddTournament";

//ADMIN TOOLS
import Newsletter from "./components/newsletter/Newsletter";

import Warning from "./pages/Warning/Warning";

import ScrollToTop from "./components/ScrollToTop";
import UserDash from "./pages/SignUp/UserDash";
import NotFound from "./pages/Warning/NotFound";

import { Auth } from "aws-amplify";
function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // Get the current location
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setLoading(true);
    checkAuthenticated();
    // Check if the location's pathname is in the loadingPaths array
    const isMainRoute = loadingPaths.some((path) =>
      location.pathname.includes(path)
    );

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

  const checkAuthenticated = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      setAuthenticated(false);
    }
  };

  // Define paths where you want to show the loading spinner
  const loadingPaths = ["/players", "/teams", "/tournaments"];
  const isHomePage = location.pathname === "/";
  return (
    <div className="App">
      {/* <NavBar /> */}
      {!isHomePage && <NavBar />}
      {loading && loadingPaths.includes(location.pathname) ? (
        <div className="spinner-container">
          <PacmanLoader color={"#20a4fc"} loading={loading} size={35} />
        </div>
      ) : (
        <main>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Home />} />

              {/* Players  */}
              <Route path={"/players"} element={authenticated ? <Players /> : <NotFound/>} />
              <Route path="/players/add" element={authenticated? <AddPlayer />:  <NotFound/> } />
              <Route path="/player/view/:id" element={authenticated ? <ViewPlayer /> : <NotFound/>} />
              <Route path="/player/edit/:id" element={authenticated ? <EditPlayer /> : <NotFound/>} />

              {/* Team */}
              <Route path="/teams" element={authenticated ? <Teams /> : <NotFound/>} />
              <Route path="/team/view/:id" element={authenticated ? <ViewTeam /> : <NotFound/>} />
              <Route path="/teams/add" element={authenticated ? <AddTeam /> : <NotFound/>} />
              <Route path="/team/edit/:id" element={authenticated ? <EditTeam /> : <NotFound/>} />

              {/*Tournament*/}
              <Route path="/tournaments" element={authenticated ? <Tournament /> : <NotFound/>} />
              <Route path="/tournament/view/:id" element={authenticated ? <ViewTournament /> : <NotFound/>} />
              <Route path="/tournament/add" element={authenticated ? <AddTournament /> : <NotFound/>} />

              {/* Pages */}
              <Route path="/contact" element={<Contact />} />

              {/*Admin */}
              {/* <Route path="/newsletter-control" element={<Newsletter />} /> */}
              <Route path="/signup" element={<UserDash />} />
              <Route path="/nologinerror" element={<Warning />} />
              <Route path="/error-not-found" element={<NotFound />} />
              <Route
                path="*"
                element={<Navigate to="/error-not-found" replace />}
              />
            </Routes>
          </ScrollToTop>
        </main>
      )}

      <Footer />
    </div>
  );
}

export default App;
