import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { FlatList, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HeaderWithMenu from './Header_with_MenuScreen';

const locateShelter = async () => {
  try {
    await WebBrowser.openBrowserAsync('https://www.redcross.org/get-help/disaster-relief-and-recovery-services/find-an-open-shelter.html');
  } catch (error) {
    console.error('Failed to open browser:', error);
  }
};

const learnMore = async () => {
  try {
    await WebBrowser.openBrowserAsync('https://www.undrr.org/sites/default/files/2021-02/WiA_Displacement_Checklist_En_0.pdf?startDownload=true');
  } catch (error) {
    console.error('Failed to open browser:', error);
  }
};

const tips = async () => {
  try {
    await WebBrowser.openBrowserAsync('https://www.jarvisrestoration.com/blog/water-damage/tips-for-salvaging-your-valuable-belongings-after-a-disaster/');
  } catch (error) {
    console.error('Failed to open browser:', error);
  }
};

const disaster = async () => {
  try {
    await WebBrowser.openBrowserAsync('https://www.sba.gov/funding-programs/disaster-assistance');
  } catch (error) {
    console.error('Failed to open browser:', error);
  }
};

const learnToReturn = async () => {
  try {
    await WebBrowser.openBrowserAsync('https://www.fema.gov/node/when-will-i-be-able-return-home-after-evacuation');
  } catch (error) {
    console.error('Failed to open browser:', error);
  }
};

const startDisplacementRegistration = async () => {
  try {
    await WebBrowser.openBrowserAsync('https://www.disasterassistance.gov/');
  } catch (error) {
    console.error('Failed to open browser:', error);
  }
};

const emergencyTransportation = async () => {
  try {
    await WebBrowser.openBrowserAsync('https://ops.fhwa.dot.gov/tim/about/eto.htm');
  } catch (error) {
    console.error('Failed to open browser:', error);
  }
};

const DATA = [
  {
    type: 'header',
    title: 'Displacement Support: Toxic Spills & Hazardous Materials',
    description: 'If you’ve been evacuated, displaced, or told your home is unsafe after a toxic spill or chemical incident, you’re not alone. Here’s how to access shelter, financial help, legal protections, and emotional support during this uncertain time.',
  },
  {
    type: 'section',
    title: 'Find Emergency Shelter or Temporary Housing',
    content: [
      { text: 'Red Cross, local emergency shelters, or city-run facilities may provide temporary places to stay.', indentLevel: 0 },
      { text: "If you're in a hotel, ask about disaster reimbursement programs.", indentLevel: 0 },
      { text: 'Some chemical events qualify for FEMA assistance or local housing aid.', indentLevel: 0 },
      { button: 'Locate Shelter Near You', action: locateShelter },
    ],
  },
  {
    type: 'section',
    title: 'Register as a Displaced Resident',
    content: [
      { text: 'Official registration can help you access:', indentLevel: 0 },
      { text: 'Housing assistance', indentLevel: 1 },
      { text: 'Reimbursement for temporary lodging', indentLevel: 1 },
      { text: 'Health screenings', indentLevel: 1 },
      { text: 'Transportation', indentLevel: 1 },
      { text: 'Be prepared to share your address and the date you left.', indentLevel: 0 },
      { button: 'Start Displacement Registration', action: startDisplacementRegistration },
    ],
  },
  {
    type: 'section',
    title: 'Understand When It’s Safe to Return',
    content: [
      { text: 'Return only when local authorities declare your area safe.', indentLevel: 0 },
      { text: 'Air, soil, or water testing must confirm contamination levels are within safe limits.', indentLevel: 0 },
      { text: 'If you\'re unsure, ask for an inspection or written clearance before returning.', indentLevel: 0 },
      { button: 'Learn When to Return', action: learnToReturn },
    ],
  },
  {
    type: 'section',
    title: 'Apply for Financial Assistance',
    content: [
      { text: 'If you’ve lost income, housing, or belongings:', indentLevel: 0 },
      { text: 'FEMA, state agencies, or nonprofits may help cover lodging, food, utilities, and essentials.', indentLevel: 1 },
      { text: 'Document expenses and save receipts.', indentLevel: 1 },
      { text: 'Some industrial spills may trigger company-funded compensation.', indentLevel: 1 },
      { button: 'Request Disaster Relief Funds', action: disaster },
    ],
  },
  {
    type: 'section',
    title: 'Know Your Housing Rights',
    content: [
      { text: 'Renters: Landlords must disclose contamination and cannot force you to pay rent on uninhabitable units.', indentLevel: 0 },
      { text: 'Homeowners: You may qualify for mortgage relief, repairs, or environmental cleanup support.', indentLevel: 0 },
      { text: 'Free legal help may be available during recovery.', indentLevel: 0 },
      { button: 'Learn More', action: learnMore },
    ],
  },
  {
    type: 'section',
    title: 'Get Support for Stress and Uncertainty',
    content: [
      { text: 'Being displaced — especially without a clear timeline — can cause severe emotional strain.', indentLevel: 0 },
      { text: 'Talk to someone trained in disaster-related trauma.', indentLevel: 0 },
      { text: 'Resources are available for children, elders, and people with disabilities.', indentLevel: 0 },
      { button: 'Connect with a Crisis Counselor', action: () => Linking.openURL('tel:18009855990') },
    ],
  },
  {
    type: 'section',
    title: 'Access Transportation Help',
    content: [
      { text: 'If you had to leave without a vehicle or rely on public transit, some areas offer:', indentLevel: 0 },
      { text: 'Emergency ride services', indentLevel: 1 },
      { text: 'Free shuttles to hotels or clinics', indentLevel: 1 },
      { text: 'Bus vouchers for affected residents', indentLevel: 1 },
      { button: 'Request Transportation Assistance', action: emergencyTransportation },
    ],
  },
  {
    type: 'section',
    title: 'Retrieve Belongings Safely',
    content: [
      { text: 'Do not re-enter contaminated buildings without proper clearance and protective gear.', indentLevel: 0 },
      { text: 'Local officials or cleanup crews may offer escorted retrieval appointments.', indentLevel: 0 },
      { text: 'Avoid taking soft materials (clothing, bedding) until cleared safe.', indentLevel: 0 },
      { button: 'Tips for Salvaging Items', action: tips },
    ],
  },
];

const DisplacementSupportScreen = () => {
  const renderItem = ({ item }: any) => {
    if (item.type === 'header') {
      return (
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{item.title}</Text>
          <Text style={styles.headerDescription}>{item.description}</Text>
        </View>
      );
    }

    if (item.type === 'section') {
      return (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{item.title}</Text>
          {item.content.map((line: any, idx: number) => {
            const indentLevel = line.indentLevel || 0;

            if (line.text) {
              return (
                <View key={idx} style={[styles.bulletItem, { marginLeft: indentLevel * 20 }]}>
                  <Text style={styles.bulletDot}>{'\u2022'}</Text>
                  <Text style={styles.bulletText}>{line.text}</Text>
                </View>
              );
            } else if (line.button) {
              return (
                <TouchableOpacity key={idx} onPress={line.action} style={styles.button}>
                  <Text style={styles.buttonText}>{line.button}</Text>
                </TouchableOpacity>
              );
            }
            return null;
          })}
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.screen}>
      <HeaderWithMenu />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default DisplacementSupportScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F1F9FC',
  },
  listContent: {
    paddingTop: 45,
    paddingHorizontal: 20,
    paddingBottom: 60,
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
  button: {
    backgroundColor: '#0A4E78',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginTop: 7,
    marginBottom: 20,
    alignSelf: 'flex-start',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
