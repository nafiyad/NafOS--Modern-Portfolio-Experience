import React, { useState } from 'react';
import { Menu, Wifi, Volume2, Battery, Sun, Cloud, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWallpaper } from '../contexts/WallpaperContext';
import WallpaperSelector from './WallpaperSelector';

interface DesktopWindow {
  id: string;
  title: string;
  content: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMaximized: boolean;
  isMinimized: boolean;
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
  const { themes, currentTheme, setTheme } = useWallpaper();
  const [showWallpaperSelector, setShowWallpaperSelector] = useState(false);

  const handleThemeToggle = () => {
    const currentIndex = themes.findIndex(theme => theme.id === currentTheme.id);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].id);
  };
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-0 left-0 right-0 h-16 glass-ultra backdrop-blur-3xl border-t border-white/20 z-50 shadow-2xl shadow-black/40">
      {/* Sophisticated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+CjxyZWN0IHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzAwMDAwMDAzIj48L3JlY3Q+CjxsaW5lIHgxPSIwIiB5MT0iNDAiIHgyPSI4MCIgeTI9IjQwIiBzdHJva2U9IiNmZmZmZmYwNSIgc3Ryb2tlLXdpZHRoPSIxIj48L2xpbmU+CjxsaW5lIHgxPSI0MCIgeTE9IjAiIHgyPSI0MCIgeTI9IjgwIiBzdHJva2U9IiNmZmZmZmYwNSIgc3Ryb2tlLXdpZHRoPSIxIj48L2xpbmU+CjxjaXJjbGUgY3g9IjQwIiBjeT0iNDAiIHI9IjIiIGZpbGw9IiNmZmZmZmYwOCI+PC9jaXJjbGU+CjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9IiNmZmZmZmYwNCI+PC9jaXJjbGU+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjEiIGZpbGw9IiNmZmZmZmYwNCI+PC9jaXJjbGU+CjxjaXJjbGUgY3g9IjIwIiBjeT0iNjAiIHI9IjEiIGZpbGw9IiNmZmZmZmYwNCI+PC9jaXJjbGU+CjxjaXJjbGUgY3g9IjYwIiBjeT0iMjAiIHI9IjEiIGZpbGw9IiNmZmZmZmYwNCI+PC9jaXJjbGU+CjwvdXZnPg==')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-500/5 to-transparent"></div>
      </div>
      
      <div className="relative flex items-center justify-between px-6 h-full">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartClick}
            className="flex items-center space-x-3 px-4 py-3 rounded-2xl glass-frosted hover:glass-ultra transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/20 border border-white/10 hover:border-primary-400/30 group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg animate-glow group-hover:animate-pulse">
               <span className="text-white text-sm font-bold tracking-wider">N</span>
             </div>
            <span className="text-white/90 text-sm font-semibold hidden sm:block group-hover:text-white transition-colors">Start</span>
          </motion.button>

          {/* Open Windows */}
          <div className="flex items-center space-x-1 px-2">
            {openWindows.map((window) => (
              <motion.button
                key={window.id}
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0, y: 20 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onWindowClick(window.id)}
                className={`relative p-3 rounded-2xl transition-all duration-300 group ${
                  activeWindow === window.id && !window.isMinimized
                    ? 'glass-ultra border-2 border-primary-400/60 shadow-xl shadow-primary-500/30 animate-glow'
                    : window.isMinimized
                      ? 'glass-frosted border border-white/10 hover:border-white/20 text-white/60 hover:text-white/90'
                      : 'glass-frosted border border-white/10 hover:border-white/30 hover:shadow-lg hover:shadow-white/10'
                }`}
              >
                {/* Active Window Indicator */}
                {activeWindow === window.id && !window.isMinimized && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-primary-400 to-blue-500 rounded-full animate-pulse"></div>
                )}
                
                {/* Window Icon */}
                <div className={`w-7 h-7 flex items-center justify-center transition-all duration-300 ${
                  activeWindow === window.id && !window.isMinimized
                    ? 'text-primary-300 animate-float'
                    : window.isMinimized
                      ? 'text-white/60 group-hover:text-white/90'
                      : 'text-white/80 group-hover:text-white'
                }`}>
                  {desktopIcons.find(icon => icon.id === window.id)?.icon}
                </div>
                
                {/* Minimized Window Indicator */}
                {window.isMinimized && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400/80 rounded-full border border-yellow-300/50 animate-pulse"></div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Section - System Info */}
        <div className="flex items-center space-x-6">
          {/* Time Display */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="glass-frosted px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
          >
            <div className="text-white/90 text-sm font-semibold tracking-wide">
              {currentTime.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit'
              })}
            </div>
          </motion.div>
          
          {/* Weather */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg glass-light shadow-md"
          >
            <div className="flex items-center gap-2">
              {weather.condition === 'Sunny' 
                ? <Sun className="h-4 w-4 text-yellow-400" />
                : <Cloud className="h-4 w-4 text-gradient-blue" />
              }
              <span className="text-white text-sm font-medium">
                {weather.temp} • {weather.condition}
              </span>
            </div>
          </motion.div>
          
          {/* System Icons */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={handleThemeToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group p-2 rounded-xl glass-frosted border border-white/10 hover:border-purple-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              title={`Switch to ${themes[(themes.findIndex(t => t.id === currentTheme.id) + 1) % themes.length].name}`}
            >
              <div 
                className={`w-5 h-5 rounded-full border border-white/30 ${currentTheme.preview}`}
              />
            </motion.button>
            
            {/* Wallpaper Selector */}
            <motion.button
              onClick={() => setShowWallpaperSelector(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group p-2 rounded-xl glass-frosted border border-white/10 hover:border-pink-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20"
              title="Change Wallpaper"
            >
              <Palette className="w-5 h-5 text-pink-400/80 group-hover:text-pink-300 transition-colors" />
            </motion.button>
            
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group p-2 rounded-xl glass-frosted border border-white/10 hover:border-green-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
            >
              <Wifi className="w-5 h-5 text-green-400/80 group-hover:text-green-300 transition-colors animate-pulse" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group p-2 rounded-xl glass-frosted border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <Volume2 className="w-5 h-5 text-blue-400/80 group-hover:text-blue-300 transition-colors" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group p-2 rounded-xl glass-frosted border border-white/10 hover:border-yellow-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20"
            >
              <Battery className="w-5 h-5 text-yellow-400/80 group-hover:text-yellow-300 transition-colors" />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Wallpaper Selector Modal */}
       <WallpaperSelector 
         isOpen={showWallpaperSelector}
         onClose={() => setShowWallpaperSelector(false)} 
       />
    </motion.div>
  );
};