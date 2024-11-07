import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DesktopIcon {
  id: string;
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  hoverColor: string;
  onClick: () => void;
  position?: { x: number; y: number };
}

interface DesktopIconsProps {
  icons: DesktopIcon[];
}

export const DesktopIcons = ({ icons: initialIcons }: DesktopIconsProps) => {
  // Adjusted grid configuration for better spacing
  const ICON_WIDTH = 100; // Increased width for better spacing
  const ICON_HEIGHT = 100; // Increased height for better spacing
  const GRID_GAP = 20; // Space between icons
  const MARGIN = 40; // Margin from screen edges
  const ICONS_PER_COLUMN = 6;

  const [icons, setIcons] = useState(initialIcons.map((icon, index) => {
    // Calculate position based on index
    const row = index % ICONS_PER_COLUMN;
    const column = Math.floor(index / ICONS_PER_COLUMN);
    
    return {
      ...icon,
      position: {
        x: MARGIN + (column * (ICON_WIDTH + GRID_GAP)),
        y: MARGIN + (row * (ICON_HEIGHT + GRID_GAP))
      }
    };
  }));

  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const handleDragEnd = (id: string, x: number, y: number) => {
    // Calculate nearest grid position
    const column = Math.round((x - MARGIN) / (ICON_WIDTH + GRID_GAP));
    const row = Math.round((y - MARGIN) / (ICON_HEIGHT + GRID_GAP));
    
    // Calculate snapped position
    const snappedX = MARGIN + (column * (ICON_WIDTH + GRID_GAP));
    const snappedY = MARGIN + (row * (ICON_HEIGHT + GRID_GAP));

    // Check if position is already occupied
    const isOccupied = icons.some(icon => 
      icon.id !== id && 
      icon.position?.x === snappedX && 
      icon.position?.y === snappedY
    );

    if (!isOccupied && column >= 0 && row >= 0 && row < ICONS_PER_COLUMN) {
      setIcons(prevIcons =>
        prevIcons.map(icon =>
          icon.id === id
            ? { ...icon, position: { x: snappedX, y: snappedY } }
            : icon
        )
      );
    } else {
      // Return to original position if spot is occupied
      setIcons(prevIcons =>
        prevIcons.map(icon =>
          icon.id === id
            ? { ...icon, position: { ...icon.position! } }
            : icon
        )
      );
    }
  };

  return (
    <div className="absolute inset-0">
      <AnimatePresence>
        {icons.map((icon) => (
          <motion.div
            key={icon.id}
            drag
            dragMomentum={false}
            dragElastic={0.1}
            dragConstraints={{
              top: MARGIN,
              left: MARGIN,
              right: window.innerWidth - ICON_WIDTH - MARGIN,
              bottom: window.innerHeight - ICON_HEIGHT - MARGIN
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1,
              scale: hoveredIcon === icon.id ? 1.1 : 1,
              x: icon.position?.x,
              y: icon.position?.y
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            onDragEnd={(_, info) => {
              handleDragEnd(icon.id, info.point.x, info.point.y);
            }}
            onClick={() => {
              setSelectedIcon(icon.id);
              icon.onClick();
            }}
            onHoverStart={() => setHoveredIcon(icon.id)}
            onHoverEnd={() => setHoveredIcon(null)}
            className="absolute w-24"
          >
            <div
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200
                ${selectedIcon === icon.id ? 'scale-105' : ''}
                ${hoveredIcon === icon.id ? 'z-10' : 'z-0'}
              `}
            >
              {/* Icon Container */}
              <motion.div
                className={`p-3 rounded-xl bg-[#0f1115]/80 backdrop-blur-sm border border-white/5
                  ${icon.bgColor} hover:bg-[#ffffff15] transition-all duration-300
                  ${selectedIcon === icon.id ? 'ring-2 ring-white/20 shadow-lg shadow-white/10' : ''}
                `}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {icon.icon}
              </motion.div>
              
              {/* Label */}
              <span className="mt-2 px-2 py-1 text-xs font-medium text-white text-center rounded-md bg-[#0f1115]/90 backdrop-blur-sm border border-white/5 shadow-lg w-full line-clamp-2">
                {icon.title}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};