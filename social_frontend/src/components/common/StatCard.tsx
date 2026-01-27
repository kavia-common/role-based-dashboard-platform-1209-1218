import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
};

const StatCard: React.FC<Props> = ({ title, value, subtitle, color }) => {
  return (
    <Paper elevation={0} sx={{ p: 2, border: '1px solid rgba(0,0,0,0.06)' }}>
      <Typography variant="caption" color="text.secondary">{title}</Typography>
      <Typography variant="h5" fontWeight={800} sx={{ color: color || 'text.primary' }}>{value}</Typography>
      {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
    </Paper>
  );
};

export default StatCard;
