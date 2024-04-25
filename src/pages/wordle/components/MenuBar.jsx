//import { useEffect } from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

const MenuBar = ({ solution, currentGuess }) => {



    return (
        <div className="menu-bar">
                <h1 className='uppercase font-bold tracking-widest'>Wordle</h1>
                <Button />
                <h3>The word is:{solution}</h3>
                <h3>Your guess is:{currentGuess}</h3>
        </div>
    );


}

MenuBar.propTypes = {
    solution: PropTypes.string.isRequired,
    currentGuess: PropTypes.string.isRequired
}
export default MenuBar;