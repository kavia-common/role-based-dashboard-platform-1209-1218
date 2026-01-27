import React from 'react';
import { useAuthRole } from '../context/AuthRoleContext';

/**
 * PUBLIC_INTERFACE
 */
export default function Dashboard() {
  /** Dashboard page content with quick stats. */
  const { isAdmin } = useAuthRole();

  return (
    <div>
      <div className="card-grid">
        <div className="card span-4">
          <div className="stat">
            <div className="stat__icon stat__icon--primary">📈</div>
            <div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>Daily Visits</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>12,304</div>
            </div>
          </div>
        </div>
        <div className="card span-4">
          <div className="stat">
            <div className="stat__icon stat__icon--success">🛒</div>
            <div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>Orders</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>1,256</div>
            </div>
          </div>
        </div>
        <div className="card span-4">
          <div className="stat">
            <div className="stat__icon stat__icon--secondary">💬</div>
            <div>
              <div style={{ fontSize: 12, color: '#6b7280' }}>New Messages</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>48</div>
            </div>
          </div>
        </div>

        {isAdmin && (
          <div className="card span-12" role="region" aria-label="Admin only section">
            <h2 style={{ marginTop: 0 }}>Admin Controls</h2>
            <p style={{ margin: 0, color: '#6b7280' }}>
              This section is visible only to admins. Use the role toggle in the top bar to preview as user/admin.
            </p>
          </div>
        )}

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
