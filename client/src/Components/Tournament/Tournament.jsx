import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import {format} from "date-fns"

function Tournament() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    loadTournaments();
  }, []);

  const loadTournaments = async() =>{
    const response = await axios.get("http://localhost:5000/espcharts/tournament");
    setTournaments(response.data);
  }

  const deleteTournament = async (id) =>{
    try {
      await axios.delete(`http://localhost:5000/espcharts/tournament/${id}`);
      loadTournaments();
    } catch (error) {
      console.error('Error deleting tournament:', error);
    }
  }
  
  
  return (
    <div className="tournament-table">

    <div className="table-container">
      <div className="table-wrapper">
      <h1 className="title">TOURNAMENTS</h1>
      <Link to={`/player/add`}  className="Link" style={{ float: "right" }}>Add Tournament</Link>
        <table className="table table-responsive" >
          <thead className="thead">
            <tr className="tr">
              <th>#</th>
              <th>Name</th>
              <th>Game Title</th>
              <th>Participating Teams</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Matches</th>
              <th>Location</th>
              <th>Price Pool</th>
              <th>Organizer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {tournaments.map((tournament, index) => ( // Added a unique key (index) for each row
              <tr key={index}>
                <td scope="row">{index+1}</td>
                <td>{tournament.tournamentName}</td>
                <td>{tournament.gameTitle}</td>
                <td><Link>View Teams</Link></td>
                <td>{format(new Date(tournament.startDate), "MMMM d, yyyy")}</td>
                <td>{format(new Date(tournament.endDate), "MMMM d, yyyy")}</td>
                <td><Link> View Matches</Link></td>
                <td>{tournament.location}</td>
                <td>{tournament.pricePool}</td>
                <td>{tournament.organizer}</td>
                <td>
                <Link to={`/tournament/view/${tournament._id}`}  className="Link">View</Link>
                <Link to={`/tournament/edit/${tournament._id}`}  className="Link">Edit</Link>
                <Link to={'/tournament'} onClick={() => deleteTournament(tournament._id) }className="DeleteLink">Delete</Link>
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="add-player-link">
        </div>
      
    </div>
    </div>
  );
}

export default Tournament;
