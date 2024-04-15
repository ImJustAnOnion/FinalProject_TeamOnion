import MenuBar  from './components/MenuBar'
import Game from './components/Game'
import './App.css'

function App() {
  return (
    <div id="app" className='flex h-screen w-screen flex-col items-center justify-center'>
      <MenuBar />
      <Game word={'tests'} guess={'guess'} win={false}/>
    </div>
  )
}

export default App;
