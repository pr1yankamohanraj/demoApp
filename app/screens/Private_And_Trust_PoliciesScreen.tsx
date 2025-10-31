import { FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ConsentService } from '../services/consentService';
import HeaderWithMenu from './Header_with_MenuScreen';

type RootStackParamList = {
    Private_And_Trust_PoliciesScreen: undefined;
    WebViewScreen: { url: string };
    LocalRepairAid: { region: string };
    DashboardScreen: undefined;
};
  
type Props = {
    navigation: StackNavigationProp<RootStackParamList, 'Private_And_Trust_PoliciesScreen'>;
};

const POLICY_DATA = [
  {
    type: 'section',
    title: 'What Our App Does',
    content: [
      "Crisis Alert Loop is a real-time crisis communication platform designed to help individuals stay informed and safe during emergencies such as natural disasters, hazardous spills, fires, and other critical incidents.",
      "Our features include:",
      'Geofenced Emergency Alerts: Receive location-based warnings tailored to your area.',
      'Crowdsourced Reports: Users can submit verified reports about emergencies and hazards.',
      'AI Summary Assistant: Quickly understand complex emergency information with AI-generated summaries.',
      'Community Discussion: Connect with others in your area to share updates and support.',
      'SOS Tools: Quick access to emergency help, shelters, and resource pages.',
      'Privacy-First Design: We protect your data and provide tools to control what you share.',
    ]
  },
  {
    type: 'section',
    title: 'Information We Collect',
    content: [
      "To provide these features effectively, we collect the following information:",
      'Personal Information: Your email address and optionally your username, to create and manage your account.',
      "Location Data: With your permission, we use your device's GPS location to send relevant alerts and calculate distances to shelters and resources.",
      'User-Submitted Content: Reports, messages, and feedback you provide within the app.',
      'Device and Usage Data: Technical info like device type, app version, and usage patterns to improve our service.',   
    ]
  },
  {
    type: 'section',
    title: 'How We Use Your Data',
    content: [
      "Your data is used solely to:",
      'Deliver timely, location-specific emergency alerts.',
      'Verify and display crowdsourced reports.',
      'Generate AI summaries to enhance understanding.',
      'Facilitate community discussions while moderating content.',
      'Help you find nearby shelters, resources, and assistance.',
      'Improve and maintain app functionality and security.',
    ]
  },
  {
    type: 'section',
    title: 'Who We Share Your Data With',
    content: [
      'We do not sell or rent your data to third parties.',
      'In critical emergencies, we may share your report data (anonymized if possible) with trusted emergency responders to help coordinate aid.',
      'We use secure cloud services for data storage with strict privacy controls.',
    ]
  },
  {
    type: 'section',
    title: 'Your Rights and Controls',
    content: [
      'You can update or delete your personal info anytime in the app settings.',
      'You can disable location sharing but may receive less relevant alerts.',
      'You can report inappropriate content or abuse in community discussions.',
      'You have the right to request a copy of your data or ask for its removal by contacting us.',
    ]
  },
  {
    type: 'section',
    title: 'User Responsibilities',
    content: [
      'Provide accurate information to help maintain community safety.',
      'Avoid sharing false or misleading reports.',
      'Respect other users and follow community guidelines.',
    ]
  },
  {
    type: 'section',
    title: 'Updates to This Policy',
    content: [
      "We may update this policy to reflect changes in our app or legal requirements. You will be notified of significant updates within the app.",
    ]
  },
  {
    type:'section',
    title: 'Consent',
    content: [
      "By checking the box below, you confirm that you have read, understood, and agree to the Privacy and Trust Policies of Crisis Alert Loop. You consent to the collection and use of your data as described above to provide you with emergency alerts and app services.",
    ]
  },
];

export default function Private_And_Trust_PoliciesScreen({ navigation }: Props) {
    const [consentChecked, setConsentChecked] = useState(false);

    // Check if user has already agreed to policies
    useEffect(() => {
        checkExistingConsent();
    }, []);

    const checkExistingConsent = async () => {
        try {
            const hasConsented = await ConsentService.hasConsented();
            if (hasConsented) {
                // User has already agreed, navigate to dashboard
                router.navigate('/screens/DashboardScreen');
            }
        } catch (error) {
            console.error('Error checking consent status:', error);
        }
    };

    const saveConsentAndContinue = async () => {
        try {
            await ConsentService.saveConsent();
            router.navigate('/screens/DashboardScreen');
        } catch (error) {
            console.error('Error saving consent:', error);
            // Still navigate even if saving fails
            router.navigate('/screens/DashboardScreen');
        }
    };

    const renderPolicySection = (item: any) => {
      if (item.title === 'Consent') {
        return (
          <View key={item.title} style={styles.policySection}>
            <Text style={styles.policySectionTitle}>{item.title}</Text>
            {item.content.map((line: string, idx: number) => (
              <Text key={idx} style={styles.policyText}>
                {line}
              </Text>
            ))}
            <View style={styles.consentRow}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setConsentChecked(!consentChecked)}
              >
                <View style={[styles.checkboxBox, consentChecked && styles.checkboxBoxChecked]}>
                  {consentChecked && <Ionicons name="checkmark" size={20} color="white" />}
                </View>
              </TouchableOpacity>
              <Text style={styles.consentText}>I agree to the Privacy and Trust Policies</Text>
            </View>
            <TouchableOpacity
              style={[styles.continueButton, !consentChecked && styles.buttonDisabled]}
              disabled={!consentChecked}
              onPress={saveConsentAndContinue}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        );
      }

      return (
        <View key={item.title} style={styles.policySection}>
          <Text style={styles.policySectionTitle}>{item.title}</Text>
          {item.content.map((line: string, idx: number) => {
            const noBulletLine =
              (item.title === 'What Our App Does' && (line.startsWith("Crisis Alert Loop") || line.startsWith("Our features include:"))) ||
              (item.title === 'Information We Collect' && line.startsWith("To provide these features effectively")) ||
              (item.title === 'How We Use Your Data' && line.startsWith("Your data is used solely to:"));

            const indexNoBulletLine = item.content.findIndex((c: string) => c === line);

            const shouldIndent =
              (item.title === 'What Our App Does' && indexNoBulletLine > 1) ||
              (item.title === 'Information We Collect' && indexNoBulletLine > 0) ||
              (item.title === 'How We Use Your Data' && indexNoBulletLine > 0);

            if (noBulletLine) {
              return (
                <Text key={idx} style={[styles.policyText, styles.indentedText]}>
                  {line}
                </Text>
              );
            }

            return (
              <View
                key={idx}
                style={[styles.bulletItem, shouldIndent && styles.moreIndentedBulletItem]}
              >
                <Text style={styles.bulletDot}>{'\u2022'}</Text>
                <Text style={styles.bulletText}>{line}</Text>
              </View>
            );
          })}
        </View>
      );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <HeaderWithMenu backRoute="/screens/Permissions_SetupScreen" />
            </View>
            
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <View style={styles.privacyIcon}> 
                        <MaterialIcons
                        name="private-connectivity"
                        size= {80}
                        color="#0A4E78"
                        />
                    </View>
                    <Text style={styles.title}> Privacy & </Text>
                    <Text style={styles.title2}> Trust Policies</Text>
                    <Text style={styles.description1}> To ensure data safety and  </Text>
                    <Text style={styles.description2}> transparency, please review our  </Text>
                    <Text style={styles.description3}> Privacy and Trust Policies.  </Text>
                    
                    <View style={styles.trustIndicators}>
                        <View style={styles.trustItem}>
                            <View style={styles.iconContainer}>
                                <FontAwesome5 name="shield-alt" size={18} color="#0A4E78" />
                            </View>
                            <Text style={styles.trustText}>Your data is encrypted</Text>
                        </View>
                        <View style={styles.trustItem}>
                            <View style={styles.iconContainer}>
                                <MaterialCommunityIcons name="account-lock" size={18} color="#0A4E78" />
                            </View>
                            <Text style={styles.trustText}>We never share personal info</Text>
                        </View>
                        <View style={styles.trustItem}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="eye-off" size={18} color="#0A4E78" />
                            </View>
                            <Text style={styles.trustText}>Location data is private</Text>
                        </View>
                    </View>
                    
                    <View style={styles.divider} />
                    
                    <View style={styles.protectionSection}>
                        <Text style={styles.sectionTitle}>What We Protect</Text>
                        <View style={styles.protectionList}>
                            <View style={styles.protectionItem}>
                                <Text style={styles.bulletPoint}>•</Text>
                                <Text style={styles.protectionText}>Personal information & location data</Text>
                            </View>
                            <View style={styles.protectionItem}>
                                <Text style={styles.bulletPoint}>•</Text>
                                <Text style={styles.protectionText}>Emergency communications</Text>
                            </View>
                            <View style={styles.protectionItem}>
                                <Text style={styles.bulletPoint}>•</Text>
                                <Text style={styles.protectionText}>Community reports & alerts</Text>
                            </View>
                        </View>
                    </View>

                    {/* Policy Content */}
                    <View style={styles.policyContainer}>
                        <Text style={styles.policyHeaderTitle}>Crisis Alert Loop — Privacy and Trust Policies</Text>
                        <Text style={styles.policyHeaderDescription}>
                            Welcome to Crisis Alert Loop. Your safety and privacy are our highest priorities. This policy explains how we collect, use, and protect your information, and your responsibilities while using the app.
                        </Text>
                        
                        {POLICY_DATA.map(renderPolicySection)}
                    </View>
                </View>
            </ScrollView>
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
    scrollContainer: {
      flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 80,
        left: 20,
        zIndex: 2,
    },
    content: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 40,
    },
    privacyIcon: {
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        letterSpacing: 1, 
        fontSize: 42,
        textAlign: 'center',
        color: '#0A4E78',
        fontWeight: "bold",
        marginBottom: 5,
    },
    title2: {
        letterSpacing: 1, 
        fontSize: 42,
        textAlign: 'center',
        color: '#0A4E78',
        fontWeight: "bold",
        marginBottom: 20,
    },
    description1: {
        fontSize: 20,
        color: '#273E53',
        fontWeight: "400",
        textAlign: 'center',
        marginBottom: 5,
    },
    description2: {
        fontSize: 20,
        color: '#273E53',
        fontWeight: "400",
        textAlign: 'center',
        marginBottom: 5,
    },
    description3: {
        fontSize: 20,
        color: '#273E53',
        fontWeight: "400",
        textAlign: 'center',
        marginBottom: 30,
    },
    trustIndicators: {
        width: '90%',
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 12,
        paddingVertical: 12,
        marginBottom: 30,
    },
    trustItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        paddingHorizontal: 5,
    },
    iconContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
      },
    trustText: {
        fontSize: 16,
        color: '#273E53',
        fontWeight: '500',
        flex: 1,
    },
    divider: {
        width: '90%',
        height: 1,
        backgroundColor: '#0A4E78',
        opacity: 0.2,
        marginBottom: 20,
    },
    protectionSection: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 22,
        color: '#0A4E78',
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
      },
    protectionList: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    protectionItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    bulletPoint: {
        fontSize: 18,
        color: '#0A4E78',
        fontWeight: 'bold',
        marginRight: 10,
        marginTop: 2,
    },
    protectionText: {
        fontSize: 16,
        color: '#273E53',
        flex: 1,
        lineHeight: 22,
    },
    // Policy Content Styles
    policyContainer: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
    },
    policyHeaderTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0A4E78',
        marginBottom: 15,
        textAlign: 'center',
    },
    policyHeaderDescription: {
        fontSize: 16,
        color: '#273E53',
        lineHeight: 24,
        marginBottom: 25,
        textAlign: 'center',
    },
    policySection: {
        marginBottom: 25,
    },
    policySectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0A4E78',
        marginBottom: 12,
    },
    policyText: {
        fontSize: 16,
        color: '#273E53',
        lineHeight: 22,
        marginBottom: 8,
    },
    indentedText: {
        marginLeft: 0,
        marginBottom: 12,
    },
    bulletItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    moreIndentedBulletItem: {
        marginLeft: 20,
    },
    bulletDot: {
        fontSize: 16,
        color: '#0A4E78',
        fontWeight: 'bold',
        marginRight: 10,
        marginTop: 2,
    },
    bulletText: {
        fontSize: 16,
        color: '#273E53',
        flex: 1,
        lineHeight: 22,
    },
    consentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 20,
    },
    checkbox: {
        marginRight: 12,
    },
    checkboxBox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#0A4E78',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxBoxChecked: {
        backgroundColor: '#0A4E78',
    },
    consentText: {
        fontSize: 16,
        color: '#273E53',
        flex: 1,
    },
    continueButton: {
        backgroundColor: '#0A4E78',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    buttonDisabled: {
        backgroundColor: '#CCCCCC',
        shadowOpacity: 0,
        elevation: 0,
    },
  });