import React, { useEffect, useState } from 'react';
import { useAuthRole } from '../context/AuthRoleContext';
import { getHealthStatus, getProfile } from '../lib/apiHelpers';
import { AppConfig } from '../config';

/**
 * PUBLIC_INTERFACE
 */
export default function Profile() {
  /** Profile page with demo auth controls and role-aware settings. */
  const { role, session, signInDemo, signOutDemo, isAdmin } = useAuthRole();

  // Health/Profile demo states (optional)
  const [health, setHealth] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    let mounted = true;

    // Only attempt fetch if api base configured; otherwise skip silently.
    const hasApi = typeof AppConfig.apiBaseUrl === 'string' && AppConfig.apiBaseUrl.length >= 0;

    async function run() {
      if (!hasApi) return;
      try {
        const [h, p] = await Promise.allSettled([getHealthStatus(), getProfile()]);
        if (!mounted) return;

        if (h.status === 'fulfilled') setHealth(h.value);
        if (p.status === 'fulfilled') setProfileData(p.value);
        if (h.status === 'rejected' || p.status === 'rejected') {
          setApiError((h.status === 'rejected' ? h.reason?.message : null) || (p.status === 'rejected' ? p.reason?.message : null) || 'API error');
        }
      } catch (e) {
        if (!mounted) return;
        setApiError(e?.message || 'API error');
      }
    }

    run();
    return () => { mounted = false; };
  }, []);

  const DemoAuthControls = () => (
    <div className="card span-12">
      <h3 style={{ marginTop: 0 }}>Demo Authentication</h3>
      <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <span className="btn" aria-label="Role badge">Current role: {role}</span>
        {!session ? (
          <>
            <button className="btn btn-primary" onClick={() => signInDemo('user')}>Demo Sign-in (User)</button>
            <button className="btn btn-outline" onClick={() => signInDemo('admin')}>Demo Sign-in (Admin)</button>
          </>
        ) : (
          <button className="btn btn-outline" onClick={signOutDemo}>Demo Sign-out</button>
        )}
      </div>

      {session && (
        <pre
          style={{
            marginTop: 12,
            padding: 12,
            background: 'var(--surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 8,
            overflow: 'auto',
          }}
          aria-label="Session data"
        >
{JSON.stringify(session, null, 2)}
        </pre>
      )}
    </div>
  );

  const AdminSettings = () => (
    <div className="card span-6" role="region" aria-label="Admin settings">
      <h3 style={{ marginTop: 0 }}>Admin Settings</h3>
      <ul style={{ color: '#6b7280', paddingLeft: 18 }}>
        <li>Organization profile (placeholder)</li>
        <li>Access control and roles (placeholder)</li>
        <li>Billing and usage (placeholder)</li>
      </ul>
      <button className="btn btn-outline">Open Admin Console (placeholder)</button>
    </div>
  );

  const UserSettings = () => (
    <div className="card span-6" role="region" aria-label="User settings">
      <h3 style={{ marginTop: 0 }}>User Settings</h3>
      <ul style={{ color: '#6b7280', paddingLeft: 18 }}>
        <li>Update profile info (placeholder)</li>
        <li>Change password (placeholder)</li>
        <li>Privacy preferences (placeholder)</li>
      </ul>
      <button className="btn btn-outline">Save Preferences (placeholder)</button>
    </div>
  );

  return (
    <div className="card-grid">
      <div className="card span-12">
        <h2 style={{ marginTop: 0 }}>Profile</h2>
        <p style={{ color: '#6b7280' }}>
          Manage your account settings and preferences here.
        </p>
      </div>

      <DemoAuthControls />

      {/* Optional: Show backend health and profile info if available */}
      <div className="card span-12" role="region" aria-label="Backend health and profile">
        <h3 style={{ marginTop: 0 }}>Service Status</h3>
        <div style={{ color: '#6b7280' }}>
          <div><strong>API Base:</strong> {AppConfig.apiBaseUrl || '(relative)'}</div>
          <div><strong>Health Path:</strong> {AppConfig.healthcheckPath}</div>
        </div>
        {apiError && (
          <p style={{ color: '#ef4444' }}>API Error: {apiError}</p>
        )}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
          <div className="card span-6" style={{ margin: 0 }}>
            <h4 style={{ marginTop: 0 }}>Health</h4>
            <pre
              style={{ marginTop: 8, background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 8, overflow: 'auto' }}
            >{health ? JSON.stringify(health, null, 2) : 'Loading...'}</pre>
          </div>
          <div className="card span-6" style={{ margin: 0 }}>
            <h4 style={{ marginTop: 0 }}>Profile</h4>
            <pre
              style={{ marginTop: 8, background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 8, overflow: 'auto' }}
            >{profileData ? JSON.stringify(profileData, null, 2) : 'Loading...'}</pre>
          </div>
        </div>
      </div>

      {isAdmin ? (
        <>
          <AdminSettings />
          <UserSettings />
        </>
      ) : (
        <>
          <UserSettings />
          <div className="card span-6" role="region" aria-label="Upgrade card">
            <h3 style={{ marginTop: 0 }}>Upgrade to Admin</h3>
            <p style={{ color: '#6b7280' }}>
              Some features are available for admins. Use the top bar toggle to preview admin features.
            </p>
            <button className="btn btn-primary">Learn More (placeholder)</button>
          </div>
        </>
      )}
    </div>
  );
}
