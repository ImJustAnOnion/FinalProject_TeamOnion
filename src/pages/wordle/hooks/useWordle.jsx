import { useState } from 'react';

const useWordle = (solution) => {

    const [attempt, setAttempt] = useState(0);
    const [currentGuess, setCurrentGuess] = useState("");
    const [guesses, setGuesses] = useState([...Array(6)]);
    const [history, setHistory] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);

    const formatGuess = () => {
        console.log("formatting", currentGuess);
        let solutionArray = [...solution];
        let guessArray = [...currentGuess].map((i) => {
            return { key: i, status: 'unused'}
        })
        
        guessArray.forEach((letter, i) => {
            if (solutionArray.includes(letter.key)) {
                if (solutionArray[i] === letter.key) {
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

    const isValidWord = async (word) => {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        console.log(Array.isArray(data) && data.length > 0);
        return Array.isArray(data) && data.length > 0;
    }

    const addGuess = ( guessArray ) => {
        if (currentGuess === solution) {
            setIsCorrect(true);
        }
        setGuesses((prevGuess) => {
            let newGuesses = [...prevGuess];
            newGuesses[attempt] = guessArray;
            return newGuesses;
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess];
        })
        setAttempt((prevAttempt) => {  
            return prevAttempt + 1;
        })
        setCurrentGuess();
    }

    const handleKeyup = async ({key}) => {
        console.log(key);
        if (/^[a-zA-Z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess(prev => {
                    return prev + key;
                })
            }
        }
        if (key === "Backspace") {
            setCurrentGuess((prev) => {
                return prev.slice(0, - 1);
            })
            return;
        }
        if (key === "Enter") {
            
            if (currentGuess.length < 5) {
                console.log("Incomplete Guess");
                return;
            }
            if (currentGuess.length === 5) {
                if ( await isValidWord(currentGuess)){
                    console.log("valid word");
                    const guess = formatGuess();
                    addGuess(guess);
                    setCurrentGuess("");
                    console.log(guess, attempt);
                    if (attempt >= 5) {
                        console.log("All Guesses Used.");
                        return;
                    } 
                }
                if (!isValidWord(currentGuess)) {
                    console.log("Invalid word");
                    return;
                }  
                if (history.includes(currentGuess)) {
                console.log("Already guessed");
                return;
                }
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
export default useWordle;
