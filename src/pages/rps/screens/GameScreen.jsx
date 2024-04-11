import {PropTypes} from 'prop-types';
import { useState } from 'react';
import { RockPaperScissors } from '../RPS';

const GameScreen = ({name}) => {
  const [ game, setGame ] = useState(new RockPaperScissors(name));
  const [ selection, setSelection ] = useState(`rock`);
  // const [ score, setScore ] = useState({user: 0, cpu: 0});
  const [ userScore, setUserScore ] = useState(0);
  const [ cpuScore, setCpuScore ] = useState(0);
  const [ history, setHistory ] = useState([]);    
  
  //condensed this to match my og react-rps - L
  const onGoButtonClick = () => {
    game.play(selection);
    setUserScore(game.score.user)
    setCpuScore(game.score.cpu)
    setHistory([...game.gameHistoryLog]);
  }

  //never coded this bit so im keeping it - L
  const onResetGameButtonClick = () => {
    console.log(`Reset button was clicked`);
    setGame(new RockPaperScissors(name));
    // setScore({user: 0, cpu: 0});
    setUserScore(0)
    setCpuScore(0)
    setHistory([]);
  }

  //seemed unnecessary to change most of this if its basically the same - L
  return (
    <div id="game-screen">
      <div id="score-tally">
        <p id="score"> {name}: {userScore} v CPU: {cpuScore}</p>
        <span>{selection}</span>
      </div>

      <form id="game-form">
        <div className="form-group">
          <label htmlFor="user-selection">Select your choice:</label>
          <select 
            className="custom-select" 
            id="user-selection" 
            name="user-selection" 
            value={selection}
            onChange={(e) =>setSelection(e.target.value)}
          >
            <option id="rock" value="rock">
              Rock
            </option>
            <option id="paper" value="paper">
              Paper
            </option>
            <option id="scissors" value="scissors">
              Scissors
            </option>
          </select>
        </div>
        <button className="btn btn-success" type="button" id="go-button" onClick={onGoButtonClick}>
          Go!
        </button>
      </form>

      <div id="game-history">
        <ul>
          {history.map((historyItem, index) => (
            <li key={index}>{historyItem}</li>
          ))}
        </ul>
      </div>
      <button id="reset-game-button" className="btn btn-secondary" onClick={onResetGameButtonClick}>
        Reset
      </button>
    </div>
  );
};
GameScreen.propTypes = {
  name: PropTypes.string.isRequired,
};

export default GameScreen;
