import PropTypes from 'prop-types';

export default function WinLose({ isCorrect, attempt }) {
    if (isCorrect) {
        return (
            <div id="win">
            <h2>You Win!</h2>
            </div>
        );
    }
    if (attempt >= 6) {
        return (
            <div id="lose">
            <h2>You Lose!</h2>
            </div>
        );
    }
    else return null;
}
WinLose.propTypes = {
    isCorrect: PropTypes.bool,
    attempt: PropTypes.number
}
