import { PropTypes } from "prop-types"

export default function Row({ guess, currentGuess, length }) {
  if (currentGuess) {
      {[...Array(length - guess.length)].map((_,i) => (
        <div key={i}></div>
      ))}
    }

    return (

        <div className="row">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>


    )
}
Row.propTypes = {
    guess: PropTypes.string.isRequired,
    currentGuess: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired
}
