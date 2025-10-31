import { useSignUp } from '@clerk/clerk-expo';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isLoaded, signUp, setActive } = useSignUp();

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await signUp.create({ emailAddress: email, password });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      alert('Enter all fields.');
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      alert('Verification failed');
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.navigate('/screens/SignInScreen')}>
          <AntDesign name="arrowleft" size={50} style={styles.leftArrow} />
          <Image source={require('../../assets/images/AppLogo.png')} style={styles.appIcon} />
        </TouchableOpacity>

        <Text style={styles.title1}> Crisis </Text>
        <Text style={styles.title2}> Alert </Text>
        <Text style={styles.title3}> Loop </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.text}> Verification Code </Text>
          <TextInput
            style={styles.input}
            value={code}
            placeholder="Enter your verification code"
            onChangeText={setCode}
            placeholderTextColor="#888"
            keyboardType="numeric"
            maxLength={6}
            autoFocus={true}
          />
          <TouchableOpacity style={styles.button1} onPress={onVerifyPress}>
            <Text style={styles.button1text}>Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={() => router.navigate('/screens/SignInScreen')}>
            <AntDesign name="arrowleft" size={50} style={styles.leftArrow} />
            <Image source={require('../../assets/images/AppLogo.png')} style={styles.appIcon} />
          </TouchableOpacity>

          <Text style={styles.title1}> Crisis </Text>
          <Text style={styles.title2}> Alert </Text>
          <Text style={styles.title3}> Loop </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.text}> First Name <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your first name..."
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor="#888"
            />

            <Text style={styles.text}> Last Name <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your last name..."
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor="#888"
            />

            <Text style={styles.text}> Date of Birth <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="MM/DD/YYYY"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              placeholderTextColor="#888"
            />

            <Text style={styles.text}> Email Address <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email..."
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#888"
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <View style={styles.labelContainer}>
              <Text style={styles.text}> Password <Text style={styles.required}>*</Text></Text>
              <TouchableOpacity onPress={() => Alert.alert(
                'Password Requirements',
                'Your password must meet the following requirements:\n\n• At least 8 characters long\n• Contains at least one uppercase letter (A-Z)\n• Contains at least one lowercase letter (a-z)\n• Contains at least one number (0-9)\n• Contains at least one special character (!@#$%^&*)\n\nExample: MySecurePass123!',
                [{ text: 'Got it!', style: 'default' }]
              )}>
                <AntDesign name="questioncircleo" size={20} color="#0A4E78" />
              </TouchableOpacity>
            </View>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#888"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <AntDesign name={showPassword ? 'eye' : 'eyeo'} size={24} color="#0A4E78" />
              </TouchableOpacity>
            </View>

            <Text style={styles.text}> Confirm Password <Text style={styles.required}>*</Text></Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirm password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholderTextColor="#888"
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <AntDesign name={showConfirmPassword ? 'eye' : 'eyeo'} size={24} color="#0A4E78" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={onSignUpPress} style={styles.button1}>
              <Text style={styles.button1text}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 150,
    backgroundColor: '#CBE9F3',
  },
  leftArrow: {
    left: -140,
    color: '#0A4E78',
    bottom: -45,
  },
  appIcon: {
    width: 170,
    height: 170,
    position: 'absolute',
    top: 70,
    left: -135,
    tintColor: '#0A4E78',
  },
  title1: {
    position: 'absolute',
    fontSize: 45,
    marginRight: -100,
    color: '#0A4E78',
    fontWeight: 'bold',
    marginTop: -920,
  },
  title2: {
    position: 'absolute',
    fontSize: 45,
    marginRight: -85,
    color: '#0A4E78',
    fontWeight: 'bold',
    marginTop: -820,
  },
  title3: {
    position: 'absolute',
    fontSize: 45,
    color: '#0A4E78',
    marginRight: -90,
    fontWeight: 'bold',
    marginTop: -720,
  },
  inputContainer: {
    marginTop: 220,
    marginBottom: 100,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
    top: -30,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    width: 320,
    marginBottom: 20,
    top: -30,
    backgroundColor: '#f9f9f9',
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 50,
    width: 320,
    top: -30,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  button1: {
    backgroundColor: '#0A4E78',
    paddingVertical: 10,
    borderRadius: 20,
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    top: -25,
  },
  button1text: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 23,
    fontFamily: 'Inter_500Medium',
  },
  required: {
    color: '#FF0000',
    fontSize: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 320,
    marginBottom: 4,
  },
});
