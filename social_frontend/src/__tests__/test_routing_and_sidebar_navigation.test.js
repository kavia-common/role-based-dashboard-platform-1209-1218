import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

// Helper to render with memory router at a given initialRoute
function renderAt(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
}

describe('Routing and Sidebar navigation', () => {
  test('loads dashboard at root path', () => {
    renderAt('/');
    // Dashboard has quick stats and overview content
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    // Sidebar brand should be visible
    expect(screen.getByText(/RB Dashboard/i)).toBeInTheDocument();
    // Top navbar title present
    expect(screen.getByText(/Role-based Dashboard/i)).toBeInTheDocument();
  });

  test('navigates to analytics route by initial url', () => {
    renderAt('/analytics');
    // Analytics page heading present
    expect(screen.getByRole('heading', { name: /Analytics/i })).toBeInTheDocument();
    // Page description present
    expect(
      screen.getByText(/Explore metrics and insights\. Content adapts based on your role\./i)
    ).toBeInTheDocument();
  });

  test('navigates to profile route by initial url', () => {
    renderAt('/profile');
    // Profile page heading present
    expect(screen.getByRole('heading', { name: /Profile/i })).toBeInTheDocument();
    // Demo Authentication card exists
    expect(screen.getByText(/Demo Authentication/i)).toBeInTheDocument();
  });

  test('renders NotFound for an unknown route', () => {
    renderAt('/this/route/does-not-exist');
    expect(screen.getByText(/404 - Not Found/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Go Home/i })).toBeInTheDocument();
  });
});
