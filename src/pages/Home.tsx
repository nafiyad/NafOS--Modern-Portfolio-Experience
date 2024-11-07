import { motion } from 'framer-motion';
import { ArrowRight, Code, GraduationCap, Award } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import { CodeEditor } from '../components/CodeEditor';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 relative"
          >
            <div className="w-48 h-48 mx-auto relative">
              <img
                src="https://i.ibb.co/VvC0vpN/profile-pic.png"
                alt="Nafiyad Adane Gudina"
                className="rounded-full w-full h-full object-cover shadow-2xl border-4 border-indigo-500"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <span className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-full shadow-lg">
                Available for opportunities
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-white">
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Nafiyad
              </span>
            </h1>
            <div className="text-xl sm:text-2xl text-gray-300 mb-8 h-20">
              <Typewriter
                options={{
                  strings: [
                    'Software Developer',
                    'Front-end Specialist',
                    'UI/UX Enthusiast',
                    'Problem Solver'
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex justify-center space-x-4"
          >
            <a
              href="/projects"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center"
            >
              View My Work
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="/contact"
              className="px-8 py-3 bg-gray-700 text-white rounded-lg shadow-lg hover:bg-gray-600 transition-colors duration-300"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-20"
        >
          <CodeEditor />
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-indigo-500 transition-all duration-300">
            <GraduationCap className="h-12 w-12 text-indigo-400 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Education</h2>
            <p className="text-gray-300">
              Software Development Student at Bow Valley College
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-indigo-500 transition-all duration-300">
            <Award className="h-12 w-12 text-indigo-400 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Certifications</h2>
            <ul className="text-gray-300 space-y-2">
              <li>Meta Front-End Development</li>
              <li>Google Data Analytics</li>
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-indigo-500 transition-all duration-300">
            <Code className="h-12 w-12 text-indigo-400 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Node.js', 'Tailwind'].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-sm bg-indigo-900 text-indigo-200 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};