import { useEffect, useState } from "react";

const gameConfig = {
    rows: 6,
    cols: 5,
    word: ""
};




async function getRandomWord() {
    do{   
        try {
            const response = await fetch('https://it3049c-hangman.fly.dev/word')
            .then((response) => response.json());
            if (await isValidWord(response.word)){
                console.log(response.word);
                return response.word;
            }
        }
        catch(error) {
            console.log('Error fetching word. Trying Again');
        }
    } while (isValidWord);
}


/*function checkWord(word, guess) {
    const results = [];
    guess.split(``).forEach((letter, index) => {
        console.log(word[index], letter);
        console.log(guess)
        if (word[index] === letter) {
            console.log('Letter is in the right position');
            results.push(`correct`);
        }
        if (!word.includes(letter)){
            console.log('Letter is not in the word');
            results.push(`wrong`);
        }
        if (word.includes(letter) && word[index] !== letter){
            console.log('Letter is in the wrong position');
            results.push(`misplaced`);
        }
        
        
        
    });

    return results;
}*/
function checkWord(word, guess) {
    const results = [];
    const guessLetters = guess.split('');

    for (let index = 0; index < guessLetters.length; index++) {
        const letter = guessLetters[index];
        console.log(word[index], letter);
        console.log(guess)
        if (word[index] === letter) {
            console.log('Letter is in the right position');
            results.push(`correct`);
        } else if (!word.includes(letter)){
            console.log('Letter is not in the word');
            results.push(`wrong`);
        } else if (word.includes(letter)){
            console.log('Letter is in the wrong position');
            results.push(`misplaced`);
        }
    }

    return results;
}

async function isValidWord(word){
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    console.log(Array.isArray(data) && data.length > 0);
    return Array.isArray(data) && data.length > 0;
}

function revealAttemptResult() {
    console.log(gameConfig.word, gameState.currentGuess);
    const results = checkWord(gameConfig.word, gameState.currentGuess);
    console.log(gameConfig.word, gameState.currentGuess, results)
    results.forEach((result, index) => {
        const cell = document.getElementById(
            `${gameState.currentAttempt}-${index}`
        );
        if (result === "correct") {
            cell.classList.add(`correct`);
        }
        if (result === "misplaced") {
            cell.classList.add(`misplaced`);
        }
        if (result === "wrong") {
            cell.classList.add(`wrong`);
        }
    });
}

function addLetter(letter, row, col){
    const cell = document.getElementById(`${row}-${col}`);
    cell.innerText = letter;
}

function isLetter(letter) {
    return letter.length === 1 && letter.match(/[a-z]/i);
}

function addCellToGrid(row, column) {
        const cell = <div className="cell" key ={`${row}-${column}`} id={`${row}-${column}`}/>;
        return cell;
}




export default function Grid() {
    const [cells, setCells] = useState([]);

    const [gameState, setGameState] = useState({
    currentAttempt: 0,
    currentPosition: 0,
    currentGuess: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            gameConfig.word = await getRandomWord();
            console.log(gameConfig.word);
            const gridCells = [];
            for (let row = 0; row < gameConfig.rows; row++) {
                for (let col = 0; col < gameConfig.cols; col++) {
                    gridCells.push(addCellToGrid(row, col));
                }
            }
            setCells(gridCells);
        };

        fetchData();
    }, []);

    useEffect(() => {   
        const handleKeyDown = async (event) => {
            const letter = event.key;
            // Handle letter
            if (isLetter(letter)) {
                addLetter(letter.toUpperCase(), gameState.currentAttempt, gameState.currentPosition);
                setGameState(prevState => ({
                    ...prevState,
                     currentPosition: gameState.currentPosition + 1,
                     currentGuess: gameState.currentGuess + letter.toUpperCase()}));
                console.log(gameState.currentGuess)
            }
            // Handle backspace
            if (event.key === "Backspace") {
                console.log(gameState.currentPosition);
                if (gameState.currentPosition === 0) {
                return;
                }
                if (gameState.currentPosition !== 0) {
                    setGameState(prevState => ({
                    ...prevState,
                     currentPosition: gameState.currentPosition - 1,
                     currentGuess: gameState.currentGuess.substring(0, gameState.currentGuess.length - 1)}));
                return;
                }
            }
            if (event.key == "Enter") {
                console.log(gameState.currentGuess);
                // Check if the word is complete
                if (gameState.currentPosition < 4) {
                console.log("Incomplete word");
                return;
                }
                // Check if the word is valid
                if (await isValidWord(gameState.currentGuess)) {
                    revealAttemptResult();
                    
                // Check if the word is correct
                    if (gameState.currentGuess == gameConfig.word) {
                        console.log("Yes!");
                    }
                    // Check if the game is over
                    if (gameState.currentAttempt === gameConfig.rows - 1) {
                        console.log("Game Over");
                        return;}
                    
                // failsafe if not word
                } else {
                console.log("Invalid Word");
                return;
                }
                setGameState(prevState => ({
                    ...prevState,
                    currentAttempt: prevState.currentAttempt + 1,
                    currentPosition: 0,
                    currentGuess: "",
                }));
            }
            // Handle enter
            /*if (event.key == "Enter") {
                console.log(gameState.currentGuess);
                // Check if the word is complete
                if (gameState.currentPosition < 4) {
                console.log("Incomplete word");
                return;
                }
                // Check if the word is valid
                if (await isValidWord(gameState.currentGuess)) {
                    revealAttemptResult();
                    
                // Check if the word is correct
                    if (gameState.currentGuess == gameConfig.word) {
                        console.log("Yes!");
                    }
                    // Check if the game is over
                    if (gameState.currentAttempt === gameConfig.rows - 1) {
                        console.log("Game Over");
                        return;}
                    
                // failsafe if not word
                } else {
                console.log("Invalid Word");
                return;
                }
                gameState.currentAttempt++;
                gameState.currentPosition = 0;
                gameState.currentGuess = "";
            }

        }*/
        window.addEventListener("keydown", handleKeyDown);
        
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [], gameState.currentGuess, gameState.currentAttempt, gameState.currentPosition]);
    
    return (
        <div id="grid">{cells}</div>
    );
}