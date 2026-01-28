import React, { useEffect, useState } from 'react';
import { useAuthRole } from '../context/AuthRoleContext';
import { getHealthStatus, getCurrentUser } from '../lib/apiHelpers';
import { AppConfig } from '../config';

/**
 * PUBLIC_INTERFACE
 */
export default function Profile() {
  /** Profile page with demo auth controls and role-aware settings. */
  const { role, session, signInDemo, signOutDemo, isAdmin } = useAuthRole();

  // Health/Profile states with loading and error flags
  const [health, setHealth] = useState(null);
  const [healthLoading, setHealthLoading] = useState(false);
  const [healthError, setHealthError] = useState(null);

  const [profileData, setProfileData] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);

  // Determine whether we should attempt live API calls based on env/flags
  const features = AppConfig.featureFlags || {};
  const apiGloballyDisabled = features.disableApi === true;
  const canUseApi = !apiGloballyDisabled && typeof AppConfig.apiBaseUrl === 'string';

  useEffect(() => {
    let mounted = true;

    // Health fetch: allowed if apiBaseUrl exists (relative OK), try/catch guarded
    (async () => {
      if (!canUseApi) {
        // No API configured or disabled: skip gracefully
        return;
      }
      setHealthLoading(true);
      setHealthError(null);
      try {
        const h = await getHealthStatus();
        if (!mounted) return;
        setHealth(h);
      } catch (e) {
        if (!mounted) return;
        setHealthError(e?.message || 'Failed to load health status');
      } finally {
        if (mounted) setHealthLoading(false);
      }
    })();

    // Profile fetch: obeys feature flags (will throw if disabled)
    (async () => {
      if (!canUseApi) {
        // No API configured or disabled: skip gracefully
        return;
      }
      setProfileLoading(true);
      setProfileError(null);
      try {
        const p = await getCurrentUser();
        if (!mounted) return;
        setProfileData(p);
      } catch (e) {
        if (!mounted) return;
        setProfileError(e?.message || 'Failed to load profile');
      } finally {
        if (mounted) setProfileLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Render helpers for loading/empty/error states
  const renderHealthBlock = () => {
    if (!canUseApi) {
      return <div style={{ color: '#6b7280' }}>Live API disabled or not configured; showing placeholders.</div>;
    }
    if (healthLoading) return <div>Loading health...</div>;
    if (healthError) return <div style={{ color: '#ef4444' }}>Error: {healthError}</div>;
    if (!health) return <div style={{ color: '#6b7280' }}>No health data.</div>;
    return (
      <pre
        style={{ marginTop: 8, background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 8, overflow: 'auto' }}
      >{JSON.stringify(health, null, 2)}</pre>
    );
  };

  const renderProfileBlock = () => {
    if (!canUseApi) {
      return <div style={{ color: '#6b7280' }}>Live API disabled or not configured; using session demo data.</div>;
    }
    if (profileLoading) return <div>Loading profile...</div>;
    if (profileError) return <div style={{ color: '#ef4444' }}>Error: {profileError}</div>;
    if (!profileData) return <div style={{ color: '#6b7280' }}>No profile data.</div>;
    return (
      <pre
        style={{ marginTop: 8, background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 8, overflow: 'auto' }}
      >{JSON.stringify(profileData, null, 2)}</pre>
    );
  };

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
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
          <div className="card span-6" style={{ margin: 0 }}>
            <h4 style={{ marginTop: 0 }}>Health</h4>
            {renderHealthBlock()}
          </div>
          <div className="card span-6" style={{ margin: 0 }}>
            <h4 style={{ marginTop: 0 }}>Profile</h4>
            {renderProfileBlock()}
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
