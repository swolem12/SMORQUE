import React from 'react';
import { X, Palette } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { themes, type ThemeName } from '../../utils/theme';
import './SettingsModal.css';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { currentTheme, setTheme } = useTheme();

  const handleThemeChange = (themeName: ThemeName) => {
    setTheme(themeName);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content settings-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Settings</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="settings-content">
          <div className="settings-section">
            <h3><Palette size={18} /> Theme Selection</h3>
            <p className="settings-description">Choose your Evangelion unit theme</p>
            
            <div className="theme-grid">
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  className={`theme-card ${currentTheme === key ? 'active' : ''}`}
                  onClick={() => handleThemeChange(key as ThemeName)}
                >
                  <div className="theme-preview" style={{
                    background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
                    boxShadow: currentTheme === key ? `0 0 20px ${theme.colors.glow}` : 'none'
                  }}>
                    {currentTheme === key && (
                      <div className="theme-checkmark">✓</div>
                    )}
                  </div>
                  <div className="theme-info">
                    <div className="theme-name">{theme.displayName}</div>
                    <div className="theme-colors">
                      <span className="color-dot" style={{ background: theme.colors.primary }} />
                      <span className="color-dot" style={{ background: theme.colors.secondary }} />
                      <span className="color-dot" style={{ background: theme.colors.success }} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="settings-section">
            <h3>About</h3>
            <div className="about-info">
              <p><strong>SMORQUE</strong> - USAF Sortie Management & Operations Reporting</p>
              <p className="version">Version 0.1.0</p>
              <p className="credits">Evangelion theme inspired by xero/evangelion.nvim</p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn-primary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
