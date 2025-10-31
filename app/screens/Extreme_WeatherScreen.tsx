import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
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

export default function Extreme_WeatherScreen() {
    return (
        <View style={styles.container}>
            <HeaderWithMenu backRoute="/screens/Custom_Emergencies_DashboardScreen" />
            <View style={styles.content}>
                <View style={styles.weatherIcon}> 
                    <MaterialCommunityIcons
                        name= "weather-lightning-rainy"
                        size= {80}
                        color="#0A4E78"
                    />
                </View>
                
                <Text style={styles.title}> Extreme Weather </Text>
                
                <Text style={styles.description1}> Find shelter, emergency supplies, safety </Text>
                <Text style={styles.description2}> tips, and recovery help after storms, </Text>
                <Text style={styles.description3}> heatwaves, or freezing weather. </Text>
                
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.navigate('/screens/Extreme_Weather_Find_ShelterScreen')}
                    >
                        <View style={styles.houseIcon}> 
                            <FontAwesome6
                                name="house"
                                size= {30}
                                color="#0A4E78"
                            />
                        </View>
                        <Text style={styles.buttonText}>
                            Find Shelter 
                        </Text>
                    </TouchableOpacity>
                </View>
                    
                <View>
                    <TouchableOpacity
                        style={styles.button2}
                        onPress={() => router.navigate('/screens/Extreme_Weather_Safety_TipsScreen')}
                    >
                        <View style={styles.extremeWeatherIcon}> 
                            <MaterialCommunityIcons
                                name="weather-snowy-heavy"
                                size= {40}
                                color="#0A4E78"
                            />
                        </View>
                        <Text style={styles.button2Text}>
                            Safety Tips
                        </Text>
                    </TouchableOpacity>
                </View>
                    
                <View>
                    <TouchableOpacity
                        style={styles.button3}
                        onPress={() => router.navigate('/screens/Extreme_Weather_Home_Repair_HelpScreen')}
                    >
                        <View style={styles.homeIcon}> 
                            <FontAwesome6
                                name="house-circle-exclamation"
                                size= {30}
                                color="#0A4E78"
                            />
                        </View>
                        <Text style={styles.button3Text}>
                            Home Repair Help 
                        </Text>
                    </TouchableOpacity>
                </View>
                    
                <View>
                    <TouchableOpacity
                        style={styles.button4}
                        onPress={() => router.navigate('/screens/Extreme_Weather_Emotional_SupportScreen')}
                    >
                        <View style={styles.emotionIcon}> 
                            <MaterialCommunityIcons
                                name="emoticon-happy-outline"
                                size= {40}
                                color="#0A4E78"
                            />
                        </View>
                        <Text style={styles.button4Text}>
                            Emotional Support
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
    weatherIcon: {
        position: 'absolute',
        marginBottom: 600,
        left: 20,
    },
    title: {
        position:'absolute',
        letterSpacing: 1, 
        fontSize: 32,
        textAlign: 'center',
        top: 65,
        left: 100,
        color: '#0A4E78',
        fontWeight: "bold",
    },
    description1: {
        position: 'absolute',
        fontSize: 20,
        top: 135,
        left:20,
        color: '#273E53',
        fontWeight: "400",
    },
    description2: {
        position: 'absolute',
        fontSize: 20,
        top: 170,
        left:20,
        color: '#273E53',
        fontWeight: "400",
    },
    description3: {
        position: 'absolute',
        fontSize: 20,
        top: 205,
        left:20,
        color: '#273E53',
        fontWeight: "400",
    },
    button: {
        position: 'absolute',
        left: -170,
        marginTop: -65, 
        borderRadius:8,
        backgroundColor: '#336B87',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: 340,
        height:70,
    },
    buttonText: {
        position: 'absolute',
        color: '#FFFFFF', 
        textAlign: 'left', 
        marginLeft: 120,
        bottom: 6,
        transform: [{ translateY: 10 }],
        fontSize: 23,
        fontFamily: 'Inter_500Medium',
        width: 300,
        height:50,
    },
    button2: {
        position: 'absolute',
        left: -170,
        marginTop: 65, 
        borderRadius:8,
        backgroundColor: '#336B87',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: 340,
        height:70,
    },
    button2Text: {
        position: 'absolute',
        color: '#FFFFFF', 
        textAlign: 'left',
        marginLeft: 120,
        bottom: 6, 
        transform: [{ translateY: 8 }],
        fontSize: 23,
        fontFamily: 'Inter_500Medium',
        width: 300,
        height:50,
    },
    button3: {
        position: 'absolute',
        left: -170,
        marginTop: 195, 
        borderRadius:8,
        backgroundColor: '#336B87',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: 340,
        height:70,
    },
    button3Text: {
        position: 'absolute',
        color: '#FFFFFF', 
        textAlign: 'left',
        marginLeft: 120,
        bottom: 6, 
        transform: [{ translateY: 8 }],
        fontSize: 23,
        fontFamily: 'Inter_500Medium',
        width: 300,
        height:50,
    },
    button4: {
        position: 'absolute',
        left: -170,
        marginTop: 325, 
        borderRadius:8,
        backgroundColor: '#336B87',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: 340,
        height:70,
    },
    button4Text: {
        position: 'absolute',
        color: '#FFFFFF', 
        textAlign: 'left',
        marginLeft: 120,
        bottom: 6, 
        transform: [{ translateY: 8 }],
        fontSize: 23,
        fontFamily: 'Inter_500Medium',
        width: 300,
        height:50,
    },
    houseIcon: {
        position: 'absolute',
        left:20,
    },
    extremeWeatherIcon: {
        position: 'absolute',
        left:22,
    },
    homeIcon: {
        position: 'absolute',
        left:20,
    },
    emotionIcon: {
        position: 'absolute',
        left:20,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 105,
        backgroundColor: '#CBE9F3',
    },
  });