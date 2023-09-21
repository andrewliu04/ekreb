import React from "react";

const Game = ({scrambledWord}) => {
    return (
        <div class="container">
        <div class="game">
            <div class="word-grid">
                <div class="letter"></div>
                <div class="letter"></div>
                <div class="letter"></div>
                <div class="letter"></div>
                <div class="letter"></div>
            </div>
            <div class="scrambled-word">
                <p>Scrambled Word: {scrambledWord}</p>
            </div>
            <input type="text" id="guess-input" placeholder="Type your guess"></input>
            <button id="check-button">Check</button>
        </div>
    </div>
    )
};

export default Game;