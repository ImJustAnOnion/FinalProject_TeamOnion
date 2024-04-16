import MenuBar  from './components/MenuBar'
import Game from './components/Game'
import { Wordle } from './components/wordle'
import { useState, useEffect, useMemo } from 'react'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true);
  const wordle = useMemo(() => new Wordle(), []);

  useEffect(() => {
    wordle.setupGame().then(() => setLoading(false));
    const handleKeyDown = async (event) => {
      wordle.keydownHandler(event.key);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [wordle])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div id="app" className='flex h-screen w-screen flex-col items-center justify-center'>
      <MenuBar />
      <Game word={wordle.gameConfig.word} guess={wordle.gameState.currentGuess} attempt={wordle.gameState.currentAttempt}/>
    </div>
  )
}

export default App;
