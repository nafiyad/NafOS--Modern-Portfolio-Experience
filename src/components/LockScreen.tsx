import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
  currentTime: Date;
}

export const LockScreen = ({ onUnlock, currentTime }: LockScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#0f1115] flex flex-col items-center justify-center z-50"
      onClick={onUnlock}
    >
      {/* Time Display */}
      <div className="text-center mb-12">
        <h1 className="text-7xl font-light text-white mb-2">
          {currentTime.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </h1>
        <p className="text-xl text-white/70">
          {currentTime.toLocaleDateString([], { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* User Profile */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4 mx-auto">
          <User className="h-12 w-12 text-white" />
        </div>
        <h2 className="text-2xl font-medium text-white">Nafiyad Adane</h2>
        <p className="text-white/50 mt-2">Click anywhere to unlock</p>
      </div>
    </motion.div>
  );
}; 