import './GameOver.css';

export default function GameOver({highestScore, overlayStyle, modalStyle, resetGame}) {
    return (
        <div id="overlay" style={overlayStyle}>
            <div id="game-over-modal" style={modalStyle}>
                <h2>You lost...</h2>
                <h3>Highest Score: {highestScore}</h3>
                <button onClick={resetGame}>Ok</button>
            </div>
        </div>
    )
}