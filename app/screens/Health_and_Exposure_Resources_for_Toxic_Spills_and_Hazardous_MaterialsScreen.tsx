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

const commonSymptoms = async () => {
      try {
        await WebBrowser.openBrowserAsync(
          'https://www.cdc.gov/chemical-emergencies/chemical-fact-sheets/riot-control-agents.html',
        );
      } catch (error) {
        console.error('Failed to open browser:', error);
      }
    };

const airQuality = async () => {
      try {
        await WebBrowser.openBrowserAsync(
          'https://www.airnow.gov/',
        );
      } catch (error) {
        console.error('Failed to open browser:', error);
      }
    };

  const exposureTracking = async () => {
      try {
        await WebBrowser.openBrowserAsync(
          'https://www.atsdr.cdc.gov/programs/rapid-response-registry.html',
        );
      } catch (error) {
        console.error('Failed to open browser:', error);
      }
    };

  const decontamination = async () => {
      try {
        await WebBrowser.openBrowserAsync(
          'https://www.cdc.gov/radiation-emergencies/infographic/decontamination.html#:~:text=Use%20a%20moist%20wipe%2C%20clean,cloth%2C%20or%20damp%20paper%20towel.',
        );
      } catch (error) {
        console.error('Failed to open browser:', error);
      }
    }; 
  
    const localWater = async () => {
      try {
        await WebBrowser.openBrowserAsync(
          'https://enviro.epa.gov/envirofacts/sdwis/search',
        );
      } catch (error) {
        console.error('Failed to open browser:', error);
      }
    };
const DATA = [
    {
        type: 'header',
        title: 'Health & Exposure Resources: Toxic Spills and Hazardous Materials',
        description: 'If you were near a chemical spill, explosion, or industrial accident, you may have been exposed to harmful substances. Use these resources to check symptoms, get screened, and protect your long-term health.',
    },
    {
        type: 'section', 
        title: 'Get a Free Exposure Health Screening',
        content: [
            'After a toxic event, public health agencies may offer free or subsidized health checks.',
            'Screenings may include respiratory tests, blood work, and skin checks.', 
            'Mobile clinics are often set up near the affected zone.',
            {
                button: 'Find a Nearby Health Screening',
            }
        ]
    },
    {
        type: 'section',
        title: 'Know the Symptoms of Chemical Exposure',
        content: [
            'Common signs include: headaches, nausea, dizziness, throat/breathing irritation, skin burns, or rashes.',
            'Delayed symptoms are possible — monitor your health over time.',
            'Seek medical care right away if symptoms worsen.',
            {
                button: 'View Common Exposure Symptoms',
                action: commonSymptoms, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Learn How to Decontaminate Yourself Safely',
        content: [
            'If exposed, remove and seal clothing in a plastic bag. Wash skin with soap and water.',
            'Do NOT use harsh chemicals to clean skin — they can make it worse.',
            'Pets and service animals may also need decontamination.',
            {
                button: 'See Decontamination Steps',
                action: decontamination, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Protect Your Lungs and Air Quality',
        content: [
            'Stay indoors with windows closed and use an air purifier if available.',
            'Wear an N95 mask outside if advised by authorities.',
            'People with asthma, COPD, or heart conditions are especially at risk.',
            {
                button: 'Check Air Quality Safety + Tips',
                action: airQuality,

            }
        ]
    },
    {
        type: 'section',
        title: 'Understand Water and Soil Contamination Risks',
        content: [
            'Spills can seep into water supplies or soil. Avoid drinking tap water until it’s cleared as safe.',
            'Don’t garden, touch runoff, or let kids/pets play in affected areas until testing is complete.',
            {
                button: 'Check Local Water Advisories',
                action: localWater, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Call Poison Control or a Toxin Helpline',
        content: [
           'If you believe you’ve been exposed and need immediate guidance, call:',
           {
                button: 'National Poison Control Center: 1-800-222-1222',
                action: () => Linking.openURL('tel:18002221222'),
           },
           {
            button: 'ATSDR ToxFAQs for chemical-specific info',
            action: () => Linking.openURL('tel:18884228737'),
           },
        ]
    },
    {
        type: 'section',
        title: 'Get Mental Health Support for Toxic Exposure Stress',
        content: [
            'Feeling anxious, helpless, or panicked after a spill is common.',
            'Support is available to help you cope with the uncertainty and health fears.',
            {
                button: 'Connect with Crisis Counseling',
                action: () => Linking.openURL('tel:988')
            }
        ]
    },
    {
        type: 'section',
        title: 'Join an Exposure Monitoring Program',
        content: [
            'Some areas offer long-term health tracking for people affected by chemical disasters.',
            'This can help detect future health issues and support claims or benefits.',
            {
                button: 'Sign Up for Exposure Tracking',
                action: exposureTracking,
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
