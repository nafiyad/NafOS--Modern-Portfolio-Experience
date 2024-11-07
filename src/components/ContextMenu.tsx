import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RefreshCw, 
  Settings, 
  FolderOpen, 
  Terminal as TerminalIcon,
  MonitorSmartphone,
  Moon,
  Sun,
  Trash2,
  FileText,
  Eye
} from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  divider?: boolean;
  color?: string;
}

interface ContextMenuProps {
  isOpen: boolean;
  position: Position | null;
  onClose: () => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  onOpenTerminal: () => void;
  onOpenFileManager: () => void;
}

export const ContextMenu = ({ 
  isOpen, 
  position, 
  onClose, 
  isDarkMode,
  onThemeToggle,
  onOpenTerminal,
  onOpenFileManager
}: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [adjustedPosition, setAdjustedPosition] = useState<Position>({ x: 0, y: 0 });

  const menuItems: MenuItem[] = [
    {
      icon: <RefreshCw className="w-4 h-4" />,
      label: 'Refresh',
      onClick: () => {
        window.location.reload();
      },
      color: 'text-blue-400'
    },
    {
      icon: isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />,
      label: isDarkMode ? 'Light Mode' : 'Dark Mode',
      onClick: onThemeToggle,
      color: isDarkMode ? 'text-yellow-400' : 'text-indigo-400',
      divider: true
    },
    {
      icon: <FolderOpen className="w-4 h-4" />,
      label: 'Open File Manager',
      onClick: onOpenFileManager,
      color: 'text-orange-400'
    },
    {
      icon: <TerminalIcon className="w-4 h-4" />,
      label: 'Open Terminal',
      onClick: onOpenTerminal,
      color: 'text-green-400'
    },
    {
      icon: <FileText className="w-4 h-4" />,
      label: 'View Details',
      onClick: () => {},
      color: 'text-purple-400'
    },
    {
      icon: <Eye className="w-4 h-4" />,
      label: 'Preview',
      onClick: () => {},
      color: 'text-cyan-400',
      divider: true
    },
    {
      icon: <MonitorSmartphone className="w-4 h-4" />,
      label: 'Display Settings',
      onClick: () => {},
      color: 'text-pink-400'
    },
    {
      icon: <Settings className="w-4 h-4" />,
      label: 'Settings',
      onClick: () => {},
      color: 'text-blue-400',
      divider: true
    },
    {
      icon: <Trash2 className="w-4 h-4" />,
      label: 'Move to Trash',
      onClick: () => {},
      color: 'text-red-400'
    }
  ];

  useEffect(() => {
    if (!isOpen || !position) return;

    const menuElement = menuRef.current;
    if (!menuElement) return;

    const { clientWidth, clientHeight } = document.documentElement;
    const { width, height } = menuElement.getBoundingClientRect();

    let x = position.x;
    let y = position.y;

    if (x + width > clientWidth) {
      x = clientWidth - width;
    }

    if (y + height > clientHeight) {
      y = clientHeight - height;
    }

    setAdjustedPosition({ x, y });
  }, [isOpen, position]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen || !position) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.1 }}
        style={{
          position: 'fixed',
          left: adjustedPosition.x,
          top: adjustedPosition.y,
          zIndex: 50
        }}
        className="w-64 bg-dark-900/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-lg overflow-hidden"
      >
        <div className="py-2">
          {menuItems.map((item, index) => (
            <div key={index}>
              <motion.button
                whileHover={{ x: 4 }}
                onClick={() => {
                  item.onClick();
                  onClose();
                }}
                className="w-full px-4 py-2 flex items-center space-x-3 hover:bg-white/5 transition-colors group"
              >
                <span className={`${item.color || 'text-gray-400'} group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </span>
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  {item.label}
                </span>
              </motion.button>
              {item.divider && <hr className="my-2 border-white/10" />}
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};