import { FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HeaderWithMenu from './Header_with_MenuScreen';

export default function Urban_Fires_and_Building_EmergenciesScreen() {
    return (
        <View style={styles.container}>
            <View style={{top: -330, left: 0, width: 405}}>
                        <HeaderWithMenu /> 
            </View>
            <View style={styles.fireIcon}> 
                <FontAwesome5
                    name= "fire-alt"
                    size= {80}
                    color="#0A4E78"
                />
            </View>
            <Text style={styles.title1}> Urban Fires &  </Text>
            <Text style={styles.title2}> Building </Text>
            <Text style={styles.title3}> Emergencies </Text>
            <Text style={styles.description1}> Support after urban fires and </Text>
            <Text style={styles.description2}> building emergencies—find shelter, </Text>
            <Text style={styles.description3}> aid, rebuilding help, counseling, </Text>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.navigate('/screens/Find_Shelter_Urban_Fires_and_Building_EmergenciesScreen')}
                >
                    <View style={styles.emergencyShelterIcon}> 
                        <MaterialIcons
                            name="emergency"
                            size= {30}
                            color="#0A4E78"
                        />
                    </View>
                    <Text style={styles.buttonText}>
                        Find Emergency Shelter
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button2}
                    onPress={() => router.navigate('/screens/Get_Recovery_Aid_for_Urban_Fires_and_Building_EmergenciesScreen')}
                >
                    <View style={styles.aidIcon}> 
                        <MaterialIcons
                            name="attach-money"
                            size= {40}
                            color="#0A4E78"
                        />
                    </View>
                    <Text style={styles.button2Text}>
                        Get Recovery Aid
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button3}
                    onPress={() => router.navigate('/screens/Rebuilding_and_Repairs_for_Urban_Fires_and_Building_Emergencies')}
                >
                    <View style={styles.rebuildingIcon}> 
                        <MaterialIcons
                            name="home-repair-service"
                            size= {30}
                            color="#0A4E78"
                        />
                    </View>
                    <Text style={styles.button3Text}>
                        Rebuilding & Repairs 
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button4}
                    onPress={() => router.navigate('/screens/Fire_Safety_Tips_Urban_FiresScreen')}
                >
                    <View style={styles.fireSafetyIcon}> 
                        <FontAwesome
                            name="fire-extinguisher"
                            size= {30}
                            color="#0A4E78"
                        />
                    </View>
                    <Text style={styles.button4Text}>
                        Fire Safety Tips
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button5}
                    onPress={() => router.navigate('/screens/Mental_Health_Support_for_Urban_Fires_and_Building_EmergenciesScreen')}
                >
                    <View style={styles.emotionIcon}> 
                        <MaterialCommunityIcons
                            name="emoticon-excited-outline"
                            size= {40}
                            color="#0A4E78"
                        />
                    </View>
                    <Text style={styles.button5Text}>
                        Mental Health Support
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
      justifyContent: 'center',
      paddingBottom: 105,
      backgroundColor: '#CBE9F3',
    },
    title1: {
        position:'absolute',
        letterSpacing: 1, 
        fontSize: 35,
        textAlign: 'center',
        top: 130,
        left: 115,
        color: '#0A4E78',
        fontWeight: "bold",
    },
    title2: {
        position:'absolute',
        letterSpacing: 1, 
        fontSize: 35,
        textAlign: 'center',
        top: 170,
        left:120,
        color: '#0A4E78',
        fontWeight: "bold",
    },
    title3: {
        position:'absolute',
        letterSpacing: 1, 
        fontSize: 35,
        textAlign: 'center',
        top: 210,
        left:120,
        color: '#0A4E78',
        fontWeight: "bold",
    },
    description1: {
        position: 'absolute',
        fontSize: 21,
        top: 260,
        left:25,
        color: '#273E53',
        fontWeight: "400",
    },
    description2: {
        position: 'absolute',
        fontSize: 21,
        top: 295,
        left:25,
        color: '#273E53',
        fontWeight: "400",
    }, 
    description3: {
        position: 'absolute',
        fontSize: 21,
        top: 330,
        left:25,
        color: '#273E53',
        fontWeight: "400",
    },
    icon: {
        position: 'absolute',
        marginBottom: 700,
        left: 40,
    },
    button: {
        position: 'absolute',
        left: -170,
        borderRadius:8,
        backgroundColor: '#336B87',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: -60, 
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
        marginTop: 40, 
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
        marginLeft: 115,
        bottom: 6, 
        transform: [{ translateY: 11 }],
        fontSize: 23,
        fontFamily: 'Inter_500Medium',
        width: 300,
        height:50,
    },
    button3: {
        position: 'absolute',
        left: -170,
        marginTop: 140, 
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
        marginLeft: 20,
        bottom: 6, 
        transform: [{ translateY: -12 }],
        fontSize: 23,
        fontFamily: 'Inter_500Medium',
    },
    button4: {
        position: 'absolute',
        left: -170,
        marginTop: 240, 
        borderRadius:8,
        backgroundColor: '#336B87',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    button4Text: {
        color: '#FFFFFF', 
        textAlign: 'center',
        left: -15, 
        transform: [{ translateY: 11 }],
        fontSize: 23,
        fontFamily: 'Inter_500Medium',
        width: 300,
        height:50,
    },
    button5: {
        position: 'absolute',
        left: -170,
        marginTop: 340, 
        borderRadius:8,
        backgroundColor: '#336B87',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    button5Text: {
        color: '#FFFFFF', 
        textAlign: 'center',
        left: 21, 
        transform: [{ translateY: 11 }],
        fontSize: 23,
        fontFamily: 'Inter_500Medium',
        width: 300,
        height:50,
    },
    fireIcon: {
        position: 'absolute',
        marginBottom: 535,
        left: 35,
    },
    emergencyShelterIcon: {
        position: 'absolute',
        left:25,
    },
    rebuildingIcon: {
        position: 'absolute',
        left:25,
    },
    emotionIcon: {
        position: 'absolute',
        left:20,
    },
    fireSafetyIcon: {
        position: 'absolute',
        left:30,
    },
    aidIcon:{
        position: 'absolute',
        left:23,
    },
  });