import React from 'react';
import { useAuthRole } from '../context/AuthRoleContext';

/**
 * PUBLIC_INTERFACE
 */
export default function Profile() {
  /** Profile page with demo auth controls and role-aware settings. */
  const { role, session, signInDemo, signOutDemo, isAdmin } = useAuthRole();

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
