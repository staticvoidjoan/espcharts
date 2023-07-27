import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ViewTeam from "./ViewTeam"
import {Link} from "react-router-dom";

function ViewTeamBox() {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Team View</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <ViewTeam/>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" as={Link} to={"/team"}  >Close</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ViewTeamBox;