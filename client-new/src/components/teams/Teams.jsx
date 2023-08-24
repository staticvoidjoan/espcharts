import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import GetPlayerName from "./GetPlayerName";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ReactPaginate from "react-paginate";
import teamlogo from "../../assets/teamlogo.png";
import "./Teams.css";
function Teams() {
  const [teams, setTeams] = useState([]);
  const [allTeams, setAllTeams] = useState([]);

  useEffect(() => {
    loadTeams();
    loadAllTeams();
  }, []);

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    loadTeams(currentPage);
    const totalPages = Math.ceil(allTeams.length / 6);

    if (currentPage <= totalPages) {
      loadTeams(currentPage);
    } else {
      // Handle the case where the user clicked on a non-existent page
      console.log("Invalid page clicked.");
    }
  };
  const loadTeams = async (currentPage) => {
    try {
      const response = await axios.get(
        `https://9dje7gt0s8.execute-api.eu-north-1.amazonaws.com/deploy/espcharts/team?page=${currentPage}&limit=6`
      );
      setTeams(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error :(",
        text: "There was an issue. Please try again later.",
      });
      console.error("Error loading teams:", error);
    }
  };

  const loadAllTeams = async () => {
    try {
      const response = await axios.get("https://9dje7gt0s8.execute-api.eu-north-1.amazonaws.com/deploy/espcharts/team");
      setAllTeams(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error :(",
        text: "There was an issue. Please try again later.",
      });
      console.error("Error loading teams:", error);
    }
  };

  const deleteTeam = (id) => {
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
          Swal.fire("Deleted!", "Team has been deleted.", "success");
          proceedDelete(id);
        }
      });
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  const proceedDelete = async (id) => {
    try {
      await axios.delete(`https://9dje7gt0s8.execute-api.eu-north-1.amazonaws.com/deploy/espcharts/team/${id}`);
      loadTeams();
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  if (!teams) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <div className="title-container mt-5">
          <h1 className="player-title">Teams</h1>
        </div>
        <div className="add-player-link">
          <Link to={`/teams/add`} className="Link">
            Add Team
          </Link>
        </div>
        <Container
          fluid
          style={{ marginTop: "2em" }}
          className="d-flex justify-content-center container"
        >
          <Row md={20} className="justify-content-center">
            {teams.map((team, index) => (
              <Col sm={4} key={index}>
                <div className="team-card-container ">
                  <Card
                    className="centered-card" // Add this className
                    style={{
                      width: "25rem",
                      height: "25rem",
                      marginBottom: "5rem",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={teamlogo}
                      style={{ width: "40%" }}
                      className="mx-auto"
                    />
                    <Card.Body
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center", // Center the card content
                      }}
                    >
                      <Card.Title>{team.teamName}</Card.Title>
                      <Card.Text style={{ flex: 1 }}>
                        <>
                        <div>
                            <strong> Bio: </strong>
                            {team.teamBio};
                          </div>
                          <div>
                            <strong> TeamCaptain: </strong>
                            <GetPlayerName teamCaptainId={team.teamCaptain} />
                          </div>
                          <div>
                            <strong> Active Players: </strong>
                            {team.players.length}
                          </div>
                          <div>
                            <strong> Country Origin: </strong>
                            {team.teamOrigin}
                          </div>
                        </>
                      </Card.Text>
                      <div>
                        <Link to={`/team/view/${team._id}`} className="Link">
                          View
                        </Link>
                        <Link to={`/team/edit/${team._id}`} className="Link">
                          Edit
                        </Link>

                        <Link
                          onClick={() => deleteTeam(team._id)}
                          className="DeleteLink"
                        >
                          Delete
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
        </Container>

        <div className="container">
          <ReactPaginate
            previousLabel={"<Back"}
            nextLabel={"Next>"}
            breakLabel={"..."}
            pageCount={Math.ceil(allTeams.length / 6)}
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
    </>
  );
}

export default Teams;
