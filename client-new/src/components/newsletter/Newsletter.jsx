import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Pagination } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import "./Newsletter.css";
import backgroundimage from "../../assets/cloudwp.jpg";
import Swal from "sweetalert2";

function Newsletter() {
  const [emails, setEmails] = useState([]);
  const [allEmails, setAllEmails] = useState([]);
  // const [subject, setSubject] = useState(); // Add subject state
  // const [text, setText] = useState(); // Add text state
  useEffect(() => {
    getAllEmails();
    loadEmails();
  }, []);

  const getAllEmails = async () => {
    try {
      const response = await axios.get(
        "https://9dje7gt0s8.execute-api.eu-north-1.amazonaws.com/deploy/espcharts/subscribers"
      );
      setAllEmails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    loadEmails(currentPage);
    const totalPages = Math.ceil(allEmails.length / 10);
    if (currentPage <= totalPages) {
      loadEmails(currentPage);
    } else {
      // Handle the case where the user clicked on a non-existent page
      console.log("Invalid page clicked.");
    }
  };

  const loadEmails = async (currentPage) => {
    try {
      const response = await axios.get(
        `https://9dje7gt0s8.execute-api.eu-north-1.amazonaws.com/deploy/espcharts/subscriber?page=${currentPage}&limit=10`
      );
      setEmails(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error :(",
        text: "There was an issue. Please try again later.",
      });
    }
  };

  const deleteEmail = async (id) => {
    try {
      await axios.delete(`https://9dje7gt0s8.execute-api.eu-north-1.amazonaws.com/deploy/espcharts/subscriber/${id}`);
      loadEmails();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUnsubscribed = async () => {
    try {
      await axios.delete(`https://9dje7gt0s8.execute-api.eu-north-1.amazonaws.com/deploy/espcharts/subscriber`);
      loadEmails();
      Swal.fire({
        icon: "success",
        title: "Success :)",
        text: "You have successfully deleted the unsubscribed emails.",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    // Get the values directly from the form inputs
    const subjectValue = document.getElementById("subject").value;
    const textValue = document.getElementById("text").value;

    const emailAddresses =  emails
    .filter(email => email.isSubscribed)
    .map(email => email.email);

    const data = {
      subject: subjectValue,
      text: textValue,
      emails: emailAddresses,
    };
    try {
      axios.post("https://9dje7gt0s8.execute-api.eu-north-1.amazonaws.com/deploy/espcharts/sendNewsletter", data);
      Swal.fire({
        icon: "success",
        title: "Success :)",
        text: "Emails have been sent successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container newsletter-body">
      <div className="newsletter-div">
        <div className="table-container">
          <div className="table-wrapper">
            <div className="mt-5 md-0">
              <Link onClick={deleteUnsubscribed} className="DeleteLink">
                Delete Unsubscribed Emails
              </Link>
            </div>

            <Table
              responsive
              striped
              bordered
              hover
              className="newsletter-table"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>E-Mail</th>
                  <th>Subscribed</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {emails.map((email, index) => (
                  <tr key={index}>
                    <td scope="row">{index + 1}</td>
                    <td>{email.email}</td>
                    <td>{email.isSubscribed ? "Yes" : "No"}</td>
                    <td>
                      <button
                        onClick={() => deleteEmail(email._id)}
                        className="deleteButton"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="container">
            <ReactPaginate
              previousLabel={"<Back"}
              nextLabel={"Next>"}
              breakLabel={"..."}
              pageCount={Math.ceil(allEmails.length / 10)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination justify-content-center"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-link"}
              nextClassName={"page-link"}
              activeClassName={"active"}
            />
          </div>
          <div className="email-form mb-5 mt-3">
            <input className="mb-2 mt-2"
              type="text"
              id="subject" // Add this ID
              placeholder="Subject"
            />

            <textarea className="mb-2 mt-2"
              id="text" // Add this ID
              placeholder="Text"
            />

            <button onClick={handleSubmit}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
