import { AntDesign, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { aiSummaryService } from '../services/aiSummaryService';
import HeaderWithMenu from './Header_with_MenuScreen';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AI_Summary_AssistantScreen() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI Emergency Assistant. I can help you with:\n\n• Emergency safety information and procedures\n• Disaster recovery resources and assistance\n• Community support and resource location\n• Real-time guidance for various emergency situations\n• App navigation - help you find features and sections\n• General questions about using the app\n\nHow can I help you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);

  useEffect(() => {
    checkBackendConnection();
  }, []);

  const checkBackendConnection = async () => {
    try {
      const connected = await aiSummaryService.testConnection();
      setIsConnected(connected);
      if (!connected) {
        Alert.alert(
          'Connection Error',
          'Unable to connect to AI service. Please check your internet connection and try again.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      setIsConnected(false);
      console.error('Backend connection check failed:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Use the new comprehensive assistance method
      const response = await aiSummaryService.getAssistance(inputText);

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response.summary,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI response error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I\'m having trouble processing your request right now. Please try again later.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (message: ChatMessage) => (
    <View key={message.id} style={[
      styles.messageContainer,
      message.isUser ? styles.userMessage : styles.aiMessage
    ]}>
      <View style={[
        styles.messageBubble,
        message.isUser ? styles.userBubble : styles.aiBubble
      ]}>
        <Text style={[
          styles.messageText,
          message.isUser ? styles.userMessageText : styles.aiMessageText
        ]}>
          {message.text}
        </Text>
        <Text style={styles.timestamp}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );

  if (showChat) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <HeaderWithMenu backRoute="/screens/DashboardScreen" />
        </View>
        
        <View style={styles.chatHeader}>
          <TouchableOpacity 
            style={styles.chatBackButton}
            onPress={() => setShowChat(false)}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={26} color="#0A4E78" />
          </TouchableOpacity>
          <View style={styles.chatHeaderContent}>
            <FontAwesome5 name="robot" size={24} color="#0A4E78" />
            <Text style={styles.chatHeaderTitle}>AI Emergency Assistant</Text>
          </View>
          <View style={styles.connectionStatus}>
            <View style={[
              styles.statusDot,
              { backgroundColor: isConnected ? '#4CAF50' : '#F44336' }
            ]} />
          </View>
        </View>

        <ScrollView 
          ref={scrollViewRef}
          style={styles.chatContainer} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chatContentContainer}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          <View style={styles.chatMessagesContainer}>
            {messages.map(renderMessage)}
            {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#0A4E78" />
                <Text style={styles.loadingText}>AI is thinking...</Text>
              </View>
            )}
          </View>
        </ScrollView>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask me about emergencies, app navigation, or anything else..."
            placeholderTextColor="#999"
            multiline
            maxLength={500}
            editable={!isLoading}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!inputText.trim() || isLoading) && styles.sendButtonDisabled
            ]}
            onPress={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={(!inputText.trim() || isLoading) ? "#999" : "#fff"} 
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
          <HeaderWithMenu backRoute="/screens/DashboardScreen" /> 
      </View> 
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.content}>
      <View style={styles.robotIcon}>
        <FontAwesome5 name="robot" size={80} color="#0A4E78" />
      </View>

      <Text style={styles.ai_assistant_title}>AI Assistant</Text>
      <Text style={styles.description}>AI-powered answers anytime, anywhere</Text>

          {/* Connection Status */}
          <View style={styles.connectionStatusContainer}>
            <View style={[
              styles.statusDot,
              { backgroundColor: isConnected === null ? '#FFA726' : isConnected ? '#4CAF50' : '#F44336' }
            ]} />
            <Text style={styles.connectionText}>
              {isConnected === null ? 'Checking connection...' : 
               isConnected ? 'Connected to AI service' : 'Connection failed'}
            </Text>
          </View>

          {/* Feature Cards */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name="bulb" size={30} color="#0A4E78" />
              </View>
              <Text style={styles.featureTitle}>Smart Responses</Text>
              <Text style={styles.featureDescription}>Get instant, accurate answers to emergency questions</Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <MaterialIcons name="location-on" size={30} color="#0A4E78" />
              </View>
              <Text style={styles.featureTitle}>Location Aware</Text>
              <Text style={styles.featureDescription}>Contextual help based on your current location</Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <AntDesign name="clockcircle" size={30} color="#0A4E78" />
              </View>
              <Text style={styles.featureTitle}>24/7 Available</Text>
              <Text style={styles.featureDescription}>Always ready to help, day or night</Text>
            </View>
          </View>

          {/* What You Can Ask Section */}
          <View style={styles.examplesContainer}>
            <Text style={styles.examplesTitle}>What You Can Ask:</Text>
            <View style={styles.exampleItem}>
              <Text style={styles.exampleText}>• "What should I do during an earthquake?"</Text>
            </View>
            <View style={styles.exampleItem}>
              <Text style={styles.exampleText}>• "Where are the nearest emergency shelters?"</Text>
            </View>
            <View style={styles.exampleItem}>
              <Text style={styles.exampleText}>• "How do I prepare for a hurricane?"</Text>
            </View>
            <View style={styles.exampleItem}>
              <Text style={styles.exampleText}>• "What emergency supplies do I need?"</Text>
            </View>
          </View>

      <TouchableOpacity
        style={[styles.button, !isConnected && styles.buttonDisabled]}
        onPress={() => setShowChat(true)}
        disabled={!isConnected}
      >
        <MaterialIcons name="summarize" size={30} color="#0A4E78" style={styles.summaryIcon} />
        <Text style={styles.buttonText}>
          {isConnected ? 'Start Chat' : 'Connecting...'}
        </Text>
      </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBE9F3',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 140,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  robotIcon: {
    marginBottom: 20,
  },
  ai_assistant_title: {
    letterSpacing: 1,
    fontSize: 38,
    textAlign: 'center',
    color: '#0A4E78',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#273E53',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 25,
    paddingHorizontal: 10,
    lineHeight: 22,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 25,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
    color: '#0A4E78',
  },
  featureDescription: {
    fontSize: 11,
    textAlign: 'center',
    color: '#555',
    lineHeight: 16,
  },
  examplesContainer: {
    width: '100%',
    marginBottom: 25,
  },
  examplesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A4E78',
    marginBottom: 12,
    textAlign: 'center',
  },
  exampleItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exampleText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
  button: {
    width: 300,
    height: 55,
    borderRadius: 10,
    backgroundColor: '#336B87',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  summaryIcon: {
    marginRight: 8,
  },
  // New styles for chat interface
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  chatBackButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
  chatHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatHeaderTitle: {
    marginLeft: 12,
    fontSize: 22,
    fontWeight: '600',
    color: '#0A4E78',
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  connectionText: {
    fontSize: 14,
    color: '#555',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  chatContentContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  chatMessagesContainer: {
    flex: 1,
  },
  messageContainer: {
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  aiMessage: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: '#0A4E78',
    borderBottomRightRadius: 5,
  },
  aiBubble: {
    backgroundColor: '#F8F9FA',
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
  userMessageText: {
    color: '#FFFFFF',
    fontWeight: '400',
  },
  aiMessageText: {
    color: '#2C3E50',
    fontWeight: '400',
  },
  timestamp: {
    fontSize: 11,
    color: '#6C757D',
    marginTop: 8,
    alignSelf: 'flex-end',
    fontWeight: '400',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  loadingText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#0A4E78',
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    marginRight: 12,
    maxHeight: 120,
    minHeight: 45,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  sendButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#0A4E78',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  sendButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  connectionStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});
