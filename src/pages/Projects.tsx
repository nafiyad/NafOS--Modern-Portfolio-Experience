import { useState } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { Search, Filter, Code, GitBranch, Clock } from 'lucide-react';

const projects = [
  {
    title: "portfolio-website",
    description: "Modern portfolio website built with React, TypeScript, and Tailwind CSS. Features a desktop OS-like interface with interactive components, dark mode, and smooth animations.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    githubUrl: "https://github.com/yourusername/portfolio-website",
    liveUrl: "https://nafiyadadaneportfolio.netlify.app",
    lastUpdated: "2024-03-15",
    status: "Active",
    stars: 12,
    forks: 3,
    watchers: 8
  },
  {
    title: "Taskly",
    description: "Modern productivity and habit tracking SaaS app with subscription management. Features task organization with priorities, habit tracking with streaks, gamification through badges and achievements, and real-time data synchronization. Built with a scalable freemium business model.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "PostgreSQL"],
    githubUrl: "https://github.com/nafiyad/Taskly-",
    liveUrl: "https://taskly-by-nafiyad.netlify.app/",
    lastUpdated: "2024-03-20",
    status: "Active",
    image: "/assets/images/taskly.png",
    stars: 24,
    forks: 7,
    watchers: 15
  },
  {
    title: "Expenza",
    description: "Budget management mobile application available on Google Play Store. Helps users track expenses, manage budgets, and gain insights into spending patterns with intuitive UI and comprehensive financial tools.",
    technologies: ["React Native", "JavaScript", "Firebase", "Android"],
    liveUrl: "https://play.google.com/store/apps/details?id=com.expenza.app",
    lastUpdated: "2024-02-10",
    status: "Published",
    stars: 0,
    forks: 0,
    watchers: 0
  },
  {
    title: "S&M Couture Inc - Ecommerce Platform",
    description: "Group capstone project developing a comprehensive ecommerce platform for S&M Couture Inc. Served as frontend developer, implementing responsive UI, product catalog, shopping cart, user authentication, and payment processing with Stripe integration.",
    technologies: ["Next.js", "React", "TypeScript", "Prisma", "Stripe", "Neon DB", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/sm-couture-ecommerce",
    lastUpdated: "2024-01-15",
    status: "Completed",
    stars: 8,
    forks: 4,
    watchers: 6
  },
  {
      title: "WeatherPro",
      description: "A beautiful, high-performance weather application featuring stunning visual effects and automatic location detection. Includes dynamic particle systems, golden hour themes, 5-day forecasts, and professional glass morphism UI design.",
      technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Weather API", "Lucide React"],
      githubUrl: "https://github.com/nafiyad/weatherpro",
      liveUrl: "https://weatherpro-by-nafiyad.netlify.app",
      lastUpdated: "2024-03-20",
      status: "Active",
      image: "/assets/images/weatherpro.png",
      stars: 18,
      forks: 5,
      watchers: 12
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