import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { AuthRoleProvider } from '../context/AuthRoleContext';

// Render App inside provider and router for a given route
function renderWithProviders(route = '/') {
  return render(
    <AuthRoleProvider>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </AuthRoleProvider>
  );
}

describe('Role-based rendering across pages', () => {
  test('Dashboard shows User content by default and switches to Admin via topbar toggle', () => {
    renderWithProviders('/');

    // Default role is user -> shows "Quick Actions" section
    expect(screen.getByRole('region', { name: /User quick actions/i })).toBeInTheDocument();

    // Toggle role using the top navbar "Switch to Admin" button
    const toggleRoleBtn = screen.getByRole('button', { name: /Toggle role/i });
    fireEvent.click(toggleRoleBtn);

    // After toggle, Admin-only section should appear
    expect(screen.getByRole('region', { name: /Admin only section/i })).toBeInTheDocument();
  });

  test('Analytics switches between User and Admin insights based on role toggle', () => {
    renderWithProviders('/analytics');

    // Starts as user -> "Your Activity"
    expect(screen.getByRole('region', { name: /User analytics/i })).toBeInTheDocument();

    // Toggle to admin
    const toggleRoleBtn = screen.getByRole('button', { name: /Toggle role/i });
    fireEvent.click(toggleRoleBtn);

    // Now admin insights should be visible
    expect(screen.getByRole('region', { name: /Admin analytics/i })).toBeInTheDocument();
  });

  test('Profile shows demo auth controls and session details after demo sign in', () => {
    renderWithProviders('/profile');

    // Demo auth section present
    expect(screen.getByText(/Demo Authentication/i)).toBeInTheDocument();

    // Initially, "Demo Sign-in (User)" is available
    const userSignIn = screen.getByRole('button', { name: /Demo Sign-in \(User\)/i });
    fireEvent.click(userSignIn);

    // After sign in, "Demo Sign-out" appears and session JSON block renders
    expect(screen.getByRole('button', { name: /Demo Sign-out/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Session data/i)).toBeInTheDocument();
  });
});
