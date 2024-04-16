export class Wordle { 

  gameConfig = {
    rows: 5,
    cols: 5,
    word: "happy",
  };

  gameState = {
    currentAttempt: 0,
    currentPosition: 0,
    currentGuess: "",
  };

  async setupGame() {
    this.gameConfig.word = await this.getRandomWord();
  }


  addLetter(letter, row, col){
      const cell = document.getElementById(`${row}-${col}`);
      cell.innerText = letter;
  }

  isLetter(letter) {
      return letter.length === 1 && letter.match(/[a-z]/i);
  }

  async getRandomWord() {
    do{   
      try {
        const response = await fetch('https://it3049c-hangman.fly.dev/word')
        .then((response) => response.json());
        if (await this.isValidWord(response.word)){
          return response.word;
        }
      }
      catch(error) {
        console.log('Error fetching word. Trying Again');
      }
    } while (this.isValidWord);
  }

  addCellToGrid(row, column) {
    const cell = document.createElement("div");
    cell.classList.add("letter");
    cell.id = `${row}-${column}`;
    this.wordleGrid.appendChild(cell);
  }

  revealAttemptResult() {
    const results = this.checkWord(this.gameConfig.word, this.gameState.currentGuess);
    return results.map((result, index) => {
      if (result === "correct") {
        return { attempt: this.gameState.currentAttempt, position: index, status: 'correct' };
      }
      if (result === "misplaced") {
        return { attempt: this.gameState.currentAttempt, position: index, status: 'misplaced' };
      }
      if (result === "wrong") {
        return { attempt: this.gameState.currentAttempt, position: index, status: 'wrong' };
      }
    });
  }
//startGame();


  async keydownHandler(key) {
      if (key == "Enter") {
        console.log(this.gameState.currentGuess);
        if (this.gameState.currentPosition < this.gameConfig.cols - 1) {
          console.log("Incomplete word");
          return;
        }
        if (await this.isValidWord(this.gameState.currentGuess)) {
          this.revealAttemptResult();

          if (this.gameState.currentGuess == this.gameConfig.word) {
            console.log("Yes!");
          }
          if (this.gameState.currentAttempt === this.gameConfig.rows - 1) {
            console.log("Game Over");
          }
        } else {
          console.log("Invalid Word");
          return;
        }

        //check if word
        //check positions
        //update colors
        this.gameState.currentAttempt++;
        this.gameState.currentPosition = 0;
        this.gameState.currentGuess = "";
      }

      if (key === "Backspace") {
        console.log(this.gameState.currentPosition);
        if (this.gameState.currentPosition === 0) {
          return;
        }
        if (this.gameState.currentPosition !== 0) {
          this.gameState.currentPosition--;
          this.addLetter("", this.gameState.currentAttempt, this.gameState.currentPosition);
          this.gameState.currentGuess = this.gameState.currentGuess.substring(
            0,
            this.gameState.currentGuess.length - 1
          );
          return;
        }
      }

      if (this.isLetter(key)) {
        this.addLetter(key, this.gameState.currentAttempt, this.gameState.currentPosition);
        this.gameState.currentGuess += key;
        if (this.gameState.currentPosition < this.gameConfig.cols) {
          this.gameState.currentPosition++;
        }
      }
  }


  checkWord(word, guess) {
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

  async isValidWord(word){
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => response.json());
    console.log(Array.isArray(response) && response.length > 0);
    return Array.isArray(response) && response.length > 0;
  }
}