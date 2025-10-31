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

export default function Link1 () {
  const openTryNowVideo = async () => {
    try {
      const result = await WebBrowser.openBrowserAsync(
        'https://youtu.be/DbDoBzGY3vo?si=gFbfmLmLYEhM6mDwo'
      );
      console.log('WebBrowser result:', result);
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

function Link2 () {}
  const openMentalHealthAssessment  = async () => {
    try {
      const result = await WebBrowser.openBrowserAsync(
        'https://screening.mhanational.org/screening-tools/'
      );
      console.log('WebBrowser result:', result);
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

function Link3 () {}
  const openFEMAGuide  = async () => {
    try {
      const result = await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/pdf/library/children.pdf'
      );
      console.log('WebBrowser result:', result);
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  function Link4 () {}
  const openLaunchVideo  = async () => {
    try {
      const result = await WebBrowser.openBrowserAsync(
        'https://youtu.be/30VMIEmA114?si=QbwyG5Ml5S5t-1FB'
      );
      console.log('WebBrowser result:', result);
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  function Link5 () {}
  const openJournal  = async () => {
    try {
      const result = await WebBrowser.openBrowserAsync(
        'https://penzu.com/'
      );
      console.log('WebBrowser result:', result);
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  function Link6 () {}
  const openStartChat  = async () => {
    try {
      const result = await WebBrowser.openBrowserAsync(
        'https://chat.988lifeline.org/'
      );
      console.log('WebBrowser result:', result);
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  function Link7 () {}
  const browseStories  = async () => {
    try {
      const result = await WebBrowser.openBrowserAsync(
        'https://adaa.org/educational-resources/from-our-community/stories-of-triumph'
      );
      console.log('WebBrowser result:', result);
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

const DATA = [
  {
    type: 'header',
    title: 'Emotional Support for Hurricanes & Tornados',
    description:
      "Hurricanes and tornadoes can be terrifying and traumatic. The emotional impact often lasts long after the storm has passed. This page offers support, guidance, and ways to care for your mental health — whether you're in crisis or just trying to steady yourself again.",
  },
  {
    type: 'section',
    title: 'What You May Be Feeling',
    content: [
      {text: "It's normal to experience:", indentLevel: 0},
      {text: 'Shock, fear, or helplessness during and after the storm', indentLevel: 1},
      {text: 'Trouble sleeping or concentrating', indentLevel: 1},
      {text: "Sadness, anger, or survivor's guilt", indentLevel: 1},
      {text: 'Worry about the future or repeated storm', indentLevel: 1},
      {text: "You're not alone. These are common reactions to disaster.", indentLevel: 0},
    ],
  },
  {
    type: 'section',
    title: 'Quick Ways to Cope',
    content: [
      {text: 'Try these short activities to calm your body and mind:', indentLevel: 0},
      {text: '5-Minute Breathing Exercise - Slow your breath, reset your nervous system', indentLevel: 1},
      {
        button: 'Try Now',
        action: openTryNowVideo,
      },
      {text: '5-4-3-2-1 Grounding Tool - Reconnect with your surroundings', indentLevel: 1},
      {
        button: 'Launch',
        action: openLaunchVideo,
      },
      {text:'Daily Coping Journal - Reflect, release, and track emotions', indentLevel: 1},
      {
        button: 'Open Journal',
        action: openJournal,
      },
    ],
  },
  {
    type: 'section',
    title: 'When You Need to Talk',
    content: [
      {text: 'There are trained professionals available 24/7:', indentLevel: 0},
      {
        button: 'Disaster Distress Hotline',
        action: () => Linking.openURL('tel:18009855590'),
        isHotline: true,
      },
      {
        button: 'Text “HELLO” to 741741',
        action: () => Linking.openURL('sms:741741?body=HELLO'),
        isHotline: true,
      },
      {text: 'Find Local Mental Health Services', indentLevel: 0},
      {
        button: 'Search Nearby Help',
        action: () => Linking.openURL('https://yourapp.com/find-mental-health'),
      },
    ],
  },
  {
    type: 'section',
    title: 'Connect With Others',
    content: [
      {text: 'Talking with others can ease trauma:', indentLevel: 0},
      {text: 'Join virtual or in-person support groups', indentLevel: 1},
      {
        button: 'Join Groups',
        action: () => Linking.openURL('https://yourapp.com/groups'),
      },
      {text: 'Chat with a trained volunteer listener', indentLevel: 1},
      {
        button: 'Start Chat',
        action: openStartChat,
      },
      {text: 'Read or share survivor stories', indentLevel: 1},
      {
        button: 'Browse Stories',
        action: browseStories,
      },
    ],
  },
  {
    type: 'section',
    title: 'Help for Parents & Kids',
    content: [
      {text: 'Children react to storms too — they may cry more, cling, or regress. Support them by:', indentLevel: 0},
      {text: 'Sticking to routines as much as possible', indentLevel: 1},
      {text: 'Listening and reassuring them the danger has passed', indentLevel: 1},
      {text: 'Keeping news exposure limited', indentLevel: 1},
      {text: 'FEMA Guide: Helping Children Cope with Disaster', indentLevel: 0},
      {
        button: 'Read the Guide',
        action: openFEMAGuide,
      },
    ],
  },
  {
    type: 'section',
    title: 'When to Get More Help',
    content: [
      {text: 'Reach out for professional help if you notice:', indentLevel: 0},
      {text: "Panic attacks or intense fear that doesn't go away", indentLevel: 1},
      {text: 'Thoughts of harming yourself or others', indentLevel: 1},
      {text: 'Reliance on drugs or alcohol to cope', indentLevel: 1},
      {text: 'Flashbacks, nightmares, or extreme withdrawal', indentLevel: 1},
      {text: 'Take a Mental Health Assessment', indentLevel: 0},
      {
        button: 'Take an Assessment', 
        action: openMentalHealthAssessment
      },
      {text: 'Find Free or Low-Cost Therapy', indentLevel: 0},
      {
        button: 'Find Services',
        action: () => Linking.openURL('https://yourapp.com/low-cost-therapy'),
      },
    ],
  },
  {
    type: 'section',
    title: 'Healing Takes Time',
    content: [
      {text: "You don't have to go through this alone. Recovery from emotional storms is just as important as physical recovery — and it's okay to ask for help.", indentLevel: 0},
    ],
  },
];

  const renderItem = ({ item, index }: any) => {

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
          {item.content.map((line: { text?: string; button?: string; action?: () => void; indentLevel?: number; isHotline?: boolean }, idx: number) => {
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
            }

            if (typeof line === 'object' && line.button) {
              const isHotline = line.isHotline;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.button, isHotline && styles.hotlineButton]}
                  onPress={line.action}
                >
                  <Text style={[styles.buttonText, isHotline && styles.hotlineText]}>
                    {line.button}
                  </Text>
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
      <HeaderWithMenu backRoute="/screens/Hurricanes_and_Tornados_ReliefScreen" />
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
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContainer: {
    marginBottom: 5,
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
    marginTop: 10,
    alignSelf: 'flex-start',
    top: -9,
    right: -2,
    width: 330,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  hotlineButton: {
    backgroundColor: '#FCE4EC',
    borderColor: '#C2185B',
    borderWidth: 1,
  },
  hotlineText: {
    color: '#C2185B',
  }, 
  backButton: {
      top: -50,
  },
  flatList: {
    flex: 1,
  },
});
