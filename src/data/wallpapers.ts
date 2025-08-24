export interface Wallpaper {
  id: string;
  name: string;
  type: 'gradient' | 'pattern' | 'image';
  preview: string;
  background: string;
  overlays?: string[];
  animations?: string[];
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
  wallpapers: Wallpaper[];
  primaryColor: string;
  accentColor: string;
}

export const themes: Theme[] = [
  {
    id: 'cosmic',
    name: 'Cosmic Dreams',
    description: 'Deep space inspired gradients with stellar animations',
    preview: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
    primaryColor: '#3B82F6',
    accentColor: '#8B5CF6',
    wallpapers: [
      {
        id: 'cosmic-nebula',
        name: 'Cosmic Nebula',
        type: 'gradient',
        preview: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
        background: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
        overlays: [
          'bg-gradient-to-tr from-pink-500/10 via-purple-500/15 to-blue-500/10',
          'bg-gradient-to-bl from-indigo-500/8 via-violet-500/12 to-purple-500/8'
        ],
        animations: ['animate-gradient-slow', 'animate-shimmer']
      },
      {
        id: 'stellar-void',
        name: 'Stellar Void',
        type: 'gradient',
        preview: 'bg-gradient-to-br from-gray-900 via-purple-900 to-black',
        background: 'bg-gradient-to-br from-gray-900 via-purple-900 to-black',
        overlays: [
          'bg-gradient-to-r from-blue-500/5 via-purple-500/10 to-pink-500/5',
          'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iI2ZmZmZmZjMwIi8+CjxjaXJjbGUgY3g9IjgwIiBjeT0iNDAiIHI9IjEuNSIgZmlsbD0iI2ZmZmZmZjIwIi8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iODAiIHI9IjAuNSIgZmlsbD0iI2ZmZmZmZjQwIi8+CjxjaXJjbGUgY3g9IjcwIiBjeT0iMTAiIHI9IjIiIGZpbGw9IiNmZmZmZmYxNSIvPgo8L3N2Zz4=")] opacity-60'
        ],
        animations: ['animate-float', 'animate-breathe']
      }
    ]
  },
  {
    id: 'ocean',
    name: 'Ocean Depths',
    description: 'Serene ocean-inspired themes with flowing animations',
    preview: 'bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900',
    primaryColor: '#06B6D4',
    accentColor: '#0EA5E9',
    wallpapers: [
      {
        id: 'deep-ocean',
        name: 'Deep Ocean',
        type: 'gradient',
        preview: 'bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900',
        background: 'bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900',
        overlays: [
          'bg-gradient-to-tr from-cyan-500/12 via-blue-500/8 to-teal-500/12',
          'bg-gradient-to-bl from-blue-400/6 via-cyan-400/10 to-blue-600/6'
        ],
        animations: ['animate-gradient-slow', 'animate-float']
      },
      {
        id: 'tropical-waves',
        name: 'Tropical Waves',
        type: 'gradient',
        preview: 'bg-gradient-to-br from-teal-800 via-cyan-800 to-blue-800',
        background: 'bg-gradient-to-br from-teal-800 via-cyan-800 to-blue-800',
        overlays: [
          'bg-gradient-to-r from-emerald-500/8 via-teal-500/12 to-cyan-500/8',
          'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIj4KPHBhdGggZD0iTTAgNjBRMzAgMzAgNjAgNjBUMTIwIDYwIiBzdHJva2U9IiNmZmZmZmYwOCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Ik0wIDkwUTMwIDYwIDYwIDkwVDEyMCA5MCIgc3Ryb2tlPSIjZmZmZmZmMDUiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4=")] opacity-30'
        ],
        animations: ['animate-shimmer', 'animate-breathe']
      }
    ]
  },
  {
    id: 'sunset',
    name: 'Golden Sunset',
    description: 'Warm sunset colors with golden hour ambiance',
    preview: 'bg-gradient-to-br from-orange-800 via-red-800 to-pink-800',
    primaryColor: '#F59E0B',
    accentColor: '#EF4444',
    wallpapers: [
      {
        id: 'golden-hour',
        name: 'Golden Hour',
        type: 'gradient',
        preview: 'bg-gradient-to-br from-orange-800 via-red-800 to-pink-800',
        background: 'bg-gradient-to-br from-orange-800 via-red-800 to-pink-800',
        overlays: [
          'bg-gradient-to-tr from-yellow-500/10 via-orange-500/15 to-red-500/10',
          'bg-gradient-to-bl from-pink-500/8 via-rose-500/12 to-orange-500/8'
        ],
        animations: ['animate-gradient-slow', 'animate-glow']
      },
      {
        id: 'desert-mirage',
        name: 'Desert Mirage',
        type: 'gradient',
        preview: 'bg-gradient-to-br from-amber-900 via-orange-900 to-red-900',
        background: 'bg-gradient-to-br from-amber-900 via-orange-900 to-red-900',
        overlays: [
          'bg-gradient-to-r from-yellow-500/6 via-amber-500/10 to-orange-500/6',
          'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+CjxjaXJjbGUgY3g9IjQwIiBjeT0iNDAiIHI9IjMwIiBzdHJva2U9IiNmZmZmZmYwNSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iNDAiIHI9IjIwIiBzdHJva2U9IiNmZmZmZmYwOCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iNDAiIHI9IjEwIiBzdHJva2U9IiNmZmZmZmYxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==")] opacity-25'
        ],
        animations: ['animate-morph', 'animate-pulse']
      }
    ]
  },
  {
    id: 'forest',
    name: 'Mystic Forest',
    description: 'Enchanted forest themes with natural gradients',
    preview: 'bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900',
    primaryColor: '#10B981',
    accentColor: '#059669',
    wallpapers: [
      {
        id: 'emerald-forest',
        name: 'Emerald Forest',
        type: 'gradient',
        preview: 'bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900',
        background: 'bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900',
        overlays: [
          'bg-gradient-to-tr from-emerald-500/12 via-green-500/8 to-teal-500/12',
          'bg-gradient-to-bl from-lime-500/6 via-emerald-500/10 to-green-500/6'
        ],
        animations: ['animate-gradient-slow', 'animate-float']
      },
      {
        id: 'enchanted-grove',
        name: 'Enchanted Grove',
        type: 'gradient',
        preview: 'bg-gradient-to-br from-lime-900 via-green-900 to-emerald-900',
        background: 'bg-gradient-to-br from-lime-900 via-green-900 to-emerald-900',
        overlays: [
          'bg-gradient-to-r from-green-500/8 via-emerald-500/12 to-lime-500/8',
          'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxwYXRoIGQ9Ik0zMCA1QzM1IDEwIDQwIDIwIDMwIDMwQzIwIDIwIDI1IDEwIDMwIDUiIGZpbGw9IiNmZmZmZmYwNiIvPgo8cGF0aCBkPSJNMTAgMjVDMTUgMzAgMjAgNDAgMTAgNDBDNSA0MCA1IDMwIDEwIDI1IiBmaWxsPSIjZmZmZmZmMDQiLz4KPHA+dGggZD0iTTUwIDM1QzU1IDQwIDUwIDUwIDQ1IDQ1QzQwIDQwIDQ1IDM1IDUwIDM1IiBmaWxsPSIjZmZmZmZmMDUiLz4KPC9zdmc+")] opacity-20'
        ],
        animations: ['animate-breathe', 'animate-shimmer']
      }
    ]
  },
  {
    id: 'aurora',
    name: 'Aurora Borealis',
    description: 'Northern lights inspired with ethereal animations',
    preview: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-cyan-900',
    primaryColor: '#8B5CF6',
    accentColor: '#06B6D4',
    wallpapers: [
      {
        id: 'northern-lights',
        name: 'Northern Lights',
        type: 'gradient',
        preview: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-cyan-900',
        background: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-cyan-900',
        overlays: [
          'bg-gradient-to-tr from-cyan-500/15 via-purple-500/10 to-green-500/15',
          'bg-gradient-to-bl from-violet-500/8 via-cyan-500/12 to-purple-500/8'
        ],
        animations: ['animate-gradient-slow', 'animate-shimmer']
      },
      {
        id: 'polar-glow',
        name: 'Polar Glow',
        type: 'gradient',
        preview: 'bg-gradient-to-br from-violet-900 via-indigo-900 to-blue-900',
        background: 'bg-gradient-to-br from-violet-900 via-indigo-900 to-blue-900',
        overlays: [
          'bg-gradient-to-r from-purple-500/10 via-cyan-500/15 to-blue-500/10',
          'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIj4KPHBhdGggZD0iTTAgNzBRMzUgNDAgNzAgNzBUMTQwIDcwIiBzdHJva2U9IiNmZmZmZmYxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzIi8+CjxwYXRoIGQ9Ik0wIDUwUTM1IDIwIDcwIDUwVDE0MCA1MCIgc3Ryb2tlPSIjZmZmZmZmMDgiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNMCA5MFEzNSA2MCA3MCA5MFQxNDAgOTAiIHN0cm9rZT0iI2ZmZmZmZjA2IiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+")] opacity-40'
        ],
        animations: ['animate-morph', 'animate-glow']
      }
    ]
  }
];

export const getThemeById = (id: string): Theme | undefined => {
  return themes.find(theme => theme.id === id);
};

export const getWallpaperById = (themeId: string, wallpaperId: string): Wallpaper | undefined => {
  const theme = getThemeById(themeId);
  return theme?.wallpapers.find(wallpaper => wallpaper.id === wallpaperId);
};