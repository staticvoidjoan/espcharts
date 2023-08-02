import React from "react";
import "./Contact.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Contact.css";

function Contact() {
  let navigate = useNavigate();
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { name, email, message } = contact;

  const onInputChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting the form...");
    try {
      console.log("Sending the message...");
      await axios.post("http://localhost:5000/espcharts/contact", contact);
      Swal.fire({
        icon: "success",
        title: "Your message has been sent",
      });
      setContact({
        name: "",
        email: "",
        message: "",
      });
      navigate("/contact");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong, try again",
      });
    }
  };
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Contact;
