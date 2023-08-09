import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Table } from "react-bootstrap";
import "./Tournament.css";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
function Tournament() {
  const [tournaments, setTournaments] = useState([]);
  const [allTournaments, setAllTournaments] = useState([]);


  useEffect(() => {
    loadTournaments();
    loadAllTournaments();
  }, []);

  const loadAllTournaments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/espcharts/tournaments"
      );
      setAllTournaments(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    loadTournaments(currentPage);
    const totalPages = Math.ceil(allTournaments.length / 10);
    if (currentPage > totalPages) {
          currentPage = totalPages;
        } else {
          console.log("Invalid page clicked")
        }
  }

  const loadTournaments = async (currentPage) => {
    try {
      const response = await axios.get(`http://localhost:5000/espcharts/tournament?page=${currentPage}&limit=10`)
     setTournaments(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error :(",
        text: "There was an issue. Please try again later.",
      });
      console.error("Error loading tournaments:", error);
    }
  }


  const deleteTournament = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/espcharts/tournament/${id}`);
      loadTournaments();
    } catch (error) {
      console.error("Error deleting tournament:", error);
    }
  };

  return (
    <div className="tournament-div">
      <div className="tournament-table">
        <div>
          <h1 className="tournament-title">TOURNAMENTS</h1>
          <Link to={`/player/add`} className="Link" style={{ float: "right" }}>
            Add Tournament
          </Link>
        </div>
        <div className="table-container">
          <div className="table-wrapper">
            <Table responsive striped bordered hover>
              <thead>
                <tr>
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
              <tbody>
                {tournaments.map((tournament, index) => (
                  <tr key={index}>
                    <td scope="row">{index + 1}</td>
                    <td>{tournament.tournamentName}</td>
                    <td>{tournament.gameTitle}</td>
                    <td>
                      <Link to="#">View Teams</Link>
                    </td>
                    <td>
                      {format(new Date(tournament.startDate), "MMMM d, yyyy")}
                    </td>
                    <td>
                      {format(new Date(tournament.endDate), "MMMM d, yyyy")}
                    </td>
                    <td>
                      <Link to="#">View Matches</Link>
                    </td>
                    <td>{tournament.location}</td>
                    <td>{tournament.pricePool}</td>
                    <td>{tournament.organizer}</td>
                    <td>
                      <Link
                        to={`/tournament/view/${tournament._id}`}
                        className="Link"
                      >
                        View
                      </Link>
                      <Link
                        to={`/tournament/edit/${tournament._id}`}
                        className="Link"
                      >
                        Edit
                      </Link>
                      <Link
                        to="/tournament"
                        onClick={() => deleteTournament(tournament._id)}
                        className="DeleteLink"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

        <div className="container">
          <ReactPaginate
            previousLabel={"<Back"}
            nextLabel={"Next>"}
            breakLabel={"..."}
            pageCount={Math.ceil(allTournaments.length / 10)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-link"}
            nextClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
          </div>
          <div className="add-player-link">
            {/* Add any additional content here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tournament;
