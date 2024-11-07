import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import React from 'react';
import { 
  Code, 
  User, 
  Github, 
  Mail, 
  Briefcase, 
  Terminal as TerminalIcon,
  Award,
  X,
  Sun,
  Moon,
  Wifi,
  Battery,
  Signal,
  Search,
  Gamepad2
} from 'lucide-react';
import { MobileLoader } from './mobile/MobileLoader';
import { Resume } from '../pages/Resume';
import { Terminal } from '../pages/Terminal';
import { Certificates } from '../pages/Certificates';
import { About } from '../pages/About';
import { Projects } from '../pages/Projects';
import { Contact } from '../pages/Contact';
import { Home } from '../pages/Home';
import { Snake } from '../pages/games/Snake';
import { TicTacToe } from '../pages/games/TicTacToe';

export const MobileOS = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isLoading, setIsLoading] = useState(true);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Simulate battery drain
  useEffect(() => {
    const battery = setInterval(() => {
      setBatteryLevel(prev => Math.max(prev - 1, 0));
    }, 300000); // Every 5 minutes
    return () => clearInterval(battery);
  }, []);

  if (isLoading) {
    return <MobileLoader onLoadComplete={() => setIsLoading(false)} />;
  }

  const apps = [
    {
      id: 'home',
      title: 'Home',
      icon: <Code className="h-6 w-6 text-blue-500" />,
      bgColor: 'bg-blue-500/10',
      component: Home
    },
    {
      id: 'about',
      title: 'About',
      icon: <User className="h-6 w-6 text-emerald-500" />,
      bgColor: 'bg-emerald-500/10',
      component: About
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: <Github className="h-6 w-6 text-purple-500" />,
      bgColor: 'bg-purple-500/10',
      component: Projects
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: <Mail className="h-6 w-6 text-pink-500" />,
      bgColor: 'bg-pink-500/10',
      component: Contact
    },
    {
      id: 'resume',
      title: 'Resume',
      icon: <Briefcase className="h-6 w-6 text-amber-500" />,
      bgColor: 'bg-amber-500/10',
      component: Resume
    },
    {
      id: 'terminal',
      title: 'Terminal',
      icon: <TerminalIcon className="h-6 w-6 text-gray-500" />,
      bgColor: 'bg-gray-500/10',
      component: Terminal
    },
    {
      id: 'certificates',
      title: 'Certificates',
      icon: <Award className="h-6 w-6 text-indigo-500" />,
      bgColor: 'bg-indigo-500/10',
      component: Certificates
    },
    {
      id: 'snake',
      title: 'Snake',
      icon: <Gamepad2 className="h-6 w-6 text-green-500" />,
      bgColor: 'bg-green-500/10',
      component: Snake
    },
    {
      id: 'tictactoe',
      title: 'Tic Tac Toe',
      icon: <Gamepad2 className="h-6 w-6 text-violet-500" />,
      bgColor: 'bg-violet-500/10',
      component: TicTacToe
    },
  ];

  // Add this function to handle app closing
  const handleCloseApp = () => {
    setActiveApp(null);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0f1115]' : 'bg-gray-100'}`}>
      {/* Status Bar */}
      <div className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-xl z-50">
        <div className="flex justify-between items-center px-4 py-2">
          <span className="text-white text-sm font-medium">
            {currentTime.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })}
          </span>
          <div className="flex items-center space-x-3">
            <Signal className="h-4 w-4 text-white" />
            <Wifi className="h-4 w-4 text-white" />
            <div className="flex items-center">
              <Battery className="h-4 w-4 text-white" />
              <span className="text-white text-xs ml-1">{batteryLevel}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active App View */}
      <AnimatePresence>
        {activeApp && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 pt-12 bg-black/95 z-50"
          >
            {/* App Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-black/50 backdrop-blur-xl">
              <h2 className="text-white font-medium">
                {apps.find(app => app.id === activeApp)?.title}
              </h2>
              <button
                onClick={handleCloseApp}
                className="p-1 rounded-full hover:bg-white/10"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* App Content */}
            <div className="h-[calc(100%-4rem)] overflow-auto">
              {apps.find(app => app.id === activeApp)?.component && (
                <div className="p-4">
                  {React.createElement(
                    apps.find(app => app.id === activeApp)!.component
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Home Screen (visible when no apps are open) */}
      {!activeApp && (
        <div className="pt-12 pb-20 px-4">
          {/* Wallpaper - You can add a background image here */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black/20 -z-10" />
          
          <div className="grid grid-cols-4 gap-4 mt-8">
            {apps.map((app) => (
              <motion.button
                key={app.id}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveApp(app.id)}
                className="flex flex-col items-center space-y-2"
              >
                <div className={`p-4 rounded-2xl ${app.bgColor} backdrop-blur-sm 
                  shadow-lg border border-white/10`}>
                  {app.icon}
                </div>
                <span className={`text-xs font-medium ${
                  isDarkMode ? 'text-white/80' : 'text-gray-800'
                }`}>
                  {app.title}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Dock */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 
        bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-2">
        <div className="flex space-x-4">
          {apps.slice(0, 4).map((app) => (
            <motion.button
              key={app.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveApp(app.id)}
              className={`p-3 rounded-xl ${app.bgColor}`}
            >
              {app.icon}
            </motion.button>
          ))}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 rounded-xl bg-gray-500/10"
          >
            {isDarkMode ? 
              <Sun className="h-6 w-6 text-white" /> : 
              <Moon className="h-6 w-6 text-white" />
            }
          </motion.button>
        </div>
      </div>

      {/* App Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-x-0 bottom-0 h-[80%] bg-black/95 
              backdrop-blur-xl rounded-t-3xl border-t border-white/10 z-40"
          >
            <div className="p-6">
              <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />
              
              {/* Search Bar */}
              <div className="mb-6">
                <div className="bg-white/10 rounded-xl p-3 flex items-center space-x-2">
                  <Search className="h-4 w-4 text-white/60" />
                  <input
                    type="text"
                    placeholder="Search apps..."
                    className="bg-transparent text-white border-none outline-none 
                      placeholder-white/60 text-sm w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-6">
                {apps.map((app) => (
                  <motion.button
                    key={app.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setActiveApp(app.id);
                      setIsMenuOpen(false);
                    }}
                    className="flex flex-col items-center space-y-2"
                  >
                    <div className={`p-4 rounded-2xl ${app.bgColor} 
                      backdrop-blur-sm shadow-lg border border-white/10`}>
                      {app.icon}
                    </div>
                    <span className="text-xs font-medium text-white/80">
                      {app.title}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 