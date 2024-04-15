import { useState } from 'react';
import Board from './Board';
import './App.css'

export default function Game() {
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];

    //From react tutorial - L
    function handlePlay(nextSquares){
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setXIsNext(!xIsNext);
    }

    //From react tutorial - L
    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0);
    }

    //Minor edits from react tutorial, not much I can change because it's so simple already - L
    const moves = history.map((squares, move) => {
        if (move > 0) {
            return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{'Go to move #' + move}</button>
            </li>);
        } 
        else {
            return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{'Reset the game'}</button>
            </li>);
        }
    });

    //Had to separate board.jsx from app.jsx this part would work properly. - L
    return (
        <div>
            <div className='game-board'>
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className='game-info'>
                <ol>
                    {moves}
                </ol>
            </div>
        </div>
    )
}
