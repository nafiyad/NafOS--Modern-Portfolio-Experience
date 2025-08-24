import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, Wallpaper, themes, getThemeById, getWallpaperById } from '../data/wallpapers';

interface WallpaperContextType {
  currentTheme: Theme;
  currentWallpaper: Wallpaper;
  setTheme: (themeId: string) => void;
  setWallpaper: (themeId: string, wallpaperId: string) => void;
  themes: Theme[];
}

const WallpaperContext = createContext<WallpaperContextType | undefined>(undefined);

interface WallpaperProviderProps {
  children: ReactNode;
}

export const WallpaperProvider: React.FC<WallpaperProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [currentWallpaper, setCurrentWallpaper] = useState<Wallpaper>(themes[0].wallpapers[0]);

  // Load saved theme and wallpaper from localStorage
  useEffect(() => {
    const savedThemeId = localStorage.getItem('nafia-os-theme');
    const savedWallpaperId = localStorage.getItem('nafia-os-wallpaper');
    
    if (savedThemeId) {
      const theme = getThemeById(savedThemeId);
      if (theme) {
        setCurrentTheme(theme);
        
        if (savedWallpaperId) {
          const wallpaper = getWallpaperById(savedThemeId, savedWallpaperId);
          if (wallpaper) {
            setCurrentWallpaper(wallpaper);
          } else {
            setCurrentWallpaper(theme.wallpapers[0]);
          }
        } else {
          setCurrentWallpaper(theme.wallpapers[0]);
        }
      }
    }
  }, []);

  const setTheme = (themeId: string) => {
    const theme = getThemeById(themeId);
    if (theme) {
      setCurrentTheme(theme);
      setCurrentWallpaper(theme.wallpapers[0]);
      localStorage.setItem('nafia-os-theme', themeId);
      localStorage.setItem('nafia-os-wallpaper', theme.wallpapers[0].id);
    }
  };

  const setWallpaper = (themeId: string, wallpaperId: string) => {
    const theme = getThemeById(themeId);
    const wallpaper = getWallpaperById(themeId, wallpaperId);
    
    if (theme && wallpaper) {
      setCurrentTheme(theme);
      setCurrentWallpaper(wallpaper);
      localStorage.setItem('nafia-os-theme', themeId);
      localStorage.setItem('nafia-os-wallpaper', wallpaperId);
    }
  };

  const value: WallpaperContextType = {
    currentTheme,
    currentWallpaper,
    setTheme,
    setWallpaper,
    themes
  };

  return (
    <WallpaperContext.Provider value={value}>
      {children}
    </WallpaperContext.Provider>
  );
};

export const useWallpaper = (): WallpaperContextType => {
  const context = useContext(WallpaperContext);
  if (!context) {
    throw new Error('useWallpaper must be used within a WallpaperProvider');
  }
  return context;
};