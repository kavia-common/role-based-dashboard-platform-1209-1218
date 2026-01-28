import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function renderSidebar(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Sidebar />
    </MemoryRouter>
  );
}

describe('Sidebar component', () => {
  test('renders all navigation links', () => {
    renderSidebar('/');
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Analytics/i)).toBeInTheDocument();
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
  });

  test('highlights active link based on current route', () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={['/']}>
        <Sidebar />
      </MemoryRouter>
    );

    // Dashboard route is active initially
    const dashLink = screen.getByText(/Dashboard/i).closest('a');
    expect(dashLink).toHaveClass('is-active');

    // Change route to /analytics and verify active class updates
    rerender(
      <MemoryRouter initialEntries={['/analytics']}>
        <Sidebar />
      </MemoryRouter>
    );
    const analyticsLink = screen.getByText(/Analytics/i).closest('a');
    expect(analyticsLink).toHaveClass('is-active');
  });
});
