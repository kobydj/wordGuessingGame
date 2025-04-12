// Display the masked word (_ _ _)

// Input for guessing a letter.

// Show remaining attempts and previous guesses.

// Game ends when win/loss condition is met.

import React, { useEffect, useState } from 'react';
import { fetchRandomWord } from '../api/wordApi';

type GameProps = {
    difficulty: number;
    onGameOver: (won: boolean, word: string) => void;
};


const Game: React.FC<GameProps> = ({ onGameOver, difficulty }) => {
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [attemptsLeft, setAttemptsLeft] = useState(7);
  const [input, setInput] = useState('');

  useEffect(() => {
    if(difficulty >=  4 && difficulty <= 10){
        fetchRandomWord(difficulty).then(setWord);
    }else{
        fetchRandomWord().then(setWord);
    }
  }, []);

  useEffect(() => {
    if (word && isGameWon()) {
      onGameOver(true, word);
    }
    if (attemptsLeft <= 0) {
      onGameOver(false, word);
    }
  }, [guessedLetters, attemptsLeft]);

  const isGameWon = () =>
    word.split('').every((char) => guessedLetters.includes(char));

  const handleGuess = (letter: string) => {
    if (!/^[a-zA-Z]$/.test(letter) || guessedLetters.includes(letter)) return;
    setGuessedLetters([...guessedLetters, letter]);
    if (!word.includes(letter)) {
      setAttemptsLeft((prev) => prev - 1);
    }
  };

  const maskedWord = word
    .split('')
    .map((c) => (guessedLetters.includes(c) ? c : '_'))
    .join(' ');

  return (
    <div  className="text-center">
      <h2>Guess the word:</h2>
      <p>{maskedWord}</p>
      <p>Guesses left: {attemptsLeft}</p>
      <input
        type="text"
        maxLength={1}
        value={input}
        onChange={(e) => {
          const val = e.target.value.toLowerCase();
          setInput('');
          handleGuess(val);
        }}
      />
      <p>Guessed letters: {guessedLetters.join(', ')}</p>
      
    </div>
  );
};

export default Game;
