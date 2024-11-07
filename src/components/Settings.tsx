import { useState } from 'react';
import { Sun, Moon, Volume2, Monitor, Wifi, Battery } from 'lucide-react';

interface SettingsProps {
  isDarkMode: boolean;
  onThemeChange: (isDark: boolean) => void;
}

export const Settings = ({ isDarkMode, onThemeChange }: SettingsProps) => {
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(80);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      {/* Theme Settings */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Appearance</h3>
        <div className="flex items-center justify-between p-4 bg-dark-800 rounded-lg">
          <div className="flex items-center gap-3">
            {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span>Dark Mode</span>
          </div>
          <button
            onClick={() => onThemeChange(!isDarkMode)}
            className={`w-12 h-6 rounded-full transition-colors ${
              isDarkMode ? 'bg-primary-500' : 'bg-gray-600'
            } relative`}
          >
            <div className={`absolute top-1 ${
              isDarkMode ? 'right-1' : 'left-1'
            } w-4 h-4 rounded-full bg-white transition-all`} />
          </button>
        </div>
      </div>

      {/* System Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">System</h3>
        
        {/* Volume Control */}
        <div className="p-4 bg-dark-800 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Volume2 className="h-5 w-5" />
              <span>Volume</span>
            </div>
            <span>{volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Brightness Control */}
        <div className="p-4 bg-dark-800 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Monitor className="h-5 w-5" />
              <span>Brightness</span>
            </div>
            <span>{brightness}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* System Info */}
        <div className="p-4 bg-dark-800 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wifi className="h-5 w-5" />
              <span>Network</span>
            </div>
            <span className="text-green-400">Connected</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Battery className="h-5 w-5" />
              <span>Battery</span>
            </div>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 