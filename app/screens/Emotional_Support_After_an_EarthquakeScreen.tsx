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

const talkToSomeone = async () => {
  try {
    await WebBrowser.openBrowserAsync('https://www.crisistextline.org/');
  } catch (error) {
    console.error('Failed to open browser:', error);
  }
};

const getTips = async () => {
  try {
    await WebBrowser.openBrowserAsync(
      'https://www.samhsa.gov/resource/dbhis/parent-guidelines-helping-children-after-earthquake-english'
    );
  } catch (error) {
    console.error('Failed to open browser:', error);
  }
};

const SAMHSA = async () => {
  try {
    await WebBrowser.openBrowserAsync(
      'https://library.samhsa.gov/sites/default/files/sma13-4776.pdf'
    );
  } catch (error) {
    console.error('Failed to open browser:', error);
  }
};

const NCTSN = async () => {
  try {
    await WebBrowser.openBrowserAsync(
      'https://www.nctsn.org/what-is-child-trauma/trauma-types/disasters/earthquake-resources'
    );
  } catch (error) {
    console.error('Failed to open browser:', error);
  }
};

const Journal = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://penzu.com/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
};
    
const Exercises = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://youtu.be/VUjiXcfKBn8?si=FMSs02TpsGv40eQO',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };
  
const DATA = [
  {
    type: 'header',
    title: 'Emotional Support After an Earthquake',
    description:
      'Earthquakes can be deeply traumatic. It’s normal to feel overwhelmed, anxious, or numb. You’re not alone, and there are safe places to talk, heal, and regain stability.',
  },
  {
    type: 'section',
    title: 'What You Might Be Feeling',
    content: [
      'Shock or disbelief',
      'Anxiety about aftershocks',
      'Guilt or helplessness',
      'Trouble sleeping or concentrating',
      'Mood swings, anger, or sadness',
      "It's okay to ask for help.",
      'Talk to someone',
      {
        button: 'Talk to a Crisis Counselor',
        action: talkToSomeone,
      },
      'Find a Local Mental Health Center',
      {
        button: 'Find',
      },
      'Call the Disaster Distress Hotline',
      {
        button: 'Call',
        action: () => Linking.openURL('tel:18009855990'),
      },
    ],
  },
  {
    type: 'section',
    title: 'Self-Help Tools',
    content: [
      'Guided Breathing & Grounding Exercises',
      {
        button: 'Exercises',
        action: Exercises,  
      },
      'Daily Coping Journal',
      {
        button: 'Journal',
        action: Journal,
      },
      'Get Tips for Helping Children Cope',
      {
        button: 'Tips',
        action: getTips,
      },
    ],
  },
  {
    type: 'section',
    title: 'Helpful Resources',
    content: [
      'SAMHSA',
      {
        button: 'SAMHSA Earthquake Mental Health Guide',
        action: SAMHSA,
      },
      'National Child Traumatic Stress Network',
      {
        button: 'National Child Traumatic Stress Network - Earthquakes',
        action: NCTSN,
      },
    ],
  },
];

const EmotionalSupportEarthquakeScreen = ({ navigation }: any) => {
  const renderItem = ({ item }: any) => {
    if (item.type === 'header') {
      return (
        <View>
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
      <HeaderWithMenu backRoute="/screens/Earthquake_RecoveryScreen" />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        style={styles.flatList}
      />
      </View>
  );
};

export default EmotionalSupportEarthquakeScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F1F9FC',
    flex: 1,
  },
  listContent: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContainer: {
    marginBottom: 15,
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
  flatList: {
    marginTop: 20,
  },
});
