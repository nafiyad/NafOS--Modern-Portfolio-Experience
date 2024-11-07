import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface MobileLoaderProps {
  onLoadComplete?: () => void;
}

export const MobileLoader = ({ onLoadComplete }: MobileLoaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2 }}
      onAnimationComplete={onLoadComplete}
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
    >
      {/* Brand Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 
          flex items-center justify-center border border-white/20 shadow-lg shadow-blue-500/20">
          <span className="text-3xl font-bold text-white tracking-wider">N</span>
        </div>
      </motion.div>

      {/* Brand Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-white tracking-widest">
          Nafiyad <span className="text-blue-500">OS</span>
        </h1>
      </motion.div>

      {/* Loading Spinner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center"
      >
        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        <span className="text-white/60 text-sm mt-4 font-mono">
          Initializing System...
        </span>
      </motion.div>

      {/* Loading Progress */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute bottom-16 left-8 right-8"
      >
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Version Number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 text-white/40 text-xs font-mono"
      >
        v1.0.0
      </motion.div>
    </motion.div>
  );
}; 