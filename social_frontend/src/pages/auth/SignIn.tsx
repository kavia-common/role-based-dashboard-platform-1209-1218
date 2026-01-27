import React, { useState } from 'react';
import { Alert, Box, Button, Container, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../../state/AuthContext';
import { useAppConfig } from '../../state/ConfigContext';

/**
 * Sign-in screen with Google OAuth.
 * For local development/demo, clicking "Continue with Google" simulates receiving a Google ID token
 * and exchanges it with the backend to obtain an application JWT.
 */
const SignIn: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const { googleClientId } = useAppConfig();
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [error, setError] = useState<string | null>(null);

  const simulateGoogleIdToken = (roleOverride: 'user' | 'admin') => {
    // This is a dev-time helper to simulate a Google ID Token JWT payload
    const payload = {
      sub: 'demo-user-id',
      name: roleOverride === 'admin' ? 'Demo Admin' : 'Demo User',
      email: roleOverride === 'admin' ? 'admin@example.com' : 'user@example.com',
      avatarUrl: '',
      role: roleOverride
    };
    const base64 = btoa(JSON.stringify(payload));
    // Not a real JWT, but backend in demo mode could accept and return an app token.
    return `header.${base64}.signature`;
  };

  const handleSignIn = async () => {
    setError(null);
    try {
      const idToken = simulateGoogleIdToken(role);
      await signInWithGoogle(idToken);
    } catch (e: any) {
      setError(e.message || 'Failed to sign in');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={0} sx={{ p: 4, border: '1px solid rgba(0,0,0,0.06)', width: '100%', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Welcome</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Sign in to your social dashboard
        </Typography>
        {googleClientId ? (
          <Alert severity="info" sx={{ mb: 2 }}>Google Client ID configured</Alert>
        ) : (
          <Alert severity="warning" sx={{ mb: 2 }}>Google Client ID not configured. Using demo sign-in.</Alert>
        )}
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', mb: 2 }}>
          <ToggleButtonGroup
            color="primary"
            exclusive
            value={role}
            onChange={(_, v) => v && setRole(v)}
            size="small"
          >
            <ToggleButton value="user">User</ToggleButton>
            <ToggleButton value="admin">Admin</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={handleSignIn}
          fullWidth
          sx={{ mb: 1 }}
        >
          Continue with Google
        </Button>
        <Typography variant="caption" color="text.secondary">
          By continuing you agree to the Terms and Privacy Policy.
        </Typography>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>
    </Container>
  );
};

export default SignIn;
