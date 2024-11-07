import { motion } from 'framer-motion';
import { GraduationCap, Award, Code, Linkedin } from 'lucide-react';

export const Resume = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-white space-y-6"
    >
      {/* Header with LinkedIn */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-start mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold">Nafiyad Adane</h1>
          <p className="text-gray-400">Software Developer</p>
        </div>
        <motion.a
          href="https://www.linkedin.com/in/nafiyad-adane-gudina-041a04200"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 rounded-lg 
            hover:bg-blue-500/20 transition-colors"
        >
          <Linkedin className="h-5 w-5 text-blue-400" />
          <span className="text-blue-400">LinkedIn Profile</span>
        </motion.a>
      </motion.div>

      {/* Education */}
      <motion.section
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-blue-500" />
          Education
        </h2>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 rounded-lg p-4"
        >
          <h3 className="text-lg font-semibold">Software Development</h3>
          <p className="text-gray-400">Bow Valley College | 2023 - Present</p>
          <p className="text-sm text-gray-500 mt-2">
            Focusing on full-stack development, cloud computing, and modern web technologies.
          </p>
        </motion.div>
      </motion.section>

      {/* Skills */}
      <motion.section
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Code className="h-5 w-5 text-blue-500" />
          Technical Skills
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 rounded-lg p-4"
          >
            <h3 className="font-semibold mb-2">Frontend</h3>
            <ul className="space-y-1 text-gray-400">
              <li>React.js</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Next.js</li>
            </ul>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 rounded-lg p-4"
          >
            <h3 className="font-semibold mb-2">Backend</h3>
            <ul className="space-y-1 text-gray-400">
              <li>Node.js</li>
              <li>Python</li>
              <li>MongoDB</li>
              <li>PostgreSQL</li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* Certifications */}
      <motion.section
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-blue-500" />
          Certifications
        </h2>
        <div className="space-y-4">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 rounded-lg p-4"
          >
            <h3 className="font-semibold">Meta Front-End Developer</h3>
            <p className="text-gray-400">Meta | 2023</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 rounded-lg p-4"
          >
            <h3 className="font-semibold">Google Data Analytics</h3>
            <p className="text-gray-400">Google | 2023</p>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}; 