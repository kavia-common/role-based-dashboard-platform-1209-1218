import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const drawerWidth = 260;

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar width={drawerWidth} />
      <Box sx={{ flexGrow: 1, ml: { xs: 0, md: `${drawerWidth}px` }, display: 'flex', flexDirection: 'column' }}>
        <Topbar />
        <Box component="main" sx={{ p: 2, flexGrow: 1 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
