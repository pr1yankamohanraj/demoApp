import { FontAwesome6, Foundation, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HeaderWithMenu from './Header_with_MenuScreen';

export default function Toxic_Spills_and_Hazardous_MaterialsScreen() {
    return (
        <View style={styles.container}>
            <View style={{top: -340, left: 0, width: 405}}>
                          <HeaderWithMenu backRoute="/screens/Custom_Emergencies_DashboardScreen" /> 
            </View>
            <View style={styles.hazardIcon}> 
                <MaterialCommunityIcons
                    name= "hazard-lights"
                    size= {80}
                    color="#0A4E78"
                />
            </View>
            <Text style={styles.title1}> Toxic Spills &  </Text>
            <Text style={styles.title2}> Hazardous  </Text> 
            <Text style={styles.title3}> Materials </Text>
            <Text style={styles.description1}> Access cleanup assistance, health  </Text>
            <Text style={styles.description2}> guidance, safety tips, and displacement  </Text>
            <Text style={styles.description3}> support for toxic spills and </Text>
            <Text style={styles.description4}> hazardous material exposure. </Text>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.navigate('/screens/Cleanup_AssistanceScreen')}
                >
                    <View style={styles.cleanupAssistanceIcon}> 
                        <MaterialIcons
                            name="cleaning-services"
                            size= {30}
                            color="#0A4E78"
                        />
                    </View>
                    <Text style={styles.buttonText}>
                        Cleanup Assistance
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button2}
                    onPress={() => router.navigate('/screens/Health_and_Exposure_Resources_for_Toxic_Spills_and_Hazardous_MaterialsScreen')}
                >
                    <View style={styles.healthIcon}> 
                        <MaterialIcons
                            name="health-and-safety"
                            size= {30}
                            color="#0A4E78"
                        />
                    </View>
                    <Text style={styles.button2Text1}>
                        Health & Exposure 
                    </Text>
                    <Text style={styles.button2Text2}>
                        Resources
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button3}
                    onPress={() => router.navigate('/screens/Safety_Guidelines_for_Toxic_Spills_and_Hazardous_MaterialsScreen')}
                >
                    <View style={styles.safetyGuidelinesIcon}> 
                        <Foundation
                            name="safety-cone"
                            size= {30}
                            color="#0A4E78"
                        />
                    </View>
                    <Text style={styles.button3Text}>
                        Safety Guidelines 
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button4}
                    onPress={() => router.navigate('/screens/Displacement_SupportScreen')}
                >
                    <View style={styles.displacementIcon}> 
                        <FontAwesome6
                            name="house-flag"
                            size= {30}
                            color="#0A4E78"
                        />
                    </View>
                    <Text style={styles.button4Text}>
                        Displacement Support
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button5}
                    onPress={() => router.navigate('/screens/Mental_Health_Support_for_Toxic_Spills_and_Hazardous_MaterialsScreen')}
                >
   ©                  <View style={styles.emotionIcon}> 
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
        top: 115,
        left: 120,
        color: '#0A4E78',
        fontWeight: "bold",
    },
    title2: {
        position:'absolute',
        letterSpacing: 1, 
        fontSize: 35,
        textAlign: 'center',
        top: 155,
        left:120,
        color: '#0A4E78',
        fontWeight: "bold",
    },
    title3: {
        position:'absolute',
        letterSpacing: 1, 
        fontSize: 35,
        textAlign: 'center',
        top: 195,
        left:125,
        color: '#0A4E78',
        fontWeight: "bold",
    },
    description1: {
        position: 'absolute',
        fontSize: 21,
        top: 250,
        left:20,
        color: '#273E53',
        fontWeight: "400",
    },
    description2: {
        position: 'absolute',
        fontSize: 21,
        top: 282,
        left:20,
        color: '#273E53',
        fontWeight: "400",
    }, 
    description3: {
        position: 'absolute',
        fontSize: 21,
        top: 315,
        left:20,
        color: '#273E53',
        fontWeight: "400",
    },
    description4: {
        position: 'absolute',
        fontSize: 21,
        top: 350,
        left:20,
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
        marginTop: -30, 
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
        marginTop: 60, 
        borderRadius:8,
        backgroundColor: '#336B87',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: 340,
        height:70,
    },
    button2Text1: {
        position: 'absolute',
        color: '#FFFFFF', 
        textAlign: 'left',
        marginLeft: 120,
        bottom: 6, 
        transform: [{ translateY: -6 }],
        fontSize: 23,
        fontFamily: 'Inter_500Medium',
        width: 300,
        height:50,
    },
    button2Text2: {
        position: 'absolute',
        color: '#FFFFFF', 
        textAlign: 'left',
        marginLeft: 120,
        bottom: 6, 
        transform: [{ translateY: 21 }],
        fontSize: 23,
        fontFamily: 'Inter_500Medium',
        width: 300,
        height:50,
    },
    button3: {
        position: 'absolute',
        left: -170,
        marginTop: 150, 
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
        marginLeft: -5,
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
        left: 21, 
        transform: [{ translateY: 11 }],
        fontSize: 23,
        fontFamily: 'Inter_500Medium',
        width: 300,
        height:50,
    },
    button5: {
        position: 'absolute',
        left: -170,
        marginTop: 330, 
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
    cleanupAssistanceIcon: {
        position: 'absolute',
        left:20,
    },
    healthIcon: {
        position: 'absolute',
        left:20,
    },
    safetyGuidelinesIcon: {
        position: 'absolute',
        left:20,
    },
    displacementIcon: {
        position: 'absolute',
        left:20,
    },
    hazardIcon: {
        position: 'absolute',
        marginBottom: 535,
        left: 35,
    },
    emotionIcon: {
        position: 'absolute',
        left:20,
    },
  });