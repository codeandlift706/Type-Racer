import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function NavBar() {
    const isHomepage = window.location.pathname === "/";

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <ul className="flex-row">
                    <li className="mx-1">
                        <Link to="/profile/me"> 
                            Profile 
                        </Link>
                    </li>
                    <li className="mx-1">
                        <a href="/" onClick={() => Auth.logout()}>
                            Logout
                        </a>
                    </li>
                    {!isHomepage && <li className="mx-1"><Link to="/">Homepage</Link></li>}
                </ul>
            );
        } else {
            return (
                <ul className="flex-row">
                    <li className="mx-1">
                        <Link to="/signup">
                            Signup
                        </Link>
                    </li>
                    <li className="mx-1">
                        <Link to="/login">
                            Login
                        </Link>
                    </li>
                </ul>
            );
        }
    }

    return (
        <header className="flex-row px-1">
            <h1>
                <Link to="/score">
                    Scoreboard
                </Link>
            </h1>

            <nav>
                {showNavigation()}
            </nav>
        </header>
    );
}

export default NavBar;