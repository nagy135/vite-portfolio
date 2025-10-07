#!/usr/bin/env bash
set -euo pipefail

# Minimal deploy script for NixOS nginx static hosting
# - Builds the Vite/React app
# - Syncs dist/ to /srv/www/portfolio
# - Ensures ownership and permissions so nginx can read files without manual chmod

TARGET=${TARGET:-/srv/www/portfolio}
OWNER=${OWNER:-root}
GROUP=${GROUP:-nginx}

echo "[deploy] Build starting…"
if ! command -v npm >/dev/null 2>&1; then
  echo "[deploy] npm not found in PATH" >&2
  exit 1
fi

# Install deps if node_modules missing (adjust if you prefer always-ci)
if [ ! -d node_modules ]; then
  echo "[deploy] Installing dependencies (npm ci)…"
  npm ci
fi

echo "[deploy] Running build (npm run build)…"
npm run build

echo "[deploy] Ensuring target directory: $TARGET"
sudo mkdir -p "$TARGET"

echo "[deploy] Syncing dist/ to $TARGET with correct ownership and perms…"
sudo rsync -a --delete \
  --chown="${OWNER}:${GROUP}" \
  --chmod=Da+rx,Fa+rX \
  dist/ "$TARGET/"

# Optional quick sanity check that nginx user can read index.html
if id -u nginx >/dev/null 2>&1; then
  if sudo -u nginx test -r "$TARGET/index.html"; then
    echo "[deploy] nginx can read $TARGET/index.html ✅"
  else
    echo "[deploy] WARNING: nginx cannot read $TARGET/index.html ❌" >&2
  fi
fi

echo "[deploy] Done. Point nginx root to $TARGET and reload nginx if needed."


