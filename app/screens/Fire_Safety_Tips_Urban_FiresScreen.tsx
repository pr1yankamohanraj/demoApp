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

const viewFireTips = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/fire.html#what-to-do'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const checkFireReadiness = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.usfa.fema.gov/downloads/pdf/publications/home-fire-safety-poster-brochure.pdf'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const checkHomeFireHazards = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/fire/is-your-home-a-fire-hazard.html?srsltid=AfmBOooM2NV9oy4vQXoCRt7WB20eqxZboZuq6c9JxATxSBITntDH8xrZ'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const learnSmokeAlarmSafety = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.nfpa.org/education-and-research/home-fire-safety/smoke-alarms',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const homeFireEscapePlan = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.usfa.fema.gov/prevention/home-fires/prepare-for-fire/home-fire-escape-plans/',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const startFirePlan = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.smartdraw.com/evacuation-plan/evacuation-plan-software.htm?id=346544&msclkid=1c79a5b1eb291ba9919dcd8d39d8b994',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const makeEmergencyPlan = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.nfpa.org/downloadable-resources/pdf/how-to-make-a-home-fire-escape-plan',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };
const DATA = [
    {
        type: 'header',
        title: 'Fire Safety Tips for Urban Fires & Building Emergencies',
        description: 'Living in shared buildings brings unique fire risks. These safety tips can help protect you, your family, and your neighbors.',
    },
    {
        type: 'section', 
        title: 'Know All Your Exit Routes',
        content: [
            'Identify at least two ways out of your unit — the main door and an alternate (e.g. stairwell, fire escape).',
            'Never use elevators during a fire — always use stairs.',
            'If your main exit is blocked, stay low, seal doors, and signal from a window.',
            {
                button: 'Home Fire Escape Plan',
                action: homeFireEscapePlan, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Check Smoke Alarms Monthly',
        content: [
            'Your building should have working smoke alarms in every unit and hallway.',
            'Press the test button monthly and replace batteries twice a year.',
            'Report non-functioning alarms immediately to your landlord or building manager.',
            {
                button: 'Learn Smoke Alarm Safety',
                action: learnSmokeAlarmSafety, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Practice Fire Drills — Especially With Kids',
        content: [
            'Know your building\'s evacuation procedures and where to meet after escaping.',
            'Practice how to crawl low under smoke and how to feel doors for heat.',
            'Teach kids how and when to use "Stop, Drop, and Roll."',
            {
                button: 'Start a Family Fire Plan',
                action: startFirePlan, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Use Appliances and Outlets Safely',
        content: [
            'Don\'t overload power strips or outlets — fires often start from electrical issues.',
            'Never leave space heaters, stoves, or candles unattended.',
            'Keep flammable items at least 3 feet from heat sources.',
            {
                button: 'Check Home Fire Hazards',
                action: checkHomeFireHazards, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Know What NOT to Do in a Fire',
        content: [
            'Don\'t open hot doors — fire may be on the other side.',
            'Don\'t break windows unless escape is necessary — it can feed the fire oxygen.',
            'Don\'t go back in once you\'ve escaped — wait for firefighters.',
            {
                button: 'View Fire Survival Tips',
                action: viewFireTips,
            }
        ]
    },
    {
        type: 'section',
        title: 'Understand Your Building\'s Fire Safety Features',
        content: [
            'Know where fire extinguishers, sprinklers, and emergency exits are located.',
            'Ask your building manager if stairwells are pressurized or if theres an emergency generator.',
            'Make sure your door is self-closing and fire-rated — these are lifesaving.',
            {
                button: 'Check Your Building\'s Fire Readiness',
                action: checkFireReadiness,
            }
        ]
    },
    {
        type: 'section',
        title: 'Be Ready Mentally — Fires Happen Fast',
        content: [
            'Fires in high-density buildings can spread rapidly and trap multiple families.',
            'Prepare emotionally to act quickly — keep go-bags and vital documents near your exit.',
            'Know who needs help: kids, seniors, people with mobility limitations.',
            {
                button: 'Make a Fire Emergency Plan',
                action: makeEmergencyPlan, 
            }
        ]
    }
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
    paddingBottom: 100,
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
