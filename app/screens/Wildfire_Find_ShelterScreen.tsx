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

const findWildfireShelter = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://egateway.fema.gov/ESF6/DRCLocator'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const viewRedCrossShelters = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.redcross.org/get-help/disaster-relief-and-recovery-services/find-an-open-shelter.html'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const findEmergencyShelters = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://egateway.fema.gov/ESF6/DRCLocator'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const FEMAWildfireGuidance = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/sites/default/files/2020-07/fema_functional-needs-support-services-guidance.pdf'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const petShelterInfo = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.aspca.org/pet-care/general-pet-care/disaster-preparedness'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const findPetShelters = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://pets.thecountyoffice.com/animal-shelter/?msclkid=206058ff33911123b80f30c22ded2b6c&utm_source=bing&utm_medium=cpc&utm_campaign=Pets%20-%20Aug%20Animal%20Shelter%20-%20PC%20241011&utm_term=shelters&utm_content=Animal%20Shelter#google_vignette'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const applyForWildfireAssistance = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.disasterassistance.gov/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const FEMAWildfireAssistance = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/assistance/individual'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const findVolunteerOrganizations = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.nvoad.org/voad-members/national-members/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

const DATA = [
    {
        type: 'header',
        title: 'Wildfire Emergency Shelter',
        description: 'Find safe shelter and emergency resources during and after wildfires. These resources help you locate evacuation centers, emergency shelters, and support services for wildfire survivors.',
    },
    {
        type: 'section',
        title: 'Emergency Shelter Locations',
        content: [
            'FEMA and Red Cross provide emergency shelters during wildfire evacuations.',
            'Shelters offer temporary housing, food, water, and basic medical care.',
            'Many shelters accept pets, but call ahead to confirm policies.',
            {
                button: 'Find Emergency Shelters',
                action: findWildfireShelter,
            }
        ]
    },
    {
        type: 'section',
        title: 'Red Cross Shelter Network',
        content: [
            'Red Cross operates the largest network of emergency shelters.',
            'They provide immediate assistance and connect you with recovery resources.',
            'Shelters are typically set up in schools, community centers, and churches.',
            {
                button: 'View Red Cross Shelters',
                action: viewRedCrossShelters,
            }
        ]
    },
    {
        type: 'section',
        title: 'Special Needs Accommodations',
        content: [
            'Many shelters provide accommodations for people with disabilities.',
            'Medical equipment, medications, and special dietary needs can be arranged.',
            'Contact shelters in advance if you have specific requirements.',
            {
                button: 'FEMA Special Needs Guidance',
                action: FEMAWildfireGuidance,
            }
        ]
    },
    {
        type: 'section',
        title: 'Pet and Animal Shelter',
        content: [
            'Many emergency shelters now accept pets during disasters.',
            'Local animal shelters may provide temporary housing for pets.',
            'Prepare pet emergency kits with food, water, and medical records.',
            {
                button: 'Pet Disaster Preparedness',
                action: petShelterInfo,
            },
            {
                button: 'Find Pet Shelters',
                action: findPetShelters,
            }
        ]
    },
    {
        type: 'section',
        title: 'Financial Assistance for Shelter',
        content: [
            'FEMA may provide financial assistance for temporary housing.',
            'This can include hotel vouchers, rental assistance, or repair grants.',
            'Apply as soon as possible after evacuation orders are issued.',
            {
                button: 'Apply for Wildfire Assistance',
                action: applyForWildfireAssistance,
            },
            {
                button: 'FEMA Individual Assistance',
                action: FEMAWildfireAssistance,
            }
        ]
    },
    {
        type: 'section',
        title: 'Volunteer and Community Support',
        content: [
            'Volunteer organizations help with shelter operations and recovery.',
            'They provide additional services like counseling and case management.',
            'Local community groups often organize temporary housing networks.',
            {
                button: 'Find Volunteer Organizations',
                action: findVolunteerOrganizations,
            }
        ]
    },
];

const WildfireFindShelterScreen = () => {
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
    <View style={styles.container}>
      <HeaderWithMenu backRoute="/screens/Wildfire_SupportScreen" />
      <View style={styles.content}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
};

export default WildfireFindShelterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F9FC',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingTop: 20,
    paddingBottom: 20,
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