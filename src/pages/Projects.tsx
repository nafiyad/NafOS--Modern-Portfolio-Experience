import { useState } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { Search, Filter, Code, GitBranch, Clock } from 'lucide-react';

const projects = [
  {
    title: "portfolio-website",
    description: "Personal portfolio website built with React and Tailwind CSS. Features responsive design, dark mode, and smooth animations.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/portfolio",
    liveUrl: "https://your-portfolio.com",
    lastUpdated: "2024-03-15",
    status: "Active",
    stars: 12,
    forks: 3,
    watchers: 8
  },
  {
    title: "ecommerce-dashboard",
    description: "A comprehensive admin dashboard for e-commerce platforms. Includes order management, analytics, and inventory tracking.",
    technologies: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/yourusername/ecommerce-dashboard",
    lastUpdated: "2024-02-28",
    status: "In Progress",
    stars: 45,
    forks: 12,
    watchers: 15
  },
  {
    title: "weather-app",
    description: "Real-time weather application using OpenWeather API. Features include location-based forecasts and interactive maps.",
    technologies: ["JavaScript", "API", "CSS"],
    githubUrl: "https://github.com/yourusername/weather-app",
    liveUrl: "https://your-weather-app.com",
    lastUpdated: "2024-01-20",
    status: "Completed",
    stars: 28,
    forks: 8,
    watchers: 10
  }
];

type SortOption = 'stars' | 'updated' | 'name';

export const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('updated');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const allTechnologies = Array.from(
    new Set(projects.flatMap(project => project.technologies))
  );

  const filteredAndSortedProjects = projects
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTech = selectedTech.length === 0 ||
        selectedTech.some(tech => project.technologies.includes(tech));
      
      return matchesSearch && matchesTech;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return (b.stars || 0) - (a.stars || 0);
        case 'updated':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const toggleTech = (tech: string) => {
    setSelectedTech(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Repositories
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Showcasing my latest projects and contributions
            </p>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Find a repository..."
                className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-200 dark:border-gray-600
                  bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                  focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-600
                  bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="updated">Recently Updated</option>
                <option value="stars">Most Stars</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            {allTechnologies.map(tech => (
              <button
                key={tech}
                onClick={() => toggleTech(tech)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTech.includes(tech)
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredAndSortedProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        {filteredAndSortedProjects.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <Code className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No repositories found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};