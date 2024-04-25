//import { useEffect } from 'react';
import Button from './Button';
import { game } from '../data/game';

const MenuBar = () => {





    return (
        <div className="menu-bar flex">
                <h1 className="uppercase font-bold">Wordle</h1>
                <Button />
                <h3>The word is:{game.currentGuess}</h3>
        </div>
    );


}

export default MenuBar;