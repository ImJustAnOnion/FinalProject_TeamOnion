import PropTypes from 'prop-types';

export default function Game ({guess}) {
    Game.propTypes = {
        guess: PropTypes.arrayOf(PropTypes.string).isRequired,
        word: PropTypes.string.isRequired,
        attempt: PropTypes.number.isRequired
    }
    return (

        <div id="col">
        {new Array(6).fill().map((_, i) => (
        <div id="grid" className="mb-3 grid grid-cols-5 gap-3" key={i}>
            { new Array(5).fill().map((_, j) => (
                
                <div className="h-16 w-16 border uppercase items-center justify-center" key={j}>
                    {guess[i]}
                </div>
            ))}

        </div>
        ))}
        </div>
    )

}