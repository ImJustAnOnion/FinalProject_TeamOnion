import { useState } from "react";
import './App.css'

//Not that complex, best to keep this one. - L
function Square({ value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick}>
        {value}
        </button>
    );
}

//As to not "copy" everything, I did it the long way - L
function calculateWinner(squares) {
    if (squares[0] && squares[0] === squares[1] && squares[0] === squares[2]) {
        return squares[0];
    }
    else if (squares[3] && squares[3] === squares[4] && squares[3] === squares[5]) {
        return squares[3];
    }
    else if (squares[6] && squares[6] === squares[7] && squares[6] === squares[8]) {
        return squares[6];
    }
    else if (squares[0] && squares[0] === squares[3] && squares[0] === squares[6]) {
        return squares[0];
    }
    else if (squares[1] && squares[1] === squares[4] && squares[1] === squares[7]) {
        return squares[1];
    }
    else if (squares[2] && squares[2] === squares[5] && squares[2] === squares[8]) {
        return squares[3];
    }
    else if (squares[0] && squares[0] === squares[4] && squares[0] === squares[8]) {
        return squares[0];
    }
    else if (squares[2] && squares[2] === squares[4] && squares[2] === squares[6]) {
        return squares[2];
    }

    return null;

  }

export default function Board({xIsNext, squares, onPlay}) {
    //From react tutorial, it works the best this way. - L
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)){
            return;
        }

        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }

    //Edited from the react tutorial. - L
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "winner: " + winner;
    }
    else {
       if (xIsNext === true){
            status = "Next Player: X";
       }
       else if (xIsNext === false){
            status = "Next Player: O";
       }
    }

    //From react tutorial, it works the best this way. - L
    return (
        <>
        <div className='status'>{status}</div>
        <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
        </>
    )
}