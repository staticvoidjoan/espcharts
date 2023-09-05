import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Form, Button } from "react-bootstrap";
import "../teams/AddTeam.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Auth } from "aws-amplify";
const AddTeam = () => {
  let navigate = useNavigate();
  const [tournament, setTournament] = useState({
    tournamentName: "",
    gameTitle: "",
    paricipatingTeams: [],
    startDate: "",
    endDate: "",
    matches: "",
    location: "",
    pricePool: "",
    organizer: "",
  });

  const {
    tournamentName,
    gameTitle,
    paricipatingTeams,
    startDate,
    endDate,
    matches,
    location,
    pricePool,
    organizer,
  } = tournament;

  const [teamList, setTeamList] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      const user = await Auth.currentAuthenticatedUser();
      const token = user.signInUserSession.idToken.jwtToken;
      try {
        const response = await axios.get(
          "https://h9bo5rmthl.execute-api.eu-north-1.amazonaws.com/dev/espcharts/allTeams", {
            headers: {
              Authorization: token,
            },
          }
        );
        setTeamList(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeams();
  }, []);

  const onInputChange = (e) => {
    setTournament({
      ...tournament,
      [e.target.name]: e.target.value,
    });
  };

  const onDateChange = (name, date) => {
    setTournament({
      ...tournament,
      [name]: date,
    });
  };

  const onPlayersChange = (e) => {
    const selectedOptions = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setTournament({
      ...tournament,
      paricipatingTeams: selectedOptions,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting the form...");

    try {
      console.log("Creating tournament...");
      await axios.post(
        `https://h9bo5rmthl.execute-api.eu-north-1.amazonaws.com/dev/espcharts/tournaments`,
        tournament
      );
      console.log("Team posted successfully!");
      Swal.fire({
        icon: "success",
        title: "Team Created Successfully",
      });
      navigate("/tournaments");
    } catch (error) {
      console.error("Error updating player:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectAll = () => {
    const allTeamIds = teamList.map((team) => team._id);
    setTeamList({
      ...tournament,
      teams: selectAll ? [] : allTeamIds,
    });
    setSelectAll(!selectAll);
  };

  const availableGameTitles = [
    "Counter Strike: Global Offensive",
    "League of Legends",
    "Rainbow Six Siege",
    "Valorant",
    "Overwatch",
    "Call Of Duty",
  ];

  return (
    <div className="add-team-page">
      <div className="add-team-container mt-5 mb-5">
        <div>
          <Link
            to={`/tournaments`}
            className="Team-Link"
            style={{ float: "left" }}
          >
            <i class="fa-solid fa-arrow-left" style={{ color: "#fff" }}></i>
          </Link>
          <h2 className="h2Title d-flex justify-content-center">Add Team</h2>
        </div>
        <Form onSubmit={onSubmit}>
          <div className="form-group">
            <Form.Label style={{ float: "left" }}>Tournament Name:</Form.Label>
            <Form.Control
              type="text"
              className="form-control form-control-lg"
              placeholder="Tournament Name"
              name="tournamentName"
              value={tournamentName}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group">
          <Form.Label style={{ float: "left",   }}>Game Title</Form.Label>
          <Form.Select
            aria-label="Default"
            name="gameTitle"
            value={gameTitle}
            onChange={(e) => onInputChange(e)}
          >
            {availableGameTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </Form.Select>
          </div>
          <div className="form-group">
            <Form.Label style={{ float: "left" }}>
              Participating Teams:
            </Form.Label>
            <Form.Control
              as="select"
              multiple
              name="paricipatingTeams"
              value={paricipatingTeams}
              onChange={onPlayersChange}
            >
              {teamList.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.teamName}
                </option>
              ))}
            </Form.Control>
          </div>
          <div className="form-group  mt-3 mb-3">
            <Form.Label style={{ float: "left" }}>Start Date:</Form.Label>
            <DatePicker
              selected={startDate}
              onChange={(date) => onDateChange("startDate", date)}
              className="form-control form-control-lg"
              placeholderText="Start Date"
            />
          </div>

          <div className="form-group ">
            <Form.Label style={{ float: "left" }}>End Date:</Form.Label>
            <DatePicker
              selected={endDate}
              onChange={(date) => onDateChange("endDate", date)}
              className="form-control form-control-lg"
              placeholderText="End Date"
            />
          </div>
          <div className="form-group">
            <Form.Label style={{ float: "left" }}>Matches:</Form.Label>
            <Form.Control
              type="text"
              className="form-control form-control-lg"
              placeholder="Matches"
              name="matches"
              value={matches}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group">
            <Form.Label style={{ float: "left" }}>Location:</Form.Label>
            <Form.Control
              type="text"
              className="form-control form-control-lg"
              placeholder="Location"
              name="location"
              value={location}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group">
            <Form.Label style={{ float: "left" }}>Price Pool:</Form.Label>
            <Form.Control
              type="text"
              className="form-control form-control-lg"
              placeholder="Price Pool"
              name="pricePool"
              value={pricePool}
              onChange={onInputChange}
            />
          </div>
          <div className="form-group">
            <Form.Label style={{ float: "left" }}>Organizer:</Form.Label>
            <Form.Control
              type="text"
              className="form-control form-control-lg"
              placeholder="Organizer"
              name="organizer"
              value={organizer}
              onChange={onInputChange}
            />
          </div>
          <button className="submitButton" type="submit">
            <strong>Add New Tournament</strong>
          </button>
        </Form>
      </div>
    </div>
  );
};

export default AddTeam;
