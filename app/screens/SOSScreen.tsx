import { AntDesign, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Linking, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HeaderWithMenu from './Header_with_MenuScreen';

export default function SOSScreen() {
    const [safetyCheckModalVisible, setSafetyCheckModalVisible] = useState(false);
    const [emergencyKitModalVisible, setEmergencyKitModalVisible] = useState(false);
    const [safetyGuidelinesModalVisible, setSafetyGuidelinesModalVisible] = useState(false);

    const handleSafetyCheckIn = () => {
        setSafetyCheckModalVisible(true);
    };

    const sendSafetyCheck = () => {
        setSafetyCheckModalVisible(false);
        Alert.alert(
            'Safety Check Sent',
            'Your safety status has been shared with your emergency contacts.',
            [{ text: 'OK' }]
        );
    };

    const handleEmergencyKit = () => {
        setEmergencyKitModalVisible(true);
    };

    const handleSafetyGuidelines = () => {
        setSafetyGuidelinesModalVisible(true);
    };

    const emergencyKitItems = [
        'First Aid Kit',
        'Flashlight & Batteries',
        'Water (1 gallon per person)',
        'Non-perishable Food',
        'Phone Charger',
        'Important Documents',
        'Cash',
        'Medications',
        'Emergency Blanket',
        'Multi-tool'
    ];

    const safetyGuidelines = [
        'Stay calm and assess the situation',
        'Call 911 for life-threatening emergencies',
        'Know your exact location',
        'Follow evacuation orders immediately',
        'Have a family emergency plan',
        'Keep emergency contacts updated',
        'Stay informed with local news',
        'Avoid dangerous areas',
        'Help others if it\'s safe to do so',
        'Document damage for insurance'
    ];

    return (
        <View style={styles.container}>
            <HeaderWithMenu backRoute="/screens/DashboardScreen" />
            <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
            <View style={styles.SOSIcon}> 
                <Feather
                    name="alert-circle"
                            size={80}
                    color="#0A4E78"
                />
            </View>
                    
                    <Text style={styles.title}>SOS</Text>
                    <Text style={styles.description}>One tap access to emergency help and location sharing.</Text>
                    
                    <View style={styles.emergencySection}>
              <TouchableOpacity
                            style={styles.sosButton}
                            onPress={() => {
                                Alert.alert(
                                    'Emergency SOS',
                                    'Are you sure you want to send an SOS? This will call emergency services.',
                                    [
                                        { text: 'Cancel', style: 'cancel' },
                                        { text: 'Call 911', onPress: () => Linking.openURL('tel:911') }
                                    ]
                                );
                            }}
              >
                            <Feather name="phone" size={24} color="#FFFFFF" />
                            <Text style={styles.sosButtonText}>Send SOS</Text>
              </TouchableOpacity>
            </View>

                    <View style={styles.quickActionsSection}>
                        <Text style={styles.sectionTitle}>Safety Features</Text>
                        
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={handleSafetyCheckIn}
                        >
                            <View style={styles.actionIcon}> 
                                <Ionicons name="checkmark-circle" size={24} color="#0A4E78" />
                            </View>
                            <View style={styles.actionTextContainer}>
                                <Text style={styles.actionButtonText}>Safety Check-In</Text>
                                <Text style={styles.actionDescription}>Let contacts know you're safe</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#666" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={handleEmergencyKit}
                        >
                            <View style={styles.actionIcon}> 
                                <MaterialIcons name="emergency" size={24} color="#0A4E78" />
                            </View>
                            <View style={styles.actionTextContainer}>
                                <Text style={styles.actionButtonText}>Emergency Kit</Text>
                                <Text style={styles.actionDescription}>Check your emergency supplies</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#666" />
                        </TouchableOpacity>

              <TouchableOpacity
                            style={styles.actionButton}
                            onPress={handleSafetyGuidelines}
                        >
                            <View style={styles.actionIcon}> 
                                <Ionicons name="shield-checkmark" size={24} color="#0A4E78" />
                            </View>
                            <View style={styles.actionTextContainer}>
                                <Text style={styles.actionButtonText}>Safety Guidelines</Text>
                                <Text style={styles.actionDescription}>Get safety tips and advice</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.emergencyTipsSection}>
                        <Text style={styles.sectionTitle}>Emergency Tips</Text>
                        
                        <View style={styles.tipCard}>
                            <View style={styles.tipIcon}>
                                <AntDesign name="Safety" size={20} color="#0A4E78" />
                            </View>
                            <Text style={styles.tipText}>Stay calm and assess the situation before acting</Text>
                        </View>
                        
                        <View style={styles.tipCard}>
                            <View style={styles.tipIcon}>
                                <MaterialIcons name="location-on" size={20} color="#0A4E78" />
                            </View>
                            <Text style={styles.tipText}>Know your exact location for emergency responders</Text>
                        </View>
                        
                        <View style={styles.tipCard}>
                            <View style={styles.tipIcon}>
                                <Ionicons name="call" size={20} color="#0A4E78" />
                            </View>
                            <Text style={styles.tipText}>Call emergency services immediately for life-threatening situations</Text>
                        </View>
                    </View>

                    <View style={styles.emergencyNumbersSection}>
                        <Text style={styles.sectionTitle}>Emergency Numbers</Text>
                        
                        <TouchableOpacity style={styles.numberButton} onPress={() => Linking.openURL('tel:311')}>
                            <Text style={styles.numberText}>311 - Non-Emergency Services</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.numberButton} onPress={() => Linking.openURL('tel:211')}>
                            <Text style={styles.numberText}>211 - Community Services</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.numberButton} onPress={() => Linking.openURL('tel:511')}>
                            <Text style={styles.numberText}>511 - Traffic Information</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Safety Check-In Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={safetyCheckModalVisible}
                onRequestClose={() => setSafetyCheckModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Safety Check-In</Text>
                        <Text style={styles.modalDescription}>
                            Send a message to your emergency contacts letting them know you're safe.
                </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setSafetyCheckModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={sendSafetyCheck}
                            >
                                <Text style={styles.confirmButtonText}>Send Check-In</Text>
              </TouchableOpacity>
            </View>
                    </View>
                </View>
            </Modal>

            {/* Emergency Kit Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={emergencyKitModalVisible}
                onRequestClose={() => setEmergencyKitModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Emergency Kit Checklist</Text>
                        <ScrollView style={styles.checklistContainer}>
                            {emergencyKitItems.map((item, index) => (
                                <View key={index} style={styles.checklistItem}>
                                    <TouchableOpacity style={styles.checkbox}>
                                        <Ionicons name="square-outline" size={20} color="#0A4E78" />
                                    </TouchableOpacity>
                                    <Text style={styles.checklistText}>{item}</Text>
                                </View>
                            ))}
                        </ScrollView>
              <TouchableOpacity
                            style={[styles.modalButton, styles.confirmButton]}
                            onPress={() => setEmergencyKitModalVisible(false)}
              >
                            <Text style={styles.confirmButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Safety Guidelines Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={safetyGuidelinesModalVisible}
                onRequestClose={() => setSafetyGuidelinesModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Safety Guidelines</Text>
                        <ScrollView style={styles.guidelinesContainer}>
                            {safetyGuidelines.map((guideline, index) => (
                                <View key={index} style={styles.guidelineItem}>
                                    <Text style={styles.guidelineNumber}>{index + 1}.</Text>
                                    <Text style={styles.guidelineText}>{guideline}</Text>
                                </View>
                            ))}
                        </ScrollView>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.confirmButton]}
                            onPress={() => setSafetyGuidelinesModalVisible(false)}
                        >
                            <Text style={styles.confirmButtonText}>Close</Text>
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
    scrollContent: {
        flex: 1,
    },
    content: {
        paddingTop: 40,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    SOSIcon: {
        alignSelf: 'center',
        marginBottom: 6,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#0A4E78',
        textAlign: 'center',
        marginBottom: 6,
        letterSpacing: 1,
    },
    description: {
        fontSize: 16,
        color: '#273E53',
        textAlign: 'center',
        marginBottom: 15,
        lineHeight: 20,
    },
    emergencySection: {
        marginBottom: 30,
    },
    sosButton: {
        backgroundColor: '#B55A5A',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sosButtonText: {
        color: '#FFFFFF', 
        fontSize: 22,
        fontWeight: '600',
        marginLeft: 8,
    },
    quickActionsSection: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0A4E78',
        marginBottom: 8,
        textAlign: 'center', 
    },
    actionButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    actionIcon: {
        marginRight: 12,
    },
    actionTextContainer: {
        flex: 1,
    },
    actionButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0A4E78',
        marginBottom: 2,
    },
    actionDescription: {
        fontSize: 12,
        color: '#666',
    },
    emergencyTipsSection: {
        marginBottom: 15,
    },
    tipCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    tipIcon: {
        marginRight: 12,
    },
    tipText: {
        flex: 1,
        fontSize: 13,
        color: '#273E53',
        lineHeight: 18,
    },
    emergencyNumbersSection: {
        marginBottom: 8,
    },
    numberButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    numberText: {
        fontSize: 14,
        color: '#0A4E78',
        fontWeight: '500',
        textAlign: 'center', 
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0A4E78',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalDescription: {
        fontSize: 16,
        color: '#273E53',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 22,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    cancelButton: {
        backgroundColor: '#E0E0E0',
        borderWidth: 1,
        borderColor: '#B0B0B0',
    },
    cancelButtonText: {
        color: '#273E53',
        fontSize: 16,
        fontWeight: '600',
    },
    confirmButton: {
        backgroundColor: '#0A4E78',
        borderWidth: 1,
        borderColor: '#0A4E78',
    },
    confirmButtonText: {
      color: '#FFFFFF', 
        fontSize: 16,
        fontWeight: '600',
    },
    checklistContainer: {
        width: '100%',
        marginBottom: 20,
    },
    checklistItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        marginRight: 10,
    },
    checklistText: {
        flex: 1,
        fontSize: 16,
        color: '#273E53',
    },
    guidelinesContainer: {
        width: '100%',
        marginBottom: 20,
    },
    guidelineItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    guidelineNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0A4E78',
        marginRight: 10,
    },
    guidelineText: {
        flex: 1,
        fontSize: 15,
        color: '#273E53',
        lineHeight: 20,
    },
  });