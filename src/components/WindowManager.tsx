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
        !window.isMinimized && (
          <Rnd
            key={window.id}
            default={{
              x: window.position.x,
              y: window.position.y,
              width: window.size.width,
              height: window.size.height
            }}
            size={window.isMaximized ? { width: '100%', height: '100%' } : undefined}
            position={window.isMaximized ? { x: 0, y: 0 } : undefined}
            style={{ 
              zIndex: window.zIndex,
              transition: 'width 0.3s, height 0.3s, transform 0.3s'
            }}
            dragHandleClassName="window-drag-handle"
            bounds="window"
            onMouseDown={() => onBringToFront(window.id)}
            disableDragging={window.isMaximized}
            enableResizing={isResizable(window.id)}
            minWidth={isResizable(window.id) ? 400 : window.size.width}
            minHeight={isResizable(window.id) ? 300 : window.size.height}
            maxWidth={window.isMaximized ? window.size.width : "100%"}
            maxHeight={window.isMaximized ? window.size.height : "100%"}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`flex flex-col h-full rounded-lg overflow-hidden border ${
                isDarkMode
                  ? activeWindow === window.id
                    ? 'border-primary-500/50 shadow-lg shadow-primary-500/10'
                    : 'border-dark-700/30'
                  : activeWindow === window.id
                    ? 'border-gray-300 shadow-lg'
                    : 'border-gray-200/30'
              }`}
            >
              {/* Window Header */}
              <div className="window-drag-handle flex items-center justify-between px-4 py-2 bg-dark-900/90 backdrop-blur-sm border-b border-white/10">
                <div className="flex items-center space-x-2">
                  {desktopIcons.find(icon => icon.id === window.id)?.icon}
                  <span className="text-white font-medium">{window.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onMinimize(window.id)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors group"
                  >
                    <Minus className="h-4 w-4 text-gray-400 group-hover:text-white" />
                  </button>
                  <button
                    onClick={() => onMaximize(window.id)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors group"
                  >
                    {window.isMaximized ? (
                      <Minimize className="h-4 w-4 text-gray-400 group-hover:text-white" />
                    ) : (
                      <Maximize className="h-4 w-4 text-gray-400 group-hover:text-white" />
                    )}
                  </button>
                  <button
                    onClick={() => onClose(window.id)}
                    className="p-1.5 hover:bg-red-500 rounded-lg transition-colors group"
                  >
                    <X className="h-4 w-4 text-gray-400 group-hover:text-white" />
                  </button>
                </div>
              </div>

              {/* Window Content */}
              <div className="flex-1 bg-dark-900/90 backdrop-blur-sm overflow-auto">
                {window.content}
              </div>
            </motion.div>
          </Rnd>
        )
      ))}
    </>
  );
};