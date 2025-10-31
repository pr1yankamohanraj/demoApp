import { router } from 'expo-router';
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

    const visitAssistance = async () => {
        try {
        await WebBrowser.openBrowserAsync(
            'https://www.disasterassistance.gov/'
        );
        } catch (error) {
        console.error('Failed to open browser:', error);
        }
    };

    const findVolunteers = async () => {
        try {
        await WebBrowser.openBrowserAsync(
            'https://www.disasterassistance.gov/'
        );
        } catch (error) {
        console.error('Failed to open browser:', error);
        }
    };

    const mobileAidTeamVisit = async () => {
        try {
        await WebBrowser.openBrowserAsync(
            'https://teamrubiconusa.org/how-we-serve/disaster-response/'
        );
        } catch (error) {
        console.error('Failed to open browser:', error);
        }
    };

    const viewDisasters = async () => {
        try {
        await WebBrowser.openBrowserAsync(
            'https://www.fema.gov/locations'
        );
        } catch (error) {
        console.error('Failed to open browser:', error);
        }
    };

    const FEMAapplication = async () => {
        try {
        await WebBrowser.openBrowserAsync(
            'https://www.fema.gov/pdf/about/divisions/disaster_ops/da_trifold.pdf'
        );
        } catch (error) {
        console.error('Failed to open browser:', error);
        }
    };

    const checkEligibility = async () => {
        try {
          await WebBrowser.openBrowserAsync(
            'https://oui.doleta.gov/unemploy/disaster.asp'
          );
        } catch (error) {
          console.error('Failed to open browser:', error);
        }
      };

    const viewDRCs = async () => {
        try {
          await WebBrowser.openBrowserAsync(
            'https://egateway.fema.gov/ESF6/DRCLocator'
          );
        } catch (error) {
          console.error('Failed to open browser:', error);
        }
      };
    
    const findShelters = async () => {
        try {
          await WebBrowser.openBrowserAsync(
            'https://www.fema.gov/disaster/recovery/shelters'
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
    
    const checkHousingGrants = async () => {
        try {
          await WebBrowser.openBrowserAsync(
            'https://www.fema.gov/grants'
          );
        } catch (error) {
          console.error('Failed to open browser:', error);
        }
      };
    
    const applySBA = async () => {
        try {
          await WebBrowser.openBrowserAsync(
            'https://www.sba.gov/funding-programs/disaster-assistance'
          );
        } catch (error) {
          console.error('Failed to open browser:', error);
        }
      };

    const findRentReliefPrograms = async () => {
        try {
          await WebBrowser.openBrowserAsync(
            'https://nlihc.org/rental-assistance'
          );
        } catch (error) {
          console.error('Failed to open browser:', error);
        }
      };
      
      const applyUtilityBill = async () => {
        try {
          await WebBrowser.openBrowserAsync(
            'https://www.usa.gov/disaster-help-with-bills'
          );
        } catch (error) {
          console.error('Failed to open browser:', error);
        }
      };

      const searchNonprofits = async () => {
        try {
          await WebBrowser.openBrowserAsync(
            'https://www.charitynavigator.org/search?q=disaster+relief'
          );
        } catch (error) {
          console.error('Failed to open browser:', error);
        }
      };

      const findResourceCenters = async () => {
        try {
          await WebBrowser.openBrowserAsync(
            'https://acl.gov/programs/aging-and-disability-networks/aging-and-disability-resource-centers'
          );
        } catch (error) {
          console.error('Failed to open browser:', error);
        }
      };

      const trustedCommunityOrganizations = async () => {
        try {
          await WebBrowser.openBrowserAsync(
            'https://www.nilc.org/resources/disaster-help/'
          );
        } catch (error) {
          console.error('Failed to open browser:', error);
        }
      };

      const disasterAidEligibilityChecker = async () => {
        try {
          await WebBrowser.openBrowserAsync(
            'https://www.fema.gov/assistance/individual/program/eligibility'
          );
        } catch (error) {
          console.error('Failed to open browser:', error);
        }
      };
const DATA = [
    {
        type: 'header',
        title: 'Access Earthquake Aid Programs',
        description: 'Support is available from federal, state, local, and nonprofit organizations to help you recover after an earthquake. Use this guide to find the aid that best fits your situation.',
    },
    {
        type: 'section',
        title: 'Federal Disaster Assistance',
        content: [
            {text: 'What it covers:', indentLevel: 0},
            {text: 'Temporary housing', indentLevel: 1},
            {text: 'Home repairs',  indentLevel: 1},
            {text: 'Replacement of personal property', indentLevel: 1},
            {text: 'Transportation assistance',  indentLevel: 1},
        ]
    },
    {
        type: 'section',
        title: 'How to apply:',
        content: [
          {text: 'Apply within 60 days of a federal disaster declaration.', indentLevel: 0},
            {
                button: 'Visit Disasterassistance.gov',
                action: visitAssistance, 
            },
            {
                button: 'Call 1-800-621-3362',
                action: () => Linking.openURL('tel: 18006213362'),
            },
            {
                button: 'Tap here to fill out FEMA pre-application form',
                action: FEMAapplication,
            },
        ]
    },
    {
        type: 'section',
        title: 'Disaster Unemployment Assistance (DUA)', 
        content: [
            {text: 'Helps workers, self-employed people, and gig workers who lost income.', indentLevel: 0},
            {text: 'File through your states unemployment website.', indentLevel: 0},
            {
                button: 'Check your eligibility and apply',
                action: checkEligibility, 
            },
        ]
    },
    {
        type: 'section',
        title: 'State & Local Recovery Support',
        content: [
            {text: 'Disaster Recovery Centers (DRCs)', indentLevel: 0},
            {text: 'Walk-in locations that help with paperwork, ID issues, translations, etc.', indentLevel: 1},
            {text: 'Open during daylight hours - check local listings.', indentLevel: 1},
            {
                button: 'Tap here to view nearest DRCs on map',
                action: viewDRCs,
            },
        ]
    },
    {
        type: 'section',
        title: 'Emergency Shelter Assistance',
        content: [
            {text: 'If you\'ve lost housing:', indentLevel: 0},
            {text: 'Temporary shelter vouchers may be available.', indentLevel: 1},
            {
                button: 'Find Emergency Shelters Nearby',
                action: findShelters,
            },
            {
                button: 'Request a Hotel/Motel Voucher',
                action: requestHotelVoucher, 
            }
        ]
    },
    {
        type: 'section',
        title: 'State Housing Relief',
        content: [
            {text: 'Rent subsidies for displaced residents.', indentLevel: 0},
            {text: 'Programs vary by state.', indentLevel: 0},
            {
                button: 'Tap to check if your state has emergency housing grants',
                action: checkHousingGrants, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Financial Relief Options',
        content: [
            {text:  'SBA Low-Interest Disaster Loans', indentLevel: 0},
            {text: 'Up to $200K for home repair', indentLevel: 1},
            {text: 'Up to $40K for personal property', indentLevel: 1},
            {text: 'Up to $2M for small businesses', indentLevel: 1},
            {
                button: 'Apply through SBA Disaster Portal',
                action: applySBA, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Rental & Utility Assistance',
        content: [
            {text: 'Local governments and charities often fund emergency rent relief.', indentLevel: 0},
            {
                button: 'Find Rent Relief Programs in Your Zip Code',
                action: findRentReliefPrograms, 
            },
            {
                button: 'Apply For Utility Bill Forgiveness or Delay',
                action: applyUtilityBill, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Aid from Nonprofits & Faith-Based Groups',
        content: [
            {text: 'These organizations often provide emergency supplies, shelter, meals, and more:', indentLevel: 0},
            {text: 'Red Cross', indentLevel: 1},
            {text: 'Salvation Army', indentLevel: 1},
            {text: 'United Way', indentLevel: 1},
            {text: 'Local faith organizations', indentLevel: 1},
            {
                button: 'Search Local Nonprofits Offering Aid',
                action: searchNonprofits, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Special Assistance by Group',
        content: [
            {text: 'Families with Children', indentLevel: 0},
            {text: 'School districts may offer:', indentLevel: 1},
            {text: 'Free meals', indentLevel: 2},
            {text: 'Counseling for trauma', indentLevel: 2},
            {text: 'Educational supplies', indentLevel: 2},
            {
                button: 'Check Support From Your Local School District',
            },
            {text: 'Older Adults & People with Disabilities', indentLevel: 0},
            {text: 'Priority services available, including transport and medical equipment replacement.', indentLevel: 1},
            {
                button: 'Find Aging & Disability Resource Centers',
                action: findResourceCenters, 
            },
            {text: 'Undocumented & Immigrant Communities', indentLevel: 0},
            {text: 'You may still qualify for local nonprofit help.', indentLevel: 1},
            {text: 'Some states offer aid regardless of immigration status.', indentLevel: 1},
            {
                button: 'See Trusted Community Organizations',
                action: trustedCommunityOrganizations, 
            },
        ]
    },
    {
        type: 'section',
        title: 'Documents You May Need',
        content: [
            {text: 'To apply for most programs, prepare:', indentLevel: 0},
            {text: 'Photo ID (or explanation of loss)', indentLevel: 1},
            {text: 'Proof of address (can be utility bill, lease, etc.)', indentLevel: 1},
            {text: 'Photos or videos of damage', indentLevel: 1},
            {text: 'Insurance documents (if insured)', indentLevel: 1},
            {text: 'Income statements (for unemployment or rent aid)', indentLevel: 1},
            {
                button: 'Upload Documents',
            },
        ]
    },
    {
        type: 'section',
        title: 'Find Help Nearby',
        content: [
            {
                button: 'View Local Disaster Locations & Aid',
                action: viewDisasters, 
            },
            {
                button: 'Schedule Mobile Aid Team Visit',
                action: mobileAidTeamVisit, 
            },
            {
                button: 'Find Local Volunteer Groups or Caseworkers',
                action: findVolunteers, 
            },
        ]
    },
    {
        type: 'section',
        title: 'Helpful Tools',
        content: [
            {
                button: 'Disaster Aid Eligibility Checker', 
                action: disasterAidEligibilityChecker, 
            },
            {
                button: 'Text "EARTHQUAKE" to 43362 (FEMA) for mobile updates',
                action: () => Linking.openURL('sms:43362?bodyEARTHQUAKE'),
            },
            {
                button: 'Talk to our AI Summary Assistant for customized guidance',
                action: () => router.navigate('/screens/AI_Summary_AssistantScreen')
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
          {item.content?.map((line: any, idx: number) => {
            const indentLevel = typeof line === 'object' && line.indentLevel ? line.indentLevel : 0;
            const text = typeof line === 'string' ? line : line.text;
            if (text) {
              return (
                <View
                  key={idx}
                  style={[
                    styles.bulletItem,
                    { marginLeft: indentLevel * 20 },
                  ]}
                >
                  <Text style={styles.bulletDot}>{'\u2022'}</Text>
                  <Text style={styles.bulletText}>{text}</Text>
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
      <HeaderWithMenu backRoute="/screens/Earthquake_RecoveryScreen" />
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
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContainer: {
    marginBottom: 25,
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

               