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

const emergencyRepairsTip = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.redcross.org/get-help/disaster-relief-and-recovery-services/disaster-cleanup.html'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const findVolunteers = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.nvoad.org/current-members/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const verifyContractorLicense = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.bbb.org/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const callCaseworker = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.hud.gov/disaster-resources'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const reportFraud = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://reportfraud.ftc.gov/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const checkRepairAssistanceOptions = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/assistance/individual'
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
const DATA = [
    {
        type: 'header',
        title: 'Extreme Weather Home Repair Help',
        description: 'After extreme weather, home repairs can be urgent, stressful, and expensive. This guide will help you find trusted resources, avoid scams, and take the right next step',
    },
    {
        type: 'section',
        title: 'Document the Damage Before Repairs',
        content: [
            'Take clear photos or videos of all affected areas — both inside and out.',
            'Save receipts for cleanup, materials, and temporary repairs.',
            'This documentation is required for most aid programs and insurance claims.',
            {
                button: 'Submit Damage for Review',
                action: submitDamage, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Check What Assistance You Qualify For',
        content: [
           'You may qualify for help from FEMA, state/local programs, or nonprofits.' ,
           'Assistance could include home repairs, rebuilding grants, or temporary housing.',
           {
                button: 'Check Repair Assistance Options',
                action: checkRepairAssistanceOptions, 
           }
        ]
    },
    {
        type: 'section', 
        title: 'Only Use Licensed Contractors',
        content: [
            'Scammers often show up after disasters — be cautious.',
            'Always ask for ID, licensing, proof of insurance, and a written estimate.',
            'Never pay the full amount upfront.',
            {
                button: 'Verify a Contractor’s License',
                action: verifyContractorLicense,
            }
        ]
    },
    {
        type: 'section',
        title: 'Make Temporary Repairs if It\'s Safe',
        content: [
            'Cover broken windows and tarp damaged roofs to prevent further loss.',
            'Turn off gas/electricity in damaged areas before working.',
            'Keep receipts — even temporary fixes may be reimbursed.',
            {
                button: 'View Emergency Repair Tips',
                action: emergencyRepairsTip,
            }
        ]
    },
    {
        type: 'section',
        title: 'Report Fraud and Price Gouging',
        content: [
            'If someone pressures you, demands cash, or offers “too good to be true” deals, report it.',
            'States often activate price gouging laws during weather emergencies.',
            {
                button: 'Report Unlicensed or Fraudulent Contractor',
                action: reportFraud, 
            }
        ]
    },
    {
       type: 'section',
       title: 'Find Volunteer or Low-Cost Repair Help',
       content: [
            'Nonprofits like Team Rubicon, Habitat for Humanity, and local VOADs may offer help.',
            'Some programs focus on elderly, disabled, or low-income homeowners.',
            {
                button: 'Find Volunteer Repair Help',
                action: findVolunteers, 
            }
       ]
    },
    {
        type: 'section',
        title: 'Still Need Help? Talk to a Housing Caseworker',
        content: [
            'Many communities offer caseworkers or housing navigators to help you apply for aid and manage repairs.',
            {
                button: 'Schedule a Call With a Caseworker',
                action: callCaseworker, 
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
    <View style={styles.container}>
      <HeaderWithMenu backRoute="/screens/Extreme_WeatherScreen" />
      <View style={styles.content}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
};

export default EmotionalSupportEarthquakeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F9FC',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingTop: 20,
    paddingBottom: 20,
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
});
