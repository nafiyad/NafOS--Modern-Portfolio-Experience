import { Mail, Phone, Github, Linkedin } from 'lucide-react';

export const Resume = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-dark-800 text-gray-100">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Nafiyad Adane Gudina</h1>
        <h2 className="text-2xl text-primary-400 mb-4">Software Developer</h2>
        
        {/* Contact Information */}
        <div className="flex flex-wrap gap-4 text-gray-300">
          <a href="mailto:nafiadg@gmail.com" className="flex items-center gap-2 hover:text-primary-400">
            <Mail className="h-4 w-4" />
            nafiadg@gmail.com
          </a>
          <a href="tel:+14034373117" className="flex items-center gap-2 hover:text-primary-400">
            <Phone className="h-4 w-4" />
            +1 (403) 437-3117
          </a>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-400">
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-400">
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3 border-b border-gray-700 pb-2">
          Professional Summary
        </h2>
        <p className="text-gray-300">
          Software Developer with a focus on modern web technologies. Currently pursuing Software Development at Bow Valley College.
          Passionate about creating efficient, user-friendly applications using cutting-edge technologies.
        </p>
      </section>

      {/* Education */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3 border-b border-gray-700 pb-2">
          Education
        </h2>
        <div className="mb-4">
          <h3 className="text-lg font-medium text-primary-400">Software Development Diploma</h3>
          <p className="text-gray-300">Bow Valley College | 2023 - Present</p>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3 border-b border-gray-700 pb-2">
          Technical Skills
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium text-gray-200 mb-2">Front-end Development</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-dark-700 text-gray-300 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-200 mb-2">Tools & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {['Git', 'VS Code', 'Node.js', 'REST APIs', 'SQL', 'Figma'].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-dark-700 text-gray-300 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3 border-b border-gray-700 pb-2">
          Certifications
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-primary-400">Meta Front-End Development</h3>
            <p className="text-gray-300">Meta (formerly Facebook) | 2023</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-primary-400">Google Data Analytics</h3>
            <p className="text-gray-300">Google | 2023</p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-3 border-b border-gray-700 pb-2">
          Key Projects
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-primary-400">Portfolio Website</h3>
            <p className="text-gray-300">
              Modern portfolio website built with React, TypeScript, and Tailwind CSS.
              Features a unique desktop-like interface with window management.
            </p>
          </div>
          {/* Add more projects as needed */}
        </div>
      </section>
    </div>
  );
};