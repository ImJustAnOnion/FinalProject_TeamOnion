import { useEffect } from 'react';
import MenuBar from './MenuBar';
import Grid from './Grid';
import useWordle from '../hooks/useWordle';
import PropTypes from 'prop-types';

export default function Wordle({ solution }) {
    const { currentGuess, handleKeyup, guesses, isCorrect, attempt } = useWordle(solution);

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)
        return () => {
            window.removeEventListener('keyup', handleKeyup)
        }
    }, [handleKeyup]);

    useEffect(() => {

        console.log(guesses, isCorrect, attempt);

    }, [guesses, isCorrect, attempt])

    return (
    <div id="app" className='w-screen h-screen'>
      <header>
          <h1 className='uppercase font-bold tracking-widest'>Wordle</h1>
          <div id="option-bar">
              <MenuBar />
              <div>word - {solution}</div>
              <div>current guess - {currentGuess}</div>
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