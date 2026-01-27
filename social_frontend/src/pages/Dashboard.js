import React from 'react';
import { useAuthRole } from '../context/AuthRoleContext';

/**
 * PUBLIC_INTERFACE
 */
export default function Dashboard() {
  /** Dashboard page content with quick stats and role-aware panels. */
  const { isAdmin } = useAuthRole();

  const StatCard = ({ icon, label, value, tone = 'primary' }) => (
    <div className="card span-4">
      <div className="stat">
        <div className={`stat__icon stat__icon--${tone}`}>{icon}</div>
        <div>
          <div style={{ fontSize: 12, color: '#6b7280' }}>{label}</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{value}</div>
        </div>
      </div>
    </div>
  );

  const AdminPanel = () => (
    <div className="card span-12" role="region" aria-label="Admin only section">
      <h2 style={{ marginTop: 0 }}>Admin Controls</h2>
      <p style={{ margin: 0, color: '#6b7280' }}>
        This section is visible only to admins. Use the role toggle in the top bar to preview as user/admin.
      </p>
      <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
        <button className="btn btn-outline">Manage Users (placeholder)</button>
        <button className="btn btn-outline">System Settings (placeholder)</button>
        <button className="btn btn-outline">Audit Logs (placeholder)</button>
      </div>
    </div>
  );

  const UserShortcuts = () => (
    <div className="card span-12" role="region" aria-label="User quick actions">
      <h3 style={{ marginTop: 0 }}>Quick Actions</h3>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button className="btn btn-primary">Create Post (placeholder)</button>
        <button className="btn btn-outline">View Messages (placeholder)</button>
        <button className="btn btn-outline">Invite Friends (placeholder)</button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="card-grid">
        <StatCard icon="📈" label="Daily Visits" value="12,304" tone="primary" />
        <StatCard icon="🛒" label="Orders" value="1,256" tone="success" />
        <StatCard icon="💬" label="New Messages" value="48" tone="secondary" />

        {isAdmin ? <AdminPanel /> : <UserShortcuts />}

        <div className="card span-12">
          <h2 style={{ marginTop: 0 }}>Overview</h2>
          <p style={{ margin: 0, color: '#6b7280' }}>
            Welcome to your dashboard. Use the sidebar to navigate between modules.
          </p>
        </div>
      </div>
    </div>
  );
}
