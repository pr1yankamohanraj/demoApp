import { FontAwesome5, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HeaderWithMenu from './Header_with_MenuScreen';

export default function Wildifire_SupportScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <HeaderWithMenu backRoute="/screens/Custom_Emergencies_DashboardScreen" /> 
            </View>
            
            <View style={styles.content}>
                <View style={styles.fireIcon}> 
                    <FontAwesome6
                        name="fire"
                        size={80}
                        color="#0A4E78"
                    />
                </View>
                
                <Text style={styles.title}>Wildfires</Text>
                <Text style={styles.description1}>Quick access to shelter, aid programs,</Text>
                <Text style={styles.description2}>and rebuilding help after wildfires.</Text>
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.navigate('/screens/Wildfire_Find_ShelterScreen')}
                    >
                        <View style={styles.buttonContent}>
                            <FontAwesome6
                                name="person-shelter"
                                size={40}
                                color="#0A4E78"
                            />
                            <Text style={styles.buttonText}>Find Shelter</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.navigate('/screens/Wildfire_Emergency_AidScreen')}
                    >
                        <View style={styles.buttonContent}>
                            <MaterialIcons
                                name="emergency"
                                size={40}
                                color="#0A4E78"
                            />
                            <Text style={styles.buttonText}>Emergency Aid</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.navigate('/screens/Wildfires_RebuildingHelpScreen')}
                    >
                        <View style={styles.buttonContent}>
                            <FontAwesome5
                                name="tools"
                                size={30}
                                color="#0A4E78"
                            />
                            <Text style={styles.buttonText}>Rebuilding Support</Text>
                        </View>
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
    headerWrapper: {
        width: '100%',
        marginBottom: 10,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    fireIcon: {
        marginBottom: 30,
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#0A4E78',
        textAlign: 'center',
        marginBottom: 20,
        letterSpacing: 1,
    },
    description1: {
        fontSize: 21,
        color: '#273E53',
        textAlign: 'center',
        marginBottom: 5,
    },
    description2: {
        fontSize: 21,
        color: '#273E53',
        textAlign: 'center',
        marginBottom: 50,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#336B87',
        borderRadius: 12,
        paddingVertical: 20,
        paddingHorizontal: 30,
        width: '100%',
        maxWidth: 340,
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 23,
        fontWeight: '600',
        marginLeft: 20,
        flex: 1,
    },
});