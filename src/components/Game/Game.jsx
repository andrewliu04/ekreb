import React, { useState, useEffect } from 'react';
import './Game.css'; 

const Game = ({ guess, setGuess, wordLength, isCorrect }) => {
  const [gridFocus, setGridFocus] = useState(0);

  const handleInputChange = (e, index) => {
    const inputValue = e.target.value;
    if (/^[a-zA-Z\s]$/.test(inputValue) || inputValue === '') {
      const newGuess = guess.split('');
      newGuess[index] = inputValue;
      setGuess(newGuess.join(''));

      if (index < wordLength - 1 && inputValue !== '') {
        setGridFocus(index + 1);
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newGuess = guess.split('');
      newGuess[index] = '';
      setGuess(newGuess.join(''));

      if (index > 0) {
        setGridFocus(index - 1);
      }
    }
  };

  useEffect(() => {
    if (gridFocus >= 0 && gridFocus < wordLength) {
      document.getElementById(`input-${gridFocus}`).focus();
    }
  }, [gridFocus, wordLength]);

  const cells = [];
  for (let i = 0; i < wordLength; i++) {
    cells.push(
      <input
        key={i}
        id={`input-${i}`}
        type="text"
        value={guess[i] || ''}
        onChange={(e) => handleInputChange(e, i)}
        onKeyDown={(e) => handleKeyDown(e, i)}
        maxLength={1}
        className="square-input"
        disabled={isCorrect}
      />
    );
  }

  return <div className="grid">{cells}</div>;
};

export default Game;