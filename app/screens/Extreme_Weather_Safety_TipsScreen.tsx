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

const thawPipes = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/winter-storm/frozen-pipes.html?srsltid=AfmBOoox7e_N9jeuo6jZOY4yQPjOuaD5_OFxuz6dP38O6IhmaGj3iMsG',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const COSafetyTips = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.usfa.fema.gov/prevention/life-safety-hazards/carbon-monoxide/',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const submitDamage = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/disaster/how-declared/preliminary-damage-assessments',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const reportOutage = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://poweroutage.us/',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const applyforHeatingAssistance = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.usa.gov/help-with-energy-bills',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const applyForAssistance = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.disasterassistance.gov/DAC-RI/en/assessment/captcha',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const findCoolingCenters = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://nchh.org/information-and-evidence/learn-about-healthy-housing/emergencies/extreme-heat/cooling-centers-by-state/',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };
  const locatePetShelters = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://pets.thecountyoffice.com/animal-shelter/?msclkid=206058ff33911123b80f30c22ded2b6c&utm_source=bing&utm_medium=cpc&utm_campaign=Pets%20-%20Aug%20Animal%20Shelter%20-%20PC%20241011&utm_term=shelters&utm_content=Animal%20Shelter#google_vignette',
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };
const DATA = [
    {
        type: 'header',
        title: 'Extreme Weather Safety Tips',
        description: 'Stay safe after storms, heatwaves, and freezing weather with these essential post-disaster safety tips. Learn how to protect yourself and others from hidden hazards, prevent injury, and navigate the first days after extreme weather events.',
    },
    {
        type: 'section',
        title: 'After Storms',
        content: [
            "Protect yourself from power hazards, debris, and structural damage.",
            'Stay away from downed power lines — they may be live.',
            {
                button: 'Report an Outage',
                action: reportOutage, 
            },
            'Avoid standing water that may hide sharp objects or conduct electricity.',
            'Use flashlights, not candles, to avoid fire risks.',
            'Watch for falling branches, loose debris, and unstable buildings.',
            'Do not re-enter damaged buildings until inspected.',
            {
                button: 'Submit Damage Photos',
                action: submitDamage,
            },
            'Shut off gas or power if you suspect leaks or damage.',
            'Drive cautiously — traffic lights may be out, and roads could be blocked.',
            'If you/ve been displaced or lost power,',
            {
                button: 'Find Nearby Shelter',
            }
        ]
    },
    {
        type: 'section',
        title: 'After Heatwaves',
        content: [
            "Prevent heat-related illness and help your body recover.",
            'Stay hydrated with water — avoid caffeine and alcohol.',
            'Rest in a cool place for at least 24–48 hours after extreme heat.',
            {
                button: 'Find Cooling Centers',
                action: findCoolingCenters, 
            },
            'Check on older adults, infants, and people with health conditions.',
            {
                button: 'Call Local Assistance (211)',
                action: () => Linking.openURL('tel:211'),
            },
            'Look out for heat exhaustion symptoms: dizziness, nausea, rapid pulse.',
            'Avoid physical activity until temperatures stabilize.',
            'Safely dispose of spoiled food if the power was out.',
            'Struggling emotionally?',
            {
                button: 'Talk to a Crisis Counselor',
                action: () => Linking.openURL('tel:988'),
            }
        ],
    },
    {
        type: 'section',
        title: 'After Freezing Weather',
        content: [
            "Be alert for slips, cold exposure, and heating-related risks.",
            'Walk and drive carefully — black ice may remain even after thawing begins.',
            'Avoid overexertion while shoveling snow — rest often.',
            'Let pipes thaw naturally — don’t use open flames.',
            {
                button: 'Thaw Pipes Safely',
                action: thawPipes, 
            },
            'Ventilate when using heaters or generators',
            'This prevents carbon monoxide buildup',
            'Use generators and space heaters only with proper ventilation.',
            {
                button: 'Check CO Safety Tips',
                action: COSafetyTips,

            },
            'Dress in layers indoors and out to prevent hypothermia.',
            'Clear exits and vents of snow and ice for emergency access.',
            'Need help staying warm?',
            {
                button: 'Apply for Heating Assistance',
                action: applyforHeatingAssistance, 
            }
        ]
    },
    {
        type: 'section',
        title: 'General Post-Weather Safety',
        content: [
            "Smart steps to take no matter what kind of extreme weather occurred:",
            'Use protective gloves and boots during any cleanup.',
            'Take photos of damage before any cleanup.',
            {
                button: 'Apply for Disaster Assistance',
                action: applyForAssistance, 
            },
            'Don’t enter damaged buildings unless cleared by professionals.',
            'Stay updated through local alerts and weather services.',
            'Keep pets safe — watch for signs of overheating or frostbite.',
            'Have pets with you?',
            {
                button: 'Locate Pet-Friendly Shelter',
                action: locatePetShelters,
            },
            'Report damage to your local emergency or insurance contacts.',
            'Watch for scams — verify the identity of anyone offering repairs or aid.',
            'Need emotional or crisis support?',
            {
                button: 'Call Disaster Helpline',
                action: () => Linking.openURL('tel:18009855990'),
            }
        ]
    },
];

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
 


