import Grid from './components/Grid'; 
import Button from './components/Button';
import './App.css';


export default function App() {


  return (
    <div id="app" className='w-screen'>
      <header>
          <h1 className='uppercase font-bold tracking-widest'>Wordle</h1>
          <div id="option-bar">
              <Button />
          </div>
      </header>
      <div id="game">
        <Grid />
      </div>
    </div>
  );
}
