import Button from './Button';
import PropTypes from 'prop-types';
import WinLose from './Winlose';

const MenuBar = ({ solution, isCorrect, attempt }) => {



    return (
        <div className="menu-bar">
                <h1 className='uppercase font-bold tracking-widest'>Wordle</h1>
                <Button />
                <h3>The word is: {solution}</h3>
                <WinLose isCorrect={isCorrect} attempt={attempt}/>
        </div>
    );


}

MenuBar.propTypes = {
    solution: PropTypes.string.isRequired,
    currentGuess: PropTypes.string,
    isCorrect: PropTypes.bool,
    attempt: PropTypes.number

}
export default MenuBar;