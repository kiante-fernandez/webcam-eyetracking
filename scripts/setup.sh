#!/bin/bash

# Webcam Eye-Tracking Compendium - Setup Script
# One-command setup for local development

set -e

echo "Setting up Webcam Eye-Tracking Compendium..."

# Check for Node.js 20+
echo "Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "[ERROR] Node.js 20+ is required. Current version: $(node -v)"
    echo "        Please install Node.js 20 or higher from https://nodejs.org/"
    exit 1
fi
echo "[OK] Node.js $(node -v) detected"

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "[ERROR] npm not found"
    exit 1
fi

# Install pnpm if missing
if ! command -v pnpm &> /dev/null; then
    echo "Installing pnpm..."
    npm install -g pnpm
fi
echo "[OK] pnpm $(pnpm -v) detected"

# Install dependencies
echo "Installing dependencies..."
pnpm install --frozen-lockfile || npm install

# Success message
echo ""
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "   npm run dev        - Start development server (http://localhost:4321)"
echo "   npm run build      - Build for production"
echo "   npm run test:e2e   - Run end-to-end tests"
echo ""
echo "For more information, see README.md"
