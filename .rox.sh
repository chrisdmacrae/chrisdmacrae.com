#!/usr/bin/env bash
# Rox project setup hook: https://chrisdmacrae.github.io/rox/guides/setup-hook/
# Runs once while Rox builds the project image (ROX_PHASE=build), or at boot
# with --no-prebuild (ROX_PHASE=boot). Git credentials are not available here.
set -euo pipefail

echo "rox: setting up chrisdmacrae.com (phase=${ROX_PHASE:-unknown}, backend=${ROX_BACKEND:-unknown})"

# package.json requires node >=22.12.0.
node_ok() {
  command -v node >/dev/null 2>&1 &&
    node -e 'const [a,b]=process.versions.node.split(".").map(Number); process.exit(a>22||(a===22&&b>=12)?0:1)'
}

if ! node_ok; then
  echo "rox: installing Node 22 with nvm"
  export NVM_DIR="$HOME/.nvm"
  if [ ! -s "$NVM_DIR/nvm.sh" ]; then
    curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
  fi
  # shellcheck disable=SC1091
  . "$NVM_DIR/nvm.sh"
  nvm install 22
  nvm alias default 22
fi

echo "rox: node $(node --version), npm $(npm --version)"

# package-lock.json is the maintained lockfile (package.json uses npm "overrides").
npm ci

echo "rox: setup complete — run 'npm run dev' to start the site"
