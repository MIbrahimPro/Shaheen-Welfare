#!/usr/bin/env bash
# Detached prod server for local verification (NOT for deployment).
# Usage: scripts/serve-local.sh  (logs: /tmp/sws-start.log, port 4321)
cd "$(dirname "$0")/.." || exit 1
exec env NEXT_PUBLIC_BASE_PATH=/shaheen-welfare PORT=4321 npx next start --port 4321
