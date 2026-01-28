import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TopNavbar from '../components/TopNavbar';
import { AuthRoleProvider } from '../context/AuthRoleContext';

function renderTopbar(props = {}) {
  const onToggleTheme = jest.fn();
  const allProps = { onToggleTheme, currentTheme: 'light', ...props };
  const utils = render(
    <AuthRoleProvider>
      <TopNavbar {...allProps} />
    </AuthRoleProvider>
  );
  return { ...utils, onToggleTheme };
}

describe('TopNavbar component', () => {
  test('renders title and role badge', () => {
    renderTopbar();
    expect(screen.getByText(/Role-based Dashboard/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Current role/i)).toBeInTheDocument();
  });

  test('opens notifications menu and dismisses it', () => {
    renderTopbar();
    const notifBtn = screen.getByRole('button', { name: /Notifications/i });
    fireEvent.click(notifBtn);
    expect(screen.getByRole('menu', { name: /Notifications/i })).toBeInTheDocument();

    // Click "Dismiss" in footer
    fireEvent.click(screen.getByRole('button', { name: /Dismiss/i }));
    // menu should close; use queryByRole to avoid throwing
    expect(screen.queryByRole('menu', { name: /Notifications/i })).not.toBeInTheDocument();
  });

  test('opens user menu and shows sign-in actions when logged out', () => {
    renderTopbar();
    const userBtn = screen.getByRole('button', { name: /Guest user/i });
    fireEvent.click(userBtn);
    expect(screen.getByRole('menu', { name: /User menu/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /Sign in as User \(demo\)/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /Sign in as Admin \(demo\)/i })).toBeInTheDocument();
  });

  test('theme toggle invokes callback', () => {
    const { onToggleTheme } = renderTopbar();
    const themeBtn = screen.getByRole('button', { name: /Switch to dark mode/i });
    fireEvent.click(themeBtn);
    expect(onToggleTheme).toHaveBeenCalled();
  });
});
