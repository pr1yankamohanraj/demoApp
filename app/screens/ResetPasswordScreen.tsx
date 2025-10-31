import { useClerk, useSignIn } from '@clerk/clerk-expo';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const { signIn, setActive, isLoaded } = useSignIn();
  const { client } = useClerk();

  const handleResetPassword = async () => {
    if (!isLoaded) return;

    if (!email || !code || !newPassword || !confirmPassword) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }

    // Trim whitespace and debug the comparison
    const trimmedNewPassword = newPassword.trim();
    const trimmedConfirmPassword = confirmPassword.trim();
    
    console.log('Password comparison debug:', {
      newPassword: `"${newPassword}"`,
      confirmPassword: `"${confirmPassword}"`,
      trimmedNewPassword: `"${trimmedNewPassword}"`,
      trimmedConfirmPassword: `"${trimmedConfirmPassword}"`,
      areEqual: trimmedNewPassword === trimmedConfirmPassword
    });

    if (trimmedNewPassword !== trimmedConfirmPassword) {
      Alert.alert(
        'Password Mismatch', 
        'New password and confirm password must match exactly. Please check for extra spaces or different characters.'
      );
      return;
    }

    if (trimmedNewPassword.length < 8) {
      Alert.alert('Password Too Short', 'Password must be at least 8 characters long');
      return;
    }

    console.log('Attempting password reset with:', { email, code, passwordLength: trimmedNewPassword.length });

    try {
      // Use the correct Clerk password reset flow
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password: trimmedNewPassword,
      });

      console.log('Reset result:', result);

      Alert.alert(
        'Password Reset Successful', 
        'Your password has been reset successfully. You can now sign in with your new password.',
        [
          {
            text: 'OK',
            onPress: () => {
              router.navigate('/screens/SignInScreen');
            }
          }
        ]
      );
    } catch (err: any) {
      console.error('Reset error details:', {
        message: err.message,
        errors: err.errors,
        code: err.code,
        status: err.status
      });
      
      const errorMessage = err.errors?.[0]?.message || err.message || 'Failed to reset password. Please check your code and try again.';
      
      if (errorMessage.includes('data breach')) {
        Alert.alert(
          'Password Security Issue', 
          'This password has been found in an online data breach. For your account safety, please choose a different, stronger password.',
          [
            {
              text: 'OK',
              onPress: () => {
                setNewPassword('');
                setConfirmPassword('');
              }
            }
          ]
        );
      } else if (errorMessage.includes('code') || errorMessage.includes('invalid')) {
        Alert.alert(
          'Invalid Code', 
          'The reset code appears to be invalid or expired. Please request a new code.',
          [
            {
              text: 'Request New Code',
              onPress: () => handleResendCode()
            },
            {
              text: 'OK',
              style: 'cancel'
            }
          ]
        );
      } else {
        Alert.alert('Reset Failed', errorMessage);
      }
    }
  };

  const handleResendCode = async () => {
    if (!isLoaded || !email) {
      Alert.alert('Email Required', 'Please enter your email address first');
      return;
    }

    try {
      await signIn.create({
        identifier: email,
        strategy: 'reset_password_email_code',
      });
      
      Alert.alert('Code Resent', 'A new reset code has been sent to your email');
    } catch (err: any) {
      console.error('Resend error:', err);
      Alert.alert('Resend Failed', err.errors?.[0]?.message || 'Failed to resend code');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <TouchableOpacity onPress={() => router.navigate('/screens/SignInScreen')} style={styles.backButton}>
        <AntDesign name="arrowleft" size={40} color="#0A4E78" />
      </TouchableOpacity>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>Enter the code from your email and create a new password</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#bbb"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Reset Code</Text>
            <TextInput
              value={code}
              onChangeText={setCode}
              placeholder="Enter the 6-digit code"
              placeholderTextColor="#bbb"
              style={styles.input}
              keyboardType="number-pad"
              maxLength={6}
            />

            <Text style={styles.label}>New Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                placeholderTextColor="#bbb"
                secureTextEntry={!showPassword}
                style={styles.passwordInput}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                <AntDesign name={showPassword ? 'eyeo' : 'eye'} size={20} color="#0A4E78" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowPasswordModal(true)} style={styles.infoButton}>
                <Ionicons name="information-circle" size={20} color="#0A4E78" />
              </TouchableOpacity>
              {newPassword.length > 0 && (
                <View style={styles.statusIndicator}>
                  {newPassword.length >= 8 && 
                   /[A-Z]/.test(newPassword) && 
                   /[a-z]/.test(newPassword) && 
                   /\d/.test(newPassword) && 
                   /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? (
                    <AntDesign name="checkcircle" size={20} color="#28a745" />
                  ) : (
                    <AntDesign name="closecircle" size={20} color="#dc3545" />
                  )}
                </View>
              )}
            </View>

            <Text style={styles.label}>Confirm New Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
                placeholderTextColor="#bbb"
                secureTextEntry={!showConfirmPassword}
                style={styles.passwordInput}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeButton}>
                <AntDesign name={showConfirmPassword ? 'eyeo' : 'eye'} size={20} color="#0A4E78" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
              <Text style={styles.resetButtonText}>Reset Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resendButton} onPress={handleResendCode}>
              <Text style={styles.resendText}>Resend Code</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={showPasswordModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPasswordModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Password Requirements</Text>
            <Text style={styles.modalSubtitle}>Your password must meet all of these criteria:</Text>
            
            <View style={styles.requirementsList}>
              <Text style={[styles.requirement, newPassword.length >= 8 && styles.requirementMet]}>
                ✓ At least 8 characters long
              </Text>
              <Text style={[styles.requirement, /[A-Z]/.test(newPassword) && styles.requirementMet]}>
                ✓ Contains uppercase letter (A-Z)
              </Text>
              <Text style={[styles.requirement, /[a-z]/.test(newPassword) && styles.requirementMet]}>
                ✓ Contains lowercase letter (a-z)
              </Text>
              <Text style={[styles.requirement, /\d/.test(newPassword) && styles.requirementMet]}>
                ✓ Contains number (0-9)
              </Text>
              <Text style={[styles.requirement, /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) && styles.requirementMet]}>
                ✓ Contains special character (!@#$%^&*)
              </Text>
              <Text style={styles.requirement}>
                ✓ Must be unique (not found in data breaches)
              </Text>
              <Text style={styles.requirement}>
                ✓ Avoid common words or patterns
              </Text>
            </View>

            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setShowPasswordModal(false)}
            >
              <Text style={styles.closeButtonText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBE9F3',
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 20,
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 140,
    paddingBottom: 100,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0A4E78',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#273E53',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
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
  infoButton: {
    paddingHorizontal: 10,
  },
  statusIndicator: {
    paddingHorizontal: 10,
  },
  resetButton: {
    backgroundColor: '#0A4E78',
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  resendButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  resendText: {
    color: '#0A4E78',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    margin: 20,
    maxWidth: 350,
    width: '100%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A4E78',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  requirementsList: {
    marginBottom: 25,
  },
  requirement: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    paddingLeft: 5,
  },
  requirementMet: {
    color: '#28a745',
    fontWeight: '500',
  },
  closeButton: {
    backgroundColor: '#0A4E78',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 