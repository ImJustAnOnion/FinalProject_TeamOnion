import { useEffect } from "react";
import Row from './Row.jsx';
import PropTypes from 'prop-types';

export default function Grid({ currentGuess }) {
    
    useEffect(() => {

    }, []);


    return (
        <div>
        {currentGuess.map((letter, i) => {
            return <Row key={i} />
        })}
        </div>
    );



}
Grid.propTypes = {
    currentGuess: PropTypes.string.isRequired,
    guesses: PropTypes.array.isRequired,
    attempt: PropTypes.number.isRequired
}

