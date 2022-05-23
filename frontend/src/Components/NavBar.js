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
        <div className="SPEEDnavbar">
            <div>
                <div>
                    <Link to="/"><h1 className="navTitle">SPEED Database</h1></Link>
                    <h3 className="tagline">find the best articles relevant to your research project</h3>
                </div>
                {loggedIn ? null : (
                    <Link to="/login" className="loginButton buttonLinkStyle">
                        Login
                    </Link>
                )}
            </div>
            <div className="flexCentre">
                <nav className="navlinks flexCentre">
                    <Link to="/">Home</Link>
                    <Link to="/browseArticles">Browse Articles</Link>
                    <Link to="/submitArticle">Submit Article</Link>
                </nav>
            </div>
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
