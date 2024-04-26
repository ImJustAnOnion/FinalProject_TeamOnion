import { useEffect } from 'react';
//components
import MenuBar from './MenuBar';
import Grid from './Grid';

import useWordle from '../hooks/useWordle';
import PropTypes from 'prop-types';

export default function Wordle({ solution }) {
    const { currentGuess, handleKeyup, guesses, isCorrect, attempt } = useWordle(solution);

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        if(isCorrect){
            console.log("You win!");
            window.removeEventListener('keyup', handleKeyup);

        }
        if(attempt >= 5){
            console.log("You lose!");
            window.removeEventListener('keyup', handleKeyup);
        }


        return () => window.removeEventListener('keyup', handleKeyup);
    }, [handleKeyup, isCorrect, attempt]);

    return (
    <div id="wordle">
      <header>
          <div id="option-bar">
              <MenuBar solution={solution} currentGuess={currentGuess} isCorrect={isCorrect} attempt={attempt}/>
          </div>
      </header>
      <div id="game">
        <Grid currentGuess={currentGuess} guesses={guesses} attempt={attempt}/>
      </div>
    </div>
    )


}
Wordle.propTypes = {
    solution: PropTypes.string.isRequired
}