import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [showLogo, setShowLogo] = useState(false);

  const loadingStages = [
    'Initializing system...',
    'Loading components...',
    'Configuring environment...',
    'Starting services...',
    'Almost ready...'
  ];

  useEffect(() => {
    // Play startup sound
    const audio = new Audio('/startup.mp3');
    audio.play().catch(e => console.log('Audio playback failed:', e));

    // Show logo after a delay
    setTimeout(() => setShowLogo(true), 500);

    // Progress bar and loading text animation
    let currentStage = 0;
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Update loading text based on progress
        const newProgress = Math.min(prev + 0.5, 100);
        const stageIndex = Math.floor((newProgress / 100) * loadingStages.length);
        if (stageIndex !== currentStage) {
          currentStage = stageIndex;
          setLoadingText(loadingStages[stageIndex]);
        }
        return newProgress;
      });
    }, 20);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f1115]"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative flex flex-col items-center justify-center max-w-2xl w-full p-8">
        {/* Logo Animation */}
        <AnimatePresence>
          {showLogo && (
            <motion.div
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1]
              }}
              className="mb-16 text-center relative"
            >
              {/* Spinning loader around logo */}
              <motion.div
                className="absolute -inset-8"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Loader2 className="w-8 h-8 text-indigo-500/50" />
              </motion.div>

              <h1 className="text-8xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                  NafiyadOS
                </span>
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Bar Container */}
        <div className="w-80 space-y-4">
          {/* Progress Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between text-sm mb-2"
          >
            <span className="text-gray-400">{loadingText}</span>
            <span className="text-gray-400">{Math.round(progress)}%</span>
          </motion.div>

          {/* Progress Bar */}
          <div className="relative h-1 bg-dark-800 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
            />
            
            {/* Loading Glow Effect */}
            <motion.div
              className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: [-80, 320],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </div>
      </div>

      {/* System Info - Now positioned at the bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 left-0 right-0 flex justify-center items-center gap-8 text-xs text-gray-500"
      >
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-gray-500"></div>
          <span>Build 2024.1.0</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-gray-500"></div>
          <span>© 2024 NafiyadOS</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-gray-500"></div>
          <span>Advanced Desktop Environment</span>
        </div>
      </motion.div>
    </motion.div>
  );
}; 