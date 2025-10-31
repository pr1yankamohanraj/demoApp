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

const applyforDisasterAssistance = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.disasterassistance.gov/DAC-RI/en/assessment/captcha'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const applyforDCM = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/assistance/individual/disaster-survivors/disaster-case-management-toolbox'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const reliefSupplyCenters = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://egateway.fema.gov/ESF6/DRCLocator'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const documentReplacement = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/disaster/recover/replacing-vital-documents'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const hotelVoucherAvailability = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.femaemergencyhotels.com/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

const requestMedicalReplacements = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/fact-sheet/fema-medical-and-dental-assistance#:~:text=Call%20the%20FEMA%20Helpline%20at,your%20number%20for%20that%20service.'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };
const DATA = [
    {
        type: 'header',
        title: 'Wildfire Emergency Aid',
        description: 'If you’ve been displaced, lost your home, or need urgent help after a wildfire — here’s where to start. These steps connect you with critical resources fast.',
    },
    {
        type: 'section',
        title: '🏠 Find Emergency Shelter',
        content: [
            'If you’ve been evacuated or lost your home, shelters are available now.',
            'Some locations offer cots, meals, showers, and pet accommodations.',
            {
                button: 'Find Nearby Shelter',
            }
        ]
    },
    {
        type: 'section',
        title: '🧾 Register for FEMA or State Disaster Aid',
        content: [
            'You may qualify for grants to cover housing, repairs, medical needs, or lost items.',
            'Apply as soon as possible — delays can limit your aid eligibility.',
            {
                button: 'Apply for Disaster Assistance',
                action: applyforDisasterAssistance, 
            }
        ]
    },
    {
        type: 'section',
        title: '🧺 Get Basic Supplies & Food',
        content: [
            'Emergency relief agencies and local nonprofits are distributing food, water, hygiene kits, and clothes.',
            'Call 211 or check nearby distribution sites.',
            {
                button: 'Locate Relief Supply Centers',
                action: reliefSupplyCenters, 
            }
        ]
    },
    {
        type: 'section',
        title: '🏨 Access Hotel Vouchers or Temporary Housing',
        content: [
            'If shelters are full or unsafe for your needs, you may be eligible for a hotel voucher through FEMA or local agencies.',
            {
                button: 'Check Hotel Voucher Availability',
                action: hotelVoucherAvailability, 
            }
        ]
    },
    {
        type: 'section',
        title: '💊 Replace Lost Medications or Medical Devices',
        content: [
            'Pharmacies may provide emergency refills if you lost access due to evacuation.',
            'You can also request replacements for eyeglasses, mobility devices, or medical records.',
            {
                button: 'Request Medical Replacements',
                action: requestMedicalReplacements, 

            }
        ]
    },
    {
        type: 'section',
        title: '🐶 Get Help for Pets',
        content: [
            'Animal shelters and rescue organizations may house pets temporarily or provide food/supplies.',
            'Some evac centers are pet-friendly, but call ahead if possible.',
            {
                button: 'Find Emergency Pet Services',
            }
        ]
    },
    {
        type: 'section',
        title: 'Replace Vital Documents',
        content: [
            'Lost your ID, Social Security card, or insurance info? Start the replacement process early.',
            'Many agencies offer expedited services during federally declared disasters.',
            {
                button: 'Begin Document Replacement',
                action: documentReplacement, 
            }
        ]
    },
    {
        type: 'section',
        title: '🧯 Access Fire Recovery Caseworkers',
        content: [
            'Local caseworkers can help you apply for aid, find shelter, and navigate emotional recovery.',
            'Don’t go through this alone — help is available.',
            {
                button: 'Apply for Disaster Case Management',
                action: applyforDCM,
            }
        ]
    },
    {
        type: 'section',
        title: '🚨 Report Unsafe Conditions or Hazards',
        content: [
            'If your home or area has downed power lines, smoldering debris, or structural hazards, report it to emergency services or recovery crews.',
            {
                button: 'Report a Fire Hazard',
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
        <HeaderWithMenu /> 
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
