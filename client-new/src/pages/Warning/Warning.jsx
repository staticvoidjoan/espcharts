import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Warning.css";
import Swal from "sweetalert2";
import videobackground from "../../assets/wallpaper.mp4";
const Warning = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Swal.fire({
      title: "You must be logged in to do that",
      showDenyButton: true,
      confirmButtonText: "Login/Register",
      denyButtonText: `Go Back`,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        signup();
      } else if (result.isDenied) {
        gohome();
      }
    });
  }, []);

  function signup() {
    navigate("/signup");
  }

  function gohome() {
    navigate("/home");
  }

  return (
    <div className="warning-container">
     <video src={videobackground} autoPlay loop muted playsInline  className="background-image" ></video>
    </div>
  );
};

export default Warning;
