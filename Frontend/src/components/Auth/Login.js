import React, { useState } from "react";
import { auth } from "../../Firebase";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

const backgroundImage = require("../../assets/background.png");
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => navigate("/home"))
      .catch((error) => console.error());
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
          <h2 className="card-title">Login</h2>
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
            <button onClick={SignIn} className="btn btn-primary">
              Sign In
            </button>

            <p>
              <Link to="/forgot-password">Forgot password?</Link> 
            </p>

            <p>
              Don't have an account?
              <Link to="/register">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
