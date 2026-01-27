import React from 'react';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import './layout.css';

/**
 * PUBLIC_INTERFACE
 */
export default function Layout({ children, onToggleTheme, currentTheme }) {
  /** Application shell layout with sidebar and top navbar. */
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">
        <TopNavbar onToggleTheme={onToggleTheme} currentTheme={currentTheme} />
        <div className="app-content">
          {children}
        </div>
      </main>
    </div>
  );
}
