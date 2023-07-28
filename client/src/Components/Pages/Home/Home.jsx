import "./Home.css";
import logo from "../../../assets/espchlogo.png";

function Home() {
  return (
    <div>
      <div>
        <img src={logo} className="logo" alt="logo" />
      </div>
      <div className="bio-container">
        <p className="bio">
          Level up your esports tournaments with ESPCharts! Manage, track, and
          elevate your gaming events like a pro. Streamline organization, gain
          insights, and lead the competition. Join now!
        </p>
      </div>
    </div>
  );
}

export default Home;
