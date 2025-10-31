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


  const supportChildren = async () => {
      try {
        await WebBrowser.openBrowserAsync(
          'https://www.aimhitn.org/supporting-infants-and-young-children-around-hazardous-material-incidents',
        );
      } catch (error) {
        console.error('Failed to open browser:', error);
      }
    };

    const joinCommunity = async () => {
      try {
        await WebBrowser.openBrowserAsync(
          'https://www.malachismessage.org/emotional-support-services',
        );
      } catch (error) {
        console.error('Failed to open browser:', error);
      }
    };

  const buildMentalHealthPlan = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://ghc.nhs.uk/files/WRAP_personalworkbook.pdf',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const connect = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.alternativetomeds.com/services/holistic/environmental-medicine/',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };
  const learn = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.samhsa.gov/mental-health/disaster-preparedness/warning-signs',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const copingTools = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://thiswayup.org.au/coping-guides/',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

const DATA = [
    {
        type: 'header',
        title: 'Mental Health Support: Toxic Spills & Hazardous Materials',
        description: 'Toxic exposure isn’t just physical — it’s emotional too. Living through a chemical spill, industrial accident, or hazardous contamination can leave lasting anxiety, fear, and distress. You are not alone, and support is available.',
    },
    {
        type: 'section',
        title: 'Recognize Common Emotional Reactions',
        content: [
            {text: "You may feel:", indentLevel: 0},
            {text: 'Overwhelmed or helpless', indentLevel: 1},
            {text: 'Irritable or angry', indentLevel: 1},
            {text: 'Constantly on edge or unable to sleep', indentLevel: 1},
            {text: 'Distrustful of your environment', indentLevel: 1},
            {text: "These are normal responses to traumatic, invisible dangers.", indentLevel: 0},
            {
                button: 'Learn to Spot Exposure Stress',
                action: learn,
            }
        ]
    },
    {
        type: 'section',
        title: 'Talk to a Counselor Who Understands Environmental Trauma',
        content: [
            {text: 'Specialized counselors understand the unique mental health impacts of environmental disasters, displacement, and uncertainty.', indentLevel: 0},
            {text: 'Some programs offer free support, especially after a declared emergency.', indentLevel: 0},
            {text: 'Sessions can be virtual, in-person, or by phone.', indentLevel: 0},
            {
                button: 'Connect with a Toxic Exposure Counselor',
                action: connect,
            }
        ]
    },
    {
        type: 'section',
        title: 'Support Children Exposed to Chemical Disasters',
        content: [
            {text: 'Kids may regress, act out, or seem withdrawn.', indentLevel: 0},
            {text: 'Help them feel safe, answer questions honestly, and maintain routines when possible.', indentLevel: 0},
            {text: 'Seek professional help if behaviors persist or worsen.', indentLevel: 0},
            {
                button: 'Find Child Mental Health Resources',
                action: supportChildren, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Join a Support Group for Affected Communities',
        content: [
            {text: "It helps to talk to others going through the same thing — especially about invisible symptoms or delayed cleanup.", indentLevel: 0},
            {text: "Groups are available for:", indentLevel: 0},
            {text: 'Displaced residents', indentLevel: 1},
            {text: 'First responders', indentLevel: 1},
            {text: 'Parents', indentLevel: 1},
            {text: 'Environmental justice advocates', indentLevel: 1},
            {
                button: 'Join a Community Healing Group',
                action: joinCommunity, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Grounding Strategies for Anxiety and Uncertainty',
        content: [
          {text: 'Try deep breathing or journaling.', indentLevel: 0},
          {text: 'Limit doomscrolling and overexposure to toxic event coverage.', indentLevel: 0},
          {text: 'Give yourself permission to rest.', indentLevel: 0},
          {
            button: 'Try Guided Coping Tools',
            action: copingTools, 
          }
        ]
    },
    {
        type: 'section',
        title: 'Know When to Reach Out for Crisis Support',
        content: [
            {text: 'If you’re struggling to function, feeling hopeless, or having thoughts of self-harm, help is available immediately.', indentLevel: 0},
            {text: 'You\'re not weak — you\'re human.', indentLevel: 0},
            {
                button: 'Talk to a Crisis Counselor Now',
                action: () => Linking.openURL('tel: 18009855590')
            }
        ]
    },
    {
        type: 'section',
        title: '🔄 Healing Takes Time — Stay Connected',
        content: [
            {text: 'Emotional recovery after toxic events is not linear.', indentLevel: 0},
            {text: 'Keep checking in with yourself, your body, and your community.', indentLevel: 0},
            {text: 'Healing is possible — and support is here for the long haul.', indentLevel: 0},
            {
                button: 'Build a Personal Mental Health Plan',
                action: buildMentalHealthPlan, 
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
          {item.content.map((line: { text?: string; indentLevel?: number; button?: string; action?: () => void }, idx: number) => {
            const indentLevel = typeof line === 'object' && line.indentLevel ? line.indentLevel : 0;
            const text = typeof line === 'string' ? line : line.text;

            if (text) {
              return (
                <View
                  key={idx}
                  style={[
                    styles.bulletItem,
                    { marginLeft: indentLevel * 20 }
                  ]}
                >
                  <Text style={styles.bulletDot}>{'\u2022'}</Text>
                  <Text style={styles.bulletText}>{text}</Text>
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
