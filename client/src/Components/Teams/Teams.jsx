import { useEffect, useState } from "react";
import axios from "axios";
// import "./Player.css"
import { Link } from 'react-router-dom';


function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async() =>{
    const response = await axios.get("http://localhost:5000/espcharts/team");
    setTeams(response.data);
  }

  const deleteTournament = async (id) =>{
    try {
      await axios.delete(`http://localhost:5000/espcharts/team/${id}`);
      loadTeams();
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  }


  return (
    <div className="table-container">
      <div className="table-wrapper">
      <h1 className="Title">Teams</h1>
        <table className="table">
          <thead className="thead">
            <tr className="tr">
              <th>#</th>
              <th>Team Name</th>
              <th>Team Captain</th>
              <th>Players</th>
              <th>Origin</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {teams.map((team, index) => ( // Added a unique key (index) for each row
              <tr key={index}>
                <td scope="row">{index+1}</td>
                <td>{team.teamName}</td>
                <td>{team.teamCaptain}</td>
                <td>{team.players}</td>
                <td>{team.teamOrigin}</td>
                <td>Actions</td>
                <td>
                <Link to={`/team/view/${team._id}`}  className="Link">View</Link>
                <Link to={`/team/edit/${team._id}`}  className="Link">Edit</Link>
                
                </td>
                <td><button onClick={() => deleteTournament(team._id) }className="delete-button">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="add-player-link">
        <Link to={`/team/add`}  className="Link">Add Team</Link>
        </div>
      
    </div>
  );
}

export default Teams;
