import React from "react";
import Game from "./Game/Game";
import Constants from "./Constants";
import './App.css'

const App = () => {
    const constants = {
        gameDuration: 10,
        gameCells: 6,
        balloonWidth: 120,
        threadHeight: 50,
        randomnessLimits: { upper: 3000, lower: 1000 },
        balloonColor: "#9980FA",
    };

    return (
        <Game
            numberOfBalloons={Constants.gameCells}
            gameDuration={Constants.gameDuration}
        />
    );
};

export default App;