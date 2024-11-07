import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, RefreshCw, ExternalLink } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  credentialUrl: string;
  courses?: string[];
}

interface BrowserProps {
  onClose: () => void;
}

export const Browser = ({ onClose }: BrowserProps) => {
  const certificates: Certificate[] = [
    {
      id: 'meta-frontend',
      title: 'Meta Front-End Developer',
      issuer: 'Meta',
      date: 'July 6, 2024',
      imageUrl: '/meta-cert.jpg', // You'll need to add this image
      credentialUrl: 'https://coursera.org/share/5e1f7ed8af6b48b40e4f1738b2c37695',
      courses: [
        'Principles of UX/UI Design',
        'Version Control',
        'Coding Interview Preparation',
        'Introduction to Front-End Development',
        'Advanced React',
        'Front-End Developer Capstone',
        'HTML and CSS in depth',
        'React Basics',
        'Programming with JavaScript'
      ]
    },
    {
      id: 'google-analytics',
      title: 'Google Data Analytics',
      issuer: 'Google',
      date: 'December 16, 2023',
      imageUrl: '/google-cert.jpg', // You'll need to add this image
      credentialUrl: 'https://coursera.org/share/74e968ba644206143cc10e79579ae4c3',
      courses: [
        'Prepare Data for Exploration',
        'Google Data Analytics Capstone: Complete a Case Study',
        'Process Data from Dirty to Clean',
        'Foundations: Data, Data, Everywhere',
        'Data Analysis with R Programming',
        'Analyze Data to Answer Questions',
        'Ask Questions to Make Data-Driven Decisions',
        'Share Data Through the Art of Visualization'
      ]
    }
  ];

  const [currentCertificate, setCurrentCertificate] = useState<Certificate>(certificates[0]);

  return (
    <div className="flex flex-col h-full bg-dark-800">
      {/* Browser Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-dark-900 border-b border-dark-700">
        <div className="flex items-center space-x-2">
          <button className="p-1.5 rounded-full hover:bg-dark-700">
            <ChevronLeft className="h-4 w-4 text-gray-400" />
          </button>
          <button className="p-1.5 rounded-full hover:bg-dark-700">
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
          <button className="p-1.5 rounded-full hover:bg-dark-700">
            <RefreshCw className="h-4 w-4 text-gray-400" />
          </button>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-dark-700"
        >
          <X className="h-4 w-4 text-gray-400" />
        </button>
      </div>

      {/* Certificate Viewer */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          {/* Certificate Navigation */}
          <div className="flex justify-center mb-6 space-x-4">
            {certificates.map((cert) => (
              <button
                key={cert.id}
                onClick={() => setCurrentCertificate(cert)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentCertificate.id === cert.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                }`}
              >
                {cert.title}
              </button>
            ))}
          </div>

          {/* Certificate Display */}
          <div className="bg-dark-700 rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {currentCertificate.title}
                </h2>
                <p className="text-gray-300">
                  Issued by {currentCertificate.issuer} | {currentCertificate.date}
                </p>
              </div>
              <a
                href={currentCertificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                View Credential
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* Course List */}
            <div className="mt-6 p-4 bg-dark-800 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Completed Courses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentCertificate.courses?.map((course, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-2 text-gray-300 bg-dark-700/50 p-3 rounded-lg"
                  >
                    <span className="text-primary-400">•</span>
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div className="mt-6 p-4 bg-dark-800 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Key Skills Acquired</h3>
              {currentCertificate.id === 'meta-frontend' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Skill text="React.js Development" />
                  <Skill text="TypeScript/JavaScript" />
                  <Skill text="HTML5 & CSS3" />
                  <Skill text="Responsive Design" />
                  <Skill text="Version Control" />
                  <Skill text="Web Accessibility" />
                  <Skill text="UI/UX Principles" />
                  <Skill text="Testing & Debugging" />
                  <Skill text="API Integration" />
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Skill text="Data Analysis" />
                  <Skill text="R Programming" />
                  <Skill text="SQL" />
                  <Skill text="Data Visualization" />
                  <Skill text="Statistical Analysis" />
                  <Skill text="Data Cleaning" />
                  <Skill text="Data Ethics" />
                  <Skill text="Problem Solving" />
                  <Skill text="Data Storytelling" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Skill = ({ text }: { text: string }) => (
  <div className="flex items-center space-x-2 text-gray-300 bg-dark-700/50 p-2 rounded-lg">
    <span className="text-primary-400">•</span>
    <span>{text}</span>
  </div>
);