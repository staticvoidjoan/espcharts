import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Swal from "sweetalert2";
import "./Players.css";
import playerplaceholder from "../../assets/playerplch.svg";
import ReactPaginate from "react-paginate";
function Players() {
  const [players, setPlayers] = useState([]);
  const [allPLayers, setAllPlayers] = useState([]);

  useEffect(() => {
    loadPlayers();
    getAllPlayers();
  }, []);

  const getAllPlayers = async (currentPage) => {
    try {
      const response = await axios.get(
        "https://9dje7gt0s8.execute-api.eu-north-1.amazonaws.com/deploy/espcharts/playerAll"
      );
      setAllPlayers(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error :(",
        text: "There was an issue. Please try again later.",
      });
    }
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    loadPlayers(currentPage);
    const totalPages = Math.ceil(allPLayers.length / 6);

    if (currentPage <= totalPages) {
      loadPlayers(currentPage);
    } else {
      // Handle the case where the user clicked on a non-existent page
      console.log("Invalid page clicked.");
    }
  };
  const loadPlayers = async (currentPage) => {
    try {
      const response = await axios.get(
        `https://9dje7gt0s8.execute-api.eu-north-1.amazonaws.com/deploy/espcharts/player?page=${currentPage}&limit=6`
      );
      setPlayers(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error :(",
        text: "There was an issue. Please try again later.",
      });
    }
  };

  const deletePlayer = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e04338",
        cancelButtonColor: "#8e24aa",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Player has been deleted.", "success");
          proceedDelete(id);
        }
      });
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  const proceedDelete = async (id) => {
    try {
      await axios.delete(
        `https://9dje7gt0s8.execute-api.eu-north-1.amazonaws.com/deploy/espcharts/player/${id}`
      );
      setTimeout(() => {
        loadPlayers();
      }, 2000);
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };



  return (
    <div className="player-main-page">
     
        <div className="title-container mt-5">
          <h1 className="player-title">PLAYERS</h1>
        </div>
        <div className="add-player-link">
          <Link to={`/players/add`} className="player-link">
            Add Player
          </Link>
        </div>
        <Container
          fluid
          style={{ marginTop: "2em" }}
          className="d-flex justify-content-center container"
        >
          <Row md={20} className="justify-content-center">
            {players.map((player, index) => (
              <Col sm={4} key={index}>
                <div className="container">
                  <Card
                    className="main-player-card" // Add this className
                    style={{
                      width: "100%",
                      height: "17rem",
                      marginBottom: "5rem",
                      alignContent: "center",
                      borderRadius:"25px",
                      display:"flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    
                    }}
                    as={Link} to={`/player/view/${player._id}`}
                  >
                    <Card.Img
                      variant="top"
                      src={playerplaceholder}
                      style={{ width: "30%" }}
                      className="mx-auto"
                    />
                    <div className="player-card-body">
                      <Card.Body
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center", // Center the card content
                        }}
                      >
                        <Card.Title style={{color:"#FFDB1C"}}><strong>
                        {player.userName}
                          </strong></Card.Title>
                        <Card.Text style={{ flex: 1 }}>
                          <>
                            <div>
                              <strong> Game: </strong>
                              {player.gameTitle}
                            </div>
                            <div>
                              <strong> Role: </strong>
                              {player.gameRole}
                            </div>
                            <div>
                              <strong> Age: </strong>
                              {player.age}
                            </div>
                            <div>
                              <strong> Country: </strong>
                              {player.country}
                            </div>
                          </>
                        </Card.Text>
                        {/* <div className="player-actions">
                          <Link
                            to={`/player/view/${player._id}`}
                            className="player-link"
                          >
                            View
                          </Link>
                          <Link
                            to={`/player/edit/${player._id}`}
                            className="player-link"
                          >
                            Edit
                          </Link>

                          <Link
                            onClick={() => deletePlayer(player._id)}
                            className="DeleteLink"
                          >
                            Delete
                          </Link>
                        </div> */}
                      </Card.Body>
                    </div>
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
            pageCount={Math.ceil(allPLayers.length / 6)}
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
  );
}

export default Players;
