export class Wordle { 
  constructor() {
    this.gameConfig = {
      rows: 5,
      cols: 5,
      word: "",
    };

    this.gameState = {
      currentAttempt: 0,
      currentPosition: 0,
      currentGuess: "",
    };
  }

  const gameConfig = {
    rows: 5,
    cols: 5,
    word: "",
  };

  const gameState = {
    currentAttempt: 0,
    currentPosition: 0,
    currentGuess: "",
  };

  function addLetter(letter, row, col){
      const cell = document.getElementById(`${row}-${col}`);
      cell.innerText = letter;
  }

  function isLetter(letter) {
      return letter.length === 1 && letter.match(/[a-z]/i);
  }

  async function getRandomWord() {
      do{   
          try {
              const response = await fetch('https://it3049c-hangman.fly.dev/word')
              .then((response) => response.json());
              if (await isValidWord(response.word)){
                  return response.word;
              }
          }
          catch(error) {
              console.log('Error fetching word. Trying Again');
          }
      } while (isValidWord);
  }

  function setupGrid() {
    for (let row = 0; row < gameConfig.rows; row++) {
      for (let col = 0; col < gameConfig.cols; col++) {
        addCellToGrid(row, col);
      }
    }
  }

  async function startGame() {
    gameConfig.word = await getRandomWord();
    console.log(gameConfig.word);
    setupGrid();
  }

  function addCellToGrid(row, column) {
    const cell = document.createElement("div");
    cell.classList.add("letter");
    cell.id = `${row}-${column}`;
    wordleGrid.appendChild(cell);
  }

  function revealAttemptResult() {
    const results = checkWord(gameConfig.word, gameState.currentGuess);
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

  startGame();


  const newLetter = document.addEventListener(`keydown`, async (event) => {
    console.log(event.key);

    if (event.key == "Enter") {
      console.log(gameState.currentGuess);
      if (gameState.currentPosition < gameConfig.cols - 1) {
        console.log("Incomplete word");
        return;
      }
      if (await isValidWord(gameState.currentGuess)) {
        revealAttemptResult();

        if (gameState.currentGuess == gameConfig.word) {
          console.log("Yes!");
        }
        if (gameState.currentAttempt === gameConfig.rows - 1) {
          console.log("Game Over");
        }
      } else {
        console.log("Invalid Word");
        return;
      }

      //check if word
      //check positions
      //update colors
      gameState.currentAttempt++;
      gameState.currentPosition = 0;
      gameState.currentGuess = "";
    }

    if (event.key === "Backspace") {
      console.log(gameState.currentPosition);
      if (gameState.currentPosition === 0) {
        return;
      }
      if (gameState.currentPosition !== 0) {
        gameState.currentPosition--;
        addLetter("", gameState.currentAttempt, gameState.currentPosition);
        gameState.currentGuess = gameState.currentGuess.substring(
          0,
          gameState.currentGuess.length - 1
        );
        return;
      }
    }

    if (isLetter(event.key)) {
      addLetter(event.key, gameState.currentAttempt, gameState.currentPosition);
      gameState.currentGuess += event.key;
      if (gameState.currentPosition < gameConfig.cols) {
        gameState.currentPosition++;
      }
    }
  });


function checkWord(word, guess) {
  const results = [];
  guess.split('').forEach((letter, index) => {
      if (word.includes(letter) && word[index] !== letter) {
          console.log('Letter is in the wrong position');
          results.push(`misplaced`);
      }
      if (word[index] === letter) {
          console.log('Letter is in the right position');
          results.push(`correct`);
      }
      if (!word.includes(letter)){
          console.log('Letter is not in the word');
          results.push(`wrong`);
      }
  });

  return results;
}

async function isValidWord(word){
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => response.json());
    console.log(Array.isArray(response) && response.length > 0);
    return Array.isArray(response) && response.length > 0;
}

}