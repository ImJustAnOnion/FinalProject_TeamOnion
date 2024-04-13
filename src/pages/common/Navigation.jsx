import { Link, Outlet } from "react-router-dom";

const Navigation = () => {
    return (
        <div>
            <div id="NavBar">
                <nav>
                    <ul id="NavItems">
                        <li id="NavItem">
                            <Link to="/">Home Page</Link>
                        </li>
                        <li id="NavItem">
                            <Link to="/rps">Rock Paper Scissors</Link>
                        </li>
                        <li id="NavItem">
                            <Link to="/tictactoe">Tic Tac Toe</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <main>
                <Outlet />
            </main>
            <footer>Coded by Lai Connelly, Ainsley Smith, & Eric Atkins</footer>
        </div>
    );
};

export default Navigation;