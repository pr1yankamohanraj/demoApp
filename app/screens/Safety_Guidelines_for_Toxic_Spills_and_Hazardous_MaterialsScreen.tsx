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

const followDecontamination = async () => {
      try {
        await WebBrowser.openBrowserAsync(
          'https://www.fema.gov/cbrn-tools/key-planning-factors-chemical-incident/kpf4/3/3-2',
        );
      } catch (error) {
        console.error('Failed to open browser:', error);
      }
    };

const seeWhatToAvoid = async () => {
      try {
        await WebBrowser.openBrowserAsync(
          'https://a-otc.com/toxic-spill-clean-up/',
        );
      } catch (error) {
        console.error('Failed to open browser:', error);
      }
    };
const getSupport = async () => {
      try {
        await WebBrowser.openBrowserAsync(
          'https://www.samhsa.gov/find-help/helplines/disaster-distress-helpline',
        );
      } catch (error) {
        console.error('Failed to open browser:', error);
      }
    };

const learnShelter = async () => {
      try {
        await WebBrowser.openBrowserAsync(
          'https://www.ready.gov/shelter',
        );
      } catch (error) {
        console.error('Failed to open browser:', error);
      }
    };

const safeDistances = async () => {
      try {
        await WebBrowser.openBrowserAsync(
          'https://chemm.hhs.gov/threatzone.htm',
        );
      } catch (error) {
        console.error('Failed to open browser:', error);
      }
    };

const breathingProtection = async () => {
      try {
        await WebBrowser.openBrowserAsync(
          'https://www.osha.gov/respiratory-protection',
        );
      } catch (error) {
        console.error('Failed to open browser:', error);
      }
    };
    
const evacuation = async () => {
      try {
        await WebBrowser.openBrowserAsync(
          'https://emergency.weill.cornell.edu/spills',
        );
      } catch (error) {
        console.error('Failed to open browser:', error);
      }
    };
const DATA = [
    {
        type: 'header',
        title: 'Safety Guidelines: Toxic Spills & Hazardous Materials',
        description: 'Toxic spills and chemical releases can cause serious harm in seconds. Follow these critical safety steps to protect yourself and others from exposure to hazardous substances.',
    },
    {
        type: 'section',
        title: 'Stay Away From the Spill Zone',
        content: [
            'Do not enter the area unless you are told it is safe.',
            'Toxic fumes may be odorless and invisible — stay far back even if you see no smoke.',
            'If already nearby, move upwind and uphill to avoid drifting gases or runoff.',
            {
                button: 'See Safe Distance Rules',
                action: safeDistances, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Evacuate Immediately If Ordered',
        content: [
            'Follow instructions from fire, police, or emergency alerts — don’t delay.',
            'Grab only essentials: ID, phone, keys, medication.',
            'Don’t drive through smoke, foam, or chemical runoff.',
            {
                button: 'Check Evacuation Best Practices',
                action: evacuation, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Shelter-in-Place If Told to Stay Indoors',
        content: [
            'Shut all windows and doors tightly.',
            'Turn off HVAC systems, fans, and vents to avoid drawing in contaminated air.',
            'Use duct tape and towels to seal cracks and doors if advised.',
            {
                button: 'Learn Indoor Sealing Tips',
                action: learnShelter, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Decontaminate After Possible Exposure',
        content: [
            'Remove outer clothing and seal it in a plastic bag.',
            'Wash exposed skin gently with soap and cool water.',
            'Avoid touching eyes, nose, or mouth before cleaning up.',
            {
                button: 'Follow Decontamination Steps',
                action: followDecontamination, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Protect Your Breathing',
        content: [
            'Use an N95 mask if you must go outside — do not rely on cloth masks.',
            'For strong chemical smells or burning eyes, evacuate if safe to do so.',
            'Respirators or oxygen may be needed for severe exposure.',
            {
                button: 'Learn Breathing Protection Tips',
                action: breathingProtection, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Report the Spill or Exposure',
        content: [
            'Call 911 for emergencies or if anyone is in danger.',
            'For non-urgent chemical sightings or leaks, contact:',
            {
                button: 'EPA National Response Center: 1-800-424-8802',
                action: () => Linking.openURL('tel:18004248802')
            },
            'Your local hazardous materials team',
            {
                button: 'Know Who to Call',
            },
        ]
    },
    {
        type: 'section',
        title: '🧪 Avoid Contaminated Water, Soil, or Objects',
        content: [
            'Don’t let kids or pets near puddles, soot, ash, or strange powders.',
            'Don’t touch objects that may have been exposed (furniture, tools, produce).',
            'Avoid gardening, cleaning, or washing affected areas yourself.',
            {
                button: 'See What to Avoid After a Spill',
                action: seeWhatToAvoid, 
            }
        ]
    },
    {
        type: 'section',
        title: '🧠 Take Care of Your Mental Health',
        content: [
            'Chemical events are traumatic — it’s okay to feel afraid, angry, or overwhelmed.',
            'Reach out for help even if you don’t feel sick physically.',
            'Watch for signs of delayed stress or anxiety in yourself or others.',
            {
                button: 'Get Coping Support Now',
                action: getSupport,
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
      <View style={{top: -50, left: -20, width: 405}}>
                    <HeaderWithMenu backRoute="/screens/Toxic_Spills_and_Hazardous_MaterialsScreen" /> 
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
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingTop: 45,
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
