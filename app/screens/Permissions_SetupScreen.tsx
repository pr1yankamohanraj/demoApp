import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Platform,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import HeaderWithMenu from './Header_with_MenuScreen';

type RootStackParamList = {
  Permissions_Setup: undefined;
  WebViewScreen: { url: string };
  LocalRepairAid: { region: string };
  Private_And_Trust_PoliciesScreen: undefined;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Permissions_Setup'>;
};

export default function Permissions_SetupScreen({ navigation }: Props) {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [locationPermission, setLocationPermission] = useState<string | null>(null);
  const [notificationPermission, setNotificationPermission] = useState<string | null>(null);

  // Check current permission status and user preferences on component mount
  useEffect(() => {
    checkPermissionsAndPreferences();
  }, []);

  const checkPermissionsAndPreferences = async () => {
    try {
      // Check user's saved preferences first
      const savedLocationPref = await AsyncStorage.getItem('userLocationPreference');
      const savedNotificationPref = await AsyncStorage.getItem('userNotificationPreference');
      
      if (savedLocationPref !== null) {
        // Use user's saved preference
        setLocationEnabled(savedLocationPref === 'true');
        setLocationPermission(savedLocationPref === 'true' ? 'granted' : 'denied');
      } else {
        // Check actual system permission only if no preference is saved
        const locationStatus = await Location.getForegroundPermissionsAsync();
        setLocationPermission(locationStatus.status);
        setLocationEnabled(locationStatus.status === 'granted');
      }

      if (savedNotificationPref !== null) {
        // Use user's saved preference
        setNotificationsEnabled(savedNotificationPref === 'true');
        setNotificationPermission(savedNotificationPref === 'true' ? 'granted' : 'denied');
      } else {
        // Check actual system permission only if no preference is saved
        const notificationStatus = await Notifications.getPermissionsAsync();
        setNotificationPermission(notificationStatus.status);
        setNotificationsEnabled(notificationStatus.status === 'granted');
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  };

  const handleLocationToggle = async (value: boolean) => {
    try {
      if (value) {
        // Request location permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        setLocationPermission(status);
        const isGranted = status === 'granted';
        setLocationEnabled(isGranted);
        
        // Save user preference
        await AsyncStorage.setItem('userLocationPreference', isGranted.toString());
        
        if (isGranted) {
          Alert.alert('Location Access Granted', 'Location services are now enabled for emergency alerts and nearby resources.');
        } else {
          Alert.alert('Location Access Denied', 'You can enable location services later in your device settings for better emergency assistance.');
        }
      } else {
        // Disable location
        setLocationEnabled(false);
        setLocationPermission('denied');
        // Save user preference
        await AsyncStorage.setItem('userLocationPreference', 'false');
        Alert.alert('Location Disabled', 'Location services are disabled. You can enable them later in your device settings.');
      }
    } catch (error) {
      console.error('Error handling location toggle:', error);
    }
  };

  const handleNotificationToggle = async (value: boolean) => {
    try {
      if (value) {
        // Request notification permission
        const { status } = await Notifications.requestPermissionsAsync();
        setNotificationPermission(status);
        const isGranted = status === 'granted';
        setNotificationsEnabled(isGranted);
        
        // Save user preference
        await AsyncStorage.setItem('userNotificationPreference', isGranted.toString());
        
        if (isGranted) {
          // Set up notification handler for iOS
          if (Platform.OS === 'ios') {
            Notifications.setNotificationHandler({
              handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
                shouldShowBanner: true,
                shouldShowList: true,
              }),
            });
          }
          Alert.alert('Notifications Enabled', 'You will now receive emergency alerts and important updates.');
        } else {
          Alert.alert('Notifications Denied', 'You can enable notifications later in your device settings for emergency alerts.');
        }
      } else {
        // Disable notifications
        setNotificationsEnabled(false);
        setNotificationPermission('denied');
        // Save user preference
        await AsyncStorage.setItem('userNotificationPreference', 'false');
        Alert.alert('Notifications Disabled', 'Notifications are disabled. You can enable them later in your device settings.');
      }
    } catch (error) {
      console.error('Error handling notification toggle:', error);
    }
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Permissions',
      'You can enable location and notifications later in your device settings. Continue without these features?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Continue',
          onPress: () => router.navigate('/screens/Private_And_Trust_PoliciesScreen')
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <HeaderWithMenu backRoute="/screens/SignInScreen" />
      </View>
      <View style={styles.content}>
        <Entypo
          name="lock"
          size={100}
          color="#0A4E78"
          style={{ marginBottom: 80 }}
        />
        <Text style={styles.title1}> Permissions </Text>
        <Text style={styles.title2}> Setup </Text>
        <Text style={styles.description1}> Choose which features to </Text>
        <Text style={styles.description2}> enable for better emergency </Text>
        <Text style={styles.description3}> assistance. </Text>

        {/* Location Permission */}
        <View style={styles.permissionItem}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionTitle}>Location Services</Text>
            <Text style={styles.permissionDescription}>
              {locationEnabled 
                ? 'Enabled - Get nearby emergency resources and alerts'
                : 'Disabled - Enable for location-based emergency assistance'
              }
            </Text>
          </View>
          <Switch
            value={locationEnabled}
            onValueChange={handleLocationToggle}
            trackColor={{ false: '#767577', true: '#336B87' }}
            thumbColor={locationEnabled ? '#0A4E78' : '#f4f3f4'}
            ios_backgroundColor="#767577"
          />
        </View>

        {/* Notification Permission */}
        <View style={styles.permissionItem}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionTitle}>Notifications</Text>
            <Text style={styles.permissionDescription}>
              {notificationsEnabled 
                ? 'Enabled - Receive emergency alerts and updates'
                : 'Disabled - Enable for important emergency notifications'
              }
            </Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationToggle}
            trackColor={{ false: '#767577', true: '#336B87' }}
            thumbColor={notificationsEnabled ? '#0A4E78' : '#f4f3f4'}
            ios_backgroundColor="#767577"
          />
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => router.navigate('/screens/Private_And_Trust_PoliciesScreen')}
        >
          <Text style={styles.continueButtonText}>
            Continue
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkip}
        >
          <Text style={styles.skipButtonText}>
            Skip for now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingBottom: 40,
      backgroundColor: '#CBE9F3',
    },
    headerWrapper: {
      width: '100%',
      marginBottom: 10,
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    title1: {
      fontSize: 42,
      color: '#0A4E78',
      fontWeight: "bold",
      letterSpacing: 1,
      textAlign: 'center',
      marginBottom: 0,
      marginTop: -70,
    },
    title2: {
      fontSize: 42,
      color: '#0A4E78',
      fontWeight: "bold",
      letterSpacing: 1,
      textAlign: 'center',
      marginTop: -10,
      marginBottom: 10,
    },
    description1: {
      fontSize: 22,
      color: '#273E53',
      fontWeight: "400",
      textAlign: 'center',
      marginBottom: 5,
    },
    description2: {
      fontSize: 22,
      color: '#273E53',
      fontWeight: "400",
      textAlign: 'center',
      marginBottom: 5,
    },
    description3: {
      fontSize: 22,
      color: '#273E53',
      fontWeight: "400",
      marginBottom: 20,
      textAlign: 'center',
    },
    permissionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingVertical: 20,
      paddingHorizontal: 20,
      backgroundColor: '#E0F2F7',
      borderRadius: 12,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: '#C0E0E8',
    },
    permissionInfo: {
      flex: 1,
      marginRight: 20,
    },
    permissionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#0A4E78',
      marginBottom: 6,
    },
    permissionDescription: {
      fontSize: 15,
      color: '#273E53',
      lineHeight: 20,
    },
    continueButton: {
      borderRadius: 10,
      backgroundColor: '#336B87',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 18,
      paddingHorizontal: 20,
      width: 340,
      marginTop: 10,
      marginBottom: 15,
    },
    continueButtonText: {
      color: '#FFFFFF',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '600',
    },
    skipButton: {
      borderRadius: 10,
      backgroundColor: '#767577',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 18,
      paddingHorizontal: 20,
      width: 340,
    },
    skipButtonText: {
      color: '#FFFFFF',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '600',
    },
});