import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import contactUslogo from "../../../assets/contactUs.svg";
import "./Contact.css";

const Contact = () => {
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
    <div className ="dflex">
    <div className="contact-page-container">
      <div className="contact-form-container">
        <h2 className="contact-h2">Contact Us</h2>
        <form id="contact-form" onSubmit={(e) => onSubmit(e)}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => onInputChange(e)}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => onInputChange(e)}
            required
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={message}
            onChange={(e) => onInputChange(e)}
            required
          ></textarea>

          <button type="submit" className="submit-contact">Send Message</button>
        </form>
      </div>
    </div>
      <img src={contactUslogo} alt="Contact Us" className="contact-image" />
      </div>
  );
};

export default Contact;
