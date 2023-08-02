import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Swal from "sweetalert2";
import "./Players.css";
import background from "../../assets/playerbg.png";
import playerplaceholder from "../../assets/playerplch.svg"
import ReactPaginate from 'react-paginate'
function Players() {
  const [players, setPlayers] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async (currentPage) => {
    try {
      const response = await axios.get(`http://localhost:5000/espcharts/player?page=${currentPage}&limit=6`);
      setPlayers(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Database Error",
        text: "There was an issue fetching data from the database. Please try again later.",
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
      await axios.delete(`http://localhost:5000/espcharts/player/${id}`);
      setTimeout(() => {
        loadPlayers();
      }, 2000);
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };



  //Pagination


  const fetchComments = async (currentPage) =>{
    try {
      const response = await axios.get(`http://localhost:5000/espcharts/player?page=${currentPage}&limit=6`);
      const data = response.data;
      return data;
    
    } catch (error) {
      console.error("Error fetching comments:", error);
      return []; // Return an empty array or handle the error accordingly
    }
  }

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1
    const newPlayersData = await fetchComments(currentPage);
    setPlayers(newPlayersData)

    

  }


  return (
    <>
      <div >
        <div className="title-container mt-5">
          <h1 className="player-title">PLAYERS</h1>
        </div>
          <div className="add-player-link">
            <Link to={`/players/add`} className="Link">
              Add Player
            </Link>
          </div>
        <img src={background} alt="background" className="player-bg-image" />
        <Container
          fluid
          style={{ marginTop: "2em" }}
          className="d-flex justify-content-center container"
        >
          <Row md={20} className="justify-content-center">
            {players.map((player, index) => (
              <Col sm={4} key={index}>
                <div className="container-md">
                  <Card
                    className="centered-card" // Add this className
                    style={{
                      width: "18rem",
                      height: "17rem",
                      marginBottom: "5rem",
                    }}
                  >
                      <Card.Img variant="top" src={playerplaceholder} style={{ width: "30%" }} className="mx-auto" />
                    <Card.Body
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center", // Center the card content
                      }}
                    >
                      <Card.Title>{player.userName}</Card.Title>
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
                        </>
                      </Card.Text>
                      <div>
                        <Link to={`/player/view/${player._id}`} className="Link">
                          View
                        </Link>
                        <Link
                          to={`/player/edit/${player._id}`}
                          className="Link"
                        >
                          Edit
                        </Link>
                        
                        <Link
                          onClick={() => deletePlayer(player._id)}
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
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={20}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-link'}
            nextClassName={'page-link'}
            activeClassName={"active"}
          />
          </div>
      </div>
    </>
  );
}

export default Players;
