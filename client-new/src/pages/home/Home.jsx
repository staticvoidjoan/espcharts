import React from "react";
import background from "../../assets/homebg.png";
import logoesp from "../../assets/logo.png";
import "./Home.css"; // Import the CSS file for styling
import videobackground from "../../assets/wallpaper.mp4";
import Navbar from "../../layout/navbar/NavBar";
function Home() {
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
    </div>
      <video src={videobackground} autoPlay loop muted playsInline  className="background-image" ></video>
    </div>
    </>
  );
}

export default Home;
