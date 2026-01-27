import React, { useState } from 'react';
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useAuth } from '../state/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [saving, setSaving] = useState(false);

  const onSave = async () => {
    setSaving(true);
    // TODO: Integrate with backend: PUT /me
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>Profile</Typography>
      <Paper elevation={0} sx={{ p: 2, border: '1px solid rgba(0,0,0,0.06)' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md="auto">
            <Avatar src={user?.avatarUrl} sx={{ width: 80, height: 80 }} />
          </Grid>
          <Grid item xs={12} md>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="Name" value={name} fullWidth onChange={(e) => setName(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Email" value={email} fullWidth disabled />
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" onClick={onSave} disabled={saving}>Save changes</Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile;
