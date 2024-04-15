import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <h1>This is the Home Page</h1>
            <p>Disclaimer: By playing any games on this site you are agreeing to sell your soul.</p>
            <ul id="HomepageNav">
                <li><Link to="/rps">Rock Paper Scissors</Link></li>
                <li><Link to="/tictactoe">Tic Tac Toe</Link></li>
                <li><Link to="/balloons">Balloon Pop</Link></li>
                <li><Link to="/memory">Memory Game</Link></li>
            </ul>
        </div>
    );
};

export default HomePage;