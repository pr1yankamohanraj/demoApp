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

  const replaceDocuments = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.usa.gov/replace-vital-documents'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const readyGov = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.ready.gov/tornadoes'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const redCross = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/tornado.html'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const cleanupAssistance = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.salvationarmyusa.org/disaster-relief/tornado-relief/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const communityReliefFunds = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.unitedway.org/our-impact/community-resiliency/disaster-recovery?utm_source=bing&utm_medium=paid&utm_campaign=disasterrecovery&utm_content=nonbrand&msclkid=5760f5b95df51a17d5819dfc17f876ac'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const applyFEMA = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.disasterassistance.gov/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const stateDisasterPrograms = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.usa.gov/state-emergency-management'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const hotelVoucher = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.femaemergencyhotels.com/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const temporaryHousing = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.hud.gov/states'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const utilityRepair = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.osmose.com/storm-response-solutions'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };
  
  const utilityAid = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://home.treasury.gov/policy-issues/coronavirus/assistance-for-state-local-and-tribal-governments/emergency-rental-assistance-program'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const repairAid = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/assistance/individual/housing'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const foodBanks = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.feedingamerica.org/find-your-local-foodbank'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const foodAid = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.disasterassistance.gov/get-assistance/forms-of-assistance/5769'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const team = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.nvoad.org/members/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const applyTornado = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.disasterassistance.gov/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const requestTemporaryHousing = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/assistance/individual/sheltering-housing-options'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const openRelief = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.redcross.org/get-help/disaster-relief-and-recovery-services/find-an-open-shelter.html'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const recoveryGuide = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/pdf/areyouready/recovering_from_disaster.pdf'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const checklist = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.ready.gov/sites/default/files/2020-03/fema_how-to-prepare-for-hurricane.pdf'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };
const DATA = [
    {
        type: 'header',
        title: 'Get Aid After a Hurricane or Tornado',
        description: 'Find emergency shelters, medical help, food, and financial support quickly during hurricanes and tornados. Get connected to trusted aid resources to stay safe and recover faster.',
    },
    {
        type: 'section',
        title: 'Federal & State Disaster Aid',
        content: [
            {text: 'FEMA Hurricane Relief Assistance', indentLevel: 0},
            {text: 'Covers temporary housing, home repairs, personal property loss, and medical needs.', indentLevel: 1},
            {text: 'Must be in a federally declared disaster area.', indentLevel: 1},
            {text: 'Requires basic info and damage documentation.', indentLevel: 1},
            {
                button: 'Apply for FEMA Aid',
                action: applyFEMA, 
            },
            {text: 'State-Specific Recovery Programs', indentLevel: 0},
            {text: 'Many states offer grants, rental assistance, or evacuation reimbursements.',indentLevel: 1},
            {
                button: 'Check State Disaster Programs',
                action: stateDisasterPrograms, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Emergency Shelter & Housing Help',
        content: [
            {text: 'Emergency Shelters (Open Now)', indentLevel: 0},
            {text: 'Find nearby public shelters with real-time capacity updates.', indentLevel: 1},
            {text: 'Includes pet-friendly and accessible locations.', indentLevel: 1},
            {
                button: 'View Shelter Map + Status',
            },
        ]
    },
    {
        type: 'section',
        title: 'Hotel/Motel Voucher Program',
        content: [
            {text: 'Short-term lodging assistance when shelters are full.', indentLevel: 0},
            {
                button: 'Request Hotel Voucher',
                action: hotelVoucher, 
            },
        ]
    },
    {
        type: 'section',
        title: 'Emergency Housing Grants',
        content: [
            {text: 'Some states offer rental aid or temporary housing stipends.', indentLevel: 0},
            {
                button: 'Check My State',
                action: temporaryHousing, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Food, Water & Essential Supplies',
        content: [
            {text: 'Disaster Food Assistance (SNAP/WIC)', indentLevel: 0},
            {text: 'Expanded benefits for low-income families and individuals.', indentLevel: 1},
            {text: 'Often includes pre-loaded EBT cards.', indentLevel: 1},
            {
                button: 'Apply for Food Aid',
                action: foodAid,
            },
            {text: 'Find Local Food Banks & Distribution Points', indentLevel: 0}, 
            {text: 'Locate mobile meal trucks, supply stations, and nonprofits providing essentials.', indentLevel: 1},
            {
                button: 'Find Emergency Supplies Nearby',
                action: foodBanks, 
            },
        ]
    },
    {
        type: 'section',
        title: 'Repairs, Cleanup & Recovery Help',
        content: [
            {text: 'Apply for Home Repair Aid (FEMA)', indentLevel: 0},
            {text: 'Covers essential repairs: roofing, plumbing, electrical, and structural safety.', indentLevel: 1},
            {
                button: 'Apply for Repair Aid',
                action: repairAid, 
            },
            {text: 'Volunteer Cleanup Teams', indentLevel: 0},
            {text: 'Local orgs and nonprofits can help with yard debris, mold cleanup, and minor rebuilding.', indentLevel: 1},
            {
                button: 'Request a Team Visit',
                action: team,
            },
        ]
    },
    {
        type: 'section', 
        title: 'Upload Damage Photos for Insurance or FEMA',
        content: [
            {text: 'Helps support your claim and speed up review.', indentLevel: 0},
            {
                button: 'Upload Damage Documentation',
            },
        ]
    },
    {
        type: 'section',
        title: 'Utility & Rent Assistance',
        content: [
            {text: 'Rent, Mortgage, and Utility Bill Relief', indentLevel: 0},
            {text: 'Some areas offer payment deferral, grants, or forgiveness.', indentLevel: 1},
            {
                button: 'Find Local Rent/Utility Aid',
                action: utilityAid, 
            },
            {text: 'Apply for Utility Reconnection or Repair', indentLevel: 0},
            {text: 'Electricity, water, and gas repair assistance for hurricane-damaged homes.', indentLevel: 1},
            {
                button: 'Request Utility Repair',
                action: utilityRepair, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Talk to a Human',
        content: [
            {text: 'Connect with a Caseworker or Recovery Navigator', indentLevel: 0},
            {text: 'Get 1-on-1 support for applying, planning, or just being heard.', indentLevel: 0},
            {
                button: 'Talk to a Caseworker',
                action: () => Linking.openURL('tel:18006213362'),
            }
        ]
    },
    {
        type: 'section',
        title: 'Real-Time Mobile Updates',
        content: [
            {text:'Text “HURRICANE” to 43362 (FEMA) for updates and alerts.', indentLevel: 0},
            {
                button: 'Text',
                action: () => Linking.openURL('sms:43362?body=HURRICANE'),
            },
        ]
    },
    {
        type: 'section',
        title: 'Navigation & Extras',
        content: [
            {text: 'View Local Relief Centers', indentLevel: 0},
            {text: 'Includes shelters, food stations, supply hubs, and FEMA booths.', indentLevel: 1},
            {
                button: 'Open Relief Center Map',
                action: openRelief, 
            },
            {text: 'Recovery Timeline', indentLevel: 0},
            {text: 'Know what to expect over the next 30-90 days after a hurricane.', indentLevel: 1},
            {
                button: 'View Step-by-Step Recovery Guide',
                action: recoveryGuide, 
            },
            {text: 'Printable Hurricane Recovery Checklist', indentLevel: 0},
            {text: 'Stay organized with documents, photos, contacts, and steps.', indentLevel: 1},
            {
                button: 'Download Checklist',
                action: checklist, 
            },
        ]
    },
    {
        type: 'section',
        title: 'FEMA Tornado Disaster Assistance',
        content: [
            {text: 'Covers home damage, relocation needs, personal items, and medical expenses.', indentLevel:0},
            {text: 'Available for federally declared tornado disaster zones.', indentLevel: 0},
            {
                button: 'Apply for FEMA Tornado Aid',
                action: applyTornado, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Temporary Shelter & Hotel Vouchers',
        content: [
            {text: 'Local governments may offer hotel stays if tornado shelters are unavailable.', indentLevel: 0},
            {
                button: 'Request Temporary Housing',
                action: requestTemporaryHousing, 
            },
        ]
    },
    {
        type: 'section',
        title: 'Tornado Debris Cleanup Help',
        content: [
            {text: 'Volunteer organizations and city services may assist with yard and home debris.', indentLevel: 0},
            {
                button: 'Request Cleanup Assistance',
                action: cleanupAssistance, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Replace Vital Documents',
        content: [
            {text: 'Tornadoes often destroy personal documents. You can request replacements through federal and state services.', indentLevel: 0},
            {
                button: 'Replace Lost IDs & Documents',
                action: replaceDocuments, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Local Tornado Relief Funds',
        content: [
            {text: 'Local nonprofits and churches often launch recovery grants after major tornadoes.', indentLevel: 0},
            {
                button: 'Search Community Relief Funds',
                action: communityReliefFunds, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Tornado Recovery Tips',
        content: [
            {
                button: 'Ready.gov Tornado Recovery',
                action: readyGov, 
            },
            {
                button: 'Red Cross Tornado Help',
                action: redCross,
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
          {Array.isArray(item.content) &&
          item.content.map((line: any, idx: number) => {
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
