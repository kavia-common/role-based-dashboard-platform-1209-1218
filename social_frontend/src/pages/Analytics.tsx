import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const followerGrowth = [
  { month: 'Jan', followers: 12000 },
  { month: 'Feb', followers: 14000 },
  { month: 'Mar', followers: 15000 },
  { month: 'Apr', followers: 17000 },
  { month: 'May', followers: 20000 },
  { month: 'Jun', followers: 22000 }
];

const engagementRate = [
  { week: 'W1', rate: 3.2 },
  { week: 'W2', rate: 4.1 },
  { week: 'W3', rate: 3.9 },
  { week: 'W4', rate: 4.7 }
];

const postPerformance = [
  { post: 'P1', score: 80 },
  { post: 'P2', score: 55 },
  { post: 'P3', score: 92 },
  { post: 'P4', score: 67 },
  { post: 'P5', score: 73 }
];

const Analytics: React.FC = () => {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>Analytics</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid rgba(0,0,0,0.06)' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>Follower Growth</Typography>
            <Box sx={{ height: 260 }}>
              <ResponsiveContainer>
                <LineChart data={followerGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="followers" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid rgba(0,0,0,0.06)' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>Engagement Rate (%)</Typography>
            <Box sx={{ height: 260 }}>
              <ResponsiveContainer>
                <LineChart data={engagementRate}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="rate" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid rgba(0,0,0,0.06)' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>Post Performance</Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={postPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="post" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
