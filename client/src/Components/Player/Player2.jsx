import { useEffect, useState } from "react";
import axios from "axios";
import "./Player.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Swal from "sweetalert2";

function Player() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/espcharts/player"
      );
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
      loadPlayers();
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  return (
    <div >
      <div style={{marginBottom: "5em", marginTop: "5em"}}>
      <h1 className="player-title">PLAYERS</h1>
          <div className="add-player-link">
        <Link to={`/player/add`}  className="Link" style={{ float: "right" }}>Add Player</Link>
        </div>

      </div>
      
      
      <Container fluid style={{ marginTop: "2em" }} className="d-flex justify-content-center">
        <Row md={20} className="justify-content-center">
          {players.map((player, index) => (
            <Col sm={4}>
              <div className="container-md">
                <Card
                  style={{
                    width: "18rem",
                    height: "12rem",
                    marginBottom: "5rem",
                  }}
                  key={index}
                >
                  {/* <Card.Img variant="top" src = "holder.js/100px180"/> */}
                  <Card.Body style={{display:"flex", flexDirection:"column"}}>
                    <Card.Title>{player.userName}</Card.Title>
                    <Card.Text style={{flex:1}}>
                      <div>
                       <strong> Game: </strong>{player.gameTitle} 
                      </div>
                      <div>

                       <strong> Role: </strong>{player.gameRole}
                      </div>
                    </Card.Text>
                    <div>
                    <Link to={`/player/view/${player._id}`} className="Link">
                      View
                    </Link>
                    <Link to={`/player/edit/${player._id}`} className="Link">
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
    </div>
  );
}

export default Player;
