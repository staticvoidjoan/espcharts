import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Footer.css";

import { Link ,useNavigate} from "react-router-dom";
import esplogowhite from "../../assets/esplogowhite.png";





function Footer() {
  const [newsletter, setNewsletter] = useState({
    email: "",
  })
  const {email} = newsletter;

  const onInputChange = (e) => {
    setNewsletter({
      ...newsletter,
      [e.target.name]: e.target.value,
    });
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting the form...");
    try {
      console.log("Sending the message...");
      await axios.post("http://localhost:5000/espcharts/subscribe", newsletter);
      Swal.fire({
        icon: "success",
        title: "Thank you, an email confirming your subscription will be sent shortly",

      });
      setNewsletter({
        email: "",
      });
  
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong, try again",
      });
    }
  };

  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          "Empower Your Esports Journey with ESPCharts: Where Data Drives
          Dominance!
        </p>
        <p className="footer-subscription-text">
          Subscribe to our newsletter for the latest updates!
        </p>
        <div className="input-areas">
          <form onSubmit={(e) => onSubmit(e)}>
            <input
              className="footer-input"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
              required
            />
            <button className="btn--outline">Subscribe</button>
          </form>
        </div>
      </section>
      <section class="social-media">
        <div class="social-media-wrap">
          <div class="footer-logo">
            <Link to="/" className="social-logo">
              ESPCharts
              <img
                src={esplogowhite}
                alt="ESPCharts Logo"
                className="footer-logo"
              />
            </Link>
          </div>
          <small class="website-rights">ESPCharts © 2023</small>
          <div class="social-icons">
            <Link
              class="social-icon-link facebook"
              to="/"
              target="_blank"
              aria-label="Facebook"
            >
              <i class="fab fa-facebook-f" />
            </Link>
            <Link
              class="social-icon-link instagram"
              to="/"
              target="_blank"
              aria-label="Instagram"
            >
              <i class="fab fa-instagram" />
            </Link>
            <Link
              class="social-icon-link youtube"
              to="/"
              target="_blank"
              aria-label="Youtube"
            >
              <i class="fab fa-youtube" />
            </Link>
            <Link
              class="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="Twitter"
            >
              <i class="fab fa-twitter" />
            </Link>
            <Link
              class="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <i class="fab fa-linkedin" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
