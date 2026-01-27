import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app shell', () => {
  render(<App />);
  // Validate topbar title appears
  const title = screen.getByText(/Role-based Dashboard/i);
  expect(title).toBeInTheDocument();
});
