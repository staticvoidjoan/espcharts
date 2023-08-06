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

  useEffect(() => {
    getAllEmails();
    loadEmails();
  }, []);

  const getAllEmails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/espcharts/subscribers"
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
        `http://localhost:5000/espcharts/subscriber?page=${currentPage}&limit=10`
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
      await axios.delete(`htttp://localhost:5000/espcharts/subscriber/${id}`);
      loadEmails();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUnsubscribed = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/espcharts/subscriber`
      );
      loadEmails();
      Swal.fire({
        icon: "success",
        title: "Success :)",
        text: "You have successfully deleted the unsubscribed emails.",
      });
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="container newsletter-body">
      <div className="newsletter-div">
        <div className="table-container">
          <div className="table-wrapper">
            <div className="mt-5 md-0">
            <Link onClick={deleteUnsubscribed} className="DeleteLink">Delete Unsubscribed Emails</Link>
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
                        onSubmit={() => deleteEmail(email._id)}
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
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
