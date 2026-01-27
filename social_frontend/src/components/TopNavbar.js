import React from 'react';
import './topnav.css';

/**
 * PUBLIC_INTERFACE
 */
export default function TopNavbar({ onToggleTheme, currentTheme = 'light' }) {
  /** Top navbar with quick actions and notifications. */
  return (
    <header className="topnav" aria-label="Secondary">
      <div className="topnav__left">
        <h1 className="topnav__page-title">Role-based Dashboard</h1>
      </div>
      <div className="topnav__right">
        <button className="btn btn-outline" aria-label="Notifications">
          🔔
        </button>
        <button className="btn btn-outline" aria-label="Quick Action">
          ⚡
        </button>
        <button
          className="btn btn-primary"
          onClick={onToggleTheme}
          aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
          title="Toggle theme"
        >
          {currentTheme === 'light' ? '🌙' : '☀️'}
        </button>
        <div className="topnav__avatar" title="User">
          UA
        </div>
      </div>
    </header>
  );
}
