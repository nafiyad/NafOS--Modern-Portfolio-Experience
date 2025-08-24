import { Rnd } from 'react-rnd';
import { X, Minus, Maximize, Minimize } from 'lucide-react';
import { motion } from 'framer-motion';

interface Window {
  id: string;
  title: string;
  content: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMaximized: boolean;
  isMinimized: boolean;
  zIndex: number;
}

interface DesktopWindow extends Window {
  isDarkMode: boolean;
}

interface DesktopIcon {
  id: string;
  icon: React.ReactNode;
}

interface WindowManagerProps {
  windows: DesktopWindow[];
  activeWindow: string | null;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onBringToFront: (id: string) => void;
  desktopIcons: DesktopIcon[];
  isDarkMode: boolean;
  isResizable?: (id: string) => boolean;
}

export const WindowManager = ({
  windows,
  activeWindow,
  onClose,
  onMinimize,
  onMaximize,
  onBringToFront,
  desktopIcons,
  isDarkMode,
  isResizable = () => true
}: WindowManagerProps) => {
  return (
    <>
      {windows.map((window) => (
        window.isMinimized ? null : (
          <Rnd
            key={window.id}
            default={{
              x: window.position.x,
              y: window.position.y,
              width: window.size.width,
              height: window.size.height
            }}
            size={window.isMaximized ? { width: '100%', height: 'calc(100% - 48px)' } : { width: window.size.width, height: window.size.height }}
            position={window.isMaximized ? { x: 0, y: 0 } : { x: window.position.x, y: window.position.y }}
            style={{ 
              zIndex: window.zIndex,
              transition: 'width 0.3s ease-in-out, height 0.3s ease-in-out, transform 0.3s ease-in-out'
            }}
            dragHandleClassName="window-drag-handle"
            bounds="window"
            onMouseDown={() => onBringToFront(window.id)}
            disableDragging={window.isMaximized}
            enableResizing={!window.isMaximized && isResizable(window.id)}
            minWidth={isResizable(window.id) ? 400 : window.size.width}
            minHeight={isResizable(window.id) ? 300 : window.size.height}
            maxWidth={window.isMaximized ? "100%" : "100%"}
            maxHeight={window.isMaximized ? "calc(100% - 48px)" : "100%"}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col h-full rounded-2xl overflow-hidden bg-dark-900/95 ${
                activeWindow === window.id
                  ? 'border-2 border-primary-400/60 shadow-2xl shadow-primary-500/10'
                  : 'border border-white/10 shadow-xl shadow-black/50'
              }`}
              style={{
                boxShadow: activeWindow === window.id 
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(59, 130, 246, 0.3) inset'
                  : '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset'
              }}
            >
              {/* Window Header */}
              <div className="window-drag-handle flex items-center justify-between px-6 py-4 bg-dark-800/90 border-b border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 flex items-center justify-center text-primary-400 animate-float">
                    {desktopIcons.find(icon => icon.id === window.id)?.icon}
                  </div>
                  <span className="text-sm font-semibold text-white/90 tracking-wide">{window.title}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onMinimize(window.id)}
                    className="group w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-yellow-500/20 hover:shadow-lg hover:shadow-yellow-500/25 text-yellow-400/80 hover:text-yellow-300 backdrop-blur-sm border border-yellow-500/20 hover:border-yellow-400/40"
                  >
                    <Minus className="w-4 h-4 transition-transform group-hover:scale-110" />
                  </button>
                  
                  <button
                    onClick={() => onMaximize(window.id)}
                    className="group w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-green-500/20 hover:shadow-lg hover:shadow-green-500/25 text-green-400/80 hover:text-green-300 backdrop-blur-sm border border-green-500/20 hover:border-green-400/40"
                  >
                    {window.isMaximized ? (
                      <Minimize className="w-4 h-4 transition-transform group-hover:scale-110" />
                    ) : (
                      <Maximize className="w-4 h-4 transition-transform group-hover:scale-110" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => onClose(window.id)}
                    className="group w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-red-500/20 hover:shadow-lg hover:shadow-red-500/25 text-red-400/80 hover:text-red-300 backdrop-blur-sm border border-red-500/20 hover:border-red-400/40"
                  >
                    <X className="w-4 h-4 transition-transform group-hover:scale-110" />
                  </button>
                </div>
              </div>

              {/* Window Content */}
              <div className="flex-1 overflow-hidden relative bg-dark-900">
                {/* Content Container */}
                <div className="h-full overflow-auto">
                  {window.content}
                </div>
              </div>
            </motion.div>
          </Rnd>
        )
      ))}
    </>
  );
};