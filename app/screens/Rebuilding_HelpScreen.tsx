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

    const applyDisasterAssistance = async () => {
    try {
        await WebBrowser.openBrowserAsync('https://www.disasterassistance.gov/');
    } catch (error) {
        console.error('Failed to open browser:', error);
    }
    };

    const findContractors = async () => {
        try {
            await WebBrowser.openBrowserAsync('https://www.angi.com/');
        } catch (error) {
            console.error('Failed to open browser:', error);
        }
        };

    const utilityRepair = async () => {
        try {
            await WebBrowser.openBrowserAsync('https://www.usa.gov/help-with-energy-bills');
        } catch (error) {
            console.error('Failed to open browser:', error);
        }
        };
    
    const sbaGov = async () => {
        try {
        await WebBrowser.openBrowserAsync('https://www.sba.gov/funding-programs/disaster-assistance');
        } catch (error) {
        console.error('Failed to open browser:', error);
        }
    };

    const uploadRebuilding = async () => {
        try {
        await WebBrowser.openBrowserAsync('https://www.fema.gov/sites/default/files/documents/fema_best-way-send-disaster-documents_flyer.pdf');
        } catch (error) {
        console.error('Failed to open browser:', error);
        }
    };

    const findRebuildingNavigator = async () => {
        try {
        await WebBrowser.openBrowserAsync('https://rebuildingtogether.org/find-your-local-affiliate');
        } catch (error) {
        console.error('Failed to open browser:', error);
        }
    };

  const reportContractor = async () => {
    try {
      await WebBrowser.openBrowserAsync('https://www.justice.gov/disaster-fraud');
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const homeRepairChecklist = async () => {
    try {
      await WebBrowser.openBrowserAsync('https://www.fema.gov/sites/default/files/documents/fema_b-526-eq-safety-checklist.pdf');
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const homeownersGuide = async () => {
    try {
      await WebBrowser.openBrowserAsync('https://www.hud.gov/sites/dfiles/HH/documents/Rebuild%20Healthy%20Homes.pdf');
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const statePrograms = async () => {
    try {
      await WebBrowser.openBrowserAsync('https://www.usa.gov/state-emergency-management');
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const volunteeringGroups = async () => {
    try {
      await WebBrowser.openBrowserAsync('https://www.nvoad.org/disaster-agency-response-technology-dart/');
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };
const DATA = [
    {
        type: 'header',
        title: 'Rebuilding Help',
        description: 'If your home or property was damaged by a disaster, help is available to support repairs, rebuilding, and safety improvements. Below you\'ll find trusted programs, grants, and tools to begin your rebuilding process -  including financial aid, contractor guidance, and volunteer assistance.'
    },
    {
        type: 'section',
        title: 'Financial Help for Repairs & Rebuilding',
        content: [
            {text: 'FEMA Individual Assistance - Home Repair Grant', indentLevel: 0},
            {text: 'Covers basic structural repairs, utilities, hot water heaters, etc.', indentLevel: 1},
            {
                button: 'Apply on DisasterAssistance.gov',
                action: applyDisasterAssistance, 
            },
            {text: 'SBA Low-Interest Disaster Loans', indentLevel: 0},
            {text: 'Loans up to $200,000 for homeowners and $40,000 for personal property', indentLevel: 1},
            {
                button:  'Apply at sba.gov',
                action: sbaGov, 
            }
        ]
    },
    {
        type: 'section',
        title: 'State & Local Housing Recovery Funds',
        content: [
            {text: 'Many states offer rebuilding grants — tap to check availability in your ZIP code', indentLevel: 0},
            {
                button: 'Check State Programs',
                action: statePrograms, 
            },
            {text: 'Utility Restoration Aid', indentLevel: 0},
            {text: 'Help reconnect electricity, water, and gas services', indentLevel: 1},
            {
                button: 'Request Utility Repair Assistance',
                action: utilityRepair, 
            }
        ]
    },
    {
        type: 'section', 
        title: 'Licensed Contractor Support',
        content: [
            {text: 'Find Verified Contractors', indentLevel: 0},
            {text: 'Use this tool to find licensed and vetted contractors near you', indentLevel: 1},
            {
                button: 'Find Local Contractors',
                action: findContractors, 
            }, 
        ]
    },
    {
        type: 'section',
        title: 'Avoid Scams',
        content: [
           {text: 'Tips:', indentLevel: 0},
           {text: 'Always get written estimates', indentLevel: 1},
           {text: 'Dont pay large sums upfront', indentLevel: 1},
           {text: 'Check license + reviews', indentLevel: 1},
           {text: 'Report Fraud', indentLevel: 1},
           {
                button: 'Report Fraudulent Contractor',
                action: reportContractor, 
           },
        ]
    },
    {
        type: 'section',
        title: 'Volunteering & Community Rebuilding',
        content: [
            {text: 'Nonprofits Offering Home Repair Help', indentLevel: 0},
            {text: 'Organizations like:', indentLevel: 1},
            {text: 'All Hands and Hearts', indentLevel: 2},
            {text: 'Habitat for Humanity Disaster Response', indentLevel: 2},
            {text: 'Team Rubicon', indentLevel: 2},
            {
                button: 'See Volunteer Groups in My Area',
                action: volunteeringGroups, 
            },
        ]
    },
    {
        type: 'section',
        title: 'Document & Photo Upload',
        content: [
            {text: 'Keep receipts, before/after photos, and insurance records', indentLevel: 0},
            {
                button: 'Upload Rebuilding Photos or Receipts',
                action: uploadRebuilding, 
            },
        ]
    },
    {
        type: 'section',
        title: 'Tools & Guides',
        content: [
            {
                button: 'Printable Home Repair Checklist',
                action: homeRepairChecklist, 
            },
            {
                button: 'Homeowners Guide to Safe Rebuilding',
                action: homeownersGuide, 
            },
            {
                button: 'Map of Building Permit Offices Near Me',
            }
        ]
    },
    {
        type: 'section',
        title: 'Need Help Now?',
        content: [
            {
                button: 'Talk to a Caseworker',
                action: () => Linking.openURL('tel: 18009855990')
            },
            {
                button: 'Find a Rebuilding Navigator',
                action: findRebuildingNavigator, 
            },
            {
                button: 'Text “EARTHQUAKE” to 43362 (FEMA)',
                action: () => Linking.openURL('sms:43362?body=EARTHQUAKE')
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
    marginTop: 2,
  },
  button: {
    backgroundColor: '#0A4E78',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 10,
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
    marginTop: 0, // Remove default top margin
  },
});
