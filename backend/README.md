# AI Summary Assistant Backend

A secure Node.js backend for handling OpenAI API calls without exposing API keys to the frontend.

## 🔐 Security Features

- **API Key Protection**: OpenAI API key is stored securely on the backend
- **CORS Configuration**: Properly configured for Expo development
- **Input Validation**: Validates all incoming requests
- **Error Handling**: Comprehensive error handling and logging
- **Rate Limiting**: Built-in rate limiting for API calls

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend directory:

```bash
cp env.example .env
```

Edit `.env` and add your OpenAI API key:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
NODE_ENV=development
```

### 3. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

### 4. Start the Backend

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3001`

## 📡 API Endpoints

### Health Check
```
GET /health
```
Returns server status and connection information.

### General Summary
```
POST /api/summarize
```
**Body:**
```json
{
  "text": "Your text to summarize",
  "context": "emergency|community|resources|general",
  "type": "bullet|actionable|standard"
}
```

### Emergency Summary
```
POST /api/emergency-summary
```
**Body:**
```json
{
  "emergencyType": "Earthquake|Hurricane|Fire|etc",
  "details": "Emergency details",
  "location": "Optional location"
}
```

## 🔧 Configuration

### CORS Settings
Update the CORS configuration in `server.js` to match your frontend URLs:

```javascript
app.use(cors({
  origin: ['http://localhost:8081', 'exp://10.0.0.44:8081'],
  credentials: true
}));
```

### OpenAI Model Configuration
You can modify the OpenAI model and parameters in the API endpoints:

```javascript
const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo", // or "gpt-4" for better quality
  messages: [...],
  max_tokens: 500,        // Adjust based on needs
  temperature: 0.7,       // 0.0 = deterministic, 1.0 = creative
});
```

## 🛡️ Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for sensitive data
3. **Validate all inputs** before processing
4. **Implement rate limiting** for production
5. **Use HTTPS** in production
6. **Monitor API usage** and costs

## 🚀 Deployment Options

### Local Development
```bash
npm run dev
```

### Heroku
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git

### Railway
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Vercel
1. Import your repository
2. Set environment variables
3. Deploy with serverless functions

## 📊 Monitoring

### Health Check
Monitor your backend health:
```bash
curl http://localhost:3001/health
```

### Logs
Check server logs for errors and API usage:
```bash
# Development
npm run dev

# Production
npm start
```

## 🔍 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Update CORS configuration with correct frontend URLs
   - Ensure credentials are properly configured

2. **API Key Errors**
   - Verify your OpenAI API key is correct
   - Check that the key has sufficient credits
   - Ensure the key is properly set in environment variables

3. **Connection Issues**
   - Verify the backend is running on the correct port
   - Check firewall settings
   - Ensure the frontend is using the correct backend URL

### Debug Mode
Enable debug logging by setting:
```env
NODE_ENV=development
DEBUG=true
```

## 📝 License

MIT License - feel free to use this in your projects!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section
2. Review the logs for error messages
3. Verify your configuration
4. Open an issue with detailed information 