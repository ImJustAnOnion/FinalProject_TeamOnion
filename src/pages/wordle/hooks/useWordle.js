import { useState } from 'react';
import { game } from '../data/game';

const useWordle = (solution) => {

    const [attempt, setAttempt] = useState(0);
    const [currentGuess, setCurrentGuess] = useState("");
    const [isWord, setIsWord] = useState(false);
    const [guesses, setGuesses] = useState([...Array(game.cols)]);
    const [history, setHistory] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);

    const formatGuess = () => {
        console.log("formatting", currentGuess);
        let solutionArray = [...solution]
        let guessArray = [...currentGuess].map((letter) => {
            return { key: letter, status: 'unused'}
        })
        
        guessArray.forEach((letter, i) => {
            if (solutionArray.includes(letter)) {
                if (solutionArray[i] === letter) {
                    guessArray[i].status = 'correct';
                } else {
                    guessArray[i].status = 'misplaced';
                }
            } else {
                guessArray[i].status = 'wrong';
            }
        })

        return guessArray;
    }

    const addGuess = ( guessArray ) => {

    if (currentGuess === solution) {
        setIsCorrect(true);
    }
    setGuesses((prev) => {
        let newGuesses = [...prev];
        newGuesses[attempt] = guessArray;
        return newGuesses;
    })
    setHistory((prev) => {
        return [...prev, currentGuess];
    })
    setAttempt((prev) => {  
        return prev + 1;
    })
}

    const handleKeyup = ({key}) => {
        console.log(key);

        if (key === "Backspace") {

            setCurrentGuess((prev) => {
                return prev.slice(0, - 1);
            })

            return;
        }



        if (key === "Enter") {

            if (attempt < 5) {
                setAttempt((prev) => {
                    return prev + 1;
                })
            }
            if (attempt >= 5) {
                console.log("All Guesses Used.");
                return;
            }
            if (currentGuess.length < 5) {
                console.log("Incomplete Guess");
                return;
            }
            if (currentGuess.length === 5) {
                if (isWord){{
                    console.log("valid word");
                    const guess = formatGuess();
                    addGuess(guess);
                    console.log(guess);
                }
                if (history.includes(currentGuess)) {
                console.log("Already guessed");
                return;
            }
            
            }
            
        }

        if (/^[a-zA-Z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key;
                });
            }
        }


    }

    return {
        attempt,
        currentGuess,
        guesses,
        history,
        isCorrect,
        handleKeyup
    };
}
// Move the export statement outside of the function block
export default useWordle;
