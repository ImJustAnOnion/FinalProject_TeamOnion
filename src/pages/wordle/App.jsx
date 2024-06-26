import { useState, useEffect } from 'react';
import './App.css';
import Wordle from './components/Wordle';

export default function App() {
  const [solution, setSolution] = useState(null);

  useEffect(() => { 
        //const [solution, setSolution] = useState("");
        const isValidWord = async (word) => {
                const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                .then((response) => response.json());
                console.log(Array.isArray(response) && response.length > 0);
                return Array.isArray(response) && response.length > 0;
            }

        const fetchData = async () => {
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
        const fetchDataSetSolution = async () => {
          const word = await fetchData();
          setSolution(word);
        }
        fetchDataSetSolution();
}, [setSolution]);

  return (
    <div id="app">
      {solution && <Wordle solution={solution} />}
    </div>
  );

}
