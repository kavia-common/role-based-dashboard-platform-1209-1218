import React from 'react';
import { Avatar, Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InsightsIcon from '@mui/icons-material/Insights';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BarChartIcon from '@mui/icons-material/BarChart';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';
import { useAppConfig } from '../state/ConfigContext';

type Props = { width: number };

const Sidebar: React.FC<Props> = ({ width }) => {
  const { user } = useAuth();
  const { featureFlags } = useAppConfig();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const items = [
    { to: '/dashboard', icon: <DashboardIcon />, label: 'Dashboard' },
    { to: '/analytics', icon: <InsightsIcon />, label: 'Analytics' },
    { to: '/profile', icon: <PersonIcon />, label: 'Profile' }
  ];

  const adminItems = [
    ...(featureFlags.enableAdmin ? [{ to: '/admin/users', icon: <AdminPanelSettingsIcon />, label: 'Admin - Users' }] : []),
    ...(featureFlags.enablePlatformAnalytics ? [{ to: '/admin/analytics', icon: <BarChartIcon />, label: 'Platform Analytics' }] : [])
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        display: { xs: 'none', md: 'block' },
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
          borderRight: '0',
          boxShadow: 'inset -1px 0 0 rgba(0,0,0,0.06)'
        }
      }}
      open
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar src={user?.avatarUrl} alt={user?.name || 'User'} />
        <Box>
          <Typography fontWeight={700} fontSize={14}>{user?.name}</Typography>
          <Typography variant="caption" color="text.secondary">{user?.role?.toUpperCase()}</Typography>
        </Box>
      </Box>
      <Divider />
      <List>
        {items.map((i) => (
          <ListItemButton key={i.to} component={NavLink} to={i.to} selected={isActive(i.to)}>
            <ListItemIcon>{i.icon}</ListItemIcon>
            <ListItemText primary={i.label} />
          </ListItemButton>
        ))}
      </List>
      {user?.role === 'admin' && (adminItems.length > 0) && (
        <>
          <Divider />
          <List subheader={<Typography sx={{ px: 2, py: 1 }} variant="caption" color="text.secondary">Admin</Typography> as any}>
            {adminItems.map((i) => (
              <ListItemButton key={i.to} component={NavLink} to={i.to} selected={isActive(i.to)}>
                <ListItemIcon>{i.icon}</ListItemIcon>
                <ListItemText primary={i.label} />
              </ListItemButton>
            ))}
          </List>
        </>
      )}
    </Drawer>
  );
};

export default Sidebar;
