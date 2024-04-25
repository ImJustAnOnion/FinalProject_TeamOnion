

export function checkWord(word, guess) {
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




