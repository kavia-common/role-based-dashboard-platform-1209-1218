# Social Frontend

React-based role-aware dashboard with sidebar, top navbar, analytics, profile, and admin modules.

## Scripts
- npm start
- npm run build

## Environment
Copy .env.example to .env and set:
- REACT_APP_API_BASE
- REACT_APP_GOOGLE_CLIENT_ID
- other optional values as needed.

## Development
This app expects a backend endpoint POST /auth/google that exchanges a Google ID token for an application JWT.

```
POST ${REACT_APP_API_BASE}/auth/google
body: { idToken: string }
resp: { token: string }
```
