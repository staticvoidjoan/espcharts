import React, {useState, useEffect} from "react";
import background from "../../assets/homebg.png";
import logoesp from "../../assets/logo.png";
import "./Home.css"; // Import the CSS file for styling
import videobackground from "../../assets/wallpaper.mp4";
import Navbar from "../../layout/navbar/NavBar";
import {Link} from "react-router-dom"
import {Auth} from "aws-amplify"
function Home() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect( ()=> {
    checkAuthenticated();
  }, []);

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

  return (
    <>
    <div className="home">
    <Navbar />
    <div className="home-container">

      <div>
        <img src={logoesp} className="logo" alt="logo" />
      </div>
      <div className="bio-container">
        <p className="bio">
          Level up your esports tournaments with ESPCharts! Manage, track, and
          elevate your gaming events like a pro. Streamline organization, gain
          insights, and lead the competition. Join now!
        </p>
      </div>
      {/* <img src={background} alt="background" className="background-image" /> */}
        {!authenticated  ? (
        <div className="join-button">
          <Link to="/signup" style={{color:"#fff", textDecoration:"none"}} >Join Now</Link>
        </div>

        ) : null}
      <video src={videobackground} autoPlay loop muted playsInline  className="background-image" ></video>
    </div>
    </div>
    </>
  );
}

export default Home;
