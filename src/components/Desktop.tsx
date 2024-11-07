import { useState, useEffect } from 'react';
import { ContextMenu } from './ContextMenu';
import { DesktopIcons } from './DesktopIcons';
import { WindowManager } from './WindowManager';
import { TaskBar } from './TaskBar';
import { StartMenu } from './StartMenu';
import { 
  Code,
  Github,
  Mail,
  User,
  Terminal as TerminalIcon,
  Briefcase,
  Award,
  Sun,
  Moon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Loader } from './Loader';
import { AnimatePresence } from 'framer-motion';
import { LockScreen } from './LockScreen';
import { apps } from '../data/apps';

interface Position {
  x: number;
  y: number;
}

interface DesktopWindow {
  id: string;
  title: string;
  content: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMaximized: boolean;
  isMinimized: boolean;
  zIndex: number;
  isDarkMode: boolean;
}

interface DesktopIconData {
  id: string;
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  hoverColor: string;
  onClick: () => void;
  position?: { x: number; y: number };
}

export const Desktop = () => {
  const [contextMenu, setContextMenu] = useState({
    isOpen: false,
    position: null as Position | null
  });

  const [windows, setWindows] = useState<DesktopWindow[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [weather] = useState({
    temp: '22°C',
    condition: 'Sunny'
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  // Update time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const desktopIcons: DesktopIconData[] = [
    {
      id: 'code-editor',
      title: 'Portfolio',
      icon: <Code size={32} className="text-blue-500" />,
      bgColor: 'bg-blue-500/10',
      hoverColor: 'hover:bg-blue-500/20',
      onClick: () => handleOpenWindow('code-editor', 'Portfolio'),
      position: { x: 20, y: 20 }
    },
    {
      id: 'about',
      title: 'About Me',
      icon: <User size={32} className="text-emerald-500" />,
      bgColor: 'bg-emerald-500/10',
      hoverColor: 'hover:bg-emerald-500/20',
      onClick: () => handleOpenWindow('about', 'About Me'),
      position: { x: 20, y: 120 }
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: <Github size={32} className="text-purple-500" />,
      bgColor: 'bg-purple-500/10',
      hoverColor: 'hover:bg-purple-500/20',
      onClick: () => handleOpenWindow('projects', 'Projects'),
      position: { x: 20, y: 220 }
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: <Mail size={32} className="text-pink-500" />,
      bgColor: 'bg-pink-500/10',
      hoverColor: 'hover:bg-pink-500/20',
      onClick: () => handleOpenWindow('contact', 'Contact'),
      position: { x: 20, y: 320 }
    },
    {
      id: 'resume',
      title: 'Resume',
      icon: <Briefcase size={32} className="text-amber-500" />,
      bgColor: 'bg-amber-500/10',
      hoverColor: 'hover:bg-amber-500/20',
      onClick: () => handleOpenWindow('resume', 'Resume'),
      position: { x: 20, y: 420 }
    },
    {
      id: 'terminal',
      title: 'Terminal',
      icon: <TerminalIcon size={32} className="text-gray-500" />,
      bgColor: 'bg-gray-500/10',
      hoverColor: 'hover:bg-gray-500/20',
      onClick: () => handleOpenWindow('terminal', 'Terminal'),
      position: { x: 20, y: 520 }
    },
    {
      id: 'certificates',
      title: 'Certificates',
      icon: <Award size={32} className="text-indigo-500" />,
      bgColor: 'bg-indigo-500/10',
      hoverColor: 'hover:bg-indigo-500/20',
      onClick: () => handleOpenWindow('certificates', 'Certificates'),
      position: { x: 20, y: 620 }
    }
  ];

  const getDefaultWindowSize = (appId: string) => {
    switch (appId) {
      case 'snake':
        return { width: 400, height: 500 }; // Fixed size for Snake game
      case 'tictactoe':
        return { width: 400, height: 500 }; // Fixed size for Tic Tac Toe
      default:
        return { width: 800, height: 600 }; // Default window size
    }
  };

  const handleOpenWindow = (id: string, title: string) => {
    if (windows.find(w => w.id === id)) {
      // If window is already open, bring it to front
      handleWindowFocus(id);
      return;
    }

    const size = getDefaultWindowSize(id);
    const position = calculateWindowPosition(size.width, size.height);
    const AppComponent = apps.find(app => app.id === id)?.component;

    setWindows(prev => [...prev, {
      id,
      title,
      content: AppComponent ? <AppComponent /> : null,
      position,
      size,
      isMaximized: false,
      isMinimized: false,
      zIndex: windows.length + 1,
      isDarkMode
    }]);
    setActiveWindow(id);
  };

  const handleCloseWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindow === id) {
      setActiveWindow(null);
    }
  };

  const handleMinimizeWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
    const nextWindow = windows.find(w => !w.isMinimized && w.id !== id);
    setActiveWindow(nextWindow?.id || null);
  };

  const handleMaximizeWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const handleWindowFocus = (id: string) => {
    setActiveWindow(id);
    setWindows(windows.map(w => ({
      ...w,
      zIndex: w.id === id ? windows.length : w.zIndex
    })));
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      isOpen: true,
      position: { x: e.clientX, y: e.clientY }
    });
  };

  const closeContextMenu = () => {
    setContextMenu({
      isOpen: false,
      position: null
    });
  };

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  const handleLock = () => {
    setIsLocked(true);
    setIsStartMenuOpen(false);
    setWindows([]);
    setActiveWindow(null);
  };

  const handleUnlock = () => {
    setIsLocked(false);
  };

  const handleShutdown = () => {
    setIsLoading(true);
    setWindows([]);
    setActiveWindow(null);
    setTimeout(() => {
      window.close();
      window.location.href = '/shutdown';
    }, 1000);
  };

  const calculateWindowPosition = (width: number, height: number) => {
    const centerX = (window.innerWidth - width) / 2;
    const centerY = (window.innerHeight - height) / 2;
    return {
      x: centerX + Math.random() * 100 - 50, // Add slight randomness
      y: centerY + Math.random() * 100 - 50
    };
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <Loader />}
      </AnimatePresence>
      
      <div 
        className={`relative w-full h-screen overflow-hidden transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onContextMenu={handleContextMenu}
        onClick={() => {
          closeContextMenu();
          if (isStartMenuOpen) setIsStartMenuOpen(false);
        }}
      >
        {/* Enhanced Gradient Wallpaper */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]">
          {/* Primary Gradient Layer */}
          <div className="absolute inset-0 bg-gradient-radial from-indigo-500/10 via-transparent to-transparent"></div>
          
          {/* Animated Gradient Overlays */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-slow"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-cyan-500/10 to-teal-500/10 animate-gradient-slow" style={{ animationDelay: '-2s' }}></div>
            <div className="absolute inset-0 bg-gradient-to-bl from-fuchsia-500/5 via-violet-500/5 to-indigo-500/5 animate-gradient-slow" style={{ animationDelay: '-4s' }}></div>
          </div>

          {/* NafiyadOS Text with enhanced styling */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative">
              <h1 className="text-[250px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-white/[0.02] to-white/[0.05] select-none tracking-tight blur-[1px]">
                NafiyadOS
              </h1>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/[0.01] to-transparent animate-pulse"></div>
            </div>
          </div>

          {/* Enhanced Grid Pattern */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,0.02)_1.5px,transparent_1.5px)] bg-[size:75px_75px]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:25px_25px]"></div>
          </div>

          {/* Enhanced Glowing Orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-[20%] left-[30%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 blur-[100px]"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5],
                rotate: [360, 180, 0]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute bottom-[20%] right-[30%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-500/10 via-pink-500/10 to-rose-500/10 blur-[100px]"
            />
            <motion.div
              animate={{
                scale: [0.8, 1, 0.8],
                opacity: [0.4, 0.6, 0.4],
                rotate: [0, -180, -360]
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-[50%] left-[50%] w-[700px] h-[700px] rounded-full bg-gradient-to-bl from-cyan-500/10 via-teal-500/10 to-emerald-500/10 blur-[100px]"
            />
          </div>

          {/* Enhanced Noise Texture */}
          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay">
            <svg className="w-full h-full">
              <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch"/>
                <feColorMatrix type="saturate" values="0"/>
              </filter>
              <rect width="100%" height="100%" filter="url(#noise)"/>
            </svg>
          </div>

          {/* Enhanced Vignette Effect */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/30"></div>
        </div>

        {/* System Status */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 flex flex-col items-end space-y-2"
        >
          {/* Time and Weather */}
          <div className="bg-dark-900/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/10">
            <div className="text-4xl font-light mb-2 text-white/90">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="flex items-center gap-2 text-white/70">
              {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span>{weather.temp}</span>
              <span className="w-px h-4 bg-white/20" />
              <span>{weather.condition}</span>
            </div>
          </div>

          {/* System Stats */}
          <div className="bg-dark-900/80 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white/10">
            <div className="flex items-center gap-4 text-white/70 text-sm">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>CPU: 32%</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-blue-400" />
                <span>RAM: 4.2GB</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Desktop Content */}
        <div className="relative z-10 h-full">
          <DesktopIcons icons={desktopIcons} />
          <WindowManager
            windows={windows}
            activeWindow={activeWindow}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onMaximize={handleMaximizeWindow}
            onBringToFront={handleWindowFocus}
            desktopIcons={desktopIcons}
            isDarkMode={isDarkMode}
            isResizable={(id) => !['snake', 'tictactoe'].includes(id)} // Prevent resizing for games
          />
          <ContextMenu
            isOpen={contextMenu.isOpen}
            position={contextMenu.position}
            onClose={closeContextMenu}
            isDarkMode={isDarkMode}
            onThemeToggle={() => setIsDarkMode(!isDarkMode)}
            onOpenTerminal={() => handleOpenWindow('terminal', 'Terminal')}
            onOpenFileManager={() => handleOpenWindow('files', 'Files')}
          />
          <StartMenu 
            isOpen={isStartMenuOpen} 
            onClose={() => setIsStartMenuOpen(false)}
            isDarkMode={isDarkMode}
            onOpenWindow={handleOpenWindow}
            onLock={handleLock}
            onShutdown={handleShutdown}
            onSettings={() => handleOpenWindow('settings', 'Settings')}
          />
          <TaskBar
            openWindows={windows}
            activeWindow={activeWindow}
            onWindowClick={(id) => handleWindowFocus(id)}
            onStartClick={toggleStartMenu}
            desktopIcons={desktopIcons}
            currentTime={currentTime}
            weather={weather}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>

      <AnimatePresence>
        {isLocked && (
          <LockScreen 
            onUnlock={handleUnlock}
            currentTime={currentTime}
          />
        )}
      </AnimatePresence>
    </>
  );
};