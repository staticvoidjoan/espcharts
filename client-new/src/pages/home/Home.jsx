import React from "react";
import background from "../../assets/homebg.png";
import logoesp from "../../assets/espchlogo.png";
import "./Home.css"; // Import the CSS file for styling

function Home() {
  return (
    <div className="home">
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
      <img src={background} alt="background" className="background-image" />
    </div>
  );
}

export default Home;
