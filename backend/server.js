const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:8081', 'exp://10.0.0.44:8081', 'exp://localhost:8081', 'http://10.0.0.44:8081'], // Allow Expo development server
  credentials: true
}));
app.use(express.json());

// Initialize OpenAI with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI Summary Assistant Backend is running' });
});

// AI Assistant endpoint - handles both disaster assistance and app navigation
app.post('/api/assist', async (req, res) => {
  try {
    const { text, context, type } = req.body;

    // Validate input
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Text content is required' 
      });
    }

    // App navigation guide
    const appNavigationGuide = `
APP NAVIGATION GUIDE:

MAIN FEATURES:
• Dashboard: Main hub with quick access to all features
• Emergency Types: Earthquakes, Hurricanes, Wildfires, Urban Fires, Extreme Weather, Toxic Spills
• AI Assistant: This chat interface for help and guidance
• Community: Connect with others and share resources
• Resources: Find and trade supplies, get aid, upload documents
• Profile & Settings: Manage your account and preferences

EMERGENCY-SPECIFIC SECTIONS:
• Earthquakes: Recovery assistance, cleanup help, aftershock safety, emotional support
• Hurricanes & Tornados: Relief programs, rebuilding help, shelter locations, mental health support
• Wildfires: Emergency aid, shelter finder, emotional support, rebuilding assistance
• Urban Fires & Building Emergencies: Safety tips, recovery aid, mental health support
• Extreme Weather: Safety tips, shelter finder, home repair help, emotional support
• Toxic Spills & Hazardous Materials: Safety guidelines, health resources, mental health support

RESOURCE FEATURES:
• Resource Trade: Exchange supplies with community members
• Get Resources: Find available aid and assistance programs
• Document Upload: Submit photos and documents for claims
• Aid Applications: Apply for disaster assistance programs

COMMUNITY FEATURES:
• Community Pulse: See what's happening in your area
• Community Reports: Share and view local updates
• Offer Resources: Share what you have available
• SOS: Emergency alert system

NAVIGATION TIPS:
• Use the menu button (☰) to access all sections
• Each emergency type has its own dedicated section with relevant resources
• The AI Assistant (this chat) can help you find specific features
• Use the search function to quickly find what you need
• Check the dashboard for quick access to common tasks
`;

    // Determine if the user is asking about app navigation
    const navigationKeywords = [
      'navigate', 'navigation', 'menu', 'where', 'how to find', 'where is', 'how do i get to',
      'feature', 'section', 'page', 'screen', 'button', 'tab', 'menu', 'dashboard', 'profile',
      'settings', 'community', 'resources', 'upload', 'trade', 'aid', 'assistance', 'help',
      'earthquake', 'hurricane', 'wildfire', 'fire', 'weather', 'toxic', 'spill', 'emergency'
    ];

    const isNavigationQuestion = navigationKeywords.some(keyword => 
      text.toLowerCase().includes(keyword)
    );

    // Create system prompt
    let systemPrompt = '';
    let userPrompt = '';

    if (isNavigationQuestion) {
      systemPrompt = `You are an AI assistant for a disaster recovery and community support app. You help users navigate the app and find the features they need. You have access to the following app navigation guide:

${appNavigationGuide}

Your role is to:
1. Help users find specific features and sections in the app
2. Explain how to navigate to different parts of the app
3. Provide guidance on what each section offers
4. Suggest relevant features based on user needs
5. Also provide disaster-related assistance when appropriate

Always be helpful, clear, and specific about where users can find what they're looking for.`;

      userPrompt = `User Question: "${text}"

Please help this user navigate the app and find what they need. If they're asking about disaster assistance, provide that help too. Be specific about which sections and features to use.`;
    } else {
      // Disaster assistance mode
      systemPrompt = `You are an emergency response AI assistant for a disaster recovery app. You help users with:

1. Emergency safety information and procedures
2. Disaster recovery resources and assistance
3. Community support and resource location
4. Real-time guidance for various emergency situations
5. App navigation when users need help finding features

You can also help users navigate the app to find specific features they need.`;

      userPrompt = `User Question: "${text}"

Please provide helpful disaster assistance and guidance. If the user might benefit from specific app features, mention them.`;
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;

    res.json({
      success: true,
      summary: response,
      isNavigationHelp: isNavigationQuestion,
      usage: completion.usage
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    if (error.response?.status === 401) {
      res.status(500).json({ 
        error: 'Authentication failed. Please check API key configuration.' 
      });
    } else if (error.response?.status === 429) {
      res.status(429).json({ 
        error: 'Rate limit exceeded. Please try again later.' 
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to process request. Please try again.' 
      });
    }
  }
});

// Legacy summary endpoint (for backward compatibility)
app.post('/api/summarize', async (req, res) => {
  try {
    const { text, context, type } = req.body;

    // Validate input
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Text content is required' 
      });
    }

    // Create system prompt based on context and type
    let systemPrompt = 'You are a helpful AI assistant that provides clear, concise summaries.';
    
    if (context === 'emergency') {
      systemPrompt = 'You are an emergency response AI assistant. Provide clear, actionable summaries of emergency information, safety tips, and resource availability. Focus on immediate actions people can take.';
    } else if (context === 'community') {
      systemPrompt = 'You are a community support AI assistant. Summarize community posts, updates, and discussions in a helpful and informative way.';
    } else if (context === 'resources') {
      systemPrompt = 'You are a resource management AI assistant. Summarize available resources, their locations, and how to access them effectively.';
    }

    // Create user prompt
    let userPrompt = `Please provide a concise summary of the following information:\n\n${text}`;
    
    if (type === 'bullet') {
      userPrompt += '\n\nPlease format the summary as bullet points for easy reading.';
    } else if (type === 'actionable') {
      userPrompt += '\n\nPlease provide actionable steps or recommendations based on this information.';
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const summary = completion.choices[0].message.content;

    res.json({
      success: true,
      summary,
      usage: completion.usage
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    if (error.response?.status === 401) {
      res.status(500).json({ 
        error: 'Authentication failed. Please check API key configuration.' 
      });
    } else if (error.response?.status === 429) {
      res.status(429).json({ 
        error: 'Rate limit exceeded. Please try again later.' 
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to generate summary. Please try again.' 
      });
    }
  }
});

// Emergency-specific summary endpoint
app.post('/api/emergency-summary', async (req, res) => {
  try {
    const { emergencyType, details, location } = req.body;

    if (!emergencyType || !details) {
      return res.status(400).json({ 
        error: 'Emergency type and details are required' 
      });
    }

    const systemPrompt = `You are an emergency response AI assistant. Provide clear, actionable information for ${emergencyType} emergencies. Focus on immediate safety steps, evacuation procedures, and resource availability.`;

    const userPrompt = `Emergency Type: ${emergencyType}
Location: ${location || 'Not specified'}
Details: ${details}

Please provide:
1. Immediate safety actions
2. Evacuation procedures (if applicable)
3. Available resources and assistance
4. Contact information for emergency services
5. Additional safety tips

Format as clear, actionable steps.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 800,
      temperature: 0.5,
    });

    const summary = completion.choices[0].message.content;

    res.json({
      success: true,
      summary,
      emergencyType,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Emergency Summary Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate emergency summary. Please try again.' 
    });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 AI Summary Assistant Backend running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 Network access: http://10.0.0.44:${PORT}/health`);
});

module.exports = app; 