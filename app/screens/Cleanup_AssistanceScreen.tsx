import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

    const scheduleTest = async () => {
          try {
            await WebBrowser.openBrowserAsync(
              'https://www.vertenviro.com/en/blog/environmental-testing-key-to-rebuilding-after-disasters',
            );
          } catch (error) {
            console.error('Failed to open browser:', error);
          }
        };
    const getCleanupHelp = async () => {
        try {
            await WebBrowser.openBrowserAsync(
              'https://www.environmental-expert.com/companies',
            );
        } catch (error) {
          console.error('Failed to open browser:', error);
        }
      };
      
    const applyForHazardCleanup = async () => {
      try {
        await WebBrowser.openBrowserAsync(
          'https://www.epa.gov/fedfunds/hazard-mitigation-grant-program-hmgp',
        );
      } catch (error) {
        console.error('Failed to open browser:', error);
      }
    };

    const getMentalHealthSupport = async () => {
      try {
        await WebBrowser.openBrowserAsync(
          'https://988lifeline.org/',
        );
      } catch (error) {
        console.error('Failed to open browser:', error);
      }
    };

    const cleanup = async () => {
      try {
        await WebBrowser.openBrowserAsync(
          'https://www.epa.gov/cleanups',
        );
      } catch (error) {
        console.error('Failed to open browser:', error);
      }
    };

    const report = async () => {
      try {
        await WebBrowser.openBrowserAsync(
          'https://echo.epa.gov/report-environmental-violations',
        );
      } catch (error) {
        console.error('Failed to open browser:', error);
      }
    };
const DATA = [
    {
        type: 'header',
        title: 'Cleanup Assistance: Toxic Spills & Hazardous Materials',
        description: 'Cleanup after a chemical or hazardous materials incident is dangerous and should never be done alone. Here’s how to access professional help and protect your home, family, and community.',
    },
    {
        type: 'section',
        title: 'Never Try to Clean a Toxic Spill Yourself',
        content: [
            'Many chemical residues are invisible but highly harmful to touch or breathe.',
            'Only certified HazMat crews should clean up contaminated areas.',
            'Even surfaces that “look fine” may still be toxic.',
            {
                button: 'Request Official Cleanup Help',
                action: getCleanupHelp, 
            }  
        ]
    },
    {
        type: 'section',
        title: 'Check If Cleanup Is Already In Progress',
        content: [
            'Government or industrial teams may be handling area-wide decontamination.',
            'Contact your local emergency management office or public health department for updates.',
            'Avoid re-entering evacuated zones until officials declare them safe.',
            {
                button: 'See Cleanup Status in Your Area',
            }
        ]
    },
    {
        type: 'section',
        title: 'Request Home or Property Testing',
        content: [
            'If you think your home, yard, or water supply was affected, request environmental testing.',
            'Soil, air, dust, and water samples may reveal hidden dangers.',
            'Testing may be free in declared disaster zones.',
            {
                button: 'Schedule a Property Exposure Test',
                action: scheduleTest, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Report Uncleaned or Mishandled Areas',
        content: [
            'If hazardous materials are left behind or cleanups are done improperly, report it immediately.',
            'Look for oily residue, unusual smells, dying plants, or ill animals as signs of contamination.',
            'Improper cleanup can create long-term health risks for neighbors.',
            {
                button: 'Report Unsafe Cleanup Conditions',
                action: report, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Apply for Cleanup Financial Assistance',
        content: [
            'FEMA, EPA, or state programs may offer aid for cleanup costs — especially if youre uninsured.',
            'Some grants cover professional remediation, storage replacement, and safety inspections.',
            'Keep all receipts and documentation of damage.',
            {
                button: 'Apply for Hazard Cleanup Aid',
                action: applyForHazardCleanup, 
            }
        ]
    },
    {
        type: 'section', 
        title: 'Use Verified Environmental Contractors',
        content: [
            'Only hire contractors certified in HazMat cleanup, environmental safety, or industrial decontamination.',
            'Ask for credentials and safety plans before allowing anyone to clean your property.',
            'Beware of scammers offering "cheap" toxic cleanup.',
            {
                button: 'Find Certified Cleanup Teams',
                action: cleanup,
            }
        ]
    },
    {
        type: 'section',
        title: 'Emotional Support for Contaminated Homes',
        content: [
            'It’s emotionally exhausting to deal with a hazardous home — and it may not feel like home anymore.',
            'Support is available for displaced residents, renters in limbo, and families worried about long-term health effects.',
            {
                button: 'Get Mental Health Support',
                action: getMentalHealthSupport, 
            }
        ]
    },
]

const EmotionalSupportEarthquakeScreen = ({ navigation }: any) => {
  const renderItem = ({ item }: any) => {
    if (item.type === 'header') {
      return (
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={ () => router.navigate('/screens/Toxic_Spills_and_Hazardous_MaterialsScreen')}
            style={styles.backButton}
          >
            <AntDesign name="arrowleft" size={40} color="#0A4E78" />
          </TouchableOpacity>
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
