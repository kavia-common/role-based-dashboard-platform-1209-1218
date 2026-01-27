import React from 'react';
import { AppBar, Avatar, Badge, Box, IconButton, InputBase, Toolbar, Tooltip, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../state/AuthContext';

const Topbar: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
      <Toolbar sx={{ gap: 1.5 }}>
        <Typography sx={{ fontWeight: 800, color: 'primary.main' }}>Social Dashboard</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          gap: 1,
          bgcolor: 'background.paper',
          border: '1px solid rgba(0,0,0,0.08)',
          px: 1.5, py: 0.5, borderRadius: 2
        }}>
          <SearchIcon fontSize="small" color="action" />
          <InputBase placeholder="Search..." sx={{ width: 240 }} />
        </Box>
        <Tooltip title="Quick Action">
          <IconButton color="primary" size="small">
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications">
          <IconButton size="small">
            <Badge color="warning" badgeContent={3} variant="standard">
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Avatar src={user?.avatarUrl} alt={user?.name} sx={{ width: 28, height: 28 }} />
        <Tooltip title="Sign out">
          <IconButton size="small" onClick={signOut}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
