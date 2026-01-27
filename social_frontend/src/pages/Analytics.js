import React from 'react';
import { useAuthRole } from '../context/AuthRoleContext';

/**
 * PUBLIC_INTERFACE
 */
export default function Analytics() {
  /** Analytics page with role-aware content modules. */
  const { isAdmin } = useAuthRole();

  const ChartPlaceholder = ({ title = 'Chart', description = 'Placeholder chart area' }) => (
    <div className="card span-6">
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <div
        style={{
          height: 180,
          background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(249,250,251,1))',
          border: '1px dashed var(--border-color)',
          borderRadius: 8,
        }}
        role="img"
        aria-label={`${title} placeholder`}
      />
      <p style={{ color: '#6b7280', marginTop: 8 }}>{description}</p>
    </div>
  );

  const AdminInsights = () => (
    <div className="card span-12" role="region" aria-label="Admin analytics">
      <h3 style={{ marginTop: 0 }}>Admin Insights</h3>
      <p style={{ color: '#6b7280', marginTop: 0 }}>
        Access to system-wide analytics and cohort trends (placeholders).
      </p>
      <div className="card-grid" style={{ marginTop: 8 }}>
        <ChartPlaceholder title="User Growth" description="Monthly active users trend (admin-only)" />
        <ChartPlaceholder title="Error Rates" description="System error rates by service (admin-only)" />
      </div>
    </div>
  );

  const UserInsights = () => (
    <div className="card span-12" role="region" aria-label="User analytics">
      <h3 style={{ marginTop: 0 }}>Your Activity</h3>
      <p style={{ color: '#6b7280', marginTop: 0 }}>
        Personal analytics and engagement stats (placeholders).
      </p>
      <div className="card-grid" style={{ marginTop: 8 }}>
        <ChartPlaceholder title="Engagement" description="Daily engagement heatmap (user)" />
        <ChartPlaceholder title="Content Performance" description="Top posts and reach (user)" />
      </div>
    </div>
  );

  return (
    <div className="card-grid">
      <div className="card span-12">
        <h2 style={{ marginTop: 0 }}>Analytics</h2>
        <p style={{ color: '#6b7280' }}>
          Explore metrics and insights. Content adapts based on your role.
        </p>
      </div>

      {isAdmin ? <AdminInsights /> : <UserInsights />}
    </div>
  );
}
