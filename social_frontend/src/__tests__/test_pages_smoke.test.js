import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthRoleProvider } from '../context/AuthRoleContext';
import Dashboard from '../pages/Dashboard';
import Analytics from '../pages/Analytics';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';

function renderPage(element, route = '/') {
  return render(
    <AuthRoleProvider>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/" element={element} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    </AuthRoleProvider>
  );
}

describe('Pages mount smoke tests', () => {
  test('Dashboard mounts', () => {
    renderPage(<Dashboard />);
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
  });

  test('Analytics mounts', () => {
    renderPage(<Analytics />);
    expect(screen.getByRole('heading', { name: /Analytics/i })).toBeInTheDocument();
  });

  test('Profile mounts', () => {
    renderPage(<Profile />);
    expect(screen.getByRole('heading', { name: /Profile/i })).toBeInTheDocument();
    expect(screen.getByText(/Demo Authentication/i)).toBeInTheDocument();
  });

  test('NotFound mounts', () => {
    // Render directly
    render(
      <AuthRoleProvider>
        <MemoryRouter initialEntries={['/nope']}>
          <Routes>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MemoryRouter>
      </AuthRoleProvider>
    );
    expect(screen.getByText(/404 - Not Found/i)).toBeInTheDocument();
  });
});
