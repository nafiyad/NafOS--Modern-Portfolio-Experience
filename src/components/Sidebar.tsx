import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface TreeItem {
  name: string;
  type: 'file' | 'folder';
  children?: TreeItem[];
}

const fileStructure: TreeItem[] = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'components',
        type: 'folder',
        children: [
          { name: 'Navbar.tsx', type: 'file' },
          { name: 'Sidebar.tsx', type: 'file' },
          { name: 'Terminal.tsx', type: 'file' },
        ],
      },
      {
        name: 'pages',
        type: 'folder',
        children: [
          { name: 'Home.tsx', type: 'file' },
          { name: 'About.tsx', type: 'file' },
          { name: 'Projects.tsx', type: 'file' },
          { name: 'Contact.tsx', type: 'file' },
        ],
      },
      { name: 'App.tsx', type: 'file' },
      { name: 'main.tsx', type: 'file' },
    ],
  },
];

const TreeNode = ({ item }: { item: TreeItem }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (item.type === 'file') {
    return (
      <div className="flex items-center space-x-2 px-4 py-1 text-gray-300 hover:bg-gray-700 cursor-pointer">
        <File className="h-4 w-4" />
        <span className="text-sm">{item.name}</span>
      </div>
    );
  }

  return (
    <div>
      <div
        className="flex items-center space-x-2 px-4 py-1 text-gray-300 hover:bg-gray-700 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
        <Folder className="h-4 w-4" />
        <span className="text-sm">{item.name}</span>
      </div>
      {isOpen && item.children && (
        <div className="ml-4">
          {item.children.map((child) => (
            <TreeNode key={child.name} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  return (
    <div
      className={`bg-gray-800 border-r border-gray-700 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-0'
      }`}
    >
      {isOpen && (
        <div className="p-2">
          <div className="text-gray-400 text-sm font-medium mb-2 px-4">EXPLORER</div>
          {fileStructure.map((item) => (
            <TreeNode key={item.name} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};