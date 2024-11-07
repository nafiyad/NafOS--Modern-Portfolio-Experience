import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

export const Snake = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20),
    };
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const moveSnake = () => {
      setSnake(prev => {
        const newSnake = [...prev];
        const head = { ...newSnake[0] };

        switch (direction) {
          case 'UP': head.y -= 1; break;
          case 'DOWN': head.y += 1; break;
          case 'LEFT': head.x -= 1; break;
          case 'RIGHT': head.x += 1; break;
        }

        // Check collision with walls
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
          setGameOver(true);
          return prev;
        }

        // Check collision with self
        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prev;
        }

        newSnake.unshift(head);

        // Check if snake ate food
        if (head.x === food.x && head.y === food.y) {
          setFood(generateFood());
          setScore(s => s + 1);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, 150);
    return () => clearInterval(gameInterval);
  }, [direction, food, generateFood, gameStarted, gameOver]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': setDirection('UP'); break;
        case 'ArrowDown': setDirection('DOWN'); break;
        case 'ArrowLeft': setDirection('LEFT'); break;
        case 'ArrowRight': setDirection('RIGHT'); break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="flex flex-col items-center h-full bg-black/90 p-4 rounded-lg">
      <div className="mb-4 text-white">
        <h2 className="text-xl font-bold">Score: {score}</h2>
      </div>

      {!gameStarted ? (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={resetGame}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Start Game
        </motion.button>
      ) : (
        <div className="relative w-[300px] h-[300px] bg-gray-800 rounded-lg overflow-hidden">
          {/* Food */}
          <motion.div
            className="absolute w-3 h-3 bg-red-500 rounded-full"
            style={{
              left: `${(food.x * 100) / 20}%`,
              top: `${(food.y * 100) / 20}%`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />

          {/* Snake */}
          {snake.map((segment, index) => (
            <motion.div
              key={index}
              className="absolute w-3 h-3 bg-green-500 rounded-sm"
              style={{
                left: `${(segment.x * 100) / 20}%`,
                top: `${(segment.y * 100) / 20}%`,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            />
          ))}

          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <button
              onClick={() => setDirection('UP')}
              className="w-12 h-12 bg-white/10 rounded-lg"
            >↑</button>
            <div className="flex gap-2">
              <button
                onClick={() => setDirection('LEFT')}
                className="w-12 h-12 bg-white/10 rounded-lg"
              >←</button>
              <button
                onClick={() => setDirection('DOWN')}
                className="w-12 h-12 bg-white/10 rounded-lg"
              >↓</button>
              <button
                onClick={() => setDirection('RIGHT')}
                className="w-12 h-12 bg-white/10 rounded-lg"
              >→</button>
            </div>
          </div>
        </div>
      )}

      {gameOver && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center"
        >
          <p className="text-red-500 font-bold mb-2">Game Over!</p>
          <button
            onClick={resetGame}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Play Again
          </button>
        </motion.div>
      )}
    </div>
  );
}; 