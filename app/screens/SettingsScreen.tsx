import { useClerk } from '@clerk/clerk-expo';
import { AntDesign, Fontisto, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as Linking from 'expo-linking';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Modal, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { ConsentService } from '../services/consentService';
import HeaderWithMenu from './Header_with_MenuScreen';

const NotificationToggle = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    const loadSetting = async () => {
      const value = await AsyncStorage.getItem('notificationsEnabled');
      if (value !== null) {
        setNotificationsEnabled(value === 'true');
      }
    };
    loadSetting();
  }, []);

  const toggleSwitch = async () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    await AsyncStorage.setItem('notificationsEnabled', String(newValue));
  };

  return (
    <Switch
      value={notificationsEnabled}
      onValueChange={toggleSwitch}
    />
  );
};

interface PermissionState {
  enabled: boolean;
  status: string | null;
  loading: boolean;
}

type PermissionType = 'location' | 'notifications' | 'camera';

export default function SettingsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [permissionsModalVisible, setPermissionsModalVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'undetermined' | null>(null);
  const [backgroundLocationEnabled, setBackgroundLocationEnabled] = useState(false);
  const [locationAccuracy, setLocationAccuracy] = useState<'high' | 'balanced' | 'low'>('balanced');
  
  const [permissions, setPermissions] = useState<Record<PermissionType, PermissionState>>({
    location: { enabled: false, status: null, loading: false },
    notifications: { enabled: false, status: null, loading: false },
    camera: { enabled: false, status: null, loading: false },
  });

  const { signOut } = useClerk();

  const toggleSwitch = () => {
    setNotificationsEnabled(previous => {
      const updated = !previous;
      Alert.alert(`Notifications ${updated ? 'enabled' : 'disabled'}`);
      return updated;
    });
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      Linking.openURL(Linking.createURL('/'));
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handleResetConsent = async () => {
    Alert.alert(
      'Reset Privacy Policy Consent',
      'This will require you to review and agree to the Privacy and Trust Policies again. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              await ConsentService.resetConsent();
              Alert.alert('Success', 'Privacy policy consent has been reset. You will need to review the policies again.');
            } catch (error) {
              Alert.alert('Error', 'Failed to reset consent. Please try again.');
            }
          }
        }
      ]
    );
  };

  // Check permissions status
  const checkPermissionsStatus = async () => {
    try {
      // Check saved preferences
      const savedLocationPref = await AsyncStorage.getItem('userLocationPreference');
      const savedNotificationPref = await AsyncStorage.getItem('userNotificationPreference');
      const savedCameraPref = await AsyncStorage.getItem('userCameraPreference');
      
      // Location permission
      if (savedLocationPref !== null) {
        setPermissions(prev => ({
          ...prev,
          location: {
            enabled: savedLocationPref === 'true',
            status: savedLocationPref === 'true' ? 'granted' : 'denied',
            loading: false
          }
        }));
      } else {
        const locationStatus = await Location.getForegroundPermissionsAsync();
        setPermissions(prev => ({
          ...prev,
          location: {
            enabled: locationStatus.status === 'granted',
            status: locationStatus.status,
            loading: false
          }
        }));
      }

      // Notification permission
      if (savedNotificationPref !== null) {
        setPermissions(prev => ({
          ...prev,
          notifications: {
            enabled: savedNotificationPref === 'true',
            status: savedNotificationPref === 'true' ? 'granted' : 'denied',
            loading: false
          }
        }));
      } else {
        const notificationStatus = await Notifications.getPermissionsAsync();
        setPermissions(prev => ({
          ...prev,
          notifications: {
            enabled: notificationStatus.status === 'granted',
            status: notificationStatus.status,
            loading: false
          }
        }));
      }

      // Camera permission
      if (savedCameraPref !== null) {
        setPermissions(prev => ({
          ...prev,
          camera: {
            enabled: savedCameraPref === 'true',
            status: savedCameraPref === 'true' ? 'granted' : 'denied',
            loading: false
          }
        }));
      } else {
        const cameraStatus = await ImagePicker.getCameraPermissionsAsync();
        setPermissions(prev => ({
          ...prev,
          camera: {
            enabled: cameraStatus.status === 'granted',
            status: cameraStatus.status,
            loading: false
          }
        }));
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  };

  // Handle permission toggle
  const handlePermissionToggle = async (permissionType: PermissionType, value: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [permissionType]: { ...prev[permissionType], loading: true }
    }));

    try {
      let isGranted = false;
      let status = 'denied';

      switch (permissionType) {
        case 'location':
          if (value) {
            const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
            status = locationStatus;
            isGranted = locationStatus === 'granted';
          } else {
            status = 'denied';
            isGranted = false;
          }
          await AsyncStorage.setItem('userLocationPreference', isGranted.toString());
          break;

        case 'notifications':
          if (value) {
            const { status: notificationStatus } = await Notifications.requestPermissionsAsync();
            status = notificationStatus;
            isGranted = notificationStatus === 'granted';
          } else {
            status = 'denied';
            isGranted = false;
          }
          await AsyncStorage.setItem('userNotificationPreference', isGranted.toString());
          break;

        case 'camera':
          if (value) {
            const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
            status = cameraStatus;
            isGranted = cameraStatus === 'granted';
          } else {
            status = 'denied';
            isGranted = false;
          }
          await AsyncStorage.setItem('userCameraPreference', isGranted.toString());
          break;
      }

      setPermissions(prev => ({
        ...prev,
        [permissionType]: {
          enabled: isGranted,
          status,
          loading: false
        }
      }));

      // Show feedback
      const permissionNames: Record<PermissionType, string> = {
        location: 'Location Services',
        notifications: 'Notifications',
        camera: 'Camera'
      };

      if (value && isGranted) {
        Alert.alert(
          `${permissionNames[permissionType]} Enabled`,
          `${permissionNames[permissionType]} are now enabled for better emergency assistance.`
        );
      } else if (value && !isGranted) {
        Alert.alert(
          `${permissionNames[permissionType]} Denied`,
          `You can enable ${permissionNames[permissionType].toLowerCase()} later in your device settings.`
        );
      } else {
        Alert.alert(
          `${permissionNames[permissionType]} Disabled`,
          `${permissionNames[permissionType]} are disabled. You can enable them later in your device settings.`
        );
      }
    } catch (error) {
      console.error(`Error handling ${permissionType} toggle:`, error);
      setPermissions(prev => ({
        ...prev,
        [permissionType]: { ...prev[permissionType], loading: false }
      }));
      Alert.alert('Error', `Failed to update ${permissionType} permission. Please try again.`);
    }
  };

  const getPermissionIcon = (permissionType: PermissionType) => {
    switch (permissionType) {
      case 'location':
        return <MaterialIcons name="location-on" size={24} color="#0A4E78" />;
      case 'notifications':
        return <MaterialIcons name="notifications" size={24} color="#0A4E78" />;
      case 'camera':
        return <MaterialIcons name="camera-alt" size={24} color="#0A4E78" />;
      default:
        return <MaterialIcons name="security" size={24} color="#0A4E78" />;
    }
  };

  const getPermissionDescription = (permissionType: PermissionType, enabled: boolean) => {
    const descriptions: Record<PermissionType, { enabled: string; disabled: string }> = {
      location: {
        enabled: 'Enabled - Get nearby emergency resources and alerts',
        disabled: 'Disabled - Enable for location-based emergency assistance'
      },
      notifications: {
        enabled: 'Enabled - Receive emergency alerts and updates',
        disabled: 'Disabled - Enable for important emergency notifications'
      },
      camera: {
        enabled: 'Enabled - Document damage and share photos',
        disabled: 'Disabled - Enable to document and share emergency situations'
      }
    };
    return enabled ? descriptions[permissionType].enabled : descriptions[permissionType].disabled;
  };

  const getPermissionTitle = (permissionType: PermissionType) => {
    const titles: Record<PermissionType, string> = {
      location: 'Location Services',
      notifications: 'Notifications',
      camera: 'Camera'
    };
    return titles[permissionType];
  };

  // Check location permission status
  const checkLocationPermission = async () => {
    try {
      const value = await AsyncStorage.getItem('locationEnabled');
      if (value !== null) {
        setLocationEnabled(value === 'true');
      }
      const status = await AsyncStorage.getItem('locationPermission');
      if (status !== null) {
        setLocationPermission(status as 'granted' | 'denied' | 'undetermined');
      }
    } catch (error) {
      console.error('Error checking location permission:', error);
      setLocationPermission('denied');
      setLocationEnabled(false);
    }
  };

  // Request location permission
  const requestLocationPermission = async () => {
    try {
      if (locationEnabled) {
        // Disable location services
        setLocationEnabled(false);
        await AsyncStorage.setItem('locationEnabled', 'false');
        Alert.alert('Location Disabled', 'Location services have been disabled. Emergency alerts may be less accurate.');
      } else {
        // Enable location services
        const { status } = await Location.requestForegroundPermissionsAsync();
        const newStatus = status === 'granted';
        setLocationPermission(status);
        setLocationEnabled(newStatus);
        await AsyncStorage.setItem('locationEnabled', newStatus.toString());
        await AsyncStorage.setItem('locationPermission', status);
        
        if (newStatus) {
          Alert.alert('Success', 'Location permission granted!');
        } else {
          Alert.alert('Permission Denied', 'Location permission is required for emergency alerts and shelter finding.');
        }
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      Alert.alert('Error', 'Failed to request location permission.');
    }
  };

  // Toggle background location
  const toggleBackgroundLocation = async () => {
    if (!locationEnabled && !backgroundLocationEnabled) {
      Alert.alert(
        'Location Services Required', 
        'Please enable location services first to use background location tracking.',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Enable Location Services', 
            onPress: () => requestLocationPermission()
          }
        ]
      );
      return;
    }

    try {
      if (backgroundLocationEnabled) {
        // Disable background location
        setBackgroundLocationEnabled(false);
        await AsyncStorage.setItem('backgroundLocationEnabled', 'false');
        Alert.alert('Background Location Disabled', 'Background location tracking has been disabled.');
      } else {
        // Check if background location is supported
        const isSupported = await checkBackgroundLocationSupport();
        if (!isSupported) {
          Alert.alert(
            'Not Supported', 
            'Background location is not supported on this device.',
            [{ text: 'OK', style: 'default' }]
          );
          return;
        }

        // Check if we already have background permission
        const { status: currentBgStatus } = await Location.getBackgroundPermissionsAsync();
        
        if (currentBgStatus === 'granted') {
          // Already have permission, just enable
          setBackgroundLocationEnabled(true);
          await AsyncStorage.setItem('backgroundLocationEnabled', 'true');
          Alert.alert('Success', 'Background location enabled!');
        } else {
          // Request background permission
          const { status } = await Location.requestBackgroundPermissionsAsync();
          const newStatus = status === 'granted';
          setBackgroundLocationEnabled(newStatus);
          await AsyncStorage.setItem('backgroundLocationEnabled', newStatus.toString());
          
          if (newStatus) {
            Alert.alert('Success', 'Background location permission granted and enabled!');
          } else {
            Alert.alert(
              'Permission Denied', 
              'Background location permission is required for continuous emergency monitoring. You can enable it later in device settings.',
              [
                { text: 'OK', style: 'default' },
                { text: 'Open Settings', onPress: () => Linking.openSettings() }
              ]
            );
          }
        }
      }
    } catch (error) {
      console.error('Error toggling background location:', error);
      
      // More specific error handling
      if (error instanceof Error) {
        if (error.message.includes('permission')) {
          Alert.alert(
            'Permission Error', 
            'Unable to access location permissions. Please check your device settings.',
            [
              { text: 'OK', style: 'default' },
              { text: 'Open Settings', onPress: () => Linking.openSettings() }
            ]
          );
        } else if (error.message.includes('not supported') || error.message.includes('unavailable')) {
          Alert.alert(
            'Not Supported', 
            'Background location is not available on this device.',
            [{ text: 'OK', style: 'default' }]
          );
        } else {
          Alert.alert('Error', 'Failed to update background location settings. Please try again.');
        }
      } else {
        Alert.alert('Error', 'Failed to update background location settings. Please try again.');
      }
    }
  };

  // Open device location settings
  const openLocationSettings = () => {
    Linking.openSettings();
  };

  // Check if background location is supported
  const checkBackgroundLocationSupport = async () => {
    try {
      const { status } = await Location.getBackgroundPermissionsAsync();
      return true; // If we can check, it's supported
    } catch (error) {
      console.error('Background location not supported:', error);
      return false;
    }
  };

  // Refresh location status
  const refreshLocationStatus = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      setLocationPermission(status);
      
      // Only update enabled state if user hasn't manually set it
      const savedLocationEnabled = await AsyncStorage.getItem('locationEnabled');
      if (savedLocationEnabled === null) {
        // First time - set based on current permission
        const shouldBeEnabled = status === 'granted';
        setLocationEnabled(shouldBeEnabled);
        await AsyncStorage.setItem('locationEnabled', shouldBeEnabled.toString());
        await AsyncStorage.setItem('locationPermission', status);
      }
      // If user has manually set it, keep their choice
      
      // Check background permission if foreground is granted and supported
      if (locationEnabled && status === 'granted') {
        const isSupported = await checkBackgroundLocationSupport();
        if (isSupported) {
          try {
            const { status: bgStatus } = await Location.getBackgroundPermissionsAsync();
            const bgEnabled = bgStatus === 'granted';
            setBackgroundLocationEnabled(bgEnabled);
            await AsyncStorage.setItem('backgroundLocationEnabled', bgEnabled.toString());
          } catch (bgError) {
            console.error('Error checking background permission:', bgError);
            // Don't update background location state if we can't check it
          }
        }
      }
    } catch (error) {
      console.error('Error refreshing location status:', error);
    }
  };

  // Open location settings modal with refresh
  const openLocationSettingsModal = () => {
    // Don't refresh status automatically - preserve user's manual choices
    setLocationModalVisible(true);
  };

  // Load location settings on component mount
  useEffect(() => {
    const loadLocationSettings = async () => {
      try {
        // Load persisted settings
        const locationEnabledValue = await AsyncStorage.getItem('locationEnabled');
        if (locationEnabledValue !== null) {
          setLocationEnabled(locationEnabledValue === 'true');
        }
        
        const locationPermissionValue = await AsyncStorage.getItem('locationPermission');
        if (locationPermissionValue !== null) {
          setLocationPermission(locationPermissionValue as 'granted' | 'denied' | 'undetermined');
        }
        
        const backgroundLocationValue = await AsyncStorage.getItem('backgroundLocationEnabled');
        if (backgroundLocationValue !== null) {
          setBackgroundLocationEnabled(backgroundLocationValue === 'true');
        }
        
        // Check current system permission status
        const { status } = await Location.getForegroundPermissionsAsync();
        setLocationPermission(status);
        
        // Update enabled state based on actual permission
        if (locationEnabledValue === null) {
          // First time - set based on current permission
          setLocationEnabled(status === 'granted');
          await AsyncStorage.setItem('locationEnabled', (status === 'granted').toString());
        }
        
      } catch (error) {
        console.error('Error loading location settings:', error);
        setLocationPermission('denied');
        setLocationEnabled(false);
      }
    };
    
    loadLocationSettings();
    checkPermissionsStatus();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderWithMenu backRoute="/screens/DashboardScreen" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.settingsIcon}>
          <Fontisto 
            name="player-settings" 
            size={80} 
            color="#0A4E78" 
          />
        </View>

        <Text style={styles.title}>Settings</Text>
        <Text style={styles.description1}>Customize preferences, app behavior, </Text>
        <Text style={styles.description2}>and privacy settings.</Text>

        <View style={styles.groupedButtonContainer}>
          <TouchableOpacity style={styles.row} onPress={() => setModalVisible(true)}>
            <Text style={styles.rowText}>Notification Settings</Text>
            <AntDesign name="right" size={30} color="#0A4E78" />
          </TouchableOpacity>
          <View style={styles.divider} />

          <TouchableOpacity style={styles.row} onPress={() => router.navigate('/screens/Privacy_Policies2Screen')}>
            <Text style={styles.rowText}>Privacy</Text>
            <AntDesign name="right" size={30} color="#0A4E78" />
          </TouchableOpacity>
          <View style={styles.divider} />

          <TouchableOpacity style={styles.row} onPress={openLocationSettingsModal}>
            <Text style={styles.rowText}>Location Settings</Text>
            <AntDesign name="right" size={30} color="#0A4E78" />
          </TouchableOpacity>
          <View style={styles.divider} />

          <TouchableOpacity style={styles.row} onPress={() => setPermissionsModalVisible(true)}>
            <Text style={styles.rowText}>App Permissions</Text>
            <AntDesign name="right" size={30} color="#0A4E78" />
          </TouchableOpacity>
          <View style={styles.divider} />

          <TouchableOpacity style={styles.row} onPress={handleResetConsent}>
            <Text style={styles.rowText}>Reset Privacy Policy Consent</Text>
            <AntDesign name="right" size={30} color="#0A4E78" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Notification Settings Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <View style={styles.modalTitleContainer}>
              <AntDesign name="bells" size={20} color="#0A4E78" />
              <Text style={styles.modalTitle}> Notification Settings</Text>
            </View>

            <View style={styles.toggleRow}>
              <Text style={styles.toggleText}>
                {notificationsEnabled ? 'On' : 'Off'}
              </Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={toggleSwitch}
                trackColor={{ false: '#ccc', true: '#4CAF50' }}
                thumbColor={notificationsEnabled ? '#fff' : '#888'}
              />
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* App Permissions Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={permissionsModalVisible}
        onRequestClose={() => setPermissionsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <View style={styles.modalTitleContainer}>
              <MaterialIcons name="security" size={20} color="#0A4E78" />
              <Text style={styles.modalTitle}> App Permissions</Text>
            </View>

            <ScrollView style={styles.permissionsScrollView}>
              {Object.entries(permissions).map(([permissionType, permission]) => (
                <View key={permissionType} style={styles.permissionItem}>
                  <View style={styles.permissionInfo}>
                    <View style={styles.permissionHeader}>
                      {getPermissionIcon(permissionType as PermissionType)}
                      <Text style={styles.permissionTitle}>
                        {getPermissionTitle(permissionType as PermissionType)}
                      </Text>
                    </View>
                    <Text style={styles.permissionDescription}>
                      {getPermissionDescription(permissionType as PermissionType, permission.enabled)}
                    </Text>
                  </View>
                  <View style={styles.switchContainer}>
                    {permission.loading ? (
                      <ActivityIndicator size="small" color="#0A4E78" />
                    ) : (
                      <Switch
                        value={permission.enabled}
                        onValueChange={(value) => handlePermissionToggle(permissionType as PermissionType, value)}
                        trackColor={{ false: '#ccc', true: '#4CAF50' }}
                        thumbColor={permission.enabled ? '#fff' : '#888'}
                      />
                    )}
                  </View>
                </View>
              ))}

              <View style={styles.permissionsInfo}>
                <Text style={styles.permissionsInfoTitle}>Why These Permissions?</Text>
                <Text style={styles.permissionsInfoText}>
                  • Location: Emergency alerts and nearby resources{'\n'}
                  • Notifications: Important safety updates{'\n'}
                  • Camera: Document damage and share photos{'\n'}
                  • All permissions are optional and can be changed anytime
                </Text>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setPermissionsModalVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Location Settings Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={locationModalVisible}
        onRequestClose={() => setLocationModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <View style={styles.modalTitleContainer}>
              <AntDesign name="enviromento" size={20} color="#0A4E78" />
              <Text style={styles.modalTitle}> Location Settings</Text>
            </View>

            {/* Refresh Button */}
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={refreshLocationStatus}
            >
              <View style={styles.refreshButtonContent}>
                <AntDesign name="reload1" size={16} color="#FFF" />
                <Text style={styles.refreshButtonText}> Sync with System</Text>
              </View>
            </TouchableOpacity>

            {/* Location Permission Status */}
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Location Services</Text>
                <Text style={styles.settingDescription}>
                  {locationEnabled ? 'Enabled' : 'Disabled'} - {locationPermission || 'Unknown'}
                  {!locationEnabled && locationPermission === 'granted' && ' (Manually disabled)'}
                </Text>
              </View>
              <Switch
                value={locationEnabled}
                onValueChange={requestLocationPermission}
                trackColor={{ false: '#ccc', true: '#4CAF50' }}
                thumbColor={locationEnabled ? '#fff' : '#888'}
              />
            </View>

            {/* Background Location */}
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Background Location</Text>
                <Text style={styles.settingDescription}>
                  Allow location access when app is in background
                  {!locationEnabled && ' (Location services must be enabled)'}
                </Text>
              </View>
              <Switch
                value={backgroundLocationEnabled}
                onValueChange={toggleBackgroundLocation}
                trackColor={{ false: '#ccc', true: '#4CAF50' }}
                thumbColor={backgroundLocationEnabled ? '#fff' : '#888'}
              />
            </View>

            {/* Location Accuracy */}
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Location Accuracy</Text>
                <Text style={styles.settingDescription}>
                  Current: {locationAccuracy.charAt(0).toUpperCase() + locationAccuracy.slice(1)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.accuracyButton}
                onPress={() => {
                  const options = ['high', 'balanced', 'low'];
                  const currentIndex = options.indexOf(locationAccuracy);
                  const nextIndex = (currentIndex + 1) % options.length;
                  setLocationAccuracy(options[nextIndex] as 'high' | 'balanced' | 'low');
                }}
              >
                <Text style={styles.accuracyButtonText}>Change</Text>
              </TouchableOpacity>
            </View>

            {/* Device Settings */}
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Device Settings</Text>
                <Text style={styles.settingDescription}>
                  Open device location settings
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deviceSettingsButton}
                onPress={openLocationSettings}
              >
                <Text style={styles.deviceSettingsButtonText}>Open</Text>
              </TouchableOpacity>
            </View>

            {/* Location Info */}
            <View style={styles.locationInfo}>
              <Text style={styles.locationInfoTitle}>Why Location Access?</Text>
              <Text style={styles.locationInfoText}>
                • Emergency alerts based on your location{'\n'}
                • Find nearby shelters and resources{'\n'}
                • Accurate disaster reporting{'\n'}
                • Community safety features
              </Text>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setLocationModalVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBE9F3',
  },
  content: {
    paddingTop: 40,
    alignItems: 'center',
    paddingBottom: 50,
  },
  title: {
    letterSpacing: 1, 
    fontSize: 35,
    textAlign: 'center',
    color: '#0A4E78',
    fontWeight: "bold",
    marginBottom: 15,
  },
  description1: {
    fontSize: 18,
    color: '#273E53',
    marginBottom: 5,
    textAlign: 'center',
  },
  description2: {
    fontSize: 18,
    color: '#273E53',
    marginBottom: 25,
    textAlign: 'center',
  },
  settingsIcon: {
    marginBottom: 20,
  },
  groupedButtonContainer: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  rowText: {
    fontSize: 20,
    color: '#273E53',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginVertical: 3,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    width: '85%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A4E78',
    marginBottom: 25,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  toggleText: {
    fontSize: 18,
    color: '#273E53',
    fontWeight: '500',
  },
  closeButton: {
    backgroundColor: '#0A4E78',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  closeText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  settingInfo: {
    flex: 1,
    marginRight: 10,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#273E53',
    marginBottom: 5,
  },
  settingDescription: {
    fontSize: 14,
    color: '#555',
  },
  accuracyButton: {
    backgroundColor: '#0A4E78',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  accuracyButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  deviceSettingsButton: {
    backgroundColor: '#0A4E78',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  deviceSettingsButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  locationInfo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    width: '100%',
  },
  locationInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A4E78',
    marginBottom: 10,
  },
  locationInfoText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  refreshButton: {
    backgroundColor: '#0A4E78',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  refreshButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  refreshButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  permissionsScrollView: {
    width: '100%',
    maxHeight: 400,
  },
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  permissionInfo: {
    flex: 1,
    marginRight: 15,
  },
  permissionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A4E78',
    marginLeft: 8,
  },
  permissionDescription: {
    fontSize: 14,
    color: '#273E53',
    lineHeight: 18,
    marginLeft: 32,
  },
  switchContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionsInfo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    width: '100%',
  },
  permissionsInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A4E78',
    marginBottom: 10,
  },
  permissionsInfoText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});
