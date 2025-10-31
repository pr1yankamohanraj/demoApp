import { FontAwesome6, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HeaderWithMenu from './Header_with_MenuScreen';

export default function Flood_RecoveryScreen() {
    return (
        <View style={styles.container}>
            <HeaderWithMenu backRoute="/screens/Custom_Emergencies_DashboardScreen" />
            <View style={styles.content}>
                <View style={styles.floodIcon}> 
                    <MaterialIcons
                        name= "flood"
                        size= {80}
                        color="#0A4E78"
                    />
                </View>
                <Text style={styles.title}> Floods </Text>
                <Text style={styles.description1}> Recover from flooding with quick </Text>
                <Text style={styles.description2}> access to shelter, financial aid, </Text>
                <Text style={styles.description3}> cleanup assistance, repair help, and </Text>
                <Text style={styles.description4}> emotional support. </Text>
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.navigate('/screens/Find_ShelterScreen')}
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
                        onPress={() => router.navigate('/screens/Apply_for_Flood_Recovery_AidScreen')}
                    >
                        <View style={styles.aidIcon}> 
                            <FontAwesome6
                                name="money-bill-1-wave"
                                size= {30}
                                color="#0A4E78"
                            />
                        </View>
                        <Text style={styles.button2Text}>
                            Apply for Aid 
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.button3}
                        onPress={() => router.navigate('/screens/Home_Repair_ResourcesScreen')}
                    >
                        <View style={styles.homeIcon}> 
                            <FontAwesome6
                                name="house-circle-exclamation"
                                size= {30}
                                color="#0A4E78"
                            />
                        </View>
                        <Text style={styles.button3Text}>
                            Home Repair Resources 
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.button4}
                        onPress={() => router.navigate('/screens/Mental_Health_and_Emotional_SupportScreen')}
                    >
                        <View style={styles.emotionIcon}> 
                            <MaterialCommunityIcons
                                name="emoticon-excited-outline"
                                size= {40}
                                color="#0A4E78"
                            />
                        </View>
                        <Text style={styles.button4Text}>
                            Mental Health Support
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
    floodIcon: {
        position: 'absolute',
        marginBottom: 600,
        left: 20,
    },
    title: {
        position:'absolute',
        letterSpacing: 1, 
        fontSize: 35,
        textAlign: 'center',
        top: 65,
        left: 100,
        color: '#0A4E78',
        fontWeight: "bold",
    },
    description1: {
        position: 'absolute',
        fontSize: 21,
        top: 135,
        left:25,
        color: '#273E53',
        fontWeight: "400",
    },
    description2: {
        position: 'absolute',
        fontSize: 21,
        top: 170,
        left:25,
        color: '#273E53',
        fontWeight: "400",
    },
    description3: {
        position: 'absolute',
        fontSize: 21,
        top: 205,
        left:25,
        color: '#273E53',
        fontWeight: "400",
    },
    description4: {
        position: 'absolute',
        fontSize: 21,
        top: 240,
        left:25,
        color: '#273E53',
        fontWeight: "400",
    },
    button: {
        position: 'absolute',
        left: -170,
        marginTop: -25, 
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
        marginTop: 95, 
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
        marginTop: 215, 
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
        marginLeft: 50,
        bottom: 6, 
        transform: [{ translateY: -12 }],
        fontSize: 23,
        fontFamily: 'Inter_500Medium',
    },
    button4: {
        position: 'absolute',
        left: -170,
        marginTop: 335, 
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
        color: '#FFFFFF', 
        textAlign: 'center',
        left: 17, 
        transform: [{ translateY: 11 }],
        fontSize: 23,
        fontFamily: 'Inter_500Medium',
        width: 300,
        height:50,
    },
    houseIcon: {
        position: 'absolute',
        left:20,
    },
    aidIcon:{
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