import { useOAuth, useSignIn } from '@clerk/clerk-expo';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import {
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const scale = useSharedValue(1);

  const { signIn, setActive, isLoaded } = useSignIn();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onSignInPressed = async () => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: username,
        password,
      });

      await setActive({ session: result.createdSessionId });
      router.navigate('/screens/Permissions_SetupScreen');
    } catch (err: any) {
      Alert.alert('Sign In Failed', err.errors?.[0]?.message || 'Unknown error');
    }
  };

  const handleForgotPassword = async () => {
    if (!isLoaded) return;

    if (!username) {
      Alert.alert('Email Required', 'Please enter your email address first');
      return;
    }

    try {
      // Initiate the password reset flow
      await signIn.create({
        identifier: username,
        strategy: 'reset_password_email_code',
      });
      
      Alert.alert(
        'Reset Email Sent', 
        'Check your email for password reset instructions.',
        [
          {
            text: 'Enter Code',
            onPress: () => {
              // Navigate to reset screen with the email pre-filled
              router.navigate('/screens/ResetPasswordScreen');
            }
          },
          {
            text: 'OK',
            style: 'cancel'
          }
        ]
      );
    } catch (err: any) {
      console.error('Forgot password error:', err);
      Alert.alert('Reset Failed', err.errors?.[0]?.message || 'Failed to send reset email');
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isLoaded || !startOAuthFlow) {
      console.log('Clerk not loaded or OAuth flow not available');
      return;
    }

    try {
      // Close any existing browser sessions first
      WebBrowser.dismissBrowser();
      console.log('Closed existing browser sessions');
      
      console.log('Starting Google OAuth flow...');
      const result = await startOAuthFlow();
      console.log('OAuth result:', result);
      
      if (result && result.createdSessionId) {
        console.log('Session created, setting active...');
        await setActive({ session: result.createdSessionId });
        router.navigate('/screens/Permissions_SetupScreen');
      } else {
        console.log('No session created from OAuth flow');
      }
    } catch (err: any) {
      console.error('Google sign in error details:', {
        message: err.message,
        errors: err.errors,
        stack: err.stack
      });
      
      // If it's a browser conflict, try to close sessions and retry
      if (err.message?.includes('another web browser is already open')) {
        try {
          WebBrowser.dismissBrowser();
          Alert.alert(
            'Browser Conflict', 
            'Please try signing in again. If the issue persists, close all browser tabs and try again.',
            [
              {
                text: 'Try Again',
                onPress: () => handleGoogleSignIn()
              },
              {
                text: 'Cancel',
                style: 'cancel'
              }
            ]
          );
        } catch (retryErr) {
          Alert.alert('Google Sign In Failed', 'Please close all browser tabs and try again.');
        }
      } else {
        Alert.alert('Google Sign In Failed', err.errors?.[0]?.message || 'Failed to sign in with Google');
      }
    }
  };

  const togglePasswordVisibility = () => {
    scale.value = withSpring(1.3, {}, () => {
      scale.value = withSpring(1);
    });
    setShowPassword(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.navigate('/screens/WelcomeScreen')} style={styles.backButton}>
        <AntDesign name="arrowleft" size={50} color="#0A4E78" />
      </TouchableOpacity>

      <Image source={require('../../assets/images/AppLogo.png')} style={styles.appIcon} />

      <Text style={styles.title1}>Crisis</Text>
      <Text style={styles.title2}>Alert</Text>
      <Text style={styles.title3}>Loop</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your email"
          placeholderTextColor="#bbb"
          style={styles.input}
        />

        <Text style={styles.passwordLabel}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="#bbb"
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeButton}>
              <AntDesign name={showPassword ? 'eye' : 'eyeo'} size={24} color="#0A4E78" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button1} onPress={onSignInPressed}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.or}>or</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.button3} onPress={handleGoogleSignIn}>
          <Image source={require('../../google.png')} style={styles.signInGoogle} />
          <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={() => router.navigate('/screens/RegisterScreen')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBE9F3',
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 20,
  },
  appIcon: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    tintColor: '#0A4E78',
    marginBottom: 20,
    bottom: -40,
    left: -80,
  },
  title1: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#0A4E78',
    textAlign: 'center',
    top: -120,
    right: -30,

  },
  title2: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#0A4E78',
    textAlign: 'center',
    top: -125,
    right: -24,
  },
  title3: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#0A4E78',
    textAlign: 'center',
    marginBottom: 30,
    top: -130,
    right: -28,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: -10,
    top: -120,
    color: '#333',
  },
  passwordLabel: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: -10,
    top: -95,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    top: -120,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 4,
    top: -100,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
  },
  eyeButton: {
    paddingHorizontal: 10,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#0A4E78',
    marginTop: -85,
    textAlign: 'right',
  },
  button1: {
    backgroundColor: '#0A4E78',
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: -35,
  },
  button2: {
    backgroundColor: '#0A4E78',
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
    bottom: -20,
  },
  button3: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  googleText: {
    color: '#333',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  signInGoogle: {
    width: 28,
    height: 28,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#0A4E78',
    flex: 1,
    marginHorizontal: 10,
  },
  or: {
    fontSize: 16,
    color: '#0A4E78',
  },
});
