import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Terminal = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [inputEnabled, setInputEnabled] = useState(false);

  useEffect(() => {
    const initialLines = [
      '> Welcome to Nafiyad OS Terminal',
      '> Initializing system...',
      '> Type "help" for available commands',
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < initialLines.length) {
        setLines(prev => [...prev, initialLines[currentIndex]]);
        currentIndex++;
      } else {
        setInputEnabled(true);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentLine.trim()) {
      const command = currentLine.trim().toLowerCase();
      let response = '';

      switch (command) {
        case 'help':
          response = `Available commands:
- about: Display information about me
- contact: Show contact information
- skills: List technical skills
- clear: Clear terminal
- exit: Close terminal`;
          break;
        case 'about':
          response = 'Software Developer | Student at Bow Valley College';
          break;
        case 'contact':
          response = `Email: nafiadg@gmail.com
LinkedIn: linkedin.com/in/nafiyad-adane-gudina-041a04200
GitHub: github.com/nafiyad
Location: Calgary, AB`;
          break;
        case 'skills':
          response = `Technical Skills:
- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Python, MongoDB
- Tools: Git, VS Code, Docker`;
          break;
        case 'clear':
          setLines([]);
          setCurrentLine('');
          return;
        case 'exit':
          window.history.back();
          return;
        default:
          response = `Command not found: ${command}. Type "help" for available commands.`;
      }

      setLines(prev => [...prev, `> ${currentLine}`, response]);
      setCurrentLine('');
    }
  };

  return (
    <div className="font-mono">
      <div className="bg-black/50 rounded-lg p-4 min-h-[60vh]">
        <div className="space-y-2">
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={line.startsWith('>') ? 'text-green-500' : 'text-gray-300'}
            >
              {line}
            </motion.div>
          ))}
          <div className="flex items-center">
            <span className="text-green-500">{'>'}</span>
            <input
              type="text"
              value={currentLine}
              onChange={(e) => setCurrentLine(e.target.value)}
              onKeyDown={handleCommand}
              disabled={!inputEnabled}
              className="flex-1 bg-transparent border-none outline-none text-white ml-2"
              placeholder={inputEnabled ? 'Type a command...' : ''}
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 