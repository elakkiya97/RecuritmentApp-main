import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import customLogo from "../Component/mainlogo.png";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";

const API_BASE_URL = "https://recruitmentapi.iykons.com";

const imageStyle = {
  display: "block",
  margin: "0 auto",
  width: "100px",
  height: "auto",
};

const imageStyle1 = {
  display: "block",
  margin: "0 auto",
  width: "80%",
  height: "auto",
};

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/Account/login`, {
        UserName: username,
        Password: password,
      });

      if (response.status === 200) {
        const token = response.data.jwt;
        localStorage.setItem("token", token);

        const isAdmin =
          username === "admin@example.com" && password === "Admin123!";

        if (isAdmin) {
          navigate("/Dashboard", { state: { token } });
        } else {
          navigate("/Applicant", { state: { token } });
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials.");
    }
  };
  //Signup
  const HandleSignup = (e) => {
    e.preventDefault();
    navigate("/Signup");
  };
  //ForgotPassword
  const HandleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/ForgotPassword");
    //Implemetn Forgot Password here
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-page">
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6" className="mx-auto">
              <img src={customLogo} alt="Custom Logo" style={imageStyle} />
              <MDBCardImage
                src={process.env.PUBLIC_URL + "/login.png"}
                alt="login form"
                style={imageStyle1}
              />
            </MDBCol>

            <MDBCol
              md="6"
              style={{ backgroundColor: "#105CAA" }}
              className="mx-auto"
            >
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  <span className="h1 fw-bold mb-0" style={{ color: "white" }}>
                    Sign In
                  </span>
                </div>

                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px", color: "white" }}
                >
                  Welcome to IYKONS
                </h5>

                <label style={{ color: "white" }}>Email:</label>
                <MDBInput
                  wrapperClass="mb-4"
                  placeholder="Email address"
                  id="formControlLg"
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ color: "#105CAA" }}
                />

                <label style={{ color: "white" }}>Password:</label>
                <div className="input-group mb-4">
                  <input
                    className="form-control"
                    placeholder="Password"
                    id="formControlLg"
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ color: "#105CAA" }}
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

                <button className="btn btn-primary" onClick={handleLogin}>
                  Login
                </button>

                {error && <div style={{ color: "red" }}>{error}</div>}

                <a
                  className="custom-link"
                  onClick={(e) => HandleForgotPassword(e)}
                  style={{ marginTop: "10px" }}
                >
                  Forgot Password
                </a>
                <p className="mb-5 pb-lg-2" style={{ color: "white" }}>
                  Don't have an account?
                  <a
                    className="custom-link"
                    onClick={(e) => HandleSignup(e)}
                    style={{ marginLeft: "10px" }}
                  >
                    Register Here
                  </a>
                </p>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default Login;
