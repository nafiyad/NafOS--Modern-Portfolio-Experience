export const About = () => {
  return (
    <div className="bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 gradient-text">About Me</h1>
          
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-gray-300 mb-6">
              I'm a second-year Software Development student at Bow Valley College,
              passionate about creating beautiful and functional web applications.
              My journey in tech began with a curiosity about how websites work,
              which led me to pursue formal education in software development.
            </p>

            <h2 className="text-2xl font-bold mb-4 text-white">Education</h2>
            <div className="card mb-6 p-6">
              <h3 className="text-xl font-bold text-white">Software Development Diploma</h3>
              <p className="text-gray-300">Bow Valley College | 2023 - Present</p>
              <ul className="list-disc list-inside text-gray-300 mt-2">
                <li>Focus on full-stack development</li>
                <li>Advanced programming concepts</li>
                <li>Database management</li>
                <li>Software engineering principles</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-white">Certifications</h2>
            <div className="space-y-4">
              <div className="card p-6">
                <h3 className="text-xl font-bold text-white">Meta Front-End Development Certificate</h3>
                <p className="text-gray-300">
                  Comprehensive training in modern front-end development technologies
                  and best practices.
                </p>
              </div>
              
              <div className="card p-6">
                <h3 className="text-xl font-bold text-white">Google Data Analytics Certificate</h3>
                <p className="text-gray-300">
                  Advanced data analysis techniques and tools for making data-driven
                  decisions.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold my-4 text-white">Technical Skills</h2>
            <div className="card p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold mb-2 text-white">Frontend</h3>
                  <ul className="list-disc list-inside text-gray-300">
                    <li>React.js</li>
                    <li>TypeScript</li>
                    <li>HTML5 & CSS3</li>
                    <li>Tailwind CSS</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-white">Tools & Others</h3>
                  <ul className="list-disc list-inside text-gray-300">
                    <li>Git & GitHub</li>
                    <li>VS Code</li>
                    <li>Responsive Design</li>
                    <li>Web Accessibility</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};