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
;

const applySBA = async () => {
  try {
    await WebBrowser.openBrowserAsync(
      'https://www.sba.gov/document/sba-form-5c-disaster-home-loan-application'
    );
  } catch (error) {
    console.error('Failed to open browser:', error);
  }
};

const scheduleCall = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/about/contact'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const exploreResilientHomes = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://flash.org/buyers-guide-to-resilient-homes/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const viewRebuildingGuide = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.hud.gov/sites/dfiles/SFH/documents/MO_203h_Program_Consumer_FS.pdf?'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const reportUnlicensedContractors = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/about/offices/security/disaster-fraud'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

const DATA = [
    {
        type: 'header',
        title: 'Rebuilding After Hurricanes & Tornados',
        description: 'Whether your roof blew off, water flooded your home, or your structure was severely damaged, recovery is possible — and help is here. This page provides financial support, repair tools, safe rebuilding guides, and access to trusted help in your area.'
    },
    {
      type: 'section',
      title: 'Financial Support for Repairs & Rebuilding',
      content: [
        {text: 'FEMA Individual Assistance (IA) can help pay for home repairs after a disaster.', indentLevel: 0},
        {text: 'Covers structural damage like roofing, walls, floors, and water-damaged systems (electrical, plumbing, HVAC).', indentLevel: 1},
        {text: 'Also helps restore accessibility features, including ramps and widened doors if they were damaged.', indentLevel: 1}, 
        {text: 'Typical grants range from $3,000 to $36,000 depending on damage and documentation provided.', indentLevel: 1},
      ]
    },
    {
        type: 'section',
        title: 'State-Level Recovery Grants',
        content: [
            {text: 'States like Florida, Louisiana, and Oklahoma often provide supplemental repair grants.', indentLevel: 0},
            {text: 'These may be available even if FEMA has denied part of your claim.', indentLevel: 1},
            {text: 'Find My State\'s Repair Programs', indentLevel: 0},
            {
                button: 'Find',
            },
        ]
    },
    {
        type: 'section',
        title: 'SBA Disaster Loans',
        content: [
            {text: 'Long-term, low-interest loans for uninsured or underinsured losses.', indentLevel: 0},
            {text: 'Covers primary residence, secondary structures, and even personal belongings.', indentLevel: 0},
            {
                button: 'Apply for SBA Home Disaster Loans',
                action: applySBA,
            },
        ]
    },
    {
        type:'section',
        title: 'Find Trusted Repair Help',
        content: [
            {text: "Find Licensed Local Contractors", indentLevel: 0},
            {text: 'Use verified, state-licensed contractors to avoid scams or code violations.', indentLevel: 0},
            {text: 'Search Verified Contractors Near Me', indentLevel: 0},
            {
                button: 'Search',
            }
        ]
    },
    {
        type: 'section',
        title: 'Report Unlicensed or Predatory Contractors',
        content: [
            {text: 'Fraud is common after disasters. Help protect others and recover your losses.', indentLevel: 0},
            {text: 'Report Contractor Fraud or Scams', indentLevel: 0},
            {
                button: 'Report',
                action: reportUnlicensedContractors,
            }
        ]
    },
    {
        type: 'section',
        title: 'Volunteer Repair Groups',
        content: [
            {text: "Faith-based groups, disaster nonprofits, and local orgs may assist with:", indentLevel: 0},
            {text: 'Mold removal', indentLevel: 1},
            {text: 'Minor roofing or drywall repair', indentLevel: 1},
            {text: 'Home cleanup and debris removal', indentLevel: 1},
            {text: 'Request Volunteer Help', indentLevel: 1},
            {
                button: 'Request',
            }
        ]
    },
    {
        type: 'section',
        title: 'Documenting Your Damage',
        content: [
            {text: "Upload Before-and-After Photos", indentLevel: 0},
            {text: 'Required for most FEMA claims and insurance reports.', indentLevel: 0},
            {text: "Take clear, timestamped photos of:", indentLevel: 0},
            {text: 'Structural damage', indentLevel: 1},
            {text: 'Mold, flood lines, debris', indentLevel: 1},
            {text: 'Removed materials and receipts', indentLevel: 1},
            {text: 'Upload Damage Photos or Receipts', indentLevel: 0},
            {
                button: 'Upload',
            },
        ]
    },
    {
        type: 'section',
        title: 'Save Insurance Policies & Estimates',
        content: [
            {text: 'Keep adjuster emails, claim numbers, and payout estimates stored securely.', indentLevel: 0},
            {
                button: 'Open My Document Vault',
            }
        ]
    },
    {
        type: 'section',
        title: 'Tools, Checklists & Building Guidance',
        content: [
            {text: "Printable Home Repair Checklist", indentLevel: 0},
            {text: "Use this to track:", indentLevel: 1},
            {text: 'Completed repairs', indentLevel: 2},
            {text: 'Receipts', indentLevel: 2},
            {text: 'Permits pulled', indentLevel: 2},
            {text: 'Contractor contacts', indentLevel: 2},
            {text: 'Download Home Repair Checklist', indentLevel: 0},
            {
                button: 'Download',
            }

        ]
    },
    {
        type: 'section',
        title: 'Safe Rebuilding Guide',
        content: [
            {text: 'Covers safe materials, hazard-resistant upgrades, and red flags to avoid.', indentLevel: 0},
            {text: 'For hurricanes: wind-rated roofing, sealed windows, elevated HVAC.', indentLevel: 0},
            {text: 'For tornadoes: reinforced safe rooms, anchoring systems.', indentLevel: 0},
            {text: 'View Homeowner\'s Rebuilding Guide', indentLevel: 0},
            {
                button: 'View',
                action: viewRebuildingGuide,
            }
        ]
    },
    {
        type: 'section',
        title: 'Map of Permit Offices',
        content: [
            {text: 'You may need permits for structural repairs, HVAC, or electrical work.', indentLevel: 0},
            {text: 'Avoid delays by finding your local office and hours.', indentLevel: 0},
            {
                button: 'Find Building Permit Office Near Me',
            }
        ]
    },
    {
       type: 'section', 
       title: 'Resilience Planning (Build Back Safer)',
        content: [
            {text: "Tornado-Resistant Retrofit Ideas", indentLevel: 0},
            {text: 'Add a storm-safe room or in-home shelter.', indentLevel: 1},
            {text: 'Use Simpson Strong-Tie connectors and wind-rated garage doors.', indentLevel: 1},
            {text: "Hurricane-Resistant Construction", indentLevel: 0},
            {text: 'Elevate electrical systems, install hurricane straps, and use flood-resistant drywall.', indentLevel: 1},
            {text: 'Consider installing vented flood openings in crawl spaces.', indentLevel: 1},
            {
                button: 'Explore Disaster-Resilient Home Designs',
                action: exploreResilientHomes,
            }
        ]
    },
    {
        type: 'section',
        title: 'Human Help When You Need It',
        content: [
          {text: "Talk to a Rebuilding Navigator", indentLevel: 0},
            {text: "Rebuilding Navigators can:", indentLevel: 1},
            {text: 'Help interpret insurance or FEMA decisions', indentLevel: 2},
            {text: 'Connect you to local funding', indentLevel: 2},
            {text: 'Help you plan your next steps', indentLevel: 2},
            {
                button: 'Schedule a Call with a Caseworker',
                action: scheduleCall,
            },
            {text: "Live Support", indentLevel: 0},
            {text: 'You can also text “REBUILD” to 43362 (FEMA) for real-time tips and updates.', indentLevel: 1},
            {
               button: 'REBUILD',
               action: () => Linking.openURL('sms:43362?body=REBUILD')
            }
        ],
    },
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
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContainer: {
    marginBottom: 0,
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
    marginTop: 20,
  },
});
