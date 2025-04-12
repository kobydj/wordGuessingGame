// Show win/loss message and correct word.

// "Play Again" button resets state.

import React from 'react';

type GameOverProps = {
  won: boolean;
  word: string;
  onRestart: () => void;
};

const GameOverScreen: React.FC<GameOverProps> = ({ won, word, onRestart }) => {
  return (
    <div className="text-center">
      <h2>{won ? 'You Won!' : 'You Lost!'}</h2>
      <p>The word was: <strong>{word}</strong></p>
      <button className="btn btn-primary btn-lg" onClick={onRestart}>Play Again</button>
    </div>
  );
};

export default GameOverScreen;
