import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type RootStackParamList = {
  EmotionalSupportEarthquakeScreen: undefined;
};

type Props = {
  navigation: any;
};

const DATA = [
  {
    type: 'header',
    title: 'Crisis Alert Loop — Privacy and Trust Policies',
    description: 'Welcome to Crisis Alert Loop. Your safety and privacy are our highest priorities. This policy explains how we collect, use, and protect your information, and your responsibilities while using the app.',
  },
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
      'Location Data: With your permission, we use your device’s GPS location to send relevant alerts and calculate distances to shelters and resources.',
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

const EmotionalSupportEarthquakeScreen: React.FC<Props> = ({ navigation }) => {
  const [consentChecked, setConsentChecked] = React.useState(false);

  const renderItem = ({ item }: any) => {
    if (item.type === 'header') {
      return (
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => router.navigate('/screens/SettingsScreen')}
            style={styles.backButton}
          >
            <AntDesign name="arrowleft" size={40} color="#0A4E78" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{item.title}</Text>
          <Text style={styles.headerDescription}>{item.description}</Text>
        </View>
      );
    }

    if (item.type === 'section') {
      if (item.title === 'Consent') {
        return (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            {item.content.map((line: any, idx: number) => (
              <View key={idx} style={styles.bulletItem}>
                <Text style={styles.bulletDot}>{'\u2022'}</Text>
                <Text style={styles.bulletText}>{line}</Text>
              </View>
            ))}
            <View style={styles.consentRow}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setConsentChecked(!consentChecked)}
              >
                <View style={[styles.checkboxBox, consentChecked && styles.checkboxBoxChecked]}>
                  {consentChecked && <AntDesign name="check" size={20} color="white" />}
                </View>
              </TouchableOpacity>
              <Text style={styles.consentText}>I agree to the Privacy and Trust Policies</Text>
            </View>
            <TouchableOpacity
              style={[styles.button, !consentChecked && styles.buttonDisabled]}
              disabled={!consentChecked}
              onPress={() => router.navigate('/screens/SettingsScreen')}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        );
      }

      return (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{item.title}</Text>
          {item.content.map((line: any, idx: number) => {
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
                <Text key={idx} style={[styles.noBulletText, styles.indentedText]}>
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
    }

    return null;
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default EmotionalSupportEarthquakeScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F1F9FC',
    paddingVertical: 50,
    paddingHorizontal: 20,
    flex: 1,
  },
  listContent: {
    paddingTop: 45,
  },
  headerContainer: {
    marginBottom: 35,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0A4E78',
    marginBottom: 12,
  },
  headerDescription: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
    lineHeight: 22,
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0A4E78',
    marginBottom: 10,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  moreIndentedBulletItem: {
    paddingLeft: 20,
  },
  bulletDot: {
    color: '#0A4E78',
    fontSize: 20,
    lineHeight: 24,
    marginRight: 6,
  },
  bulletText: {
    fontSize: 16,
    color: '#222',
    lineHeight: 22,
    flex: 1,
  },
  noBulletText: {
    fontSize: 16,
    color: '#222',
    lineHeight: 22,
    marginBottom: 6,
  },
  indentedText: {
    paddingLeft: 20,
  },
  button: {
    backgroundColor: '#0A4E78',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginTop: 15,
    alignSelf: 'flex-start',
    width: '100%',
  },
  buttonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  backButton: {
    top: -50,
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#0A4E78',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxBoxChecked: {
    backgroundColor: '#0A4E78',
  },
  consentText: {
    fontSize: 16,
    color: '#222',
    flexShrink: 1,
  },
});
