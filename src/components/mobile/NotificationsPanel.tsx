import { motion } from 'framer-motion';
import { Bell, X, Settings } from 'lucide-react';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsPanel = ({ isOpen, onClose }: NotificationsPanelProps) => {
  return (
    <motion.div
      initial={{ y: '-100%' }}
      animate={{ y: isOpen ? 0 : '-100%' }}
      transition={{ type: 'spring', damping: 25 }}
      className="fixed inset-x-0 top-0 h-[70%] bg-black/95 backdrop-blur-xl rounded-b-3xl border-b border-white/10 z-40"
    >
      <div className="p-6 pt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Notifications</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10"
          >
            <X className="h-6 w-6 text-white/60" />
          </button>
        </div>

        {/* Quick Settings */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 p-4 rounded-xl">
            <h3 className="text-sm font-medium text-white mb-2">Quick Settings</h3>
            <div className="flex space-x-4">
              <button className="p-2 rounded-lg bg-primary-500 text-white">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-lg bg-white/10 text-white">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          <div className="bg-white/5 p-4 rounded-xl">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-medium text-white">System Update</h4>
                <p className="text-xs text-white/60 mt-1">
                  NafiyadOS has been updated to version 2024.1
                </p>
              </div>
              <span className="text-xs text-white/40">Just now</span>
            </div>
          </div>
          {/* Add more notifications as needed */}
        </div>
      </div>
    </motion.div>
  );
}; 