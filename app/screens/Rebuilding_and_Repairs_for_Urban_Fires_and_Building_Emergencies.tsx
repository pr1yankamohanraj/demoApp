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

const fireResilientTips = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://recovery.lacounty.gov/resilient-rebuilding/resilient-rebuilding-buildings/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const getLegalSupport = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.disasterassistance.gov/get-assistance/forms-of-assistance/4464'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const fireRecoveryAid = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/disaster/wildfire-actions'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const submitDamage = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/disaster/how-declared/preliminary-damage-assessments'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const findVerifiedRepair = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.nfca-online.org/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const talkToRecoveryCounselor = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.samhsa.gov/find-help/helplines/disaster-distress-helpline'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const requestPropertyStatusUpdate = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/assistance/individual/after-applying/home-inspections'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };
const DATA = [
    {
        type: 'header',
        title: 'Rebuilding and Repairs: Urban Fires & Building Emergencies',
        description: 'If your home or building was damaged in a fire, you may face a long recovery process. Whether you/re a renter, owner, or displaced tenant, here’s how to start rebuilding your space and stability.',
    },
    {
        type: 'section',
        title: 'Document the Damage (Even If You Don\'t Own the Unit)',
        content: [
            'Take clear photos of your unit and belongings, if it\'s safe to return.',
            'Request a fire report from the local fire department — this is often needed for insurance or aid.',
            'Tenants: document smoke, water, or structural damage in your apartment.',
            {
                button: 'Submit Damage for Review',
                action: submitDamage, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Understand Your Building\'s Repair Timeline',
        content: [
            'Contact your landlord, property manager, or condo board about repairs and inspection timelines.',
            'Public housing residents can ask for a housing authority caseworker.',
            'Repairs in shared buildings may take weeks to months.',
            {
                button: 'Schedule Home Inspection',
                action: requestPropertyStatusUpdate,
            }
        ]
    }, 
    {
        type: 'section',
        title: 'Know Your Renter or Homeowner Rights',
        content: [
            'You may be entitled to temporary housing, lease breaks, or reimbursement depending on your lease and local laws.',
            'Local housing advocacy groups can help protect your rights during the rebuilding process.',
            {
                button: 'Get Legal Support',
                action: getLegalSupport, 
            }
        ]
    },
    {
        type: 'section',
        title: 'If You\'re Responsible for Repairs',
        content: [
            'Condo owners or small landlords may be responsible for interior repairs.',
            'Work with licensed, insured contractors and ask about fire-resistant upgrades.',
            'Always check with building management before making changes.',
            {
                button: 'Find Verified Repair Help',
                action: findVerifiedRepair, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Apply for Financial Assistance',
        content: [
            'Aid may be available for renters and owners to replace belongings or repair units.',
            'FEMA, local governments, and nonprofits may offer support even in multi-unit buildings.',
            {
                button: 'Check for Fire Recovery Aid',
                action: fireRecoveryAid,
            }
        ]
    },
    {
        type: 'section', 
        title: 'Improve Fire Safety in the Rebuild',
        content: [
            'Ask about upgrades to fire alarms, sprinkler systems, or fireproof building materials.',
            'Tenants: request written updates about future fire prevention improvements.',
            {
                button: 'View Fire-Resilient Rebuild Tips',
                action: fireResilientTips,
            }
        ]
    },
    {
        type: 'section',
        title: 'Emotional Support During the Rebuilding Process',
        content: [
            'Living in temporary housing, fighting insurance, or waiting for repairs is stressful.',
            'It\'s normal to feel overwhelmed, exhausted, or displaced.',
            'Support groups and counselors can help you cope.',
            {
                button: 'Talk to a Recovery Caseworker',
                action: talkToRecoveryCounselor,
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
