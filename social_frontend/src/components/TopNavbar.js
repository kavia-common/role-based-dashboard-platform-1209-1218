import React, { useEffect, useRef, useState } from 'react';
import './topnav.css';
import { useAuthRole } from '../context/AuthRoleContext';
import { AppConfig } from '../config';
import { getNotifications } from '../lib/apiHelpers';

/**
 * PUBLIC_INTERFACE
 */
export default function TopNavbar({ onToggleTheme, currentTheme = 'light' }) {
  /** Top navbar with quick actions, notifications, theme toggle, role switch, and user menu. */
  const { role, isAdmin, toggleRoleDemo, signInDemo, signOutDemo, session } = useAuthRole();

  // Local UI state for dropdowns
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const notifBtnRef = useRef(null);
  const notifMenuRef = useRef(null);
  const userBtnRef = useRef(null);
  const userMenuRef = useRef(null);

  // Notifications state (loading/error/data)
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifError, setNotifError] = useState(null);
  const [notifItems, setNotifItems] = useState([]);

  // Determine if we should use live API for notifications
  const features = AppConfig.featureFlags || {};
  const apiDisabled = features.disableApi === true || features.disableNotificationsFetch === true;
  const canUseApi = !apiDisabled && typeof AppConfig.apiBaseUrl === 'string';

  // Close menus on outside click or Escape
  useEffect(() => {
    function onDocClick(e) {
      if (notifOpen) {
        const withinNotif =
          notifBtnRef.current?.contains(e.target) || notifMenuRef.current?.contains(e.target);
        if (!withinNotif) setNotifOpen(false);
      }
      if (userOpen) {
        const withinUser =
          userBtnRef.current?.contains(e.target) || userMenuRef.current?.contains(e.target);
        if (!withinUser) setUserOpen(false);
      }
    }
    function onKeydown(e) {
      if (e.key === 'Escape') {
        if (notifOpen) setNotifOpen(false);
        if (userOpen) setUserOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKeydown);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKeydown);
    };
  }, [notifOpen, userOpen]);

  // Keyboard toggling helpers
  const keyToggle = (setter) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setter((v) => !v);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setter(true);
      // focus first item later via timeout to ensure render
      setTimeout(() => {
        const first = e.currentTarget?.nextElementSibling?.querySelector('[role="menuitem"]');
        first?.focus();
      }, 0);
    }
  };

  // Placeholder notifications used as fallback
  const placeholderNotifications = [
    { id: 'n1', icon: '✅', title: 'Build succeeded', desc: 'Your latest build completed.' },
    { id: 'n2', icon: '📩', title: '2 new messages', desc: 'Check your inbox.' },
    { id: 'n3', icon: '⚠️', title: 'Quota nearing', desc: 'Usage is at 85% of limit.' },
  ];

  // Load notifications when menu opens (lazy load)
  useEffect(() => {
    let active = true;
    (async () => {
      if (!notifOpen) return;
      // If API is disabled or unavailable, use placeholders
      if (!canUseApi) {
        setNotifError(null);
        setNotifItems(placeholderNotifications);
        return;
      }
      setNotifLoading(true);
      setNotifError(null);
      try {
        const items = await getNotifications();
        if (!active) return;
        if (Array.isArray(items) && items.length > 0) {
          // Normalize to expected shape: {id, icon?, title, desc}
          const normalized = items.map((it, idx) => ({
            id: String(it.id ?? idx),
            icon: it.icon ?? '🔔',
            title: it.title ?? 'Notification',
            desc: it.description ?? it.desc ?? '',
          }));
          setNotifItems(normalized);
        } else {
          setNotifItems([]); // empty state
        }
      } catch (e) {
        if (!active) return;
        // On error, fall back to placeholders but also show error banner
        setNotifError(e?.message || 'Failed to load notifications');
        setNotifItems(placeholderNotifications);
      } finally {
        if (active) setNotifLoading(false);
      }
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifOpen]);

  return (
    <header className="topnav" aria-label="Secondary">
      <div className="topnav__left">
        <h1 className="topnav__page-title">Role-based Dashboard</h1>
      </div>
      <div className="topnav__right">
        {/* Notifications dropdown */}
        <div className="dropdown">
          <button
            ref={notifBtnRef}
            className="btn btn-outline icon-btn"
            aria-haspopup="menu"
            aria-expanded={notifOpen}
            aria-controls="notif-menu"
            onClick={() => setNotifOpen((v) => !v)}
            onKeyDown={keyToggle(setNotifOpen)}
            title="Notifications"
          >
            🔔
            <span className="sr-only">Open notifications</span>
          </button>
          {notifOpen && (
            <div
              id="notif-menu"
              className="dropdown__menu"
              role="menu"
              aria-label="Notifications"
              ref={notifMenuRef}
            >
              <div className="dropdown__header">Notifications</div>
              {notifLoading && (
                <div style={{ padding: 8, color: 'var(--text-muted)' }}>Loading...</div>
              )}
              {notifError && (
                <div style={{ padding: 8, color: '#ef4444' }}>Error: {notifError}</div>
              )}
              <ul className="dropdown__list" role="none">
                {notifItems.length === 0 ? (
                  <li role="none" style={{ padding: 8, color: 'var(--text-muted)' }}>
                    No notifications.
                  </li>
                ) : (
                  notifItems.map((n) => (
                    <li key={n.id} role="none">
                      <button className="dropdown__item" role="menuitem" tabIndex={0}>
                        <span aria-hidden style={{ marginRight: 8 }}>{n.icon || '🔔'}</span>
                        <div className="dropdown__item-text">
                          <div className="dropdown__item-title">{n.title}</div>
                          <div className="dropdown__item-desc">{n.desc}</div>
                        </div>
                      </button>
                    </li>
                  ))
                )}
              </ul>
              <div className="dropdown__footer">
                <button className="btn btn-outline btn-small" onClick={() => setNotifOpen(false)}>
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Action placeholder */}
        <button className="btn btn-outline icon-btn" aria-label="Quick Action" title="Quick Action">
          ⚡
        </button>

        {/* Demo role switch */}
        <button
          className="btn btn-outline"
          onClick={toggleRoleDemo}
          aria-label="Toggle role"
          title="Switch between user/admin (demo)"
        >
          {isAdmin ? 'Switch to User' : 'Switch to Admin'}
        </button>
        <span className="btn role-badge" aria-label="Current role" title="Current role">
          Role: {role}
        </span>

        {/* Theme toggle */}
        <button
          className="btn btn-primary icon-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
          title="Toggle theme"
        >
          {currentTheme === 'light' ? '🌙' : '☀️'}
        </button>

        {/* User menu */}
        <div className="dropdown">
          <button
            ref={userBtnRef}
            className="topnav__avatar"
            aria-haspopup="menu"
            aria-expanded={userOpen}
            aria-controls="user-menu"
            onClick={() => setUserOpen((v) => !v)}
            onKeyDown={keyToggle(setUserOpen)}
            title={session ? session.user?.email : 'Guest user'}
          >
            {session ? (session.user?.email?.[0] || 'U').toUpperCase() : 'UA'}
            <span className="sr-only">Open user menu</span>
          </button>
          {userOpen && (
            <div
              id="user-menu"
              className="dropdown__menu dropdown__menu--right"
              role="menu"
              aria-label="User menu"
              ref={userMenuRef}
            >
              <div className="dropdown__header">
                {session ? (
                  <>
                    <div className="user-name">{session.user?.email}</div>
                    <div className="user-subtle">Signed in as {role}</div>
                  </>
                ) : (
                  <>
                    <div className="user-name">Guest</div>
                    <div className="user-subtle">Not signed in</div>
                  </>
                )}
              </div>
              <ul className="dropdown__list" role="none">
                {!session ? (
                  <>
                    <li role="none">
                      <button
                        className="dropdown__item"
                        role="menuitem"
                        onClick={() => {
                          signInDemo('user');
                          setUserOpen(false);
                        }}
                      >
                        Sign in as User (demo)
                      </button>
                    </li>
                    <li role="none">
                      <button
                        className="dropdown__item"
                        role="menuitem"
                        onClick={() => {
                          signInDemo('admin');
                          setUserOpen(false);
                        }}
                      >
                        Sign in as Admin (demo)
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li role="none">
                      <a className="dropdown__item" role="menuitem" href="/profile">
                        Profile
                      </a>
                    </li>
                    <li role="none">
                      <button
                        className="dropdown__item"
                        role="menuitem"
                        onClick={() => {
                          signOutDemo();
                          setUserOpen(false);
                        }}
                      >
                        Sign out (demo)
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
