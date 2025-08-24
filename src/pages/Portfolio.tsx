import React from 'react';
import { Github, Linkedin, Mail, MapPin, Calendar, Trophy, Code, Database, Smartphone, Cloud, Star, Heart, Users, Zap } from 'lucide-react';

const Portfolio = () => {
  const skills = {
    frontend: [
      { name: 'React', level: 90 },
      { name: 'React Native', level: 85 },
      { name: 'TypeScript', level: 85 },
      { name: 'JavaScript', level: 95 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'Tailwind CSS', level: 85 }
    ],
    backend: [
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'C#', level: 75 },
      { name: 'Java', level: 70 },
      { name: 'Express.js', level: 85 },
      { name: 'REST APIs', level: 90 }
    ],
    database: [
      { name: 'PostgreSQL', level: 80 },
      { name: 'MongoDB', level: 75 },
      { name: 'MySQL', level: 70 },
      { name: 'Supabase', level: 85 },
      { name: 'Firebase', level: 80 }
    ],
    mobile: [
      { name: 'React Native', level: 85 },
      { name: 'Expo', level: 80 },
      { name: 'iOS Development', level: 75 },
      { name: 'Android Development', level: 80 },
      { name: 'Mobile UI/UX', level: 85 },
      { name: 'React Navigation', level: 80 }
    ],
    devops: [
      { name: 'Git/GitHub', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 70 },
      { name: 'CI/CD', level: 75 },
      { name: 'Linux', level: 80 }
    ]
  };

  const qualities = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Problem Solver',
      description: 'Analytical thinker with a knack for finding elegant solutions to complex problems'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Team Player',
      description: 'Excellent communicator who thrives in collaborative environments'
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: 'Detail-Oriented',
      description: 'Committed to writing clean, well-documented, and maintainable code'
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Fast Learner',
      description: 'Quickly adapt to new technologies and frameworks'
    }
  ];

  const currentActivities = [
    '🔭 Currently working on enhancing my portfolio with advanced React projects',
    '🌱 Continuously learning and improving my skills in cloud technologies and microservices',
    '👯 Looking to collaborate on open source projects',
    '💬 Ask me about Web Development, Mobile Applications, or DevOps'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="relative inline-block mb-8">
              <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea'/%3E%3Cstop offset='100%25' style='stop-color:%23764ba2'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='400' fill='url(%23bg)'/%3E%3Ccircle cx='200' cy='160' r='60' fill='%23ffffff' opacity='0.9'/%3E%3Cpath d='M200 240 Q160 260 120 300 Q140 320 200 320 Q260 320 280 300 Q240 260 200 240' fill='%23ffffff' opacity='0.9'/%3E%3C/svg%3E"
                  alt="Nafiyad Adane"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-12 h-12 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4">
              Nafiyad Adane
            </h1>
            
            <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 space-y-2">
              <p className="font-semibold">Junior Full Stack Developer</p>
              <p className="text-lg">React Native Application Developer | Frontend Developer</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                Mobile App Developer
              </span>
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                Recent Graduate
              </span>
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                React Native Developer
              </span>
            </div>
            
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Github className="h-8 w-8" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Linkedin className="h-8 w-8" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Mail className="h-8 w-8" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="prose prose-lg dark:prose-invert mx-auto text-center">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              I am a passionate Mobile App Developer and recent graduate from Bow Valley College, 
              specializing in React Native cross-platform development. As a fresh graduate, I bring 
              enthusiasm, modern development practices, and a strong foundation in mobile application 
              development to create innovative solutions.
            </p>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-12">
              My expertise lies in building mobile-first applications using React Native, creating seamless 
              user experiences across iOS and Android platforms. I'm eager to apply my skills in real-world 
              projects and contribute to teams that value innovation and quality mobile development.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              {currentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-2xl">{activity.split(' ')[0]}</span>
                  <p className="text-gray-700 dark:text-gray-300">{activity.substring(2)}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Passion for Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                I am constantly exploring new technologies and methodologies to enhance my skills. I believe in 
                continuous learning and staying updated with the latest industry trends.
              </p>
              <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 border-l-4 border-blue-500 pl-4">
                "Learning never exhausts the mind." — Leonardo da Vinci
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Frontend Development */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-6">
                <Code className="h-8 w-8 text-blue-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Frontend Development
                </h3>
              </div>
              <div className="space-y-4">
                {skills.frontend.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend Development */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-6">
                <Database className="h-8 w-8 text-green-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Backend Development
                </h3>
              </div>
              <div className="space-y-4">
                {skills.backend.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Database Technologies */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-6">
                <Database className="h-8 w-8 text-purple-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Database Technologies
                </h3>
              </div>
              <div className="space-y-4">
                {skills.database.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Development */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-6">
                <Smartphone className="h-8 w-8 text-orange-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Mobile Development
                </h3>
              </div>
              <div className="space-y-4">
                {skills.mobile.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DevOps & Tooling */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg lg:col-span-2 xl:col-span-1">
              <div className="flex items-center mb-6">
                <Cloud className="h-8 w-8 text-red-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  DevOps & Tooling
                </h3>
              </div>
              <div className="space-y-4">
                {skills.devops.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Qualities Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Qualities
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualities.map((quality, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {quality.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {quality.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {quality.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
          <p className="text-gray-300 mb-8">
            I'm always open to discussing new opportunities and interesting projects.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <Github className="h-8 w-8" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <Linkedin className="h-8 w-8" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <Mail className="h-8 w-8" />
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-400">
              © 2024 Nafiyad Adane. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;