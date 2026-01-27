import React from 'react';
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const sampleUsers = [
  { id: 'u1', name: 'Alice', email: 'alice@example.com', role: 'user' },
  { id: 'u2', name: 'Bob', email: 'bob@example.com', role: 'admin' },
  { id: 'u3', name: 'Cara', email: 'cara@example.com', role: 'user' }
];

const AdminUsers: React.FC = () => {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>Admin · Users</Typography>
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid rgba(0,0,0,0.06)' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell width="20%">Name</TableCell>
              <TableCell width="30%">Email</TableCell>
              <TableCell width="20%">Role</TableCell>
              <TableCell align="right" width="30%">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleUsers.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }}>{u.role}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Promote to admin">
                    <IconButton size="small" color="primary"><AdminPanelSettingsIcon /></IconButton>
                  </Tooltip>
                  <Tooltip title="Delete user">
                    <IconButton size="small" color="error"><DeleteOutlineIcon /></IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminUsers;
