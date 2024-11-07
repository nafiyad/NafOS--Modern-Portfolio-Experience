import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, FolderOpen, ChevronRight, ChevronDown } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';

interface File {
  name: string;
  content: string;
  language: string;
}

export const CodeEditor = () => {
  const [activeFile, setActiveFile] = useState('profile.ts');
  const [expandedFolders, setExpandedFolders] = useState(['src']);
  const [highlightedContent, setHighlightedContent] = useState('');

  const files: Record<string, File> = {
    'profile.ts': {
      name: 'profile.ts',
      language: 'typescript',
      content: `interface Developer {
  name: string;
  role: string;
  education: string;
  skills: string[];
  passion: string;
}

const nafiyad: Developer = {
  name: "Nafiyad Adane Gudina",
  role: "Software Developer",
  education: "Bow Valley College | 2023 - Present",
  skills: ["React", "TypeScript", "Node.js", "Python"],
  passion: "Creating Beautiful Web Experiences"
};

// Currently working on exciting projects
function getCurrentProject(): string {
  return "Building innovative web solutions";
}

// Get my tech stack
function getTechStack(): string[] {
  return [
    "React.js",
    "TypeScript",
    "Node.js",
    "Python",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "Docker"
  ];
}

// Contact information
const contact = {
  email: "nafiadg@gmail.com",
  github: "github.com/nafiyad",
  linkedin: "linkedin.com/in/nafiyad",
  location: "Calgary, AB, Canada"
};`
    },
    'about.ts': {
      name: 'about.ts',
      language: 'typescript',
      content: `// About Me
const aboutMe = {
  background: "Software Developer with a passion for creating innovative solutions",
  interests: [
    "Web Development",
    "Cloud Computing",
    "Machine Learning",
    "UI/UX Design"
  ],
  goals: "Building impactful applications that solve real-world problems"
};`
    },
    'projects.ts': {
      name: 'projects.ts',
      language: 'typescript',
      content: `// Featured Projects
interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

const projects: Project[] = [
  {
    name: "NafiyadOS",
    description: "A web-based operating system portfolio",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    link: "github.com/nafiyad/portfolio"
  },
  // More projects coming soon...
];`
    }
  };

  useEffect(() => {
    const highlight = () => {
      const content = files[activeFile].content;
      const highlighted = Prism.highlight(
        content,
        Prism.languages[files[activeFile].language],
        files[activeFile].language
      );
      setHighlightedContent(highlighted);
    };

    highlight();
  }, [activeFile]);

  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev => 
      prev.includes(folder) 
        ? prev.filter(f => f !== folder)
        : [...prev, folder]
    );
  };

  return (
    <div className="flex h-full text-sm">
      {/* Sidebar */}
      <div className="w-64 bg-[#1e1e1e] border-r border-[#2d2d2d]">
        {/* File Explorer Header */}
        <div className="p-3 text-[#cccccc] uppercase text-xs font-semibold tracking-wider">
          Explorer
        </div>

        {/* Project Structure */}
        <div className="px-2">
          <div className="space-y-1">
            <div 
              className="flex items-center px-2 py-1 text-[#cccccc] hover:bg-[#2a2d2e] rounded cursor-pointer"
              onClick={() => toggleFolder('src')}
            >
              {expandedFolders.includes('src') ? (
                <ChevronDown className="h-4 w-4 mr-1" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-1" />
              )}
              <FolderOpen className="h-4 w-4 mr-2 text-[#dcb67a]" />
              <span>src</span>
            </div>

            {expandedFolders.includes('src') && (
              <div className="ml-4 space-y-1">
                {Object.keys(files).map(filename => (
                  <div
                    key={filename}
                    className={`flex items-center px-2 py-1 rounded cursor-pointer ${
                      activeFile === filename
                        ? 'bg-[#37373d] text-white'
                        : 'text-[#cccccc] hover:bg-[#2a2d2e]'
                    }`}
                    onClick={() => setActiveFile(filename)}
                  >
                    <FileText className="h-4 w-4 mr-2 text-[#75beff]" />
                    <span>{filename}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col bg-[#1e1e1e]">
        {/* Tabs */}
        <div className="flex items-center bg-[#252526] border-b border-[#2d2d2d]">
          {Object.keys(files).map(filename => (
            <motion.button
              key={filename}
              className={`px-4 py-2 flex items-center space-x-2 ${
                activeFile === filename
                  ? 'bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]'
                  : 'text-[#969696] hover:bg-[#2a2d2e]'
              }`}
              onClick={() => setActiveFile(filename)}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              whileTap={{ scale: 0.98 }}
            >
              <FileText className="h-4 w-4" />
              <span>{filename}</span>
            </motion.button>
          ))}
        </div>

        {/* Code Area */}
        <div className="flex-1 overflow-auto p-4">
          <pre className="font-mono">
            <code 
              className="language-typescript"
              dangerouslySetInnerHTML={{ __html: highlightedContent }}
            />
          </pre>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-4 py-1 bg-[#007acc] text-white text-xs">
          <div className="flex items-center space-x-4">
            <span>TypeScript</span>
            <span>UTF-8</span>
            <span>LF</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Ln 1, Col 1</span>
            <span>Spaces: 2</span>
          </div>
        </div>
      </div>
    </div>
  );
};