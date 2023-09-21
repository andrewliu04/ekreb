import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hint from './components/Hint';
import Game from './components/Game/Game';
import './App.css';

function App() {
  const [word, setWord] = useState('');
  const [hint, setHint] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [guess, setGuess] = useState('')
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/api/random-word').then((response) => {
      setWord(response.data.word);
      setScrambledWord(scrambleWord(response.data.word));
      console.log(response.data.word);
    });
  }, []);

  const scrambleWord = (origWord) => {
    return origWord.split('').sort(() => Math.random() - 0.5).join('');
  }
  
  

  return (
    <>
      <nav class="navbar">
        <h1>Word Unscramble Game</h1>
      </nav>
      <Game scrambledWord={scrambledWord} />
      <Hint hint={hint} />
    </>
  )
}

export default App
