import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search,
  User,
  ChevronRight,
  Settings,
  LogOut,
  Power
} from 'lucide-react';
import { getAppsByCategory } from '../data/apps';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onOpenWindow?: (id: string, title: string) => void;
  onLock?: () => void;
  onShutdown?: () => void;
  onSettings?: () => void;
}

export const StartMenu = ({ 
  isOpen, 
  onClose, 
  onOpenWindow = () => {},
  onLock = () => {},
  onShutdown = () => {},
  onSettings = () => {}
}: StartMenuProps) => {
  const handleMenuItemClick = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-12 left-2 w-80 bg-black/90 backdrop-blur-xl 
            rounded-xl border border-white/10 shadow-xl z-50"
        >
          {/* Search Bar */}
          <div className="p-4 border-b border-[#ffffff0f]">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500 transition-colors group-hover:text-indigo-400" />
              <input
                type="text"
                placeholder="Type to search..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#1a1b1e] text-white rounded-lg border border-[#ffffff0f] focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder-gray-500"
              />
            </div>
          </div>

          <div className="p-4">
            {/* Main Apps */}
            <div className="mb-6">
              <h3 className="text-xs font-medium text-white/60 mb-2">Main</h3>
              <div className="grid grid-cols-2 gap-2">
                {getAppsByCategory('main').map((app) => (
                  <button
                    key={app.id}
                    onClick={() => handleMenuItemClick(() => onOpenWindow(app.id, app.title))}
                    className="flex items-center space-x-2 p-2 rounded-lg 
                      hover:bg-white/5 transition-colors text-left w-full"
                  >
                    <div className={`p-2 rounded-lg ${app.bgColor}`}>
                      {app.icon}
                    </div>
                    <span className="text-sm text-white">{app.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Games Section */}
            <div className="mb-6">
              <h3 className="text-xs font-medium text-white/60 mb-2">Games</h3>
              <div className="grid grid-cols-2 gap-2">
                {getAppsByCategory('games').map((app) => (
                  <button
                    key={app.id}
                    onClick={() => handleMenuItemClick(() => onOpenWindow(app.id, app.title))}
                    className="flex items-center space-x-2 p-2 rounded-lg 
                      hover:bg-white/5 transition-colors text-left w-full"
                  >
                    <div className={`p-2 rounded-lg ${app.bgColor}`}>
                      {app.icon}
                    </div>
                    <span className="text-sm text-white">{app.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tools Section */}
            <div className="mb-6">
              <h3 className="text-xs font-medium text-white/60 mb-2">Tools</h3>
              <div className="grid grid-cols-2 gap-2">
                {getAppsByCategory('tools').map((app) => (
                  <button
                    key={app.id}
                    onClick={() => handleMenuItemClick(() => onOpenWindow(app.id, app.title))}
                    className="flex items-center space-x-2 p-2 rounded-lg 
                      hover:bg-white/5 transition-colors text-left w-full"
                  >
                    <div className={`p-2 rounded-lg ${app.bgColor}`}>
                      {app.icon}
                    </div>
                    <span className="text-sm text-white">{app.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* System Actions */}
            <div className="space-y-2">
              <button
                onClick={() => handleMenuItemClick(onSettings)}
                className="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-white/5"
              >
                <Settings className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-white">Settings</span>
              </button>
              <button
                onClick={() => handleMenuItemClick(onLock)}
                className="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-white/5"
              >
                <LogOut className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-white">Lock</span>
              </button>
              <button
                onClick={() => handleMenuItemClick(onShutdown)}
                className="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-white/5"
              >
                <Power className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-white">Shut Down</span>
              </button>
            </div>
          </div>

          {/* User Profile */}
          <motion.div 
            className="p-4 border-t border-[#ffffff0f] bg-[#1a1b1e]/50"
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          >
            <div className="flex items-center space-x-4">
              <div className="p-2.5 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white">Nafiyad Adane</h3>
                <p className="text-[#6b7280]">Software Developer</p>
              </div>
              <motion.button 
                className="p-2 rounded-lg hover:bg-[#ffffff0f] transition-colors"
                whileHover={{ x: 5 }}
                onClick={() => handleMenuItemClick(() => onOpenWindow('about', 'About Me'))}
              >
                <ChevronRight className="h-5 w-5 text-[#6b7280]" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};