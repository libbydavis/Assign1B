import {useContext, useEffect, useState} from "react";
import { LoginContext } from "../App";
import { Link, Navigate } from "react-router-dom";
import { AppContext } from "../Context";

function NavBar() {
  const loggedIn = useContext(AppContext);
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  
  return (
    <div className="SPEEDnavbar">
      <div>
        <div>
          <Link to="/">
            <h1 className="navTitle">SPEED Database</h1>
          </Link>
          <h3 className="tagline">
            find the best articles relevant to your research project
          </h3>
        </div>
        {!token ? (
          <>
            <Link to="/login" className="loginButton buttonLinkStyle">
              Login
            </Link>
          </>
        ) : null}
      </div>
      <div className="flexCentre">
        <nav className="navlinks flexCentre">
          <Link to="/">Home</Link>
          <Link to="/browseArticles">Browse Articles</Link>
          {token ? <Link to="/submitArticle">Submit Article</Link> : null}
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
