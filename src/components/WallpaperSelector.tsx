import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallpaper } from '../contexts/WallpaperContext';
import { X, Palette, Image } from 'lucide-react';

interface WallpaperSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const WallpaperSelector: React.FC<WallpaperSelectorProps> = ({ isOpen, onClose }) => {
  const { themes, currentTheme, currentWallpaper, setTheme, setWallpaper } = useWallpaper();
  const [selectedTheme, setSelectedTheme] = useState(currentTheme.id);

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    setTheme(themeId);
  };

  const handleWallpaperSelect = (themeId: string, wallpaperId: string) => {
    setWallpaper(themeId, wallpaperId);
  };

  const selectedThemeData = themes.find(theme => theme.id === selectedTheme);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Palette className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Wallpaper & Themes</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="flex h-full">
              {/* Theme Sidebar */}
              <div className="w-64 border-r border-white/10 p-4">
                <h3 className="text-sm font-medium text-white/70 mb-4 uppercase tracking-wider">Themes</h3>
                <div className="space-y-2">
                  {themes.map((theme) => (
                    <motion.button
                      key={theme.id}
                      onClick={() => handleThemeSelect(theme.id)}
                      className={`w-full p-3 rounded-lg text-left transition-all ${
                        selectedTheme === theme.id
                          ? 'bg-blue-600/30 border border-blue-400/50 text-white'
                          : 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border border-white/20 ${theme.preview}`}
                        />
                        <div>
                          <div className="font-medium">{theme.name}</div>
                          <div className="text-xs text-white/50">{theme.wallpapers.length} wallpapers</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Wallpaper Grid */}
              <div className="flex-1 p-6 overflow-y-auto">
                {selectedThemeData && (
                  <>
                    <div className="flex items-center gap-2 mb-6">
                      <Image className="w-5 h-5 text-white/70" />
                      <h3 className="text-lg font-medium text-white">{selectedThemeData.name} Wallpapers</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {selectedThemeData.wallpapers.map((wallpaper) => (
                        <motion.button
                          key={wallpaper.id}
                          onClick={() => handleWallpaperSelect(selectedThemeData.id, wallpaper.id)}
                          className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                            currentWallpaper.id === wallpaper.id
                              ? 'border-blue-400 ring-2 ring-blue-400/30'
                              : 'border-white/20 hover:border-white/40'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div
                            className={`w-full h-full bg-cover bg-center ${wallpaper.preview}`}
                          />
                          
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                          
                          {/* Name */}
                          <div className="absolute bottom-2 left-2 right-2">
                            <div className="text-xs font-medium text-white bg-black/50 backdrop-blur-sm rounded px-2 py-1">
                              {wallpaper.name}
                            </div>
                          </div>
                          
                          {/* Selected Indicator */}
                          {currentWallpaper.id === wallpaper.id && (
                            <div className="absolute top-2 right-2">
                              <div className="w-3 h-3 bg-blue-400 rounded-full border-2 border-white" />
                            </div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WallpaperSelector;