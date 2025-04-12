import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Game from './components/Game';
import GameOverScreen from './components/GameOverScreen';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  const [screen, setScreen] = useState<'welcome' | 'game' | 'gameover'>('welcome');
  const [gameResult, setGameResult] = useState<{ won: boolean; word: string } | null>(null);
  const [difficulty, setDifficulty] = useState<number>(0);


  const startGame = (difficulty: number) => {
    setDifficulty(difficulty);
    setScreen('game');
  };

  const handleGameOver = (won: boolean, word: string) => {
    setGameResult({ won, word });
    setScreen('gameover');
  };

  const restart = () => {
    setGameResult(null);
    setScreen('welcome');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      {screen === 'welcome' && <WelcomeScreen  onStart={startGame} />}
      {screen === 'game' && <Game difficulty = {difficulty} onGameOver={handleGameOver} />}
      {screen === 'gameover' && gameResult && (
        <GameOverScreen won={gameResult.won} word={gameResult.word} onRestart={restart} />
      )}
    </div>
  );
};

export default App;
