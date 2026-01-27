import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import './App.css';
import './layout/layout.css';
import './components/topnav.css';
import './components/sidebar.css';

// PUBLIC_INTERFACE
function App() {
  /** Root app with router and layout shell. */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <BrowserRouter>
      <div className="App" style={{ background: 'var(--background)' }}>
        <Layout onToggleTheme={toggleTheme} currentTheme={theme}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
