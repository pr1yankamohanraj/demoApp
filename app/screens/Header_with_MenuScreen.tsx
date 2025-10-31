import { useClerk, useUser } from '@clerk/clerk-expo';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
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

interface HeaderWithMenuProps {
  backRoute?: string;
}

const sideMenuWidth = 240;

export default function HeaderWithMenu({ backRoute }: HeaderWithMenuProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [expandedSubcategories, setExpandedSubcategories] = useState<Record<string, boolean>>({});
  const [searchText, setSearchText] = useState('');
  const [userModalVisible, setUserModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-Dimensions.get('window').width)).current;
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleUserProfilePress = () => {
    setUserModalVisible(true);
  };

  const handleSwitchAccount = () => {
    setTimeout(() => {
      setUserModalVisible(false);
      signOut();
      router.navigate('/screens/SignInScreen' as any);
    }, 0);
  };

  const handleSignOut = () => {
    setTimeout(() => {
      setUserModalVisible(false);
      signOut();
      Alert.alert(
        'Signed Out',
        'You have been signed out successfully.',
        [
          {
            text: 'Go to Sign In',
            onPress: () => router.navigate('/screens/SignInScreen' as any)
          },
          {
            text: 'Stay Here',
            style: 'cancel'
          }
        ]
      );
    }, 0);
  };

  // Nested menu structure for General category
  const generalSubcategories = {
    'Resource Management': [
      'Resource Trade',
      'Get Resources', 
      'Offer Resources'
    ],
    'Community': [
      'Community Pulse',
      'AI Summary Assistant'
    ],
    'Emergency Tools': [
      'Dashboard',
      'Live Map',
      'Find Shelter',
      'SOS',
      'Custom Emergencies Dashboard'
    ],
    'Account': [
      'Profile',
      'Settings',
      'Permissions Setup',
      'Privacy Policies',
      'Privacy and Trust Policies',
      'Welcome'
    ]
  };

  const menuItems: Record<string, string[]> = {
    Earthquakes: [
      'Earthquakes',
      'Access Aid Programs for Earthquakes',
      'Aftershock Safety Tips & Actions',
      'Earthquake Cleanup Assistance',
      'Earthquake Emergency - Find Emergency Shelter',
      'Emotional Support After an Earthquake',
    ],
    Floods: [
      'Apply for Flood Recovery Aid',
      'Flood Recovery',
      'Home Repair Resources',
      'Mental Health Support for Flood Recovery',
      'Find Shelter',
    ],
    'Hurricanes & Tornadoes': [
      'Hurricanes & Tornadoes',
      'Emotional Support for Hurricanes and Tornados',
      'Find Shelter During a Hurricane or Tornado',
      'Get Aid During Hurricanes & Tornados',
      'Rebuilding After Hurricanes and Tornados',
    ],
    'Urban Fires & Building Emergencies': [
      'Fire Safety Tips for Urban Fires & Building Emergencies',
      'Get Recovery Aid for Urban Fires and Building Emergencies',
      'Mental Health Support for Urban Fires and Building Emergencies',
    ],
    'Toxic Spills & Hazardous Materials': [
      'Toxic Spills & Hazardous Materials',
      'Health and Exposure Resources for Toxic Spills and Hazardous Materials',
      'Safety Guidelines for Toxic Spills and Hazardous Materials',
      'Mental Health Support for Toxic Spills and Hazardous Materials',
      'Displacement Support',
      'Cleanup Assistance',
    ],
    Wildfires: [
      'Wildfires',
      'Wildfire Emergency Aid',
      'Wildfire Rebuilding Support',
      'Wildfire Find Shelter',
    ],
    'Extreme Weather': [
      'Extreme Weather',
      'Extreme Weather Safety Tips',
      'Extreme Weather Home Repair Help',
      'Extreme Weather Emotional Support',
      'Extreme Weather Find Shelter',
    ],
  };

  const menuRoutes: Record<string, string> = {
    'Access Aid Programs for Earthquakes': '/screens/Access_Aid_Programs_EarthquakesScreen',
    'Aftershock Safety Tips & Actions': '/screens/Aftershock_Safety_TipsScreen',
    'Earthquakes': '/screens/Earthquake_RecoveryScreen',
    'Earthquake Cleanup Assistance': '/screens/Earthquake_Cleanup_AssistanceScreen',
    'Earthquake Emergency - Find Emergency Shelter': '/screens/Find_Shelter_EarthquakeScreen',
    'Emotional Support After an Earthquake': '/screens/Emotional_Support_After_an_EarthquakeScreen',
    'Apply for Flood Recovery Aid': '/screens/Apply_for_Flood_Recovery_AidScreen',
    'Flood Recovery': '/screens/Flood_RecoveryScreen',
    'Mental Health Support for Flood Recovery': '/screens/Mental_Health_and_Emotional_SupportScreen',
    'Emotional Support for Hurricanes and Tornados': '/screens/Emotional_Support_for_Hurricanes_and_TornadosScreen',
    'Find Shelter During a Hurricane or Tornado': '/screens/Find_Shelter_HurricanesScreen',
    'Get Aid During Hurricanes & Tornados': '/screens/Get_Aid_HurricanesScreen',
    'Hurricanes & Tornadoes': '/screens/Hurricanes_and_Tornados_ReliefScreen',
    'Rebuilding After Hurricanes and Tornados': '/screens/Rebuilding_After_Hurricanes_and_TornadosScreen',
    'Fire Safety Tips for Urban Fires & Building Emergencies': '/screens/Fire_Safety_Tips_Urban_FiresScreen',
    'Get Recovery Aid for Urban Fires and Building Emergencies': '/screens/Get_Recovery_Aid_for_Urban_Fires_and_Building_EmergenciesScreen',
    'Mental Health Support for Urban Fires and Building Emergencies': '/screens/Mental_Health_Support_for_Urban_Fires_and_Building_EmergenciesScreen',
    'Toxic Spills & Hazardous Materials': '/screens/Toxic_Spills_and_Hazardous_MaterialsScreen',
    'Health and Exposure Resources for Toxic Spills and Hazardous Materials': '/screens/Health_and_Exposure_Resources_for_Toxic_Spills_and_Hazardous_MaterialsScreen',
    'Safety Guidelines for Toxic Spills and Hazardous Materials': '/screens/Safety_Guidelines_for_Toxic_Spills_and_Hazardous_MaterialsScreen',
    'Mental Health Support for Toxic Spills and Hazardous Materials': '/screens/Mental_Health_Support_for_Toxic_Spills_and_Hazardous_MaterialsScreen',
    'Displacement Support': '/screens/Displacement_SupportScreen',
    'Cleanup Assistance': '/screens/Cleanup_AssistanceScreen',
    'Wildfires': '/screens/Wildfire_SupportScreen',
    'Wildfire Emergency Aid': '/screens/Wildfire_Emergency_AidScreen',
    'Wildfire Rebuilding Support': '/screens/Wildfires_RebuildingHelpScreen',
    'Wildfire Find Shelter': '/screens/Wildfire_Find_ShelterScreen',
    'Extreme Weather': '/screens/Extreme_WeatherScreen',
    'Extreme Weather Safety Tips': '/screens/Extreme_Weather_Safety_TipsScreen',
    'Extreme Weather Home Repair Help': '/screens/Extreme_Weather_Home_Repair_HelpScreen',
    'Extreme Weather Emotional Support': '/screens/Extreme_Weather_Emotional_SupportScreen',
    'Extreme Weather Find Shelter': '/screens/Extreme_Weather_Find_ShelterScreen',
    'AI Summary Assistant': '/screens/AI_Summary_AssistantScreen',
    'Community Pulse': '/screens/Community_PulseScreen',
    'Live Map': '/screens/Live_MapScreen',
    'Offer Resources': '/screens/Offer_ResourcesScreen',
    'Get Resources': '/screens/Get_ResourcesScreen',
    'Settings': '/screens/SettingsScreen',
    'SOS': '/screens/SOSScreen',
    'Permissions Setup': '/screens/Permissions_SetupScreen',
    'Resource Trade': '/screens/Resource_TradeScreen',
    'Welcome': '/screens/WelcomeScreen',
    'Profile': '/screens/ProfileScreen',
    'Find Shelter': '/screens/Find_ShelterScreen',
    'Privacy Policies': '/screens/Privacy_PoliciesScreen',
    'Privacy and Trust Policies': '/screens/Private_And_Trust_PoliciesScreen',
    'Custom Emergencies Dashboard': '/screens/Custom_Emergencies_DashboardScreen',
    'Dashboard': '/screens/DashboardScreen',
    'Urban Fires & Building Emergencies': '/screens/Urban_Fires_and_Building_EmergenciesScreen',
    'Home Repair Resources': '/screens/Home_Repair_ResourcesScreen',
  };

  const filteredMenu = Object.fromEntries(
    Object.entries(menuItems).map(([category, items]) => [
      category,
      items.filter((item) => item.toLowerCase().includes(searchText.toLowerCase())),
    ])
  );

  const toggleMenu = useCallback(() => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: -Dimensions.get('window').width,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => setMenuVisible(false), 0);
      });
    } else {
      setTimeout(() => {
        setMenuVisible(true);
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start();
      }, 0);
    }
  }, [menuVisible, slideAnim]);

  const toggleCategory = useCallback((category: string) => {
    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  }, []);

  const toggleSubcategory = useCallback((subcategory: string) => {
    setExpandedSubcategories((prev) => ({ ...prev, [subcategory]: !prev[subcategory] }));
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <TouchableOpacity
            onPress={() => {
            if (backRoute) {
              router.navigate(backRoute as any);
            } else {
              router.navigate('/screens/Custom_Emergencies_DashboardScreen' as any);
            }
            }}
            style={styles.headerLeftIcon}
        >
          <AntDesign name="arrowleft" size={40} color="#3A7CA5" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleUserProfilePress} style={styles.userProfileIcon}>
          <AntDesign name="user" size={35} color="#3A7CA5" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={toggleMenu} style={styles.headerRightIcon}>
          <AntDesign name="menufold" size={40} color="#3A7CA5" />
        </TouchableOpacity>
      </View>

      {menuVisible && (
        <Animated.View style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}>
          <View style={styles.sideMenuWrapper}>
            <View style={styles.menuContent}>
              <View style={styles.searchBarContainer}>
                <AntDesign name="search1" size={18} color="#0A4E78" style={styles.searchIcon} />
                <TextInput
                  placeholder="Search..."
                  value={searchText}
                  onChangeText={setSearchText}
                  style={styles.searchInput}
                  placeholderTextColor="#aaa"
                />
              </View>
              <ScrollView>
                {Object.entries(filteredMenu).map(([category, items]) => (
                  <View key={category}>
                    <TouchableOpacity onPress={() => toggleCategory(category)} style={styles.categoryHeader}>
                      <AntDesign
                        name={expandedCategories[category] ? 'down' : 'right'}
                        size={16}
                        color="#0A4E78"
                        style={{ marginRight: 6 }}
                      />
                      <Text style={styles.categoryTitle}>{category}</Text>
                    </TouchableOpacity>
                    {expandedCategories[category] &&
                      items.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            const path = menuRoutes[item];
                            if (path) {
                              router.navigate(path as any);
                              setTimeout(() => toggleMenu(), 0);
                            } else {
                              console.warn(`No route defined for: ${item}`);
                            }
                          }}
                        >
                          <Text style={styles.menuItem}>{item}</Text>
                        </TouchableOpacity>
                      ))}
                  </View>
                ))}
                
                {/* Special handling for General category with subcategories */}
                <View>
                  <TouchableOpacity onPress={() => toggleCategory('General')} style={styles.categoryHeader}>
                    <AntDesign
                      name={expandedCategories['General'] ? 'down' : 'right'}
                      size={16}
                      color="#0A4E78"
                      style={{ marginRight: 6 }}
                    />
                    <Text style={styles.categoryTitle}>General</Text>
                  </TouchableOpacity>
                  {expandedCategories['General'] && (
                    <View style={styles.subcategoryContainer}>
                      {Object.entries(generalSubcategories).map(([subcategory, items]) => (
                        <View key={subcategory}>
                          <TouchableOpacity 
                            onPress={() => toggleSubcategory(subcategory)} 
                            style={styles.subcategoryHeader}
                          >
                            <AntDesign
                              name={expandedSubcategories[subcategory] ? 'down' : 'right'}
                              size={14}
                              color="#0A4E78"
                              style={{ marginRight: 6 }}
                            />
                            <Text style={styles.subcategoryTitle}>{subcategory}</Text>
                          </TouchableOpacity>
                          {expandedSubcategories[subcategory] && (
                            <View style={styles.subcategoryItems}>
                              {items.map((item, index) => (
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => {
                                    const path = menuRoutes[item];
                                    if (path) {
                                      router.navigate(path as any);
                                      setTimeout(() => toggleMenu(), 0);
                                    } else {
                                      console.warn(`No route defined for: ${item}`);
                                    }
                                  }}
                                  style={styles.subcategoryItem}
                                >
                                  <Text style={styles.subcategoryMenuItem}>{item}</Text>
                                </TouchableOpacity>
                              ))}
                            </View>
                          )}
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </ScrollView>
            </View>

            <TouchableOpacity onPress={toggleMenu} style={styles.menuCloseArea} />
          </View>
        </Animated.View>
      )}

      {/* User Profile Modal */}
      <Modal
        visible={userModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setUserModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>User Profile</Text>
              <TouchableOpacity 
                onPress={() => setUserModalVisible(false)}
                style={styles.closeButton}
              >
                <AntDesign name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.userInfoContainer}>
              <AntDesign name="user" size={60} color="#0A4E78" style={styles.userIcon} />
              <Text style={styles.userName}>
                {user?.fullName || user?.firstName || 'User'}
              </Text>
              <Text style={styles.userEmail}>
                {user?.primaryEmailAddress?.emailAddress || 'No email available'}
              </Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.switchButton]}
                onPress={handleSwitchAccount}
              >
                <Text style={styles.modalButtonText}>Switch Account</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.signOutButton]}
                onPress={handleSignOut}
              >
                <Text style={styles.modalButtonText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
  },
  header: {
    height: 110,
    backgroundColor: '#0A4E78',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerLeftIcon: {
    bottom: -20,
  },
  headerRightIcon: {
    bottom: -20,
  },
  userProfileIcon: {
    bottom: -20,
  },
  sideMenu: {
    position: 'absolute',
    top: 108,
    bottom: 0,
    left: 0,
    width: Dimensions.get('window').width,  // Full screen width to allow closing on right side
    height: Dimensions.get('window').height - 108, // full height below header
    backgroundColor: 'transparent',
    zIndex: 1000,
  },
  sideMenuWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  menuContent: {
    width: sideMenuWidth,
    padding: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  menuCloseArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  menuItem: {
    fontSize: 15,
    marginVertical: 5,
    color: '#0A4E78',
    paddingLeft: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingLeft: 4,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A4E78',
  },
  subcategoryContainer: {
    marginLeft: 10,
  },
  subcategoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingLeft: 4,
  },
  subcategoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0A4E78',
  },
  subcategoryItems: {
    marginLeft: 10,
  },
  subcategoryItem: {
    marginVertical: 2,
  },
  subcategoryMenuItem: {
    fontSize: 13,
    marginVertical: 3,
    color: '#0A4E78',
    paddingLeft: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#f4f7fa',
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0A4E78',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A4E78',
  },
  closeButton: {
    padding: 5,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userIcon: {
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A4E78',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#555',
  },
  modalButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchButton: {
    backgroundColor: '#4CAF50',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  signOutButton: {
    backgroundColor: '#F44336',
    borderWidth: 1,
    borderColor: '#F44336',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
