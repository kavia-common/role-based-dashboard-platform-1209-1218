#!/bin/bash
cd /tmp/kavia/workspace/code-generation/role-based-dashboard-platform-1209-1218/social_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

