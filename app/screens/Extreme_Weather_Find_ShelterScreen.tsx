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

const findExtremeWeatherShelters = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.redcross.org/get-help/disaster-relief-and-recovery-services/find-an-open-shelter.html'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const findCoolingCenters = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.ready.gov/heat'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const findWarmingCenters = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.ready.gov/winter-weather'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const findStormShelters = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.fema.gov/emergency-managers/risk-management/safe-rooms'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const findPetShelters = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.aspca.org/pet-care/general-pet-care/disaster-preparedness'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const requestEmergencyAssistance = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.disasterassistance.gov/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const findLocalResources = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.211.org/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const extremeWeatherPreparedness = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.ready.gov/severe-weather'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

  const emergencyHotels = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        'https://www.femaemergencyhotels.com/'
      );
    } catch (error) {
      console.error('Failed to open browser:', error);
    }
  };

const DATA = [
    {
        type: 'header',
        title: 'Extreme Weather Shelters',
        description: 'Find emergency shelters and resources for extreme weather conditions including heatwaves, freezing weather, storms, and other severe weather events. Locate nearby shelters, cooling centers, warming centers, and emergency assistance.',
    },
    {
        type: 'section',
        title: 'Emergency Shelters',
        content: [
            "Find immediate shelter during extreme weather emergencies.",
            'Locate nearby emergency shelters for all types of extreme weather.',
            {
                button: 'Find Emergency Shelters',
                action: findExtremeWeatherShelters, 
            },
            'Check shelter availability and capacity before traveling.',
            'Bring essential items: medications, identification, and basic supplies.',
            'Follow local emergency management instructions.',
            'Stay informed about shelter openings and closures.',
            {
                button: 'Call Local Resources (211)',
                action: () => Linking.openURL('tel:211'),
            },
            'Many shelters provide food, water, and basic medical care.',
            'Pets may have separate accommodations or restrictions.',
            'Need immediate assistance?',
            {
                button: 'Apply for FEMA Assistance',
                action: requestEmergencyAssistance,
            }
        ]
    },
    {
        type: 'section',
        title: 'Cooling Centers',
        content: [
            "Find relief from extreme heat and heatwaves.",
            'Cooling centers provide air conditioning during heat emergencies.',
            {
                button: 'Find Cooling Centers',
                action: findCoolingCenters, 
            },
            'Stay hydrated and avoid strenuous activity.',
            'Check on elderly neighbors and those without AC.',
            'Look for signs of heat exhaustion or heat stroke.',
            'Cooling centers often provide water and basic medical care.',
            'Some centers offer extended hours during heat emergencies.',
            'Public libraries and community centers often serve as cooling centers.',
            'Need help staying cool?',
            {
                button: 'Call Emergency Services',
                action: () => Linking.openURL('tel:911'),
            }
        ],
    },
    {
        type: 'section',
        title: 'Warming Centers',
        content: [
            "Find warmth during freezing weather and winter storms.",
            'Warming centers provide heat during cold emergencies.',
            {
                button: 'Find Warming Centers',
                action: findWarmingCenters, 
            },
            'Dress in layers and avoid prolonged outdoor exposure.',
            'Check on vulnerable populations during cold weather.',
            'Watch for signs of hypothermia and frostbite.',
            'Warming centers provide hot drinks and basic supplies.',
            'Some centers offer overnight accommodations.',
            'Public buildings and churches often serve as warming centers.',
            'Need heating assistance?',
            {
                button: 'Find Emergency Hotels',
                action: emergencyHotels,
            }
        ]
    },
    {
        type: 'section',
        title: 'Storm Shelters',
        content: [
            "Find safe shelter during severe storms and tornadoes.",
            'Storm shelters provide protection from high winds and debris.',
            {
                button: 'Find Storm Shelters',
                action: findStormShelters, 
            },
            'Know the difference between tornado watches and warnings.',
            'Have a plan for where to go if you need to evacuate.',
            'Storm shelters are often in schools, community centers, or designated safe rooms.',
            'Bring emergency supplies: flashlight, water, and first aid kit.',
            'Stay informed through weather alerts and local news.',
            'Follow evacuation orders immediately.',
            'Have pets?',
            {
                button: 'Find Pet-Friendly Shelters',
                action: findPetShelters,
            },
            'Need weather preparedness information?',
            {
                button: 'Learn Weather Preparedness',
                action: extremeWeatherPreparedness,
            }
        ]
    },
];

const ExtremeWeatherShelterScreen = () => {
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
 
 export default ExtremeWeatherShelterScreen;
 
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