import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import customLogo from "../Component/mainlogo.png";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBInput,
  MDBCol,
} from "mdb-react-ui-kit";
import { Toast } from "bootstrap";

const imageStyle = {
  display: "block",
  margin: "0 auto",
  width: "100px",
  height: "auto",
};

const imageStyle1 = {
  display: "block",
  margin: "0 auto",
  width: "60%",
  height: "auto",
};

const API_BASE_URL = "https://recruitmentapi.iykons.com";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleForgot = async () => {
    // alert(email);
    console.log(email);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/Account/forgot-username-or-password/${email}`,
      );

      if (response && response.data) {
        console.log(response);
        setMessage("Email sent for reset");
        // navigate("/");
      } else {
        setMessage("Invalid response from the server");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error);
        // setMessage("Error: " + error.response.data.message);
      } else {
        setMessage("An error occurred while making the request");
      }
    }
  };

  return (
    <div className="login-page">
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <img src={customLogo} alt="Custom Logo" style={imageStyle} />
              <div>
                <h2
                  className="h2"
                  style={{
                    color: "rgb(2, 83, 204)",
                    display: "block",
                    textAlign: "center",
                    textDecoration: "underline",
                  }}
                >
                  Begin Your Journey With{" "}
                  <span className="sp" style={{ fontWeight: "bold" }}>
                    IYKONS
                  </span>
                </h2>
                <h7
                  className="h3"
                  style={{
                    color: "rgb(2, 83, 204)",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Begin your business with the right assistance.
                </h7>
              </div>
              <MDBCardImage
                src={process.env.PUBLIC_URL + "/login.png"}
                alt="login form"
                style={imageStyle1}
              />
            </MDBCol>

            <MDBCol md="6" style={{ backgroundColor: "rgb(2, 83, 204)" }}>
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  <span className="h1 fw-bold mb-0" style={{ color: "white" }}>
                    Forgot Password
                  </span>
                </div>

                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px", color: "white" }}
                >
                  Please provide your mail address
                </h5>

                <div>
                  <label style={{ color: "white" }}>Email</label>
                  <input
                    className="form-control mb-3 w-75"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ color: "black" }}
                  />

                  <button className="btn btn-primary" onClick={handleForgot}>
                    Submit
                  </button>
                  <div>{message}</div>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default ForgotPassword;
