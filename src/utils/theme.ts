// Evangelion Theme System
// Based on xero/evangelion.nvim and EVA-theme color palettes

export type ThemeName = 'eva-01' | 'eva-00' | 'eva-02' | 'classic';

export interface Theme {
  name: string;
  displayName: string;
  colors: {
    // Background
    bg: string;
    bgLight: string;
    bgDark: string;
    
    // Primary accent
    primary: string;
    primaryLight: string;
    primaryDark: string;
    
    // Secondary accent
    secondary: string;
    secondaryLight: string;
    
    // Status colors
    success: string;
    error: string;
    warning: string;
    info: string;
    
    // Text
    text: string;
    textSecondary: string;
    textMuted: string;
    
    // Borders & Overlays
    border: string;
    borderLight: string;
    overlay: string;
    
    // Neon/Glow effects
    glow: string;
  };
}

export const themes: Record<ThemeName, Theme> = {
  'eva-01': {
    name: 'eva-01',
    displayName: 'EVA-01 (Purple/Green)',
    colors: {
      bg: '#0d0221',           // Deep purple-black
      bgLight: '#1a0d2e',      // Slightly lighter purple-black
      bgDark: '#000000',
      
      primary: '#9d4edd',      // Vibrant purple (neon)
      primaryLight: '#c77dff',  // Lighter neon purple
      primaryDark: '#7209b7',  // Deep purple
      
      secondary: '#00ff41',    // Matrix green (EVA-01 accent)
      secondaryLight: '#39ff14', // Neon green
      
      success: '#00ff41',
      error: '#ff006e',        // Hot pink/magenta
      warning: '#ffbe0b',      // Electric yellow
      info: '#3a86ff',         // Electric blue
      
      text: '#f0f0f0',         // Near white
      textSecondary: '#c77dff', // Purple accent text
      textMuted: '#8b8b8b',    // Medium gray
      
      border: 'rgba(157, 78, 221, 0.4)',
      borderLight: 'rgba(157, 78, 221, 0.2)',
      overlay: 'rgba(13, 2, 33, 0.95)',
      
      glow: 'rgba(157, 78, 221, 0.6)',
    }
  },
  
  'eva-00': {
    name: 'eva-00',
    displayName: 'EVA-00 (Yellow/Orange)',
    colors: {
      bg: '#1a0f00',           // Dark brown-black
      bgLight: '#2d1b00',      // Warm dark brown
      bgDark: '#000000',
      
      primary: '#ffaa00',      // Vibrant amber
      primaryLight: '#ffd60a',  // Bright yellow
      primaryDark: '#ff8500',  // Deep orange
      
      secondary: '#ff6b35',    // Coral orange
      secondaryLight: '#ff9770', // Light coral
      
      success: '#06d6a0',      // Teal green
      error: '#ef233c',        // Crimson red
      warning: '#ffaa00',
      info: '#118ab2',         // Ocean blue
      
      text: '#fff3e0',         // Warm white
      textSecondary: '#ffd60a', // Yellow accent
      textMuted: '#9d8d7f',    // Warm gray
      
      border: 'rgba(255, 170, 0, 0.4)',
      borderLight: 'rgba(255, 170, 0, 0.2)',
      overlay: 'rgba(26, 15, 0, 0.95)',
      
      glow: 'rgba(255, 170, 0, 0.6)',
    }
  },
  
  'eva-02': {
    name: 'eva-02',
    displayName: 'EVA-02 (Red/Orange)',
    colors: {
      bg: '#1a0000',           // Deep red-black
      bgLight: '#2d0a0a',      // Dark red
      bgDark: '#000000',
      
      primary: '#ff0054',      // Hot magenta-red
      primaryLight: '#ff4d80',  // Light magenta
      primaryDark: '#c9184a',  // Deep red
      
      secondary: '#ff6d00',    // Vibrant orange
      secondaryLight: '#ff9e00', // Bright orange
      
      success: '#06ffa5',      // Cyan-green
      error: '#ff0054',
      warning: '#ffba08',      // Amber
      info: '#00b4d8',         // Cyan
      
      text: '#fff0f3',         // Pinkish white
      textSecondary: '#ff4d80', // Pink accent
      textMuted: '#9d8189',    // Dusty rose
      
      border: 'rgba(255, 0, 84, 0.4)',
      borderLight: 'rgba(255, 0, 84, 0.2)',
      overlay: 'rgba(26, 0, 0, 0.95)',
      
      glow: 'rgba(255, 0, 84, 0.6)',
    }
  },
  
  'classic': {
    name: 'classic',
    displayName: 'Classic (Retro Purple)',
    colors: {
      bg: '#000000',           // Pure black
      bgLight: '#1a0033',      // Deep purple-black
      bgDark: '#000000',
      
      primary: '#a020f0',      // Classic purple (X11 purple)
      primaryLight: '#c060ff',  // Light purple
      primaryDark: '#7b1fa2',  // Deep purple
      
      secondary: '#ff00ff',    // Magenta
      secondaryLight: '#ff80ff', // Light magenta
      
      success: '#00ff00',      // Pure green (terminal)
      error: '#ff0000',        // Pure red (terminal)
      warning: '#ffff00',      // Pure yellow (terminal)
      info: '#00ffff',         // Cyan (terminal)
      
      text: '#f0f0f0',         // Near white
      textSecondary: '#c060ff', // Purple accent
      textMuted: '#808080',    // Medium gray
      
      border: 'rgba(160, 32, 240, 0.4)',
      borderLight: 'rgba(160, 32, 240, 0.2)',
      overlay: 'rgba(0, 0, 0, 0.95)',
      
      glow: 'rgba(160, 32, 240, 0.7)',
    }
  }
};

export const getTheme = (name: ThemeName): Theme => {
  return themes[name] || themes['eva-01'];
};

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  
  // Apply CSS custom properties
  root.style.setProperty('--color-bg', theme.colors.bg);
  root.style.setProperty('--color-bg-light', theme.colors.bgLight);
  root.style.setProperty('--color-bg-dark', theme.colors.bgDark);
  
  root.style.setProperty('--color-primary', theme.colors.primary);
  root.style.setProperty('--color-primary-light', theme.colors.primaryLight);
  root.style.setProperty('--color-primary-dark', theme.colors.primaryDark);
  
  root.style.setProperty('--color-secondary', theme.colors.secondary);
  root.style.setProperty('--color-secondary-light', theme.colors.secondaryLight);
  
  root.style.setProperty('--color-success', theme.colors.success);
  root.style.setProperty('--color-error', theme.colors.error);
  root.style.setProperty('--color-warning', theme.colors.warning);
  root.style.setProperty('--color-info', theme.colors.info);
  
  root.style.setProperty('--color-text', theme.colors.text);
  root.style.setProperty('--color-text-secondary', theme.colors.textSecondary);
  root.style.setProperty('--color-text-muted', theme.colors.textMuted);
  
  root.style.setProperty('--color-border', theme.colors.border);
  root.style.setProperty('--color-border-light', theme.colors.borderLight);
  root.style.setProperty('--color-overlay', theme.colors.overlay);
  
  root.style.setProperty('--color-glow', theme.colors.glow);
  
  // Status badge colors with transparency
  root.style.setProperty('--color-success-bg', `${theme.colors.success}26`); // 15% opacity
  root.style.setProperty('--color-success-border', `${theme.colors.success}4D`); // 30% opacity
  root.style.setProperty('--color-error-bg', `${theme.colors.error}26`);
  root.style.setProperty('--color-error-border', `${theme.colors.error}4D`);
  root.style.setProperty('--color-warning-bg', `${theme.colors.warning}26`);
  root.style.setProperty('--color-warning-border', `${theme.colors.warning}4D`);
  root.style.setProperty('--color-info-bg', `${theme.colors.info}26`);
  root.style.setProperty('--color-info-border', `${theme.colors.info}4D`);
};

export const saveTheme = (themeName: ThemeName) => {
  localStorage.setItem('smorque-theme', themeName);
};

export const loadTheme = (): ThemeName => {
  const saved = localStorage.getItem('smorque-theme') as ThemeName;
  return saved && themes[saved] ? saved : 'eva-01';
};
