import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Game from './components/Game/Game';
import './App.css';

function App() {
  const [word, setWord] = useState('');
  const [hint, setHint] = useState('');
  const [scrambledWord, setScrambledWord] = useState();
  const [guess, setGuess] = useState('')
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/api/random-word').then((response) => {
      setWord(response.data.word);
      setScrambledWord(scrambleWord(response.data.word));
      console.log(response.data.word);
    }).catch((error) => {
      console.error('Failed to get word', error);
    });
  }, [])

  const scrambleWord = (origWord) => {
    return origWord.split('').sort(() => Math.random() - 0.5).join('');
  }
  

  const checkGuess = () => {
    if (guess.toLowerCase() === word.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  }

  const playAgain = () => {
    setGuess('');
    setIsCorrect(false);
    setHint('');
    axios.get('http://localhost:3000/api/random-word').then((response) => {
      setWord(response.data.word);
      setScrambledWord(scrambleWord(response.data.word));
      console.log(response.data.word);
    }).catch((error) => {
      console.error('Failed to get word', error);
    });
  }

  const showHint = () => {
    axios.get(`http://localhost:3000/api/hint/${word}`).then((response) => {
      console.log(response.data.word);
    }).catch((error) => {
      console.error('Failed to get hint', error);
    });
  }

  return (
    <>
      <div>
        <h1>ekreb - a word unscramble game</h1>
        <p>Unscramble the word:</p>
        <p>{scrambledWord}</p>
        <Game
          guess={guess}
          setGuess={setGuess}
          wordLength={word.length}
          isCorrect={isCorrect}
        />
        {isCorrect ? (
          <div>
            <p>Congratulations! You've unscrambled the word!</p>
            <p>Definition: {hint}</p>
            <button onClick={playAgain}>Play Again</button>
          </div>
        ) : (
          <>
            <button onClick={checkGuess} disabled={false}>Submit</button>
            <button onClick={showHint}>Get Hint</button>
          </>
        )}
    </div>
    </>
  )
}

export default App
