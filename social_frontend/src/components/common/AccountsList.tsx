import React from 'react';
import { Avatar, Box, Chip, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

type Account = {
  id: string;
  platform: 'Twitter' | 'Instagram' | 'YouTube' | 'Facebook' | 'LinkedIn';
  handle: string;
  followers: number;
  connected: boolean;
  avatarUrl?: string;
};

type Props = {
  accounts: Account[];
};

const AccountsList: React.FC<Props> = ({ accounts }) => {
  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 700 }}>Connected Social Accounts</Typography>
      <List dense sx={{ border: '1px solid rgba(0,0,0,0.06)', borderRadius: 1 }}>
        {accounts.map((acc, idx) => (
          <React.Fragment key={acc.id}>
            <ListItem
              secondaryAction={<Chip size="small" color={acc.connected ? 'success' : 'default'} label={acc.connected ? 'Connected' : 'Disconnected'} />}
            >
              <ListItemAvatar><Avatar src={acc.avatarUrl}>{acc.platform[0]}</Avatar></ListItemAvatar>
              <ListItemText
                primary={`${acc.platform} · ${acc.handle}`}
                secondary={`${acc.followers.toLocaleString()} followers`}
              />
            </ListItem>
            {idx < accounts.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default AccountsList;
