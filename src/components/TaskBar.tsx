import { Menu, Wifi, Volume2, Battery, Sun, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';

interface DesktopWindow {
  id: string;
  title: string;
  content: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMaximized: boolean;
  zIndex: number;
}

interface DesktopIcon {
  id: string;
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  hoverColor: string;
  onClick: () => void;
}

interface TaskBarProps {
  openWindows: DesktopWindow[];
  activeWindow: string | null;
  onWindowClick: (id: string) => void;
  onStartClick: () => void;
  desktopIcons: DesktopIcon[];
  currentTime: Date;
  weather: {
    temp: string;
    condition: string;
  };
  isDarkMode: boolean;
}

export const TaskBar = ({
  openWindows,
  activeWindow,
  onWindowClick,
  onStartClick,
  desktopIcons,
  currentTime,
  weather,
  isDarkMode
}: TaskBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0f1115]/95 backdrop-blur-xl border-t border-white/10">
      <div className="flex items-center justify-between p-1.5">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartClick}
            className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-indigo-500/20"
          >
            <Menu className="h-5 w-5 text-white" />
          </motion.button>

          {/* Open Windows */}
          <div className="flex items-center space-x-1 px-2">
            {openWindows.map((window) => (
              <motion.button
                key={window.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onWindowClick(window.id)}
                className={`px-3 py-1.5 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                  activeWindow === window.id
                    ? 'bg-white/15 text-white shadow-lg border border-white/20'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  {desktopIcons.find(icon => icon.id === window.id)?.icon}
                </div>
                <span className="text-sm font-medium">{window.title}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 mr-1">
          {/* System Icons */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
          >
            <Wifi className="h-4 w-4 text-indigo-400" />
            <Volume2 className="h-4 w-4 text-purple-400" />
            <Battery className="h-4 w-4 text-emerald-400" />
          </motion.div>

          {/* Weather */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
          >
            <div className="flex items-center gap-2">
              {weather.condition === 'Sunny' 
                ? <Sun className="h-4 w-4 text-yellow-400" />
                : <Cloud className="h-4 w-4 text-blue-400" />
              }
              <span className="text-white/90 text-sm font-medium">
                {weather.temp} • {weather.condition}
              </span>
            </div>
          </motion.div>

          {/* Time */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/10"
          >
            <span className="text-white/90 text-sm font-medium">
              {currentTime.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit'
              })}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};