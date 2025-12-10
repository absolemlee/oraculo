#!/bin/bash
set -e

echo "🔮 Oráculo - Oracle API Engine Setup"
echo "======================================"
echo ""

# Check if nvm is installed
if ! command -v nvm &> /dev/null; then
    echo "⚠️  nvm not found. Installing nvm..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

echo "✓ nvm available"

# Install and use Node version from .nvmrc
echo "📦 Installing Node.js version from .nvmrc..."
nvm install
nvm use

echo "✓ Node $(node --version) activated"
echo "✓ npm $(npm --version) available"

# Install dependencies
echo "📚 Installing dependencies..."
npm install

echo "✓ Dependencies installed"

# Run quality checks
echo "🔍 Running type check..."
npm run type-check

echo "✓ Type check passed"

# Build the application
echo "🏗️  Building application..."
npm run build

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "To start the production server:"
echo "  npm start"
echo ""
echo "The API will be available at http://localhost:4545"
echo ""
echo "API Endpoints:"
echo "  GET  /api/reading           - Traditional I-Ching"
echo "  POST /api/ifa-reading       - Ifá correspondences"
echo "  POST /api/rune-reading      - Rune casting"
echo "  POST /api/tarot-reading     - Tarot reading"
echo "  POST /api/unified-oracle    - All systems combined"
echo "  POST /api/ai-oracle         - AI-optimized reading"
echo "  GET  /api/hexagram/:id      - Hexagram lookup (1-64)"
echo ""
echo "Interactive Console:"
echo "  http://localhost:4545/console/traditional"
echo "  http://localhost:4545/console/ifa"
echo "  http://localhost:4545/console/runes"
echo "  http://localhost:4545/console/tarot"
echo "  http://localhost:4545/console/unified"
echo ""
