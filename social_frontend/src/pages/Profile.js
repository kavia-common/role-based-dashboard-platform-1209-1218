import React from 'react';
import { useAuthRole } from '../context/AuthRoleContext';

/**
 * PUBLIC_INTERFACE
 */
export default function Profile() {
  /** Profile page content placeholder. */
  const { role, session, signInDemo, signOutDemo } = useAuthRole();

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Profile</h2>
      <p style={{ color: '#6b7280' }}>
        Manage your account settings and preferences here.
      </p>

      <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
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
}
