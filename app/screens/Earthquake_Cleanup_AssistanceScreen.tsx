import { AntDesign } from '@expo/vector-icons';
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

    const viewChecklist = async () => {
        try {
        await WebBrowser.openBrowserAsync(
            'https://www.redcross.org/content/dam/redcross/atg/PDF_s/Preparedness___Disaster_Recovery/Disaster_Preparedness/Earthquake/Earthquake.pdf?srsltid=AfmBOopAaysUFqO_7AV7I_xA4tB_SMVlxhVapYx4MiuTbD0wqFfcl9cY&'
        );
        } catch (error) {
        console.error('Failed to open browser:', error);
        }
    };

  const applyForAid = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.disasterassistance.gov/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const upload = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.disasterassistance.gov/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const debris = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.epa.gov/disaster-debris/disaster-debris-recovery-tool'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const toolLendingLibrary = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://localtools.org/find/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const cleanupGuidelines = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.cdc.gov/earthquakes/safety/index.html'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const earthquakeRecovery = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.ready.gov/earthquakes#:~:text=If%20you%20are%20a%20disaster,use%20the%20FEMA%20mobile%20app.'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const VOAD = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.nvoad.org/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const borrow = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://teamrubiconusa.org/contact-us/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const volunteerOrganizations = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://crisiscleanup.org/survivor'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const qualify = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/fact-sheet/clean-and-sanitize-assistance?'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const cleanup = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.allhandsandhearts.org/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

const DATA = [
    {
        type: 'header',
        title: 'Earthquake Cleanup Assistance', 
        description: 'After an earthquake, cleaning up can be dangerous and overwhelming. This page connects you to help, safety tools, and volunteer resources.',
    },
    {
        type: 'section',
        title: 'Safety First',
        content: [
            'Avoid re-entering damaged buildings unless cleared by officials.',
            'Wear gloves, sturdy shoes, and an N95 mask during cleanup.',
            'Be cautious around gas leaks, downed power lines, and unstable structures.',
            {
                button: 'View Cleanup Safety Checklist',
                action: viewChecklist, 
            },
        ]
    },
    {
        type: 'section',
        title: 'Get Help with Cleanup',
        content: [
            {
                button: 'Request Cleanup Help From Volunteers',
                action: cleanup,
            },
            {
                button: 'Schedule a FEMA or Local Cleanup Team Visit',
                action: () => Linking.openURL('tel:18006213362'),
            },
            {
                button: 'Find Local Debris Drop-Off or Removal Services',
                action: debris,
            },
        ]
    },
    {
        type: 'section', 
        title: 'Document Everything for Aid',
        content: [
            'Take “before” and “after” photos of every room.',
            'Save all cleanup receipts (dumping, labor, gear).',
            'Upload to your disaster assistance application.',
            {
                button: 'Upload Cleanup Photos or Receipts',
                action: upload, 
            },
        ]
    },
    {
        type: 'section',
        title: 'Free or Discounted Services',
        content: [
            {
                button: 'Check If You Qualify for Free Cleanup Help',
                action: qualify, 
            },
            {
                button: 'See Volunteer Organizations Offering Help',
                action: volunteerOrganizations, 
            },
            {
                button: 'Apply for Cleanup Reimbursement Aid',
                action: applyForAid,
            }
        ]
    },
    {
        type: 'section',
        title: 'Cleanup Tools & Support',
        content: [
            {
                button: 'Find Tool Lending Libraries Near You',
                action: toolLendingLibrary, 
            },
            {
                button: 'Borrow Shovels, Gloves, Tarps & More',
                action: borrow,
            }
        ]
    },
    {
        type: 'section',
        title: 'Helpful External Links',
        content: [
            {
                button: 'CDC Cleanup Guidelines',
                action: cleanupGuidelines, 
            },
            {
                button: 'FEMA Earthquake Recovery Info',
                action: earthquakeRecovery,
            },
            {
                button: 'Volunteer Organizations Active in Disasters (VOAD)',
                action: VOAD,
            }
        ]
    }
];

const EmotionalSupportEarthquakeScreen = ({ navigation }: any) => {
  const renderItem = ({ item }: any) => {
    if (item.type === 'header') {
      return (
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={ () => router.navigate('/screens/Earthquake_RecoveryScreen')}
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
