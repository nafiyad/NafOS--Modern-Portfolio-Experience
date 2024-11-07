import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface TerminalProps {
  onClose: () => void;
}

export const Terminal = ({ onClose }: TerminalProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');

  useEffect(() => {
    const initialLines = [
      '> Loading portfolio...',
      '> Initializing components...',
      '> Starting development server...',
      '> Ready! You can now view the portfolio in the browser.',
      '',
      '> Type "help" for available commands',
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < initialLines.length) {
        setLines(prev => [...prev, initialLines[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const command = currentLine.trim().toLowerCase();
      let response = '';

      switch (command) {
        case 'help':
          response = 'Available commands: about, contact, projects, location, clear';
          break;
        case 'about':
          response = 'Software Developer | Student at Bow Valley College | 2023 - Present';
          break;
        case 'contact':
          response = 'Email: nafiadg@gmail.com\nPhone: +1 (403) 437-3117\nLocation: Calgary, AB, Canada\nLinkedIn: linkedin.com/in/nafiyad\nGitHub: github.com/nafiyad';
          break;
        case 'location':
          response = 'Calgary, AB, Canada';
          break;
        case 'projects':
          response = 'View my projects at /projects';
          break;
        case 'clear':
          setLines([]);
          setCurrentLine('');
          return;
        default:
          response = `Command not found: ${command}`;
      }

      setLines(prev => [...prev, `> ${currentLine}`, response]);
      setCurrentLine('');
    }
  };

  return (
    <div className="bg-gray-800 border-t border-gray-700">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Terminal</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>
      <div className="p-4 font-mono text-sm h-48 overflow-auto">
        {lines.map((line, i) => (
          <div key={i} className="text-gray-300">
            {line}
          </div>
        ))}
        <div className="flex items-center text-gray-300">
          <span className="text-green-400">➜</span>
          <input
            type="text"
            value={currentLine}
            onChange={(e) => setCurrentLine(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 ml-2 bg-transparent outline-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};