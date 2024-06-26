import { useState } from 'react'
import Title from './components/Title/Title';
import Stats from './components/Stats/Stats'
import Cards from './components/Cards/Cards';
import { useEffect } from 'react';
import GameOver from './components/GameOver/GameOver';
import  './App.css'

let overlayStyle = {
  visibility: 'hidden',
  opacity: '0%'
}

let modalStyle = {
  transform: 'translate(0%, 0%)'
}


function App() {
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState('');
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);

  useEffect(() => {
    (gameState === 'next level') && setLevel(level + 1);

    return () => {
      setGameState('');
    }
  }, [gameState, level])

  useEffect(() => {
    if (gameState === 'game over') {
      overlayStyle = {
        opacity: '100%'
      }
      modalStyle = {
        transform: 'translate(0%, 50%)'
      }
    }

    return () => {
      overlayStyle = {
        visibility: 'hidden',
        opacity: '0%'
      }

      modalStyle = {
        transform: 'translate(0%, 0%)'
      }
    }
  }, [gameState])

  useEffect(() => {
    (score > highestScore) && setHighestScore(score);
  }, [score, highestScore])

  const resetGame = () => {
    setGameState('new game');
    setScore(0);
    setLevel(1);
  }

  return (
    <>
      <header>
        <Title/>
        <Stats level={level} score={score} highestScore={highestScore}/>
      </header>
      <main>
        <h2>This is a simple memory game. If you click the same color twice, you lose!</h2>
        <Cards 
        level={level} 
        gameState={gameState}
        setGameState={setGameState} 
        setScore={setScore} score={score}/>
      </main>
      <div id="Gameover">
      <GameOver 
      highestScore={highestScore} 
      overlayStyle={overlayStyle} 
      modalStyle={modalStyle}
      resetGame={resetGame}/>
      </div>
      <div id="footer"> </div>
    </>
  )
}

export default App