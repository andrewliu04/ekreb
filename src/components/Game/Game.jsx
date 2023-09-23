import React, { useState, useEffect } from "react";
import "./Game.css";

const Game = ({ guess, setGuess, wordLength, isCorrect, scrambledWord }) => {
  const [gridFocus, setGridFocus] = useState(0);

  //Manages the focus for the input grid
  useEffect(() => {
    if (gridFocus >= 0 && gridFocus < wordLength) {
      document.getElementById(`input-${gridFocus}`).focus();
    }
  }, [gridFocus, wordLength]);

  // Handles user input for the grid
  const handleInputChange = (e, index) => {
    const inputValue = e.target.value;
    // Allows A-Z, a-z, space, hyphen
    if (/^[a-zA-Z\s-]$/.test(inputValue) || inputValue === "") {
      const newGuess = guess.split("");
      newGuess[index] = inputValue;
      setGuess(newGuess.join(""));

      // Set the input focus to the next grid space, if not the last character
      if (index < wordLength - 1 && inputValue !== "") {
        setGridFocus(index + 1);
      }
    }
  };

  // Handles the event of user pressing backspace
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      const newGuess = guess.split("");
      newGuess[index] = "";
      setGuess(newGuess.join(""));

      // Set input focus to the previous grid space, if not the first character
      if (index > 0) {
        setGridFocus(index - 1);
      }
    }
  };

  const cells = [];
  for (let i = 0; i < wordLength; i++) {
    cells.push(
      <input
        key={i}
        id={`input-${i}`}
        type="text"
        value={guess[i] || ""}
        onChange={(e) => handleInputChange(e, i)}
        onKeyDown={(e) => handleBackspace(e, i)}
        maxLength={1}
        className="square-input"
        disabled={isCorrect}
      />
    );
  }

  return (
    <>
      <p className="unscramble-word">Unscramble the word:</p>
      <p className="scrambled-word">{scrambledWord}</p>
      <div className="grid">{cells}</div>
    </>
  );
};

export default Game;
