import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
    FlatList,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import HeaderWithMenu from './Header_with_MenuScreen';

const apply = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.disasterassistance.gov/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const knowRights = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.ladrc.org/housing-issues-after-a-disaster/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const startDocumentReplacement = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/disaster/recover/replacing-vital-documents'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const requestReplacementSupplies = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/fact-sheet/personal-property-items-eligible-repair-or-replacement-after-disaster'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const replaceMedicalEssentials = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/fact-sheet/fema-medical-and-dental-assistance'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };
  const family = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.disasterassistance.gov/information/children-and-families'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };
const DATA = [
    {
        type: 'header',
        title: 'Get Aid for Urban Fires & Building Emergencies',
        description: 'If you’ve been displaced or affected by a fire in an apartment, condo, dorm, or high-rise building, here’s how to access urgent help and long-term support.',
    },
    {
        type: 'section', 
        title: 'Emergency Shelter and Temporary Housing',
        content: [
           'Red Cross and local emergency services may provide shelter, cots, and meals.',
           'Public housing tenants may be relocated temporarily — ask your housing authority for next steps.',
           'You may be eligible for hotel vouchers or transitional housing aid.',
           {
                button: 'Find Temporary Shelter',
           }
        ]
    },
    {
        type: 'section',
        title: 'Register for Disaster Assistance (FEMA, State, Local)',
        content: [
            'Even if you/re a renter or dont own the property, you may qualify for federal aid to replace personal belongings or cover temporary housing.',
            'Start your application early and upload photos or a fire report if available.',
            {
                button: 'Apply for Disaster Relief',
                action: apply,

            } 
        ]
    },
    {
        type: 'section',
        title: 'Get Help Replacing Lost Items',
        content: [
           'You may be able to get grants or community donations to replace clothes, electronics, and other essentials.',
           'Some nonprofits offer targeted help for low-income families, seniors, and people with disabilities.',
           {
                button: 'Request Replacement Supplies',
                action: requestReplacementSupplies, 
           }
        ]
    },
    {
        type: 'section',
        title: 'Renter and Condo Owner Support',
        content: [
            'Renters: Ask your landlord about relocation support, rent suspension, or lease options.',
            'Condo owners: You may qualify for insurance coverage for interior unit repairs and temporary housing.',
            'Request a property status letter for insurance or FEMA applications.',
            {
                button: 'Know Your Housing Rights',
                action: knowRights, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Recover Medical Items or Prescriptions',
        content: [
            'Pharmacies may offer emergency prescription refills.',
            'Ask your doctor or insurer about replacing mobility aids, medical devices, or hearing aids lost in the fire.',
            {
                button: 'Replace Medical Essentials',
                action: replaceMedicalEssentials, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Replace Vital Documents',
        content: [
            'Fire victims often need help replacing IDs, insurance cards, and other paperwork.',
            'Some states waive fees during emergencies.',
            {
                button: 'Start Document Replacement',
                action: startDocumentReplacement, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Get Help for Children and Seniors',
        content: [
            'Special programs exist to support displaced families with school supplies, transportation, and caregiving.',
            'Caseworkers can help connect you to the right resources.',
            {
                button: 'Get Family Support Services',
                action: family, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Emotional Support During Crisis',
        content: [
            'Fires are traumatic. You might feel numb, angry, overwhelmed, or disconnected.',
            'Confidential support is available 24/7 to talk through what you’re experiencing.',
            {
                button: 'Talk to a Disaster Counselor',
                action: () => Linking.openURL('tel:18009855990')
            }
        ]
    },
]

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

export default EmotionalSupportEarthquakeScreen;

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
  backButton: {
    top: -50,
  },
});