import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function NavBar() {

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <ul className="flex-row">
                    <li className="mx-1">
                        <Link to="/home"> /* if the user is logged in, do we want them to see their profile? */
                            Home 
                        </Link>
                    </li>
                    <li className="mx-1">
                        <a href="/" onClick={() => Auth.logout()}>
                            logout
                        </a>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="flex-row">
                    <li className="mx-1">
                        <Link to="/signup">
                            signup
                        </Link>
                    </li>
                    <li className="mx-1">
                        <Link to="/loginForm">
                            login
                        </Link>
                    </li>
                </ul>
            );
        }
    }

    return (
        <header className="flex-row px-1">
            <h1>
                <Link to="/scoreboard">
                    scoreboard
                </Link>
            </h1>

            <nav>
                {showNavigation()}
            </nav>
        </header>
    );
}

export default NavBar;