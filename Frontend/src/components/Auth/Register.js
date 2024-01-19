import React, { useState } from "react";
import { auth } from "../../Firebase";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import mailsend from "../../mailsend";

const backgroundImage = require("../../assets/image1.jpg");

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullNames, setFullNames] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, { fullNames: fullNames })
          .then(() => {
            mailsend(email);
            setSuccessMessage("Registration successful.");
          })
          .catch((error) =>
            console.error("Error updating display name: ", error)
          );
      })
      .catch((error) => {
        setErrorMessage("Error creating user: " + error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password && fullNames) {
      register();
    } else {
      setErrorMessage("Please fill in all required fields.");
    }
  };

  return (
    <div
      className=" d-flex flex-column align-items-center justify-content-center vh-100"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="card" style={{ width: "400px" }}>
        <div className="card-body">
          <h2 className="card-title">Sign-Up</h2>
          {successMessage && <p className="text-success">{successMessage}</p>}
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <div className="form-group">
            <label>Full Names</label>
            <input
              onChange={(event) => setFullNames(event.target.value)}
              autoComplete="off"
              className="form-control"
              type="text"
              name="fullNames"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="off"
              className="form-control"
              type="email"
              name="email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="off"
              className="form-control"
              type="password"
              name="password"
              required
            />
          </div>
          <div className="button-group text-center">
            <button onClick={handleSubmit} className="btn btn-primary">
              Register
            </button>
            <p>
              Already have an account?
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
