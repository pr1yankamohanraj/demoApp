import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import HeaderWithMenu from './Header_with_MenuScreen';
const DATA = [
    {
        type: 'header',
        title: 'Wildfire Rebuilding Support',
        description: 'Rebuilding after a wildfire is hard — but you’re not alone.Use this guide to find grants, safe rebuilding guidance, and trusted support for your recovery journey.',
    },
    {
        type: 'section',
        title: '🧾 Apply for Rebuilding Aid & Grants',
        content: [
            'You may be eligible for FEMA assistance, SBA low-interest loans, or state/local grants.',
            'Start applications early and keep copies of all documents.',
            {
                button: 'Check Rebuilding Grant Eligibility',
            }
        ]
    },
    {
        type:'section',
        title: '👷 Use Licensed and Verified Contractors',
        content: [
            'Only work with licensed, bonded, and insured contractors — post-disaster scams are common.',
            'Get multiple quotes, never pay the full amount up front, and always sign a contract.',
            {
                button: 'Verify a Contractor’s License',
            }
        ]
    },
    {
        type: 'section',
        title: '🔨 Understand Your Insurance Payout',
        content: [
            'Review your homeowner’s or renter’s policy carefully.',
            'You may receive separate payouts for structure, personal property, and temporary housing.',
            'Ask your adjuster to explain what is covered — and what isn’t.',
            {
                button: 'Schedule Insurance Help',
            }
        ]
    },
    {
        type: 'section',
        title: '🧯 Rebuild With Fire-Resistant Materials',
        content: [
            'Use materials and techniques that improve your home’s resilience: ember-resistant vents, metal roofing, and defensible landscaping.',
            'Local ordinances may also require upgrades for fire zones.',
            {
                button: 'Explore Wildfire-Resistant Design',
            }
        ]

    },
    {
        type: 'section',
        title: '📐 Get Free Rebuilding Plans or Consultations',
        content: [
            'Some counties or nonprofits offer free or discounted rebuilding plans for fire survivors.',
            'Architects and engineers may also volunteer services during recovery phases.',
            {
                button: 'Request a Rebuild Consultation',
            }
        ]
    },
    {
        type: 'section',
        title: '📋 Navigate Permits and Local Rules',
        content: [
            'Check local zoning and permit offices for guidance on rebuilding in fire-prone areas.',
            'Some rules may change after a major fire to improve community safety.',
            {
                button: 'View Local Permit Guidance'
            }
        ]
    },
    {
        type: 'section',
        title: '🏘️ Connect With Long-Term Recovery Groups',
        content: [
            'Join community-based organizations that support wildfire survivors with rebuilding, financial aid, and case management.',
            'These groups stay active for months or years post-disaster.',
            {
                button: 'Join a Recovery Support Group',
            }
        ]
    },
    {
        type: 'section',
        title: '🧠 Get Emotional Support While Rebuilding',
        content: [
            'Rebuilding takes time, and emotional exhaustion is real.',
            'Connect with support groups, counselors, or mental health professionals when needed.',
            {
                button: 'Talk to a Recovery Counselor',
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
