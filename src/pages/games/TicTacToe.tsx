import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Trophy } from 'lucide-react';

type Player = 'X' | 'O' | null;
type Board = Player[];

export const TicTacToe = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player>(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const calculateWinner = (squares: Board): Player => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      setScores(prev => ({
        ...prev,
        [newWinner]: prev[newWinner as keyof typeof prev] + 1
      }));
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const renderSquare = (index: number) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`w-20 h-20 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl font-bold
        border border-white/10 hover:bg-white/10 transition-colors
        ${board[index] === 'X' ? 'text-blue-400' : 'text-pink-400'}`}
      onClick={() => handleClick(index)}
    >
      {board[index] && (
        <motion.span
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="text-3xl"
        >
          {board[index]}
        </motion.span>
      )}
    </motion.button>
  );

  return (
    <div className="flex flex-col items-center h-full bg-black/90 p-4 rounded-lg text-white">
      {/* Score Board */}
      <div className="flex justify-center gap-8 mb-6">
        <div className="text-center">
          <div className="text-blue-400 text-lg font-bold mb-1">Player X</div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-blue-400" />
            <span className="text-2xl font-bold">{scores.X}</span>
          </div>
        </div>
        <div className="text-center">
          <div className="text-pink-400 text-lg font-bold mb-1">Player O</div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-pink-400" />
            <span className="text-2xl font-bold">{scores.O}</span>
          </div>
        </div>
      </div>

      {/* Game Status */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold mb-6 h-8"
      >
        {winner ? (
          <span className={winner === 'X' ? 'text-blue-400' : 'text-pink-400'}>
            Player {winner} Wins!
          </span>
        ) : board.every(Boolean) ? (
          <span className="text-gray-400">It's a draw!</span>
        ) : (
          <span className={isXNext ? 'text-blue-400' : 'text-pink-400'}>
            {isXNext ? 'X' : 'O'}'s turn
          </span>
        )}
      </motion.div>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {Array(9).fill(null).map((_, i) => (
          <div key={i}>{renderSquare(i)}</div>
        ))}
      </div>

      {/* Reset Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={resetGame}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg 
          hover:bg-white/20 transition-colors text-white/80 hover:text-white"
      >
        <RefreshCw className="h-4 w-4" />
        <span>New Game</span>
      </motion.button>
    </div>
  );
}; 