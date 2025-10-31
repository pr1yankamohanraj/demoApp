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

const talkToCounselor = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://chat.988lifeline.org/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const startCopingJournal = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://penzu.com/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const joinSurvivorGroup = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.phoenix-society.org/what-we-do/virtual-support-group?'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const seeFireRecovery = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.cigna.com/knowledge-center/coping-with-loss-due-to-fire'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };
  const sleepBetter = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://msktc.org/burn/factsheets/sleep-problems-after-burn-injury#:~:text=Causes%20of%20Sleep%20Problems%20after%20Burn%20Injury,-Many%20factors%20can&text=Some%20may%20continue%20to%20affect,thinking%20about%20the%20burn%20event.'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };
  const helpingChildrenCope = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.redcross.org/content/dam/redcross/atg/PDF_s/Preparedness___Disaster_Recovery/General_Preparedness___Recovery/Emotional/Helping_children_cope_with_disaster_-_English.pdf?srsltid=AfmBOop41vSWIuOMhogkYDyTfRxsOMW5R67eyj-V6JJ3W6L5GJT3o9N5'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };
const DATA = [
    {
        type: 'header',
        title: 'Mental Health Support After Urban Fires & Building Emergencies',
        description: 'A building fire can disrupt everything — your sense of safety, your routine, your home. Even if you\'re physically safe, the emotional aftermath can be intense. Here’s how to process, cope, and heal.',
    },
    {
        type: 'section',
        title: 'Shock and Sudden Displacement', 
        content: [
            'Fires in apartment buildings or public housing often happen without warning.',
            'You may have had seconds to grab belongings — or nothing at all.',
            'It\'s okay to feel overwhelmed or mentally "checked out" afterward.',
            {
                button: 'Talk to a Crisis Counselor',
                action: talkToCounselor,
            }
        ]
    },
    {
        type: 'section',
        title: 'Coping with the Loss of Your Home or Neighborhood',
        content: [
            'You may have lost more than a space — you lost familiarity, community, or stability.',
            'It\'s common to feel unanchored, frustrated, or deeply sad.',
            {
                button: 'Start a Coping Journal',
                action: startCopingJournal,
            }
        ]
    },
    {
        type: 'section',
        title: 'Anxiety About Safety and Fire Triggers',
        content: [
            'Loud noises, sirens, alarms, or smoke smells may trigger fear or panic.',
            'These are trauma responses — your body is reacting to a perceived threat.',
            'Try grounding exercises, breath work, or seeking quiet space.',
            {
                button: 'See Fire Recovery Coping Tools',
                action: seeFireRecovery, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Sleep Trouble and Hypervigilance',
        content: [
            'Many survivors report difficulty falling asleep, staying asleep, or resting in unfamiliar shelter spaces.',
            'Being in survival mode may make your body stay tense.',
            {
                button: 'Try Sleep Tips',
                action: sleepBetter, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Helping Children Feel Safe Again',
        content: [
            'Kids may express stress through clinginess, silence, aggression, or regressions.',
            'Reassure them with honesty, affection, and stable routines.',
            {
                button: 'Tips on Helping Children Cope With Disasters',
                action: helpingChildrenCope, 
            }
        ]
    },
    {
        type: 'section',
        title: 'You Don’t Have to Go Through This Alone',
        content: [
           'Whether you\'re staying with friends, at a shelter, or in transitional housing — emotional support is available.',
           'Join support groups for survivors of building fires or urban disasters.',
           {
                button: 'Join a Fire Survivor Support Group',
                action: joinSurvivorGroup, 
           }
        ]
    },
    {
        type: 'section',
        title: 'Help Is a Call Away',
        content: [
            'If you’re having trouble coping, talking to someone can help — even for one conversation.',
            'Support is free, confidential, and available 24/7.',
            {
                button: 'Call the Disaster Distress Helpline',
                action: () => Linking.openURL('tel:18009855990')
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
      <HeaderWithMenu backRoute="/screens/Urban_Fires_and_Building_EmergenciesScreen" />
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
