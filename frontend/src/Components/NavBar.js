import { useContext } from "react";
import { LoginContext } from "../App";
import { Link, Navigate } from "react-router-dom";

function NavBar() {
    const loggedIn = useContext(LoginContext);

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
    )
}



export default NavBar;
