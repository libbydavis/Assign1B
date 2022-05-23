import { useContext, useEffect } from "react";
import { LoginContext } from "../App";
import { Link, Navigate } from "react-router-dom";
import { AppContext } from "../Context";

function NavBar() {
  const loggedIn = useContext(AppContext);

  useEffect(() => {
    console.log(loggedIn.loggedIn);
  }, []);

  return (
    <div className="navbar">
      <div>
        <div>
          <Link to="/">
            <h1 className="title">SPEED Database</h1>
          </Link>
          <h3 className="subtitle">
            find the best articles relevant to your research project
          </h3>
        </div>
        {!loggedIn.loggedIn ? (
          <>
            <Link to="/login" className="loginButton buttonLinkStyle">
              Login
            </Link>
          </>
        ) : null}
      </div>
      <div className="navLinksContainer">
        <nav className="navlinks">
          <Link to="/">Home</Link>
          <Link to="/browseArticles">Browse Articles</Link>
          <Link to="/submitArticle">Submit Article</Link>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
