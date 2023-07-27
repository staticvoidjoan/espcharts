import Form from 'react-bootstrap/Form';
import "./Contact.css"
function Contact() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className="white-text">Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
         <Form.Text className="white-text">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label className="white-text">Enter your message</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
    </Form>
  );
}

export default Contact;