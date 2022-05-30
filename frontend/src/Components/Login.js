import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { AppContext } from "../Context";

function Login({props}) {
  const loggedIn = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");

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
      if (
        user.email === email &&
        user.password === password &&
        user.userType === userType
      ) {
        loggedIn.setLoggedIn(true);

        //session
        sessionStorage.setItem('userType', user.userType);
        sessionStorage.setItem('token', user._id);

        navigate("/");
      } else {
        setErrorMessage(
          "Email and password do not match for an associated " +
            userType +
            " account"
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

          <label>User Type:</label>
          <br />
          <select
            name="userType"
            id="userType"
            onChange={(e) => setUserType(e.target.value)}
            value={userType}
          >
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
            <option value="analyst">Analyst</option>
          </select>
          <br />
        </form>

        <button className="formButton" onClick={() => submitLogin()}>
          Login
        </button>

        <h1 className="errorMessage">{errorMessage}</h1>
      </div>
    </>
  );
}

export default Login;
