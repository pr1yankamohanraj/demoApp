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

  const calmTips = async () => {
      try {
        await WebBrowser.openBrowserAsync(
          'https://chat.988lifeline.org/'
        );
      } catch (error) {
        console.error('Failed to open browser:', error);
      }
    };

    const findSupportGroup = async () => {
      try {
        await WebBrowser.openBrowserAsync(
          'https://mhanational.org/finding-help/'
        );
      } catch (error) {
        console.error('Failed to open browser:', error);
      }
    };

  const stressTips = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/node/what-are-some-ways-i-can-manage-stress-after-disaster#:~:text=If%20you%20recognize%20that%20you,rest%20and%20stay%20well%20hydrated'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  }; 
  const startJournal = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://penzu.com/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };
const DATA = [
    {
        type: 'header',
        title: 'Emotional Support After Extreme Weather',
        description: 'Extreme weather doesn/t just damage homes — it shakes our sense of safety. If you/re feeling overwhelmed, exhausted, or emotionally numb after storms, heatwaves, or freezing conditions, you/re not alone. Recovery is not just physical — it’s emotional too.'
    },
    {
        type: 'section',
        title: 'Shock & Disbelief Are Normal',
        content: [
            'It’s okay to feel stunned or emotionally “numb” after a major storm or disaster.',
            'You may find it hard to process what happened — that’s your brain protecting you.',
            'Give yourself permission to just breathe and get grounded.',
            {
                button: 'Talk to a Crisis Counselor',
                action: () => Linking.openURL('tel:211'),
            }
        ]
    },
    {
        type: 'section', 
        title: 'Anger, Frustration, or Guilt May Surface',
        content: [
            'You might feel angry at how things were handled, or guilty for being unprepared.',
            'These reactions are common and valid — don’t bottle them up.',
            'Try journaling or talking to someone who will listen without judgment.',
            {
                button: 'Start a Coping Journal',
                action: startJournal, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Anxiety and Fear About the Future',
        content: [
            'Worrying that it will happen again, or that you won’t recover, is natural.',
            'Fear can linger — especially if your home or safety felt threatened.',
            'Rebuild a sense of control by taking small, practical steps each day.',
            {
                button: 'See Stress Recovery Tips',
                action: stressTips, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Support Others, but Don’t Forget Yourself',
        content: [
            'Helping neighbors and family is admirable — but burnout is real.',
            'You can’t pour from an empty cup. Take breaks. Sleep. Eat. Breathe.',
            {
                button: 'Find a Local Support Group',
                action: findSupportGroup, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Pets Feel Stress Too',
        content: [
            'Pets may act out, hide, or seem anxious after extreme weather.',
            'Comfort them with routine, calm spaces, and time near you.',
            {
                button: 'Get Tips for Calming Pets',
                action: calmTips, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Give Yourself Time',
        content: [
            'Healing doesn’t happen overnight. There is no “right” pace.',
            'Some days will feel fine. Others may feel overwhelming. That’s okay.',
            'Reach out before you hit your limit — not after.',
            {
                button: 'Call the Disaster Distress Helpline',
                action: () => Linking.openURL('tel: 1800985990')
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



