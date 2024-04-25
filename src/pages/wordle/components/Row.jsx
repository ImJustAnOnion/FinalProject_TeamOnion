import { PropTypes } from "prop-types"

export default function Row({ guess, currentGuess }) {
  if (guess) {
        return(
        <div className="past-row">
        {guess.map((letter, i) => (
            <div key={i} className={letter.status}>{letter.key}</div>
        ))}
        </div>
        )
    }

    if (currentGuess) {

        const letters = currentGuess.split("");

        return (
            <div className="current-row">
                {letters.map((letter, i) => (
                    <div key={i} className="cell">{letter}</div>
                ))}
                {[...Array(5 - letters.length)].map((_, i) => (
                    <div key={i}></div>
                ))}
            </div>
        )

    }

    return (

        <div className="row">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>


    )
}
Row.propTypes = {
    guess: PropTypes.string,
    currentGuess: PropTypes.string
}
