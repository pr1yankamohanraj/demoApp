#!/bin/bash

echo "🚀 Setting up AI Summary Assistant Backend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔧 Creating .env file..."
    cp env.example .env
    echo "✅ .env file created"
    echo "⚠️  Please edit .env file and add your OpenAI API key"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file and add your OpenAI API key"
echo "2. Run 'npm run dev' to start the development server"
echo "3. The server will be available at http://localhost:3001"
echo ""
echo "To get an OpenAI API key:"
echo "1. Go to https://platform.openai.com/"
echo "2. Sign up or log in"
echo "3. Navigate to API Keys section"
echo "4. Create a new API key"
echo "5. Copy the key to your .env file"
echo ""
echo "Happy coding! 🚀" 