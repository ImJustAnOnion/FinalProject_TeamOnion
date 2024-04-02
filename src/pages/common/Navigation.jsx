import { Link, Outlet } from "react-router-dom";

const Navigation = () => {
    return (
        <div>
            <div id="NavBar">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home Page</Link>
                        </li>
                        <li>
                            <Link to="/rps">Rock Paper Scissors</Link>
                        </li>
                        <li>
                            <Link to="/tictactoe">Tic Tac Toe</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <main>
                <Outlet />
            </main>
            <footer>coded by connellc@mail.uc.edu</footer>
        </div>
    );
};

export default Navigation;