import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditTeam = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [team, setTeam] = useState({
    teamName: "",
    teamCaptain: "",
    players: "",
    teamOrigin: "",
  });

  const { teamName, teamCaptain, players, teamOrigin } = team;

  const onInputChange = (e) => {
    setTeam({
      ...team,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/espcharts/team/${id}`);
      const teamData = response.data;

      // Convert the 'players' array to a comma-separated string
      const playersString = teamData.players.join(",");

      // Set the team state with the converted players string
      setTeam({
        ...teamData,
        players: playersString,
      });
    } catch (error) {
      console.error("Error loading team:", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting the form");

    // Convert the 'players' string back to an array
    const playersArray = team.players.split(",");

    try {
      await axios.put(`http://localhost:5000/espcharts/team/${id}`, {
        ...team,
        players: playersArray,
      });

      console.log("Team updated successfully");
      navigate("/team");
    } catch (error) {
      console.error("Error updating team", error);
    }
  };

  return (
    <div>
      <div>
        <h2 className="h2Title">Edit Team</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Team Name"
              name="teamName"
              value={teamName}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Team Captain"
              name="teamCaptain"
              value={teamCaptain}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Players"
              name="players"
              value={players}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Team Origin"
              name="teamOrigin"
              value={teamOrigin}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <button className="submitButton">Update Team</button>
        </form>
        <Link to={"/team"}>Go back to teams</Link>
      </div>
    </div>
  );
};

export default EditTeam;
