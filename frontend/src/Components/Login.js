import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

function Login() {
  const loggedIn = useContext(LoginContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const submitLogin = () => {
    setErrorMessage("");
    axios
      .post("http://localhost:8082/login")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("Error logging in");
      });
  };

  useEffect(() => {
    user.map((user) => {
      if (user.email === email && user.password === password) {
        loggedIn.setLoggedIn(true);
        navigate("/");
      } else {
        setErrorMessage(
          "Email and password do not match for an associated account"
        );
      }
    });
  }, [user]);

  return (
    <>
      <div className="loginForm">
        <h1 className="formTitle">Login</h1>

        <form>
          <label>Email</label>
          <br />

          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <label>Password</label>
          <br />

          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
        </form>

        <button className="formButton" onClick={() => submitLogin()}>
          Login
        </button>

        <text className="errorMessage">{errorMessage}</text>
      </div>
    </>
  );
}

export default Login;
