import { FontAwesome5 } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import HeaderWithMenu from './Header_with_MenuScreen';

const initialMessages = [
  { id: '1', text: 'Hello! How can I assist you today?', fromUser: false },
];

export default function AIChatScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList<{ id: string; text: string; fromUser: boolean }> | null>(null);

  const sendMessage = () => {
    if (inputText.trim().length === 0) return;
    const newMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      fromUser: true,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      keyboardVerticalOffset={90}
    >
      <HeaderWithMenu backRoute="/screens/AI_Summary_AssistantScreen" />

      <View style={styles.topArea}>
        <FontAwesome5 name="robot" size={60} color="#0A4E78" />
        <Text style={styles.title}>AI Chatbot</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.fromUser ? styles.userBubble : styles.botBubble]}>
            <Text style={[styles.messageText, item.fromUser ? styles.userText : styles.botText]}>
              {item.text}
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Send a message..."
          placeholderTextColor="#6b7a8f"
          value={inputText}
          onChangeText={setInputText}
          multiline
          returnKeyType="send"
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton} activeOpacity={0.7}>
          <FontAwesome5 name="paper-plane" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBE9F3',
  },
  topArea: {
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0A4E78',
    marginTop: 10,
  },
  chatContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexGrow: 1,
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  botBubble: {
    backgroundColor: '#E3EAF1',
    alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: '#0A4E78',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
  },
  botText: {
    color: '#0A4E78',
  },
  userText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 25,
    borderTopWidth: 1,
    borderTopColor: '#a3b1c0',
    backgroundColor: '#eaf2f7',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 30,
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: '#273E53',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#0A4E78',
    borderRadius: 25,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
