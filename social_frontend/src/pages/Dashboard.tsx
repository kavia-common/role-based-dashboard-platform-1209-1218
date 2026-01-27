import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import StatCard from '../components/common/StatCard';
import AccountsList from '../components/common/AccountsList';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const sampleAccounts = [
  { id: '1', platform: 'Twitter', handle: '@brand', followers: 12800, connected: true },
  { id: '2', platform: 'Instagram', handle: '@brand.ig', followers: 30210, connected: true },
  { id: '3', platform: 'YouTube', handle: 'BrandYT', followers: 45500, connected: false }
];

const engagementData = [
  { name: 'Mon', engagement: 400 },
  { name: 'Tue', engagement: 300 },
  { name: 'Wed', engagement: 500 },
  { name: 'Thu', engagement: 200 },
  { name: 'Fri', engagement: 700 },
  { name: 'Sat', engagement: 600 },
  { name: 'Sun', engagement: 800 }
];

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}><StatCard title="Total Followers" value="88,510" color="#3B82F6" /></Grid>
            <Grid item xs={12} sm={4}><StatCard title="Engagement Rate" value="4.7%" color="#10B981" /></Grid>
            <Grid item xs={12} sm={4}><StatCard title="Posts this week" value="23" color="#F59E0B" /></Grid>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 2, border: '1px solid rgba(0,0,0,0.06)' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>Weekly Engagement</Typography>
                <Box sx={{ height: 260 }}>
                  <ResponsiveContainer>
                    <AreaChart data={engagementData}>
                      <defs>
                        <linearGradient id="colorEng" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="engagement" stroke="#3B82F6" fillOpacity={1} fill="url(#colorEng)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <AccountsList accounts={sampleAccounts as any} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
