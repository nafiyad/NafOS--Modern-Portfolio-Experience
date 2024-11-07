import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  credentialUrl: string;
  skills: string[];
}

export const Certificates = () => {
  const certificates: Certificate[] = [
    {
      title: 'Meta Front-End Developer',
      issuer: 'Meta',
      date: 'July 2023',
      imageUrl: '/meta-cert.jpg', // Add your certificate image
      credentialUrl: 'https://coursera.org/verify/professional-cert/XXXXXX',
      skills: [
        'React.js',
        'JavaScript',
        'HTML/CSS',
        'Version Control',
        'UX/UI Design',
        'Web Development'
      ]
    },
    {
      title: 'Google Data Analytics',
      issuer: 'Google',
      date: 'December 2023',
      imageUrl: '/google-cert.jpg', // Add your certificate image
      credentialUrl: 'https://coursera.org/verify/professional-cert/XXXXXX',
      skills: [
        'Data Analysis',
        'SQL',
        'R Programming',
        'Data Visualization',
        'Tableau',
        'Statistics'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {certificates.map((cert, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/5 rounded-lg overflow-hidden"
        >
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-500" />
                  {cert.title}
                </h2>
                <p className="text-gray-400 text-sm">{cert.issuer} | {cert.date}</p>
              </div>
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transition-colors"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
            
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {cert.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}; 