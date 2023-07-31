import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddMatch = () => {
  let navigate = useNavigate();
  const [match, setMatch] = useState({
    tournament: "",
    team1: "",
    team2: "",
    startDate: "",
    playedMaps: [],
    matchMVPs: [],
    winningTeam: "",
  });

  const {
    tournament,
    team1,
    team2,
    startDate,
    playedMaps,
    matchMVPs,
    winningTeam,
  } = match;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "playedMaps" || name === "matchMVPs") {
      // Split the comma-separated values into an array
      const arrayValues = value.split(",").map((item) => item.trim());
      setMatch({
        ...match,
        [name]: arrayValues,
      });
    } else {
      setMatch({
        ...match,
        [name]: value,
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting the form");
    try {
      console.log("Creating new match");
      await axios.post("http://localhost:5000/espcharts/match", match);
      Swal.fire({
        icon: "success",
        title: "Match created successfully",
      });
      navigate("/match");
    } catch (error) {
      console.log("Error adding new match", error);
      Swal.fire({
        icon: "error",
        title: "Error adding new match",
      });
    }
  };

  return (
    <div>
      <div>
        <h2 className="h2Title">Add Match</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Tournament"
              name="tournament"
              value={tournament}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Team 1"
              name="team1"
              value={team1}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Team 2"
              name="team2"
              value={team2}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Start Date"
              name="startDate"
              value={startDate}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Played Maps (comma-separated)"
              name="playedMaps"
              value={playedMaps.join(", ")} // Convert array to comma-separated values
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Match MVPs (comma-separated)"
              name="matchMVPs"
              value={matchMVPs.join(", ")} // Convert array to comma-separated values
              onChange={(e) => onInputChange(e)}
            />
          </div>
          {/* Additional form fields for other arrays or any other data */}
          <button className="submitButton">Add New Match</button>
        </form>
      </div>
      <Link to={"/match"}>Go back to matches</Link>
    </div>
  );
};

export default AddMatch;
