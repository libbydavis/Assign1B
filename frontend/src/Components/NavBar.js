import {Link} from "react-router-dom";

function NavBar() {
    return (
        <div className="navbar">
            <div>
                <div>
                    <Link to="/"><h1 className="title">SPEED Database</h1></Link>
                    <h3 className="subtitle">find the best articles relevant to your research project</h3>
                </div>
                <Link to="/login" className="loginButton buttonLinkStyle">Login</Link>
            </div>
            <nav className="navlinks">
                <Link to="/">Home</Link>
                <Link to="/browseArticles">Browse Articles</Link>
                <Link to="/submitArticle">Submit Article</Link>
            </nav>
        </div>
    )
}

export default NavBar;
