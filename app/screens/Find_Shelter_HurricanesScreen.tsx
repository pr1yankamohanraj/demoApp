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

    const learnAboutTornado = async () => {
        try {
        await WebBrowser.openBrowserAsync(
            'https://www.fema.gov/emergency-managers/risk-management/safe-rooms'
        );
        } catch (error) {
        console.error('Failed to open browser:', error);
        }
    };

    const findShelters = async () => {
        try {
        await WebBrowser.openBrowserAsync(
            'https://www.disasterassistance.gov/information/immediate-needs/emergency-shelter'
        );
        } catch (error) {
        console.error('Failed to open browser:', error);
        }
    };

    const findPetShelters = async () => {
        try {
        await WebBrowser.openBrowserAsync(
            'https://countyinfo.hoursguide.com/animal-shelter/?bingcust=jtlhg&msclkid=dafdc989161b1b337881a1cc139ada89&utm_source=bing&utm_medium=cpc&utm_campaign=BF%20-%20County%20-%20Animal%20Shelter%20Test%20-%20PC%20-%2020240515&utm_term=emergency%20animal%20shelter&utm_content=Animal%20Shelter#google_vignette'
        );
        } catch (error) {
        console.error('Failed to open browser:', error);
        }
    };

    const requestHotelVoucher = async () => {
        try {
        await WebBrowser.openBrowserAsync(
            'https://www.femaemergencyhotels.com/'
        );
        } catch (error) {
        console.error('Failed to open browser:', error);
        }
    };

    const searchRedCrossShelters= async () => {
        try {
        await WebBrowser.openBrowserAsync(
            'https://www.redcross.org/get-help/disaster-relief-and-recovery-services/find-an-open-shelter.html'
        );
        } catch (error) {
        console.error('Failed to open browser:', error);
        }
    };

    const viewChecklist = async () => {
        try {
        await WebBrowser.openBrowserAsync(
            'https://www.ready.gov/kit'
        );
        } catch (error) {
        console.error('Failed to open browser:', error);
        }
    };

    const shelterFinder = async () => {
        try {
        await WebBrowser.openBrowserAsync(
            'https://www.redcross.org/get-help/disaster-relief-and-recovery-services/find-an-open-shelter.html'
        );
        } catch (error) {
        console.error('Failed to open browser:', error);
        }
    };

    const FEMAapp = async () => {
        try {
        await WebBrowser.openBrowserAsync(
            'https://www.fema.gov/about/news-multimedia/mobile-products'
        );
        } catch (error) {
        console.error('Failed to open browser:', error);
        }
    };

    const ready = async () => {
        try {
        await WebBrowser.openBrowserAsync(
            'https://www.ready.gov/hurricanes'
        );
        } catch (error) {
        console.error('Failed to open browser:', error);
        }
    };

    const tornadoSafetyTips = async () => {
        try {
        await WebBrowser.openBrowserAsync(
            'https://www.weather.gov/safety/tornado'
        );
        } catch (error) {
        console.error('Failed to open browser:', error);
        }
    };
const DATA = [
    {
        type: 'header',
        title: 'Find Shelter During a Hurricane or Tornado',
        description: 'Whether youre evacuating from a hurricane or seeking immediate shelter from a tornado, this page helps you find safe, verified locations near you — including pet-friendly and accessible options.'
    },
    {
        type: 'section',
        title: 'Types of Emergency Shelters Explained',
        content: [
            {text: 'Not all shelters are the same. Heres what to expect:', indentLevel: 0},
            {text: 'General Public Shelters', indentLevel: 1},
            {text: 'Run by the Red Cross, local emergency services, or schools.', indentLevel: 2},
            {text: 'Provide basic shelter: a cot, water, restrooms.', indentLevel: 2},
            {text: 'May not offer meals, power, or medical care.', indentLevel: 2},
            {text: 'Pet-Friendly Shelters', indentLevel: 1},
            {text: 'Allow household pets.', indentLevel: 2},
            {text: 'Bring cages, leashes, food, and vaccination records.', indentLevel: 2},
            {text: 'Often located separately from standard shelters.', indentLevel: 2},
            {text: 'Accessible or Medical Needs Shelters', indentLevel: 2},
            {text: 'Designed for people with disabilities or health conditions.', indentLevel: 2},
            {text: 'Have accessible facilities and sometimes limited medical support.', indentLevel: 2},
            {text: 'Pre-registration may be required.', indentLevel: 2},
            {text: 'Hotel/Motel Voucher Shelters', indentLevel: 1},
            {text: 'Short-term stays funded by FEMA/local governments.', indentLevel: 2},
            {text: 'Requires eligibility proof (e.g., damage, displacement).', indentLevel: 2},
        ]
    },
    {
        type: 'section', 
        title: 'Tornado-Specific Shelter Types',
        content: [
            {text: 'Reinforced Public Shelters', indentLevel: 0},
            {text: 'Designed to withstand tornado-strength winds (FEMA P-361 safe rooms).', indentLevel: 1},
            {text: 'Often found in schools, city halls, or community centers', indentLevel: 1},
            {text: 'Pop-Up Tornado Shelters', indentLevel: 0},
            {text: 'Set up in gymnasiums or temporary locations after a tornado hits.', indentLevel: 1},
            {text: 'Tune into local alerts or emergency management updates.', indentLevel: 1},
            {text: 'Community Safe Rooms', indentLevel: 0},
            {text: 'Built-in shelters located in some neighborhoods or mobile home parks.', indentLevel: 1},
            {text: 'Check if your area has any using local emergency management websites.', indentLevel: 1},
            {
                button: 'Learn About Tornado Safe Room Standards',
                action: learnAboutTornado, 
            },
        ]
    },
    {
        type: 'section',
        title: 'Hurricane-Specific Shelter Types',
        content: [
            {text: 'Hurricane Evacuation Shelters', indentLevel: 0},
            {text: 'Open before the storm makes landfall.', indentLevel: 1},
            {text: 'Located inland and outside flood zones.', indentLevel: 1},
            {text: 'Often managed by emergency management agencies or the Red Cross.', indentLevel: 1}, 
            {text: 'Some may not be reinforced for wind but are safe from storm surge.', indentLevel: 1},
            {text: 'Special Needs Shelters', indentLevel: 0},
            {text: 'Available in many counties for people with medical conditions.', indentLevel: 1},
            {text: 'Offer limited medical support, backup power, and accessible facilities.', indentLevel: 1},
            {text: 'Often require pre-registration with local health departments.', indentLevel: 1},
            {text: 'Shelters with Generators', indentLevel: 0},
            {text: 'Some shelters are designated as power-ready, especially in hurricane-prone states like Florida and Louisiana.', indentLevel: 1},
            {text: 'These support people who rely on powered medical equipment.', indentLevel: 1},
        ]
    },
    {
        type: 'section',
        title: 'Other Shelter Options',
        content: [
           {
              button: 'Request a Hotel/Motel Voucher',
              action: requestHotelVoucher, 
           },
           {
              button: 'Search Red Cross Shelters',
              action: searchRedCrossShelters, 
           },
           {
              button: 'Find Pet-Friendly Shelters',
              action: findPetShelters, 
           },
        ]
    },
    {
        type: 'section',
        title: 'Evacuation & Accessibility Help',
        content: [
            {
                button: 'Request Transportation to a Shelter',
                action: () => Linking.openURL('tel:211')
            },
            {
                button: 'Find Accessible or Medical Needs Shelters',
                action: findShelters, 
            },
        ]
    },
    {
        type: 'section',
        title: 'What to Bring',
        content: [
            'ID, phone charger, water bottle, medications',
            'Personal hygiene supplies, important documents',
            'Masks, hand sanitizer, blankets if available',
            {
                button: 'View What to Bring Checklist',
                action: viewChecklist, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Prepare to Document',
        content: [
            'Take photos of your home before evacuating if safe.',
            'Keep all receipts and updates for aid applications.',
        ]
    },
    {
        type: 'section',
        title: 'Helpful External Resources',
        content: [
            {
                button: 'Red Cross Shelter Finder',
                action: shelterFinder, 
            },
            {
                button: 'FEMA Mobile App',
                action: FEMAapp,
            },
            {
                button: 'Ready.gov Hurricane Info',
                action: ready,
            },
            {
                button: 'NWS Tornado Safety Tips',
                action: tornadoSafetyTips, 
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
            const indentLevel = typeof line === 'object' && line.indentLevel ? line.indentLevel : 0;
            const text = typeof line === 'string' ? line : line.text;
          
            if (text) {
              return (
                <View
                  key={idx}
                  style={[
                    styles.bulletItem,
                    { marginLeft: indentLevel * 20 } 
                  ]}
                >
                  <Text style={styles.bulletDot}>{'\u2022'}</Text>
                  <Text style={styles.bulletText}>{text}</Text>
                </View>
              );
            }
            else if (line.button) {
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
      <HeaderWithMenu backRoute="/screens/Hurricanes_and_Tornados_ReliefScreen" />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        style={styles.flatList}
      />
    </View>
  );
};

export default EmotionalSupportEarthquakeScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F1F9FC',
    flex: 1,
  },
  listContent: {
    paddingTop: 25,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContainer: {
    marginBottom: 15,
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
  flatList: {
    flex: 1,
  },
});
