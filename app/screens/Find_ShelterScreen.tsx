import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
    FlatList,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import HeaderWithMenu from './Header_with_MenuScreen';

const findShelter = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://egateway.fema.gov/ESF6/DRCLocator'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const viewShelters = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.redcross.org/get-help/disaster-relief-and-recovery-services/find-an-open-shelter.html'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const findRedCrossShelters = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://egateway.fema.gov/ESF6/DRCLocator'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const FEMAguidance = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/sites/default/files/2020-07/fema_functional-needs-support-services-guidance.pdf'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const ASPCADisaster = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.aspca.org/pet-care/general-pet-care/disaster-preparedness'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const animalSearch = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://pets.thecountyoffice.com/animal-shelter/?msclkid=206058ff33911123b80f30c22ded2b6c&utm_source=bing&utm_medium=cpc&utm_campaign=Pets%20-%20Aug%20Animal%20Shelter%20-%20PC%20241011&utm_term=shelters&utm_content=Animal%20Shelter#google_vignette'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const applyforHelp = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.disasterassistance.gov/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const FEMAindividuals = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/assistance/individual'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const nationalVOAD = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.nvoad.org/voad-members/national-members/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const HUDEmergency = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.hud.gov/disaster-resources'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };
const DATA = [
    {
        type: 'header',
        title: 'Find Emergency Shelter',
        description: "If you've been displaced due to flooding, there are safe places where you can stay. This page helps you find nearby shelters, understand your options, and get support fast.",
    },
    {
        type: 'section',
        title: 'Find a Shelter Near You',
        content: [
            'FEMA Disaster Recovery Center Locator',
            {
                button: 'Find a Shelter Near Me',
                action: findShelter,
            },
            'American Red Cross Shelter Map',
            {
                button: 'View Red Cross Shelters',
                action: viewShelters, 
            },
        ]
    },
    {
        type: 'section',
        title: 'Call to Find Shelter',
        content: [
            'Disaster Distress Hotline (for emotional support and shelter navigation):',
            {
                button: 'Talk to Someone Now',
                action: () => Linking.openURL('tel:211')
            }
        ]
    },
    {
        type: 'section',
        title: 'Types of Shelter Support',
        content: [
            "General Population Shelters",
            { text: 'Open to all.', indent: true},
            { text: 'Basic sleeping arrangements, restrooms, and food.', indent: true },
            { text: 'Often run by Red Cross, local agencies, or nonprofits', indent: true },
            {
                button: 'Find via Red Cross Shelters',
                action: findRedCrossShelters,
            },
            'Functional Needs Shelters',
            { text: 'For people with medical conditions or disabilities.', indent: true },
            { text: 'Staffed with health professionals or coordinated with local hospitals.', indent: true },
            { text: 'Ask 2-1-1 operators about nearby Medical Needs Shelters.', indent: true },
            {
                button: 'FEMA Disability & Medical Needs Guidance',
                action: FEMAguidance, 
            },
            'Pet-Friendly Shelters',
            { text: 'Some locations allow pets — use the FEMA locator and call ahead.', indent: true },
            { text: 'Bring pet food, leash, ID, and vaccination records if possible.', indent: true } ,
            {
                button: 'ASPCA Disaster Preparedness for Pets',
                action: ASPCADisaster, 

            },
            {
                button: 'Animal Shelter Search',
                action: animalSearch, 
            }
        ]
    },
    {
        type: 'section',
        title: 'What to Bring with You',
        content: [
            'Make sheltering easier by bringing:',
            { text: 'Photo ID or any identifying info', indent: true } ,
            { text: 'Medications', indent: true } ,
            { text: 'Personal hygiene supplies', indent: true } ,
            { text: 'Change of clothes', indent: true } ,
            { text: 'Important documents (insurance, medical records)', indent: true } ,
            { text: 'Chargers for devices', indent: true } ,
            { text: 'Water and snacks', indent: true } ,
            { text: 'Pet owners: leash, food, ID, crate if possible', indent: true } ,
        ]
    },
    {
        type: 'section',
        title: 'Shelter Status Notices',
        content: [
            'Not all shelters are available at all times. Some fill quickly or close due to safety, power, or flooding.',
            'Always call ahead if you can, or check online maps for status updates.',
            'Keep checking frequently — new shelters may open as others close.',
            'Some shelters do not have air conditioning or full amenities, especially during early disaster response.',
            'FEMA and Red Cross sites update every few hours.',
        ]
    },
    {
        type: 'section',
        title: 'More Help or Housing Resources',
        content: [
            {
                button: 'DisasterAssistance.gov - Apply for Help',
                action: applyforHelp,
            },
            {
                button: 'FEMA Individuals & Households Program',
                action: FEMAindividuals,
            },
            {
                button: 'HUD Emergency Housing & Assistance',
                action: HUDEmergency,
            },
            {
                button: 'National VOAD Members - Community & Faith-Based Shelter Partners',
                action: nationalVOAD,
            }
        ]
    }
];

const EmotionalSupportEarthquakeScreen = ({ navigation }: any) => {
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
            } else if ('text' in line) {
                return (
                  <View
                    key={idx}
                    style={[
                      styles.bulletItem,
                      line.indent && { paddingLeft: 20 }, 
                    ]}
                  >
                    <Text style={styles.bulletDot}>{'\u2022'}</Text>
                    <Text style={styles.bulletText}>{line.text}</Text>
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
      <HeaderWithMenu backRoute="/screens/Flood_RecoveryScreen" />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        style={styles.flatList}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default EmotionalSupportEarthquakeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F1F9FC',
  },
  listContent: {
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContainer: {
    marginBottom: 20,
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
    marginBottom: 15,
    alignSelf: 'flex-start',
    width: '100%',
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
  flatList: {
    flex: 1,
  },
});
