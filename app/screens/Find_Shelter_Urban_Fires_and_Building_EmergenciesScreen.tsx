import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import HeaderWithMenu from './Header_with_MenuScreen';

const findUrbanShelter = async () => {
  try {
    await WebBrowser.openBrowserAsync('https://www.redcross.org/get-help/disaster-relief-and-recovery-services/find-an-open-shelter.html');
  } catch (error) {
    console.error('Failed to open browser:', error);
  }
};

const femaUrbanAssistance = async () => {
  try {
    await WebBrowser.openBrowserAsync('https://www.fema.gov/assistance/individual');
  } catch (error) {
    console.error('Failed to open browser:', error);
  }
};

const redCrossUrbanSupport = async () => {
  try {
    await WebBrowser.openBrowserAsync('https://www.redcross.org/get-help/disaster-relief-and-recovery-services.html');
  } catch (error) {
    console.error('Failed to open browser:', error);
  }
};

const urbanDisasterAssistance = async () => {
  try {
    await WebBrowser.openBrowserAsync('https://www.disasterassistance.gov/');
  } catch (error) {
    console.error('Failed to open browser:', error);
  }
};

const urbanEmergencyHousing = async () => {
  try {
    await WebBrowser.openBrowserAsync('https://www.hud.gov/topics/disaster_resources');
  } catch (error) {
    console.error('Failed to open browser:', error);
  }
};

const urbanPetShelter = async () => {
  try {
    await WebBrowser.openBrowserAsync('https://www.aspca.org/pet-care/general-pet-care/disaster-preparedness');
  } catch (error) {
    console.error('Failed to open browser:', error);
  }
};

const DATA = [
  {
    type: 'header',
    title: 'Emergency Shelter for Urban Fires & Building Emergencies',
    description: 'If you\'ve been displaced by an urban fire or building emergency, immediate shelter and support are available. Find safe temporary housing, register for assistance, and access emergency resources.',
  },
  {
    type: 'section',
    title: 'Find Immediate Emergency Shelter',
    content: [
      'Red Cross and local emergency management agencies provide immediate shelter for displaced residents.',
      'Shelters are equipped with basic necessities, medical support, and safety measures.',
      'Transportation to shelters is often provided by emergency services.',
      {
        button: 'Locate Urban Emergency Shelters',
        action: findUrbanShelter,
      }
    ]
  },
  {
    type: 'section',
    title: 'Register for FEMA & Disaster Assistance',
    content: [
      'Urban fires and building emergencies often qualify for federal disaster assistance.',
      'Register immediately to access housing assistance, temporary lodging, and recovery funds.',
      'Document your displacement and losses for faster processing.',
      {
        button: 'Apply for FEMA Urban Disaster Aid',
        action: femaUrbanAssistance,
      }
    ]
  },
  {
    type: 'section',
    title: 'Red Cross Urban Emergency Support',
    content: [
      'Red Cross provides specialized support for urban disaster victims.',
      'Emergency housing, food, clothing, and health services available.',
      'Mental health support and case management for recovery.',
      {
        button: 'Access Red Cross Urban Support',
        action: redCrossUrbanSupport,
      }
    ]
  },
  {
    type: 'section',
    title: 'HUD Emergency Housing Resources',
    content: [
      'HUD offers emergency housing vouchers and temporary assistance.',
      'Special programs for urban disaster victims and displaced families.',
      'Long-term housing solutions and rebuilding support.',
      {
        button: 'Find HUD Emergency Housing',
        action: urbanEmergencyHousing,
      }
    ]
  },
  {
    type: 'section',
    title: 'Pet-Friendly Shelter Options',
    content: [
      'Many urban emergency shelters accommodate pets.',
      'Pet-friendly hotels and temporary housing available.',
      'Animal rescue organizations provide pet care during displacement.',
      {
        button: 'Find Pet-Friendly Urban Shelters',
        action: urbanPetShelter,
      }
    ]
  },
  {
    type: 'section',
    title: 'Complete Disaster Registration',
    content: [
      'Register with multiple agencies for comprehensive assistance.',
      'Keep records of all applications and correspondence.',
      'Follow up regularly on your applications and case status.',
      {
        button: 'Register for Urban Disaster Aid',
        action: urbanDisasterAssistance,
      }
    ]
  },
];

const FindShelterUrbanFiresScreen = ({ navigation }: any) => {
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
            if (typeof line === 'string') {
              return (
                <View key={idx} style={styles.bulletItem}>
                  <Text style={styles.bulletDot}>{'\u2022'}</Text>
                  <Text style={styles.bulletText}>{line}</Text>
                </View>
              );
            } else if (line.button) {
              return (
                <TouchableOpacity
                  key={idx}
                  onPress={line.action || (() => {})}
                  style={styles.button}
                >
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
      <View style={{top: 0, left: -20, width: 405}}>
        <HeaderWithMenu backRoute="/screens/Urban_Fires_and_Building_EmergenciesScreen" /> 
      </View> 
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default FindShelterUrbanFiresScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F1F9FC',
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingTop: 20,
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