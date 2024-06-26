import Button from "../Button/Button";
import "./CoverScreen.css";

const CoverScreen = ({ score, onStartGame, duration }) => (
    <div className="intro">
        <h4>(Ainsley)</h4>
        <h1 className="title">{score > -1 ? "Game over!" : "Pop-a-balloon! 🎈"}</h1>
        {score > -1 ? (
        <p className="description">
            {`You scored ${
            score === 0 ? "nothing" : `${score} ${score > 1 ? "hits" : "hit"}`
            }`}
        </p>
        ) : (
        <p className="description">
            A simple {duration}-second balloon game.
            Find the tutorial <a href="https://blog.logrocket.com/using-react-web-games/#constructing-helper-components">here.</a>
        </p>
        )}
        <div className="action">
        <Button onClick={onStartGame} width={"wide"}>
            {score > -1 ? "Play again" : "Start Game"}
        </Button>
        </div>
    </div>
);

export default CoverScreen;