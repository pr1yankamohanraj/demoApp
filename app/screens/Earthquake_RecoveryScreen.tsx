import { FontAwesome5, FontAwesome6, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HeaderWithMenu from './Header_with_MenuScreen';

type RootStackParamList = {
    Hurricanes_and_Tornados_Relief: undefined;
    WebViewScreen: { url: string };
    Find_Shelter_Hurricanes: undefined;
  };
  
type Props = {
    navigation: StackNavigationProp<RootStackParamList, 'Hurricanes_and_Tornados_Relief'>;
};

export default function Earthquake_RecoveryScreen() {
    return (
        <View style={styles.container}>
            <HeaderWithMenu backRoute="/screens/Custom_Emergencies_DashboardScreen" />
            <View style={styles.content}>
            <View style={styles.earthquakeIcon}> 
                <FontAwesome5
                    name= "house-damage"
                    size= {80}
                    color="#0A4E78"
                />
            </View>
            <Text style={styles.title}> Earthquakes  </Text>
            <Text style={styles.description1}> Quick access to shelter, aid, </Text>
            <Text style={styles.description2}> rebuilding support, safety tips, </Text>
            <Text style={styles.description3}> and emotional care after an earthquake.</Text>
                
                <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.navigate('/screens/FInd_Shelter_EarthquakeScreen')}
                >
                    <View style={styles.shelterIcon}> 
                        <FontAwesome6
                            name="person-shelter"
                                size= {45}
                            color="#0A4E78"
                        />
                    </View>
                    <Text style={styles.buttonText}>
                        Find Shelter
                    </Text>
                </TouchableOpacity>
                    
                <TouchableOpacity
                        style={styles.button}
                    onPress={() => router.navigate('/screens/Access_Aid_Programs_EarthquakesScreen')}
                >
                    <View style={styles.aidIcon}> 
                        <MaterialIcons
                            name="attach-money"
                                size= {45}
                            color="#0A4E78"
                        />
                    </View>
                        <Text style={styles.buttonText}>
                        Access Aid Programs
                    </Text>
                </TouchableOpacity>
                    
                <TouchableOpacity
                        style={styles.button}
                    onPress={() => router.navigate('/screens/Rebuilding_HelpScreen')}
                >
                    <View style={styles.rebuildingIcon}> 
                        <MaterialIcons
                            name="home-repair-service"
                                size= {45}
                            color="#0A4E78"
                        />
                    </View>
                        <Text style={styles.buttonText}>
                        Rebuilding Help
                    </Text>
                </TouchableOpacity>
                    
                <TouchableOpacity
                        style={styles.button}
                    onPress={() => router.navigate('/screens/Emotional_Support_After_an_EarthquakeScreen')}
                >
                    <View style={styles.emotionIcon}>  
                        <MaterialCommunityIcons
                            name="emoticon-excited-outline"
                                size= {45}
                            color="#0A4E78"
                        />
                    </View>
                        <Text style={styles.buttonText}>
                            Counseling & Emotional Support
                    </Text>
                </TouchableOpacity>
                    
                <TouchableOpacity
                        style={styles.button}
                    onPress={() => router.navigate('/screens/Aftershock_Safety_TipsScreen')}
                >
                    <View style={styles.aftershockIcon}> 
                        <Fontisto
                            name="pulse"
                                size= {45}
                            color="#0A4E78"
                        />
                    </View>
                        <Text style={styles.buttonText}>
                        Aftershock Safety Tips
                    </Text>
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
    title: {
        position:'absolute',
        letterSpacing: 1, 
        fontSize: 36,
        textAlign: 'center',
        top: 60,
        left:120,
        color: '#0A4E78',
        fontWeight: "bold",
    },
    description1: {
        position: 'absolute',
        fontSize: 20,
        top: 120,
        left:25,
        color: '#273E53',
        fontWeight: "400",
    },
    description2: {
        position: 'absolute',
        fontSize: 20,
        top: 160,
        left:25,
        color: '#273E53',
        fontWeight: "400",
    }, 
    description3: {
        position: 'absolute',
        fontSize: 20,
        top: 200,
        left:25,
        color: '#273E53',
        fontWeight: "400",
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#336B87',
        borderRadius: 8,
        paddingVertical: 18,
        paddingHorizontal: 20,
        marginBottom: 25,
        width: 355,
        height: 70,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#FFFFFF', 
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 15,
        flex: 1,
        textAlign: 'left',
        lineHeight: 22,
        alignSelf: 'center',
    },
    earthquakeIcon: {
        position: 'absolute',
        marginBottom: 635,
        left: 35,
    },
    icon: {
        position: 'absolute',
        marginBottom: 700,
        left: 40,
    },
    shelterIcon: {
        marginRight: 10,
    },
    aidIcon:{
        marginRight: 10,
    },
    rebuildingIcon: {
        marginRight: 10,
    },
    emotionIcon: {
        marginRight: 10,
    },
    aftershockIcon: {
        marginRight: 10,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40,
        backgroundColor: '#CBE9F3',
        paddingTop: 80,
    },
    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 200,
        paddingHorizontal: 20,
    },
  });