import Reac, {useState} from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import "./EditTeam.css"


const AddTeam = () => {
    let navigate = useNavigate();
    const [team, setTeam] = useState({
        teamName: "",
        teamCaptain:"",
        players: [],
        teamOrigin: ""
      });

      const { teamName, teamCaptain,players,teamOrigin } =
      team;

      const onInputChange = e => {
        setTeam({
                ...team,
                  [e.target.name]: e.target.value,
                });
      }

      const onSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting the form...");
    
        try {
          console.log("Updating team...");
          await axios.post(`http://localhost:5000/espcharts/team`, team);
          console.log("Team posted successfully!");
          navigate("/team");
        } catch (error) {
          console.error("Error updating player:", error);
        }
      };
  return (
    <div>
      <div>
        <h2 className="h2Title">Add Team</h2>
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
          {/* <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Players"
              name="players"
              value={players}
              onChange={(e) => onInputChange(e)}
            />
          </div> */}
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Country Origin"
              name="teamOrigin"
              value={teamOrigin}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <button className="submitButton">Add New Team</button>
        </form>
      </div>
    </div>
  );
};

export default AddTeam;
