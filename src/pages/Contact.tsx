import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8 p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Get in Touch</h1>
        <p className="text-gray-400">I'm always open to new opportunities and collaborations</p>
      </motion.div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email */}
        <motion.a 
          href="mailto:nafiadg@gmail.com"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10 
            hover:bg-white/10 transition-all cursor-pointer"
        >
          <div className="flex items-center space-x-3 text-gray-200">
            <Mail className="h-5 w-5 text-blue-400" />
            <span className="hover:text-blue-400 transition-colors">
              nafiadg@gmail.com
            </span>
          </div>
        </motion.a>

        {/* Phone */}
        <motion.a 
          href="tel:+14034373117"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10 
            hover:bg-white/10 transition-all cursor-pointer"
        >
          <div className="flex items-center space-x-3 text-gray-200">
            <Phone className="h-5 w-5 text-blue-400" />
            <span className="hover:text-blue-400 transition-colors">
              +1 (403) 437-3117
            </span>
          </div>
        </motion.a>

        {/* LinkedIn */}
        <motion.a 
          href="https://www.linkedin.com/in/nafiyad-adane-gudina-041a04200"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10 
            hover:bg-white/10 transition-all cursor-pointer"
        >
          <div className="flex items-center space-x-3 text-gray-200">
            <Linkedin className="h-5 w-5 text-blue-400" />
            <span className="hover:text-blue-400 transition-colors">
              LinkedIn Profile
            </span>
          </div>
        </motion.a>

        {/* GitHub */}
        <motion.a 
          href="https://github.com/nafiyad"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10 
            hover:bg-white/10 transition-all cursor-pointer"
        >
          <div className="flex items-center space-x-3 text-gray-200">
            <Github className="h-5 w-5 text-blue-400" />
            <span className="hover:text-blue-400 transition-colors">
              GitHub Profile
            </span>
          </div>
        </motion.a>

        {/* Location */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10 
            md:col-span-2"
        >
          <div className="flex items-center space-x-3 text-gray-200">
            <MapPin className="h-5 w-5 text-blue-400" />
            <span>Calgary, AB, Canada</span>
          </div>
        </motion.div>
      </div>

      {/* Contact Form or Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/10 mt-8"
      >
        <h2 className="text-xl font-bold text-white mb-4">Let's Connect!</h2>
        <p className="text-gray-300">
          Feel free to reach out through any of the channels above. I'm always interested in hearing 
          about new opportunities, collaborations, or just having a chat about technology and development.
        </p>
      </motion.div>
    </div>
  );
};