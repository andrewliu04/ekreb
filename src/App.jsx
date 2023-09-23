import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Game from "./components/Game/Game";
import Header from "./components/Header/Header";
import { useUpdateEffect } from "./useUpdateEffect";

function App() {
  const [word, setWord] = useState("");
  const [hint, setHint] = useState("");
  const [scrambledWord, setScrambledWord] = useState();
  const [guess, setGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    fetchRandomWord();
  }, [correctCount]);

  // Toast popup when "Get Hint" is clicked
  useEffect(() => {
    if (hint) {
      toast.info(`Hint: ${hint}`, {
        progressClassName: "toast-info",
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        onClose: setHint(""),
      });
    }
  }, [hint]);

  // Custom hook similar to useEffect, does not update on first render
  useUpdateEffect(() => {
    const updatePoints = () => {
      const updatedPoints = calculatePoints(frequency);
      setPoints(updatedPoints);
    };

    updatePoints();
  }, [frequency]);

  // Fetch random word from WordsAPI
  const fetchRandomWord = () => {
    if (correctCount < 5) {
      axios
        .get("http://localhost:3000/api/random-word")
        .then((response) => {
          setWord(response.data.word);
          setScrambledWord(scrambleWord(response.data.word));
          setIsCorrect(false);
          setGuess("");
          setHint("");
        })
        .catch((error) => {
          console.error("Failed to get word", error);
        });
    }
  };

  // Logic for scrambling the random word
  const scrambleWord = (origWord) => {
    return origWord
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  };

  // Check if user input matches the given word
  const checkGuess = () => {
    if (guess.toLowerCase() === word.toLowerCase()) {
      setIsCorrect(true);
      setCorrectCount(correctCount + 1);

      // Fetch frequency data to add correct amount of points
      fetchFrequencyData(word);

      // Display toast for correct or incorrect guess
      toast.success("Correct!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      setIsCorrect(false);
      toast.error("Incorrect!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  // Fetch frequency data from WordsAPI
  const fetchFrequencyData = (word) => {
    axios
      .get(`http://localhost:3000/api/freq/${word}`)
      .then((response) => {
        if (
          response.data.frequency &&
          response.data.frequency.zipf !== undefined
        ) {
          setFrequency(response.data.frequency.zipf);
          calculatePoints(frequency);
        } else {
          setFrequency(1.1);
          calculatePoints(1.1);
        }
      })
      .catch((error) => {
        console.error("Failed to get frequency", error);
      });
  };

  // Fetch hint data (definition) from WordsAPI
  const showHint = () => {
    axios
      .get(`http://localhost:3000/api/hint/${word}`)
      .then((response) => {
        setHint(response.data.hint);
      })
      .catch((error) => {
        console.error("Failed to get hint", error);
      });
  };

  //Fetches a random word when time runs out or user guesses correctlyy
  const handleNextWord = () => {
    fetchRandomWord();
  };

  //Calculates amount of points user receives based on difficulty/frequency of the scrambled wordd
  const calculatePoints = (frequency) => {
    const scale = 7.7 - frequency; // the frequency ranges from 1 to about 7.5
    const basePoints = 100;
    const earnedPoints = basePoints * scale;

    return Math.round(points + earnedPoints);
  };

  return (
    <>
      <Header
        onNextWord={handleNextWord}
        points={points}
        setPoints={setPoints}
      />
      <div>
        <Game
          guess={guess}
          setGuess={setGuess}
          wordLength={word.length}
          isCorrect={isCorrect}
          scrambledWord={scrambledWord}
        />
      </div>
      {correctCount === 5 ? (
        <>
          <p>Congratulations! You've unscrambled 5 words!</p>
          <button
            onClick={() => {
              setCorrectCount(0);
              setPoints(0);
            }}
          >
            Play Again
          </button>
        </>
      ) : (
        <>
          <button onClick={checkGuess}>Submit</button>
          <button onClick={showHint}>Get Hint</button>
        </>
      )}
      <ToastContainer />
    </>
  );
}

export default App;
