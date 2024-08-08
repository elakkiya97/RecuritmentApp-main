import React, { useState, useEffect } from "react";
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
  MDBCol,
} from "mdb-react-ui-kit";

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

function Signup() {
  const [message, setMessage] = useState("");
  const [registrationData, setRegistrationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    status: "New",
  });
  const [registered, setRegistered] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    handleConfirmEmail();
  }, []);

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/Account/register`,
        {
          firstName: registrationData.firstName,
          lastName: registrationData.lastName,
          email: registrationData.email,
          password: registrationData.password,
          status: registrationData.status,
        }
      );

      if (response && response.data) {
        setMessage(response.data.message || "Registration successful");
        setRegistered(true);
      } else {
        setMessage("Invalid response from the server");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage( (error.response.data.message || "Registration unsuccessful"));
      } else {
        setMessage("An error occurred while making the request");
      }
      setRegistered(false);
    }
  };

  const handleConfirmEmail = async () => {};

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
                    IYKONS
                  </span>
                </div>

                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px", color: "white" }}
                >
                  Create account
                </h5>

                {registered ? (
                  (window.location.href = "/")
                ) : (
                  <div>
                    <input
                      className="form-control mb-4"
                      name="firstName"
                      placeholder="First name"
                      type="text"
                      value={registrationData.firstName}
                      onChange={handleInputChange}
                      style={{ color: "black" }}
                    />
                    <input
                      className="form-control mb-4"
                      name="lastName"
                      placeholder="Last name"
                      type="text"
                      value={registrationData.lastName}
                      onChange={handleInputChange}
                      style={{ color: "black" }}
                    />
                    <input
                      className="form-control mb-4"
                      name="email"
                      placeholder="Email"
                      type="email"
                      value={registrationData.email}
                      onChange={handleInputChange}
                      style={{ color: "black" }}
                    />
                    <div className="input-group mb-4">
                      <input
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        type={passwordVisible ? "text" : "password"}
                        value={registrationData.password}
                        onChange={handleInputChange}
                        style={{ paddingRight: "40px" }}
                      />
                      <span
                        className="input-group-text"
                        onClick={togglePasswordVisibility}
                        style={{ cursor: "pointer" }}
                      >
                        <i
                          className={
                            passwordVisible ? "fas fa-eye" : "fas fa-eye-slash"
                          }
                        ></i>
                      </span>
                    </div>
                    <button className="btn btn-primary" onClick={handleRegister}>
                      Register
                    </button>
                    <div>{message}</div>
                  </div>
                )}
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default Signup;
