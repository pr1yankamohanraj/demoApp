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

const checkForAftershocks = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://earthquake.usgs.gov/earthquakes/map/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const learnToDrop = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.shakeout.org/dropcoverholdon/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const gasLeakGuide = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.nationalinspect.com/order.html'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const checkUtilityStatus = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://pgealerts.alerts.pge.com/outagecenter/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const reportOutage = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.pge.com/en/contact-us/report-an-issue/report-electric-issue.html'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const listenToRadio = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.npr.org/about-npr/472557877/npr-program-stream'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const viewAlertsandWarnings = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.weather.gov/alerts'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const whatToPack = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.redcross.org/get-help/how-to-prepare-for-emergencies/survival-kit-supplies.html'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const findEmergencySupplies = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.feedingamerica.org/find-your-local-foodbank'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const findInspectorsNearYou = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://foundationandbasements.com/?&PartnerSourceID=SEM-13670&&&quadlink=http://o1.qnsr.com/cgi/r?;n=203;c=1685479;s=3086;x=7936;f=202405021159450;u=j;z=TIMESTAMP;campaignid=638581284;adgroupid=1263340511469539;msclkid=4c52e73fd0a712ebd3368f7cafcbd573&ad=78958886109474&ki=78959284334864&mt=p&sq=find%20structural%20inspectors%20near%20you&network=o&device=c&utm_source=bing&utm_medium=cpc&utm_campaign=638581284&utm_term=find%20structural%20inspectors%20near%20you&geo=44037&msclkid=4c52e73fd0a712ebd3368f7cafcbd573'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const scheduleSafetyInspection = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.nationalinspect.com/order.html'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };
const DATA = [
    {
        type: 'header',
        title: 'Aftershock Safety Tips & Actions',
        description: 'Stay safe after the shaking stops. This page provides essential safety tips and guidance to help you navigate the critical moments following an earthquake, including how to avoid hazards, check for injuries, and stay informed about ongoing risks.',
    },
    {
        type: 'section',
        title: 'Immediate Actions',
        content: [
            {text: 'What to Do During Aftershocks', indentLevel: 0},
            {text: 'Drop, Cover, and Hold On — protect your head and neck.', indentLevel: 1},
            {text: 'Avoid elevators and stairwells.', indentLevel: 1},
            {text: 'Check yourself and others for injuries.', indentLevel: 1},
            {
                button: 'Check for Latest Aftershocks',
                action: checkForAftershocks, 
            },
            {
                button: 'Learn How to Drop, Cover, & Hold',
                action: learnToDrop, 
            },
        ]
    },
    {
        type: 'section',
        title: 'Structural Safety',
        content: [
            {text: 'Dont re-enter a damaged building until cleared.', indentLevel: 0},
            {text: 'Check for visible cracks, leaning walls, or exposed wiring.', indentLevel: 0},
            {text: 'Open cabinets carefully — items may have shifted.', indentLevel: 0},
            {
                button: 'Find Structural Inspector Near You',
                action: findInspectorsNearYou, 
            },
            {
                button: 'Upload Damage Photo to Report',
            },
            {
                button: 'Schedule Safety Inspection',
                action: scheduleSafetyInspection, 
            },
        ]
    },
    {
        type: 'section',
        title: 'Emergency Utilities',
        content: [
            {text: 'Turn off gas if you smell leaks (dont use open flames).', indentLevel: 0},
            {text: 'Shut off main water if pipes are damaged.', indentLevel: 0},
            {text: 'Use flashlights instead of candles.', indentLevel: 0},
            {
                button: 'Gas Leak Guide',
                action: gasLeakGuide, 
            },
            {
                button: 'Check Local Utility Status',
                action: checkUtilityStatus, 
            },
            {
                button: 'Report Power Outage',
                action: reportOutage, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Stay Connected',
        content: [
            {text: 'Use text/SMS instead of calls to reduce network load.', indentLevel: 0},
            {text: 'Tune in to AM/FM emergency stations.', indentLevel: 0},
            {text: 'Get real-time notifications from trusted apps.', indentLevel: 0},
            {
                button: 'Listen to Emergency Radio (NPR Live)',
                action: listenToRadio, 
            },
            {
                button: 'View Local Alerts & Warnings',
                action: viewAlertsandWarnings, 
            },
        ]
    },
    {
        type: 'section',
        title: 'Emergency Kit & Supplies',
        content: [
            {text: 'Keep go-bag ready: water, ID, meds, flashlight, snacks.', indentLevel: 0},
            {text: 'Dont forget a phone charger.', indentLevel: 0},
            {
                button: 'Red Cross: What to Pack',
                action: whatToPack, 
            },
            {
                button: 'Find Nearby Emergency Supplies or Food Banks',
                action: findEmergencySupplies,
            },
            {
                button: 'Request Aid or Report Missing Supplies',
            },
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
    paddingTop: 10,
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
    marginTop: 20,
  },
});
