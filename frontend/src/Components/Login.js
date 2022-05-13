import React, { useState } from "react";
import axios from "axios";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = () => {
    axios
      .post("http://localhost:8082/login")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("Error logging in");
      });
  };

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
      </div>
    </>
  );
}

export default Login;
