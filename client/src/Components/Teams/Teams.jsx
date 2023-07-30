import axios from "axios";
import { useEffect, useState } from "react";
import "./Teams.css"
import { Link } from "react-router-dom";
import GetPlayerName from "./GetPlayerName"
import Swal from "sweetalert2"
function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const response = await axios.get("http://localhost:5000/espcharts/team");
      setTeams(response.data);
    
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Database Error",
        text: "There was an issue fetching data from the database. Please try again later.",});
      console.error("Error loading teams:", error);
    }
  };


  const deleteTeam = (id) =>{
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Team has been deleted.',
            'success'
          )
          proceedDelete(id);
        }
      })
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  }


  const proceedDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/espcharts/team/${id}`);
      loadTeams();
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  if (!teams ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <h1 className="title">Teams</h1>
        <div className="add-player-link">
        <Link to={`/team/add`} className="Link">
          Add Team
        </Link>
      </div>
        <table className="table">
          <thead className="thead">
            <tr className="tr">
              <th>#</th>
              <th>Team Name</th>
              <th>Team Captain</th>
              <th>Active Players</th>
              <th>Origin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {teams.map((team, index) => (
              <tr key={index}>
                <td scope="row">{index + 1}</td>
                <td>{team.teamName}</td>
                <td><GetPlayerName teamCaptainId = {team.teamCaptain}/></td>
                <td>{team.players.length}</td>
                <td>{team.teamOrigin}</td>
                <td>
                  <Link to={`/team/view/${team._id}`} className="Link">
                    View
                  </Link>
                  <Link to={`/team/edit/${team._id}`} className="Link">
                    Edit
                  </Link>
                  <Link to={'/team'} onClick={() => deleteTeam(team._id) }className="DeleteLink">Delete</Link>
                </td>
                <td>
        
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
  );
}

export default Teams;