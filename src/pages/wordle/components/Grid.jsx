import Row from './Row.jsx';
import PropTypes from 'prop-types';

export default function Grid({ currentGuess, guesses, attempt }) {

    return (
        <div>
        {guesses.map((g, i) => {
            if (attempt === i) {
                return <Row key={i} currentGuess={currentGuess} />
            }
            return <Row key={i} guess={g} />
        })}
        </div>
    );
}

Grid.propTypes = {
    currentGuess: PropTypes.string,
    guesses: PropTypes.array,
    attempt: PropTypes.number
}

