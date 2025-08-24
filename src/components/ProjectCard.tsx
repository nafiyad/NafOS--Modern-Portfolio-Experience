import { Github, ExternalLink, Star, GitFork, Eye } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  stars?: number;
  forks?: number;
  watchers?: number;
  lastUpdated: string;
  status: 'Active' | 'In Progress' | 'Completed' | 'Published';
}

export const ProjectCard = ({
  title,
  description,
  technologies,
  image,
  githubUrl,
  liveUrl,
  stars = 0,
  forks = 0,
  watchers = 0,
  lastUpdated,
  status
}: ProjectCardProps) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 overflow-hidden">
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={image} 
            alt={`${title} screenshot`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <Github className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
              {title}
            </h3>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
            status === 'In Progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
          }`}>
            {status}
          </span>
        </div>

        <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
          {description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-medium rounded-full
                bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200
                hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4" />
            <span>{stars}</span>
          </div>
          <div className="flex items-center space-x-1">
            <GitFork className="h-4 w-4" />
            <span>{forks}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4" />
            <span>{watchers}</span>
          </div>
          <span className="text-xs">
            Updated {new Date(lastUpdated).toLocaleDateString()}
          </span>
        </div>

        <div className="mt-4 flex space-x-3">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 text-sm font-medium
                rounded-md text-gray-700 dark:text-gray-200
                bg-gray-100 dark:bg-gray-700
                hover:bg-gray-200 dark:hover:bg-gray-600
                transition-colors duration-200"
            >
              <Github className="h-4 w-4 mr-1" />
              Repository
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 text-sm font-medium
                rounded-md text-white
                bg-indigo-600 hover:bg-indigo-700
                dark:bg-indigo-500 dark:hover:bg-indigo-600
                transition-colors duration-200"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};