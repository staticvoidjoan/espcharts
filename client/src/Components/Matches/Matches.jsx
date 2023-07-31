import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { format } from "date-fns";
import "./Matches.css";
import GetPlayerName from "../Teams/GetPlayerName";
import GetTeamName from "./GetTeamNames";


function Matches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      const response = await axios.get("http://localhost:5000/espcharts/match");
      setMatches(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Database error",
        text: "THere was an issue fetching data from the database",
      });
    }
  };

  const deleteMatch = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Match has been deleted.", "success");
          proceedDelete(id);
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Database error",
        text: "THere was an issue deleting data from the database",
      });
    }
  };

  const proceedDelete = async (id) => {
    try {
      await axios.delete("https://localhost:5000/espcharts/match/${id}");
      loadMatches();
    } catch (error) {
      console.error("Error deleting match", error);
    }
  };

  return (
    <div className="player-table">
      <div className="table-container">
        <div className="table-wrapper">
          <h1 className="matches-title">Matches</h1>
          <div className="add-match-link">
            <Link
              to={`/matches/add`}
              className="Link"
              style={{ float: "right" }}
            >
              Add Match
            </Link>
          </div>
          <div className="add-player-link"></div>
          <table className="table">
            <thead className="thead">
              <tr className="tr">
                <th className="th">#</th>
                <th className="th">Tournament</th>
                <th className="th">Team 1</th>
                <th className="th">Team 2</th>
                <th className="th">Start Date</th>
                <th className="th">Played Maps</th>
                <th className="th">Match MVPs</th>
                <th className="th">Winning Team</th>
                <th className="th">Action</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {matches.map((match, index) => (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td>{match.tournament}</td>
                  <td><GetTeamName teamId={match.team1}/></td>
                  <td><GetTeamName teamId={match.team2}/></td>
                  <td>{format(new Date(match.startDate), "MMMM d, yyyy")}</td>
                  <td>
                    {match.playedMaps.map((map, index) => (
                      <span key={index}>
                        {map}
                        <br />
                      </span>
                    ))}
                  </td>
                  <td>
                    {match.matchMVPs.map((mvp, index) => (
                      <div>
                        <GetPlayerName key={index} teamCaptainId={mvp} />
                      </div>
                    ))}
                  </td>
                  <td>{match.winningTeam}</td>
                  <td>
                    <Link to={`/match/view/${match._id}`} className="Link">
                      View
                    </Link>
                    <Link to={`/match/edit/${match._id}`} className="Link">
                      Edit
                    </Link>
                    <Link
                      onClick={() => deleteMatch(match._id)}
                      className="DeleteLink"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Matches;
