import { FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
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

export default function Hurricanes_and_Tornados_ReliefScreen({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <HeaderWithMenu backRoute="/screens/Custom_Emergencies_DashboardScreen" />
            <View style={styles.content}>
            <View style={styles.lightningIcon}> 
                <MaterialCommunityIcons
                    name= "lightning-bolt-circle"
                    size= {80}
                    color="#0A4E78"
                />
            </View>
                <Text style={styles.title}> Hurricanes &    Tornados </Text>
            <Text style={styles.description1}> Quick access to shelter, aid programs, </Text>
            <Text style={styles.description2}> rebuilding help, and emotional support </Text>
            <Text style={styles.description3}> after hurricanes or tornadoes. </Text>
                
                <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.navigate('/screens/Find_Shelter_HurricanesScreen')}
                >
                    <View style={styles.treeIcon}> 
                        <FontAwesome
                            name="tree"
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
                    onPress={() => router.navigate('/screens/Get_Aid_HurricanesScreen')}
                >
                    <View style={styles.aidIcon}> 
                        <MaterialIcons
                            name="attach-money"
                                size= {45}
                            color="#0A4E78"
                        />
                    </View>
                        <Text style={styles.buttonText}>
                        Get Aid 
                    </Text>
                </TouchableOpacity>
                    
                <TouchableOpacity
                        style={styles.button}
                    onPress={() => router.navigate('/screens/Rebuilding_After_Hurricanes_and_TornadosScreen')}
                >
                    <View style={styles.supportIcon}> 
                        <FontAwesome5
                            name="user-friends"
                                size= {45}
                            color="#0A4E78"
                        />
                    </View>
                        <Text style={styles.buttonText}>
                        Rebuilding Support 
                    </Text>
                </TouchableOpacity>
                    
                <TouchableOpacity
                        style={styles.button}
                    onPress={() => router.navigate('/screens/Emotional_Support_for_Hurricanes_and_TornadosScreen')}
                >
                    <View style={styles.emotionIcon}> 
                        <MaterialIcons
                            name="emoji-emotions"
                                size= {45}
                            color="#0A4E78"
                        />
                    </View>
                        <Text style={styles.buttonText}>
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
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40,
        backgroundColor: '#CBE9F3',
        paddingTop: 80,
    },
    lightningIcon: {
        position: 'absolute',
        marginBottom: 635,
        left: 35,
    },
    title: {
        position:'absolute',
        letterSpacing: 1, 
        fontSize: 36,
        textAlign: 'left',
        top: 30,
        left: 120,
        color: '#0A4E78',
        fontWeight: "bold",
    },
    description1: {
        position: 'absolute',
        fontSize: 20,
        top: 135,
        left: 25,
        color: '#273E53',
        fontWeight: "400",
    },
    description2: {
        position: 'absolute',
        fontSize: 20,
        top: 175,
        left: 25,
        color: '#273E53',
        fontWeight: "400",
    }, 
    description3: {
        position: 'absolute',
        fontSize: 20,
        top: 215,
        left: 25,
        color: '#273E53',
        fontWeight: "400",
    },
    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 200,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#336B87',
        borderRadius: 8,
        paddingVertical: 18,
        paddingHorizontal: 20,
        marginBottom: 50,
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
    treeIcon: {
        marginRight: 10,
    },
    aidIcon:{
        marginRight: 10,
    },
    supportIcon: {
        marginRight: 10,
    },
    emotionIcon: {
        marginRight: 10,
    },
  });

