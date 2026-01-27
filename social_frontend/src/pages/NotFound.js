import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 */
export default function NotFound() {
  /** Displayed when no route matches. */
  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>404 - Not Found</h2>
      <p style={{ color: '#6b7280' }}>
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="btn btn-primary" style={{ display: 'inline-block', marginTop: 8 }}>
        Go Home
      </Link>
    </div>
  );
}
