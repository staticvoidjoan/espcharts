import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ViewPlayer from './ViewPlayer';
import {Link} from "react-router-dom";

function StaticExample() {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Player View</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <ViewPlayer/>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" as={Link} to={"/player"}  >Close</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default StaticExample;