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

export default function Link1() {
  const openCitizenshipLink = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/assistance/individual/program/citizenship-immigration-status'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const reviewTypesofDocuments = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/fact-sheet/options-verify-your-identity-fema'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const openDisasterAssistanceLink = async () => {
    try {
      await WebBrowser.openBrowserAsync('https://www.disasterassistance.gov/DAC-RI/en/assessment/captcha');
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const openApplicationProcessLink = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.disasterassistance.gov/what-to-expect'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const readMore = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.disasterassistance.gov/get-assistance/by-category-or-agency'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const uploadOnlineDocuments = async () => {
    try {
      await WebBrowser.openBrowserAsync('https://www.disasterassistance.gov/');
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const reviewDocuments = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/assistance/individual/after-applying/verifying-home-ownership-occupancy'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const understandFEMAEligibilityDecision = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/assistance/individual/after-applying'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const DATA = [
    {
      type: 'header',
      title: 'Apply for Flood Recovery Aid',
      description:
        'If your home or property was damaged by flooding, you may be eligible for financial, housing, or food assistance. Follow the steps below to begin your recovery process.',
    },
    {
      type: 'section',
      title: 'FEMA Eligibility Checklist',
      content: [
        {text: 'You may qualify for FEMA aid if:', indentLevel: 0},
        {text: 'Your area must be a part of a Presidential Disaster Declaration', indentLevel: 1},
        {text: 'You are a U.S citizen, non-citizen national, or qualified non-citizen', indentLevel: 1},
        {text: 'FEMA must be able to verify your identity', indentLevel: 1},
        {text: 'The damaged property must be your primary residence', indentLevel: 1},
        {text: 'Your insurance or other assistance must not cover all your disaster-related needs', indentLevel: 1},
        {text: 'You must complete a FEMA application for assistance', indentLevel: 1},
        {text: 'Learn more about citizenship and eligibility', indentLevel: 0},
        {
          button: 'Learn More',
          action: openCitizenshipLink,
        },
      ],
    },
    {
      type: 'section',
      title: 'Information You Will Need to Provide',
      content: [
        {text: 'Before you begin, make sure you have the following information ready:', indentLevel: 0},
        {text: 'Social Security Number', indentLevel: 1},
        {text:'Insurance Information (if applicable)', indentLevel: 1},
        {text: 'Damage Description (what was affected and how)', indentLevel: 1},
        {text: 'Annual Household Income', indentLevel: 1},
        {text: 'Contact Information, including current mailing address and the address of the damaged property', indentLevel: 1},
        {text: 'Banking Information (for direct deposit)', indentLevel: 1},
        {text: 'Review the types of documents you can use to verify your identity', indentLevel: 0},
        {
          button: 'Review',
          action: reviewTypesofDocuments,
        },
      ],
    },
    {
      type: 'section',
      title: 'How to Apply',
      content: [
        {text: 'You can apply for FEMA assistance through the following methods:',  indentLevel: 0},
        {text: 'Online:',  indentLevel: 1},
        {
          button: 'DisasterAssistance.gov',
          action: openDisasterAssistanceLink,
        },
        {text: 'Phone: Call 1-800-621-3362 or TTY: 1-800-462-7585 from 6 AM - 10 PM CST Daily',  indentLevel: 1},
        {
          button: 'Call',
          action: () => Linking.openURL('tel:18006213362'),
        },
        {text: 'In Person: Visit a Disaster Recovery Center near you',  indentLevel: 1},
        {
          button: 'Find Nearby Centers',
          action: () => {}, 
        },
        {text: 'Learn more about the application process',  indentLevel: 0},
        {
          button: 'Learn More',
          action: openApplicationProcessLink,
        },
      ],
    },
    {
      type: 'section',
      title: 'Types of Assistance Possible',
      content: [
        {text: 'Depending on your situation, FEMA may provide:', indentLevel: 0},
        {text: 'Housing Assistance: Funds to rent a different place to live or a temporary housing unit when rental properties are not available', indentLevel: 1},
        {text: 'Home Repair: Money to repair disaster-related damage not covered by insurance, aiming to make the home safe, sanitary, and functional.', indentLevel: 1},
        {text: 'Home Replacement: Limited funds to replace a disaster-destroyed home under rare conditions.', indentLevel: 1},
        {text: 'Other Needs Assistance: Funds for necessary and serious needs caused by the disaster, not covered by insurance or other aid.', indentLevel: 1},
        {text: 'Read more about types of FEMA assistance', indentLevel: 0},
        {
          button: 'Read More',
          action: readMore,
        },
      ],
    },
    {
      type: 'section',
      title: 'Uploading Documents',
      content: [
        {text: 'After applying, you may need to provide additional documents:', indentLevel: 0},
        {text: 'Proof of Identity: Such as a government-issued ID.', indentLevel: 1},
        {text: 'Proof of Ownership or Occupancy: Documents verifying that the damaged property is your primary residence.', indentLevel: 1},
        {text: 'Insurance Documents: Information about your insurance coverage and any settlements received.', indentLevel: 1},
        {text:  'You can upload these documents through your online account at DisasterAssistance.gov or visit a Disaster Recovery Center', indentLevel: 0},
        {
          button: 'Upload Online',
          action: uploadOnlineDocuments,
        },
        {text: 'Review the types of documents you can provide to verify home occupancy and/or ownership', indentLevel: 0},
        {
          button: 'Review Documents',
          action: reviewDocuments,
        },
      ],
    },
    {
      type: 'section',
      title: 'What to Expect After Applying',
      content: [
        {text: 'A FEMA inspector may contact you to schedule an inspection of your damaged home or apartment.', indentLevel: 0},
        {text: "If you qualify, you'll receive a check by mail or direct deposit, along with a letter explaining how you may use the assistance.", indentLevel: 0},
        {text: 'You may receive additional funds from other programs later.', indentLevel: 0},
        {
          button: "Understand FEMA's eligibility decision",
          action: understandFEMAEligibilityDecision,
        },
      ],
    },
  ];

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
                    { marginLeft: indentLevel * 20 },
                  ]}
                >
                  <Text style={styles.bulletDot}>{'\u2022'}</Text>
                  <Text style={styles.bulletText}>{text}</Text>
                </View>
              );
            } else if (line.button && typeof line.action === 'function') {
              return (
                <TouchableOpacity
                  key={idx}
                  onPress={line.action}
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
      <HeaderWithMenu backRoute="/screens/Flood_RecoveryScreen" />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        style={styles.flatList}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F1F9FC',
  },
  listContent: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContainer: {
    marginBottom: 20,
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
    marginTop: 5,
    marginBottom: 10,
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
    flex: 1,
  },
});

