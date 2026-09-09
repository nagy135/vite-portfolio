#!/usr/bin/env bash
set -euo pipefail

TARGET=${TARGET:-/srv/www/portfolio}
BAK="$TARGET.new"

echo "[deploy] Build starting…"
npm run build

echo "[deploy] Creating new directory: $BAK"
mkdir -p "$BAK/assets"

echo "[deploy] Copying assets to $BAK…"
cp dist/assets/* "$BAK/assets/"
cp dist/index.html "$BAK/"

echo "[deploy] Fixing permissions on new files…"
chmod 644 "$BAK/assets"/*
chmod 644 "$BAK/index.html"

echo "[deploy] Atomically replacing old files…"
rm -rf "$TARGET/assets"
mv "$BAK/assets" "$TARGET/"
mv "$BAK/index.html" "$TARGET/"

echo "[deploy] Done."


