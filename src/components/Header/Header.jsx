import React, { useEffect, useState } from "react";
import "./Header.css";

function Header({ onNextWord, points, setPoints }) {
  const [timer, setTimer] = useState(20);

  // Manages the state of the timer
  useEffect(() => {
    if (timer === 0) {
      onNextWord();
      setTimer(20);
      setPoints(points - 100);
    }

    // Updates timer every second
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : prevTimer));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, onNextWord]);

  return (
    <div className="header">
      <div className="left-header">Total Points: {points} </div>
      <h1 className="title-header">ekreb - a word unscramble game</h1>
      <p className="right-header">Timer: {timer}</p>
    </div>
  );
}

export default Header;
