import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Sidebar navigation for the app with modern light theme. */
  return (
    <aside className="sidebar" aria-label="Primary">
      <div className="sidebar__brand">
        <span className="sidebar__logo" aria-hidden>🌐</span>
        <span className="sidebar__title">RB Dashboard</span>
      </div>
      <nav className="sidebar__nav">
        <NavLink to="/" end className={({ isActive }) => 'sidebar__link' + (isActive ? ' is-active' : '')}>
          <span aria-hidden>🏠</span>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/analytics" className={({ isActive }) => 'sidebar__link' + (isActive ? ' is-active' : '')}>
          <span aria-hidden>📊</span>
          <span>Analytics</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => 'sidebar__link' + (isActive ? ' is-active' : '')}>
          <span aria-hidden>👤</span>
          <span>Profile</span>
        </NavLink>
      </nav>
    </aside>
  );
}
