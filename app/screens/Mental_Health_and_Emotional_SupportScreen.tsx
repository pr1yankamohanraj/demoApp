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

const bookConsultation = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.psychologytoday.com/us/therapists/california?utm_content=8XzKgSX7-dc_pcrid_81226548987677_pkw_psychology+today+therapist+finder_pmt_be_slid_6USgHbBx_pgrid_5565526260_ptaid_kwd-134277005568:loc-4084_&msclkid=afd5a2e19c29123a1ebccadcca676ac9&utm_source=bing&utm_medium=cpc&utm_campaign=[US]+-+California+-+Brand&utm_term=psychology+today+therapist+finder',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const startDrawing = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://evernote.com/lp/sketching?utm_source=bing_ads&t_s=microsoft_ads&t_cid=486107561&t_agid=1238051173755644&t_crid=kwd-77378557279203%3Aloc-190&t_crname=drawing+online&t_match_type=p&t_network=o&t_device=c&t_validation=486107561&msclid=6a3eb0dbb4611e43d57dd8e6e88cfb3d&t_agname=Sketching_Keywords&t_cname=SEMANTIC_AUTO_US_Campaign_Registrations_AllAdSet&referrer=xina%3D8500103a-dd3e-4b1f-9fff-a5fd98fc7ae1',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const findHelp = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://eldercare.acl.gov/public/Resources/LearnMoreAbout/Health.aspx',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };
  const disasterMentalHealthSupport = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.samhsa.gov/technical-assistance/dtac/resources',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };
  const mentalHealthResources = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.nami.org/support-education/nami-helpline/?',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const mentalHealthandDisastersOverview = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.cdc.gov/natural-disasters/psa-toolkit/managing-mental-health.html',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };
  const viewMultilingualHealthServices = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.talkspace.com/',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

const readTrauma = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.ptsduk.org/what-is-ptsd/causes-of-ptsd/natural-disaster/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const fiveMinuteBreathingExercise = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://youtu.be/enJyOTvEn4M?si=MQYyKGQEeXornUHm'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const useCalmApp = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://insighttimer.com/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const trackHabits = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://habitica.com/static/home'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const downloadToolkit = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.redcross.org/content/dam/redcross/atg/PDF_s/Preparedness___Disaster_Recovery/General_Preparedness___Recovery/Emotional/Helping_children_cope_with_disaster_-_English.pdf?srsltid=AfmBOooBcDRWvQU3TtTQ_ugP-VRntlPEGuBQlw4lBHUs5EvlBtwNPmfb'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };
const DATA = [
    {
        type: 'header',
        title: 'Mental Health Support for Flood Recovery',
        description: 'Flood recovery isnt just about rebuilding homes - its also about healing emotionally. After a disaster, many people experience stress, anxiety, grief, or trauma. This page offers immediate help, coping tools, and resources you can use right now.', 
    },
    {
        type: 'section',
        title: 'How Floods Affect Mental Health',
        content: [
            {text: 'Floods often trigger:', indentLevel: 0},
            {text: 'Grief over lost homes or loved ones', indentLevel: 1},
            {text: 'Anxiety about safety, stability, or finances', indentLevel: 1},
            {text: 'PTSD-like symptoms after experiencing danger', indentLevel: 1},
            {text: 'Survivors guilt', indentLevel: 1},
            {
                button: 'Read about trauma after natural disasters',
                action: readTrauma
            }
        ]
    },
    {
        type: 'section',
        title: 'When to Seek Help',
        content: [
            {text: 'If you\'re feeling... ', indentLevel: 0},
            {text: 'Overwhelmed or unable to function', indentLevel: 1},
            {text: 'Disconnected or hopeless', indentLevel: 1},
            {text: 'Dependent on substances', indentLevel: 1},
            {text: 'Like you\'re not safe', indentLevel: 1},
            'You don\'t have to handle this alone. ',
            {
                button: 'Talk to Someone Now',
                action: () => Linking.openURL('tel:18009855990')
            }
        ]
    },
    {
        type: 'section',
        title: 'Coping Tools You Can Start Today',
        content: [
            {text: 'Daily Grounding Practices', indentLevel: 0},
            {
                button: 'Try a 5-minute breathing exercise',
                action: fiveMinuteBreathingExercise
            },
            {
                button: 'Use a calm app',
                action: useCalmApp, 
            },
            {text: 'Self Reflection & Expression', indentLevel: 0},
            {text: 'Start a journal with this template', indentLevel: 1},
            {text: 'Try drawing your storm story', indentLevel: 1},
            {
                button: 'Start drawing',
                action: startDrawing, 
            },
            {text: 'Routine Tracker', indentLevel: 0},
            {
                button: 'Track simple daily habits',
                action: trackHabits, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Emergency & Crisis Lines',
        content: [
            {text: '24/7 Support', indentLevel: 0},
            {
                button: 'Call 988 - National Crisis Line ',
                action: () => Linking.openURL('tel:988')
            },
            {
                button: 'Text "HELLO" to 741741 - Crisis Text Line',
                action: () => Linking.openURL('sms:741741?body=HELLO'),
            },
            {
                button: 'Call 1-800-5990 - Disaster Distress Helpline',
                action: () => Linking.openURL('tel: 18005990'),
            }
        ]
    },
    {
        type: 'section',
        title: 'Find Professional Support', 
        content: [
           {text: 'Search FEMA-approved counselors', indentLevel: 0},
            {text: 'Use Psychology Todays therapist finder',  indentLevel: 0},
            {text: 'Book a free consult with a telehealth therapist', indentLevel: 0},
            {
                button: 'Book a Consultation',
                action: bookConsultation, 
            }
        ]
    },
    {
        type: 'section',
        title: 'Local & Community Resources',
        content: [
            {text: 'Map of nearby recovery centers', indentLevel: 0},
            {text: 'See if your state offers emotional recovery grants', indentLevel: 0},
            {
                button: 'Check Emotional Recovery Grant Status'
            }
        ]
    },
    {
        type: 'section',
        title: 'Specific Support Channels',
        content: [
            {text:'For Parents:', indentLevel: 0},
            {
                button: 'Download “Helping Children Cope” Toolkit',
                action: downloadToolkit,
            },
            {text: 'For Seniors:', indentLevel: 0},
            {
                button: 'Eldercare Locator: Find Help',
                action: findHelp, 
            },
            {text: 'For Immigrants:', indentLevel: 0},
            {
                button: 'View multilingual mental health services',
                action: viewMultilingualHealthServices,
            },
        ]
    },
    {
        type: 'section',
        title: 'Learn More about Mental Health After Disasters',
        content: [
            {
                button: 'CDC Mental Health & Disasters Overview',
                action: mentalHealthandDisastersOverview, 
            },
            {
                button: 'NAMI Mental Health Resources',
                action: mentalHealthResources, 
            },
            {
                button: 'SAMHSA Disaster Mental Health Support',
                action: disasterMentalHealthSupport, 
            }
        ]
    },
];

const Mental_Health_and_Emotional_SupportScreen = ({ navigation }: any) => {
  const renderItem = ({ item }: any) => {
    if (item.type === 'header') {
      return (
        <View style={styles.headerContainer}>
          <HeaderWithMenu backRoute="/screens/Flood_RecoveryScreen" />
          <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
              contentContainerStyle={styles.listContent}
          />
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
      <HeaderWithMenu backRoute="/screens/Flood_RecoveryScreen" />
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

export default Mental_Health_and_Emotional_SupportScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F1F9FC',
  },
  listContent: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
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
    marginBottom: 15,
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
