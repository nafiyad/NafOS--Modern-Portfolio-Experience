import { 
  Code, 
  User, 
  Github, 
  Mail, 
  Briefcase, 
  Terminal, 
  Award,
  Gamepad2,
  Cloud,
  Globe
} from 'lucide-react';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Contact } from '../pages/Contact';
import { Projects } from '../pages/Projects';
import { Resume } from '../pages/Resume';
import { Terminal as TerminalApp } from '../pages/Terminal';
import { Certificates } from '../pages/Certificates';
import { Weather } from '../pages/Weather';
import { Snake } from '../pages/games/Snake';
import { TicTacToe } from '../pages/games/TicTacToe';
import Portfolio from '../pages/Portfolio';

import React from 'react';

export interface App {
  id: string;
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  component: React.ComponentType;
  category?: 'main' | 'games' | 'tools';
}

export const apps: App[] = [
  {
    id: 'home',
    title: 'Home',
    icon: React.createElement(Code, { className: "h-6 w-6 text-blue-500" }),
    bgColor: 'bg-blue-500/10',
    component: Home,
    category: 'main'
  },
  {
    id: 'about',
    title: 'About',
    icon: React.createElement(User, { className: "h-6 w-6 text-emerald-500" }),
    bgColor: 'bg-emerald-500/10',
    component: About,
    category: 'main'
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    icon: React.createElement(Globe, { className: "h-6 w-6 text-teal-500" }),
    bgColor: 'bg-teal-500/10',
    component: Portfolio,
    category: 'main'
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: React.createElement(Github, { className: "h-6 w-6 text-purple-500" }),
    bgColor: 'bg-purple-500/10',
    component: Projects,
    category: 'main'
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: React.createElement(Mail, { className: "h-6 w-6 text-pink-500" }),
    bgColor: 'bg-pink-500/10',
    component: Contact,
    category: 'main'
  },
  {
    id: 'resume',
    title: 'Resume',
    icon: React.createElement(Briefcase, { className: "h-6 w-6 text-amber-500" }),
    bgColor: 'bg-amber-500/10',
    component: Resume,
    category: 'main'
  },
  {
    id: 'terminal',
    title: 'Terminal',
    icon: React.createElement(Terminal, { className: "h-6 w-6 text-gray-500" }),
    bgColor: 'bg-gray-500/10',
    component: TerminalApp,
    category: 'tools'
  },
  {
    id: 'certificates',
    title: 'Certificates',
    icon: React.createElement(Award, { className: "h-6 w-6 text-indigo-500" }),
    bgColor: 'bg-indigo-500/10',
    component: Certificates,
    category: 'main'
  },
  {
    id: 'weather',
    title: 'Weather',
    icon: React.createElement(Cloud, { className: "h-6 w-6 text-cyan-500" }),
    bgColor: 'bg-cyan-500/10',
    component: Weather,
    category: 'tools'
  },
  {
    id: 'snake',
    title: 'Snake',
    icon: React.createElement(Gamepad2, { className: "h-6 w-6 text-green-500" }),
    bgColor: 'bg-green-500/10',
    component: Snake,
    category: 'games'
  },
  {
    id: 'tictactoe',
    title: 'Tic Tac Toe',
    icon: React.createElement(Gamepad2, { className: "h-6 w-6 text-violet-500" }),
    bgColor: 'bg-violet-500/10',
    component: TicTacToe,
    category: 'games'
  },

];

export const getAppsByCategory = (category: App['category']) => 
  apps.filter(app => app.category === category);