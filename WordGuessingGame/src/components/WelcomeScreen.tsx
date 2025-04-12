// Show the game title.

// "Start Game" button to fetch a word and begin.

import React, { useState } from 'react';

type WelcomeScreenProps = {
  onStart: (difficulty: number) => any;
  
};


const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
      const [difficulty, setDif] = useState( '' );

      const handleStartClick = () => {
        const val = parseInt(difficulty);
        const validated = !isNaN(val) && val >= 4 && val <= 10 ? val : 0; 
        onStart(validated);
      };
    
  return (
    <div className="text-center">
      <h1>Welcome to the Word Guessing Game!</h1>
      <p>Guess the hidden word one letter at a time. You get incorrect 7 guesses.</p>
      <button className="btn btn-primary btn-lg" onClick={handleStartClick}>Start Game</button>
      <p>Optional specify word length between 4-10 letters:</p>

      <select
  className="form-select"
  value={difficulty}
  onChange={(e) => setDif(e.target.value)}
>
  <option value="0">random</option>
  {[...Array(7)].map((_, i) => {
    const val = i + 4;
    return (
      <option key={val} value={val}>
        {val} letters
      </option>
    );
  })}
</select>
      {/* <input
        type="number"
        maxLength={0}
        value={difficulty}
        max={10}
        min={4}
        placeholder="Enter word length"
        onChange={(e) => {
            const val = e.target.value;            if (val === '') {
                setDif('');
                return;
              }
                        const num = parseInt(val, 10);
              if (!isNaN(num) && num >= 4 && num <= 10) {
                setDif(val);
              }         
        }}
      /> */}
    </div>
  );
};

export default WelcomeScreen;