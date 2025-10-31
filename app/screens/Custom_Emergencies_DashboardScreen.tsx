import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HeaderWithMenu from './Header_with_MenuScreen';

export default function Custom_Emergencies_DashboardScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <HeaderWithMenu backRoute="/screens/DashboardScreen" /> 
            </View>
            
            <View style={styles.content}>
            <View style={styles.emergencyIcon}>
              <MaterialCommunityIcons
                name="car-emergency"
                        size={80}
                color="#0A4E78"
              />
            </View>
                
                <Text style={styles.title1}>Custom</Text>
                <Text style={styles.title2}>Emergencies</Text>
                <Text style={styles.title3}>Dashboard</Text>
                
                <Text style={styles.description1}>Select the types of disasters you want</Text>
                <Text style={styles.description2}>help with and instantly get shelter,</Text>
                <Text style={styles.description3}>info, aid programs and recovery tools</Text>
                <Text style={styles.description4}>tailored to your situation.</Text>
                
                <View style={styles.buttonContainer}>
                                 <TouchableOpacity
                                   style={styles.button}
                                   onPress={() => router.navigate('/screens/Earthquake_RecoveryScreen')}
                                 >
                        <Text style={styles.buttonText}>Earthquakes</Text>
                                 </TouchableOpacity>
                    
                                 <TouchableOpacity
                        style={styles.button}
                                   onPress={() => router.navigate('/screens/Hurricanes_and_Tornados_ReliefScreen')}
                                 >
                        <Text style={styles.buttonText}>Hurricanes & Tornadoes</Text>
                                 </TouchableOpacity>
                    
                                 <TouchableOpacity
                        style={styles.button}
                                   onPress={() => router.navigate('/screens/Flood_RecoveryScreen')}
                                 >
                        <Text style={styles.buttonText}>Floods</Text>
                                 </TouchableOpacity>
                    
                                 <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.navigate('/screens/Wildfire_SupportScreen')}
                                 >
                        <Text style={styles.buttonText}>Wildfires</Text>
                                 </TouchableOpacity>
                    
                                 <TouchableOpacity
                        style={styles.button}
                                   onPress={() => router.navigate('/screens/Toxic_Spills_and_Hazardous_MaterialsScreen')}
                                 >
                        <Text style={styles.buttonText}>Toxic Spills & Hazardous Materials</Text>
                                 </TouchableOpacity>
                    
                                 <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.navigate('/screens/Extreme_WeatherScreen')}
                                 >
                        <Text style={styles.buttonText}>Extreme Weather</Text>
                                 </TouchableOpacity>
                    
                                 <TouchableOpacity
                        style={styles.button}
                                   onPress={() => router.navigate('/screens/Urban_Fires_and_Building_EmergenciesScreen')}
                                 >
                        <Text style={styles.buttonText}>Urban Fires & Building Emergencies</Text>
                                 </TouchableOpacity>
                </View>
            </View>
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
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  emergencyIcon: {
    position: 'absolute',
    top: 120,
    alignSelf: 'center',
  },
  title1: {
    position: 'absolute',
    top: 210,
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0A4E78',
      textAlign: 'center',
  },
  title2: {
    position: 'absolute',
    top: 245,
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0A4E78',
      textAlign: 'center',
  },
  title3: {
    position: 'absolute',
    top: 280,
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0A4E78',
      textAlign: 'center',
  },
  description1: {
      position: 'absolute',
    top: 320,
    alignSelf: 'center',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  description2: {
      position: 'absolute',
    top: 345,
    alignSelf: 'center',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  }, 
  description3: {
      position: 'absolute',
    top: 370,
    alignSelf: 'center',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  description4: {
    position: 'absolute',
    top: 395,
    alignSelf: 'center',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    position: 'absolute',
    top: 430,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
},
  button: {
    backgroundColor: '#0A4E78',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
      alignItems: 'center',
    height: 50,
  },
  buttonText: {
      color: '#FFFFFF', 
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});