import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import StatCard from '../../components/common/StatCard';

const platformData = [
  { day: 'Mon', users: 120, sessions: 420 },
  { day: 'Tue', users: 160, sessions: 480 },
  { day: 'Wed', users: 210, sessions: 650 },
  { day: 'Thu', users: 180, sessions: 590 },
  { day: 'Fri', users: 260, sessions: 820 },
  { day: 'Sat', users: 300, sessions: 930 },
  { day: 'Sun', users: 280, sessions: 870 }
];

const PlatformAnalytics: React.FC = () => {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>Admin · Platform Analytics</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}><StatCard title="Total Users" value="3,421" color="#3B82F6" /></Grid>
        <Grid item xs={12} sm={4}><StatCard title="Active Sessions" value="932" color="#10B981" /></Grid>
        <Grid item xs={12} sm={4}><StatCard title="Avg. Engagement" value="4.2%" color="#F59E0B" /></Grid>
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid rgba(0,0,0,0.06)' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>Daily Users</Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={platformData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area dataKey="users" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.15} />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlatformAnalytics;
