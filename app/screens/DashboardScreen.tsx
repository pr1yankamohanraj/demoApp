import { AntDesign, Entypo, Feather, FontAwesome5, Fontisto, MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const pages: { label: string; aliases: string[]; route: Parameters<typeof router.push>[0] }[] = [
  {
    label: 'Toxic Spills & Hazardous Materials',
    aliases: [
      'Toxic Spills', 'Toxic spills', 'Toxic', 'Toxic Spills & Hazardous Materials', 'Toxic Spills and Hazardous Materials', 'Hazardous Materials', 'Hazardous', 
      'Hazard', 'toxic spills', 'toxic', 'toxic spills & hazardous materials', 'toxic spills and hazardous materials', 'hazardous materials', 'hazardous materials', 
      'hazard', 'TOXIC SPILLS AND HAZARDOUS MATERIALS', 'Toxic Spills And Hazardous Materials', 'Toxic spills and hazardous materials', 'Hazardous materials',
    ],
    route: '/screens/Toxic_Spills_and_Hazardous_MaterialsScreen',
  },
  {
    label: 'SOS',
    aliases: [
      'SOS', 'sos', 'Sos', 'sOs', 'sOS', 'SOs', 'SoS'
    ],
    route: '/screens/SOSScreen',
  },
  {
    label: 'Settings',
    aliases: [
        'Settings', 'sEttings', 'seTtings', 'setTings', 'settIngs', 'settiNgs', 'settinGs', 'settingS', 'settings', 'setting', 'SETTINGS',
    ],
    route: '/screens/SettingsScreen',
  },
  {
    label: 'Urban Fires & Building Emergencies',
    aliases: [
        'Urban Fires & Building Emergencies', 'Urban Fires and Building Emergencies', 'URBAN FIRES AND BUILDING EMERGENCIES', 'Urban fires and building emergencies',
        'urban fires and building emergencies', 'urban fires & building emergencies', 'Urban fires and building emergencies', 'urban fires', 'Urban Fires',
        'Urban fires', 'Building Emergencies', 'Building emergencies', 'building emergencies', 'URBAN FIRES & BUILDING EMERGENCIES', 'URBAN FIRES', 
        'BUILDING EMERGENCIES', 
    ],
    route: '/screens/Urban_Fires_and_Building_EmergenciesScreen', 
  },
  {
    label: 'Extreme Weather',
    aliases: [
        'Extreme Weather', 'extreme Weather', 'extreme weather', 'Extreme weather', 'EXTREME WEATHER', 'EXTREME', 'weather', 'WEATHER', 'exTreme weather',
        'eXtreme weather', 'extReme weather', 'extrEme weather', 'extreMe weather', 'extremE weather', 'extreme wEather', 'extreme weAther', 'extreme weaTher',
        'extreme weatHer', 'extreme weathEr', 'extreme weatheR',
    ],
    route: '/screens/Extreme_WeatherScreen',
  },
  {
     label: 'Earthquakes',
     aliases: [
        'EARTHQUAKES', 'earthquakes', 'Earthquakes', 'eArthquakes', 'eaRthquakes', 'earThquakes', 'eartHquakes', 'earthQuakes', 'earthqUakes', 'earthquAkes', 
        'earthquaKes', 'earthquakEs', 'earthquakeS', 'earthquake', 'Earthquake', 'EARTHQUAKE',
     ],
     route: '/screens/Earthquake_RecoveryScreen',
  },
  {
    label: 'AI Summary Assistant', 
    aliases: [
        'AI', 'AI Assistant', 'AI assistant', 'ai', 'ai assistant', 'ai summary', 'AI summary', 'AI SUMMARY ASSISTANT', 'AI ASSISTANT', 'AI SUMMARY', 
        'ai Summary', 'ai Assistant', 'AI Summary Assistant', 'AI Assistant', 'AI Summary', 'artificial intelligence', 'assistant', 'Assistant', 'Summary', 
        'summary',
    ],
    route: '/screens/AI_Summary_AssistantScreen',
  },
  {
    label: 'Community Pulse',
    aliases: [
        'Community Pulse', 'Community pulse', 'community chat', 'chat', 'COMMUNITY PULSE', 'community pulse', 'community Pulse', 'community', 'pulse',
        'COMMUNITY', 'PULSE', 
    ],
    route: '/screens/Community_PulseScreen',
  },
  {
    label: 'Hurricanes & Tornados',
    aliases: [
        'Hurricanes & Tornados', 'hurricanes', 'hurricanes and tornados', 'Hurricanes', 'Tornados', 'HURRICANES AND TORNADOS', 'tornados', 'Hurricanes and tornados',
        'hurricanes and Tornados', 'Hurricanes and Tornados', 
    ],
    route: '/screens/Hurricanes_and_Tornados_ReliefScreen'
  },
  {
    label: 'Access Aid Programs for Earthquakes',
    aliases: [
      'Access Aid Programs for Earthquakes', 'Access Aid Programs Earthquakes', 'Aid Programs for Earthquakes', 'Earthquake Aid Programs', 'Earthquake Aid',
      'Access Aid Earthquakes', 'Earthquakes Aid Access Programs', 'access aid programs for earthquakes', 'access aid programs earthquakes',
      'aid programs for earthquakes', 'earthquake aid programs', 'earthquake aid',
      'ACCESS AID PROGRAMS FOR EARTHQUAKES', 'Access Aid Programs & Earthquakes', 'Access Aid Programs & Earthquake',
      'Aid for Earthquakes', 'Aid Earthquakes', 'Aid Programs Earthquake',
    ],
    route: '/screens/Access_Aid_Programs_EarthquakesScreen',
  },
  {
    label: 'Aftershock Safety Tips & Actions',
    aliases: [
      'Aftershock Safety Tips & Actions', 'Aftershock Safety Tips and Actions', 'Aftershock Safety Tips', 'Aftershock Safety', 'Aftershock Tips',
      'Safety Tips Aftershock', 'Safety Aftershock', 'Safety Actions Aftershock',
      'aftershock safety tips & actions', 'aftershock safety tips and actions', 'aftershock safety tips', 'aftershock safety', 'aftershock tips',
      'AFTERSHOCK SAFETY TIPS & ACTIONS', 'Aftershock Safety & Tips', 'Aftershock Safety & Actions',
    ],
    route: '/screens/Aftershock_Safety_TipsScreen',
  },
  {
    label: 'Apply for Flood Recovery Aid',
    aliases: [
      'Apply for Flood Recovery Aid', 'Apply Flood Recovery Aid', 'Flood Recovery Aid', 'Flood Aid', 'Apply for Flood Aid', 'Flood Recovery Application',
      'apply for flood recovery aid', 'apply flood recovery aid', 'flood recovery aid', 'flood aid', 'apply for flood aid', 'flood recovery application',
      'APPLY FOR FLOOD RECOVERY AID', 'Apply & Flood Recovery Aid', 'Apply for Flood & Recovery Aid',
    ],
    route: '/screens/Apply_for_Flood_Recovery_AidScreen',
  },
  {
    label: 'Displacement Support',
    aliases: [
      'Displacement Support', 'Support for Displacement', 'Support Displacement', 'Displacement Help', 'displacement support', 'DISPLACEMENT SUPPORT',
      'support after displacement', 'Help Displaced People', 'Help for Displaced People', 'displaced support',
    ],
    route: '/screens/Displacement_SupportScreen',
  },
  {
    label: 'Emotional Support After Extreme Weather',
    aliases: [
      'Emotional Support After Extreme Weather', 'Support After Extreme Weather', 'Mental Health Extreme Weather',
      'emotional support extreme weather', 'emotional support weather', 'EMOTIONAL SUPPORT AFTER EXTREME WEATHER',
      'Extreme Weather Support', 'Mental Support After Storm', 'Emotional Help After Disaster',
      'Support After Disaster', 'support emotional extreme weather', 'storm trauma support',
    ],
    route: '/screens/Extreme_Weather_Emotional_SupportScreen',
  },
  {
    label: 'Emergency Resources Hub',
    aliases: [
      'Emergency Resources Hub', 'Emergency Hub', 'Resources Hub', 'Emergency Resources', 'emergency resources hub',
      'EMERGENCY RESOURCES HUB', 'Emergency Help Center', 'Resources Emergency', 'Disaster Resources',
    ],
    route: '/screens/Emergency_Resources_HubScreen',
  },
  {
    label: 'Find Shelter During a Hurricane or Tornado',
    aliases: [
      'Find Shelter During a Hurricane or Tornado', 'Find Shelter Hurricane Tornado', 'Hurricane Shelter', 'Tornado Shelter',
      'Shelter Hurricane', 'Shelter Tornado', 'find shelter hurricane', 'find shelter tornado',
      'FIND SHELTER DURING A HURRICANE OR TORNADO', 'Hurricane or Tornado Shelter', 'Emergency Shelter Hurricane',
      'Emergency Shelter Tornado',
    ],
    route: '/screens/Find_Shelter_HurricanesScreen',
  },
  {
    label: 'Find Emergency Safe Zones',
    aliases: [
      'Find Emergency Safe Zones', 'Emergency Safe Zones', 'Find Safe Zones', 'Safe Zones', 'Emergency Zones',
      'FIND EMERGENCY SAFE ZONES', 'safe zones', 'emergency shelter zones', 'disaster safe zones',
      'Find Shelter Zones',
    ],
    route: '/screens/Find_Emergency_Safe_ZonesScreen',
  },
  {
    label: 'Earthquake Emergency - Find Emergency Shelter',
    aliases: [
      'Earthquake Emergency - Find Emergency Shelter', 'Earthquake Shelter', 'Emergency Shelter Earthquake', 'Find Earthquake Shelter',
      'earthquake emergency shelter', 'EARTHQUAKE EMERGENCY - FIND EMERGENCY SHELTER', 'quake shelter', 'shelter after earthquake',
      'Emergency Housing Earthquake', 'earthquake relief shelter',
    ],
    route: '/screens/FInd_Shelter_EarthquakeScreen',
  },
  {
    label: 'Earthquake Cleanup Assistance',
    aliases: [
        'Earthquake Cleanup Assistance', 'earthquake cleanup assistance',
        'Earthquake Cleanup Assist', 'earthquake cleanup assist',
        'Cleanup Assistance Earthquake', 'cleanup assistance earthquake',
        'Earthquake Cleanup Help', 'earthquake cleanup help',
        'Cleanup Help Earthquake', 'cleanup help earthquake',
        'EARTHQUAKE CLEANUP ASSISTANCE'
    ],
    route: '/screens/Earthquake_Cleanup_AssistanceScreen',
  },
  {
    label: 'Emotional Support After an Earthquake',
    aliases: [
        'Emotional Support After an Earthquake', 'emotional support after an earthquake',
        'Emotional Support Earthquake', 'emotional support earthquake',
        'Support After Earthquake', 'support after earthquake',
        'Emotional Aid Earthquake', 'emotional aid earthquake',
        'EMOTIONAL SUPPORT AFTER AN EARTHQUAKE'
    ],
    route: '/screens/Emotional_Support_After_an_EarthquakeScreen',
  },
  {
    label: 'Emotional Support for Hurricanes and Tornados',
    aliases: [
        'Emotional Support for Hurricanes and Tornados', 'emotional support for hurricanes and tornados',
        'Emotional Support Hurricanes Tornados', 'emotional support hurricanes tornados',
        'Support for Hurricanes and Tornados', 'support for hurricanes and tornados',
        'Emotional Aid Hurricanes Tornados', 'emotional aid hurricanes tornados',
        'EMOTIONAL SUPPORT FOR HURRICANES AND TORNADOS'
    ],
    route: '/screens/Emotional_Support_for_Hurricanes_and_TornadosScreen',
  },
  {
    label: 'Extreme Weather Home Repair Help',
    aliases: [
      'Extreme Weather Home Repair Help', 'extreme weather home repair help',
      'Extreme Weather Home Repair', 'extreme weather home repair',
      'Home Repair Help Extreme Weather', 'home repair help extreme weather',
      'Extreme Weather Repair Help', 'extreme weather repair help',
      'EXTREME WEATHER HOME REPAIR HELP'
    ],
    route: '/screens/Extreme_Weather_Home_Repair_HelpScreen',
  },
  {
    label: 'Safety Tips for Extreme Weather',
    aliases: [
      'Safety Tips for Extreme Weather',
      'safety tips for extreme weather',
      'Safety Tips Extreme Weather',
      'safety tips extreme weather',
      'Extreme Weather Safety Tips',
      'extreme weather safety tips',
      'Extreme Weather Safety',
      'extreme weather safety',
      'Extreme Weather Tips',
      'extreme weather tips',
      'EXTREME WEATHER SAFETY TIPS'
    ],
    route: '/screens/Extreme_Weather_Safety_TipsScreen',
  },
  
  {
    label: 'Extreme Weather',
    aliases: [
      'Extreme Weather', 'extreme weather',
      'Extreme Weather Info', 'extreme weather info',
      'Weather Extreme', 'weather extreme',
      'EXTREME WEATHER'
    ],
    route: '/screens/Extreme_WeatherScreen',
  }, 
  {
    label: 'Find Shelter',
    aliases: [
      'Find Shelter', 'find shelter',
      'Shelter', 'shelter',
      'Find Emergency Shelter', 'find emergency shelter',
      'FIND SHELTER'
    ],
    route: '/screens/Find_ShelterScreen',
  },
  {
    label: 'Fire Safety Tips for Urban Fires & Building Emergencies',
    aliases: [
      'Fire Safety Tips for Urban Fires & Building Emergencies',
      'fire safety tips for urban fires & building emergencies',
      'Fire Safety Tips for Urban Fires and Building Emergencies',
      'fire safety tips for urban fires and building emergencies',
      'Fire Safety Tips Urban Fires and Building Emergencies',
      'fire safety tips urban fires and building emergencies',
      'Fire Safety Tips Urban Fires & Building Emergencies',
      'fire safety tips urban fires & building emergencies',
      'Fire Safety Tips for Urban Fires',
      'fire safety tips for urban fires',
      'Fire Safety Tips Urban Fires',
      'fire safety tips urban fires',
      'Fire Safety Tips Building Emergencies',
      'fire safety tips building emergencies',
      'Fire Safety Tips',
      'fire safety tips',
      'FIRE SAFETY TIPS FOR URBAN FIRES & BUILDING EMERGENCIES'
    ],
    route: '/screens/Fire_Safety_Tips_Urban_FiresScreen',
  },
  {
    label: 'Flood Recovery',
    aliases: [
      'Flood Recovery', 'flood recovery',
      'Recovery Flood', 'recovery flood',
      'Flood Aid Recovery', 'flood aid recovery',
      'FLOOD RECOVERY'
    ],
    route: '/screens/Flood_RecoveryScreen',
  },
  {
    label: 'Get Aid During Hurricanes & Tornados',
    aliases: [
      'Get Aid During Hurricanes & Tornados',
      'get aid during hurricanes & tornados',
      'Get Aid During Hurricanes and Tornados',
      'get aid during hurricanes and tornados',
      'Get Aid Hurricanes & Tornados',
      'get aid hurricanes & tornados',
      'Get Aid Hurricanes and Tornados',
      'get aid hurricanes and tornados',
      'Aid During Hurricanes & Tornados',
      'aid during hurricanes & tornados',
      'Aid During Hurricanes and Tornados',
      'aid during hurricanes and tornados',
      'Hurricanes & Tornados Aid',
      'hurricanes & tornados aid',
      'Hurricanes and Tornados Aid',
      'hurricanes and tornados aid',
      'Get Aid Hurricanes',
      'get aid hurricanes',
      'Aid Hurricanes',
      'aid hurricanes',
      'Hurricanes Aid',
      'hurricanes aid',
      'Get Aid Tornados',
      'get aid tornados',
      'Aid Tornados',
      'aid tornados',
      'Tornados Aid',
      'tornados aid',
      'GET AID DURING HURRICANES & TORNADOS'
    ],
    route: '/screens/Get_Aid_HurricanesScreen',
  },
  {
    label: 'Get Recovery Aid for Urban Fires and Building Emergencies',
    aliases: [
      'Get Recovery Aid for Urban Fires and Building Emergencies',
      'get recovery aid for urban fires and building emergencies',
      'Recovery Aid Urban Fires', 'recovery aid urban fires',
      'Urban Fires Recovery Aid', 'urban fires recovery aid',
      'Building Emergencies Recovery Aid', 'building emergencies recovery aid',
      'GET RECOVERY AID URBAN FIRES AND BUILDING EMERGENCIES'
    ],
    route: '/screens/Get_Recovery_Aid_for_Urban_Fires_and_Building_EmergenciesScreen',
  },
  {
    label: 'Health and Exposure Resources for Toxic Spills and Hazardous Materials',
    aliases: [
      'Health and Exposure Resources for Toxic Spills and Hazardous Materials',
      'health and exposure resources for toxic spills and hazardous materials',
      'Health Exposure Resources Toxic Spills', 'health exposure resources toxic spills',
      'Toxic Spills Health Resources', 'toxic spills health resources',
      'Hazardous Materials Health Resources', 'hazardous materials health resources',
      'HEALTH AND EXPOSURE RESOURCES FOR TOXIC SPILLS AND HAZARDOUS MATERIALS'
    ],
    route: '/screens/Health_and_Exposure_Resources_for_Toxic_Spills_and_Hazardous_MaterialsScreen',
  },
  {
    label: 'Home Repair Resources',
    aliases: [
      'Home Repair Resources', 'home repair resources',
      'Repair Resources Home', 'repair resources home',
      'Home Repair Help', 'home repair help',
      'HOME REPAIR RESOURCES'
    ],
    route: '/screens/Home_Repair_ResourcesScreen',
  },
  {
    label: 'Live Map',
    aliases: [
      'Live Map', 'live map',
      'Live Emergency Map', 'live emergency map',
      'Map Live', 'map live',
      'LIVE MAP'
    ],
    route: '/screens/Live_MapScreen',
  },
  {
    label: 'Mental Health Support for Urban Fires and Building Emergencies',
    aliases: [
      'Mental Health Support for Urban Fires and Building Emergencies',
      'mental health support for urban fires and building emergencies',
      'Mental Health Support Urban Fires', 'mental health support urban fires',
      'Mental Health Support Building Emergencies', 'mental health support building emergencies',
      'Urban Fires Mental Health Support', 'urban fires mental health support',
      'BUILDING EMERGENCIES MENTAL HEALTH SUPPORT'
    ],
    route: '/screens/Mental_Health_Support_for_Urban_Fires_and_Building_EmergenciesScreen',
  },
  {
    label: 'Permissions Setup',
    aliases: [
      'Permissions Setup', 'permissions setup',
      'Setup Permissions', 'setup permissions',
      'Permissions', 'permissions',
      'PERMISSIONS SETUP'
    ],
    route: '/screens/Permissions_SetupScreen',
  },
  {
    label: 'Police Activity and Public Safety',
    aliases: [
      'Police Activity and Public Safety', 'police activity and public safety',
      'Police Activity', 'police activity',
      'Public Safety', 'public safety',
      'Police and Public Safety', 'police and public safety',
      'POLICE ACTIVITY AND PUBLIC SAFETY'
    ],
    route: '/screens/Police_Activity_and_Public_SafetyScreen',
  },
  {
    label: 'Privacy Policies',
    aliases: [
      'Privacy Policies', 'privacy policies',
      'Privacy Policy', 'privacy policy',
      'Policies Privacy', 'policies privacy',
      'PRIVACY POLICIES'
    ],
    route: '/screens/Privacy_Policies2Screen',
  },
  {
    label: 'Privacy and Trust Policies',
    aliases: [
      'Privacy and Trust Policies',
      'privacy and trust policies',
      'Privacy & Trust Policies',
      'privacy & trust policies',
      'Trust Policies',
      'trust policies',
      'Privacy Policies',
      'privacy policies',
      'PRIVACY AND TRUST POLICIES'
    ],
    route: '/screens/Private_And_Trust_PoliciesScreen',
  }
];

const CustomInput: React.FC<{ placeholder: string }> = ({ placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredPages, setFilteredPages] = useState<{ label: string; route: string }[]>([]);

  const handleChange = (text: string) => {
    const query = text.toLowerCase().trim();
    setInputValue(text);

    const filtered = pages.filter(page =>
      page.aliases.some(alias => alias.toLowerCase().includes(query))
    ).map(page => ({ label: page.label, route: page.route as string }));

    setFilteredPages(filtered);
  };

  const handleSelect = (route: string) => {
    router.push(route as Parameters<typeof router.push>[0]);
    setInputValue('');
    setFilteredPages([]);
  };

  return (
    <View style={styles.inputContainer}>
      <AntDesign name="search1" size={20} style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#336B87"
        onChangeText={handleChange}
        value={inputValue}
        returnKeyType="search"
        onSubmitEditing={() => {
          if (filteredPages.length > 0) {
            handleSelect(filteredPages[0].route);
          }
        }}
      />

      {filteredPages.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={filteredPages}
            keyExtractor={(item) => item.route}
            renderItem={({ item }: { item: { label: string; route: string } }) => (
              <TouchableOpacity
                style={styles.suggestion}
                onPress={() => handleSelect(item.route)}
              >
                <Text style={styles.suggestionText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

function getDistanceMiles(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 3958.8;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function DashboardScreen() {
  const [city, setCity] = useState('');
  const [range, setRange] = useState(1); 
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
  const [activeButtons, setActiveButtons] = useState({
    flood: false,
    wildfire: false,
    earthquake: false,
    hurricane: false,
    urban: false,
    toxicSpills: false,
    extreme: false,
  });
  const [disasterMarkers, setDisasterMarkers] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLocationPermissionGranted(false);
        return;
      }

      setLocationPermissionGranted(true);
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      const address = await Location.reverseGeocodeAsync(currentLocation.coords);
      if (address && address.length > 0) {
        setCity(address[0].city ?? '');
      }

      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10 }, 
        (loc) => {
          setLocation(loc);
          Location.reverseGeocodeAsync(loc.coords).then((addr) => {
            if (addr && addr.length > 0) setCity(addr[0].city ?? '');
          });
        }
      );
    })();
  }, []);

  const toggleButton = (key: keyof typeof activeButtons) => {
    setActiveButtons(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
 
  useEffect(() => {
    if (!location || !locationPermissionGranted) return;

    const { latitude, longitude } = location.coords;

    const filterByDistance = (disasters: any[]) => {
      return disasters.filter(d => {
        if (!d.latitude || !d.longitude) return false;
        const dist = getDistanceMiles(latitude, longitude, d.latitude, d.longitude);
        return dist <= range;
      });
    };

    const fetchDisasters = async () => {
      let results: any[] = [];

      if (activeButtons.earthquake) {
        const radiusKm = range * 1.60934;
        const eqUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${radiusKm}&orderby=time&limit=50`;
        try {
          const res = await fetch(eqUrl);
          const data = await res.json();
          if (data.features) {
            const eqs = data.features.map((feature: any) => ({
              id: feature.id,
              type: 'Earthquake',
              latitude: feature.geometry.coordinates[1],
              longitude: feature.geometry.coordinates[0],
              magnitude: feature.properties.mag,
              place: feature.properties.place,
              time: new Date(feature.properties.time),
            }));
            results = results.concat(eqs);
          }
        } catch {}
      }

      results = filterByDistance(results);
      setDisasterMarkers(results);
    };

    fetchDisasters();
  }, [location, range, activeButtons, locationPermissionGranted]);

  if (errorMsg) {
    return <View><Text>{errorMsg}</Text></View>;
  }

  if (!location && locationPermissionGranted) {
    return <View><Text>Fetching location...</Text></View>;
  }

  // Default coordinates (Los Angeles) when location permission is not granted
  const defaultLatitude = 34.0522;
  const defaultLongitude = -118.2437;
  
  const { latitude, longitude } = location?.coords || { 
    latitude: defaultLatitude, 
    longitude: defaultLongitude 
  };

  // Calculate map zoom based on alert radius
  const calculateMapRegion = () => {
    // Convert miles to degrees (approximate)
    // 1 mile ≈ 0.0145 degrees at the equator
    // We'll use a factor that works well for most latitudes
    const radiusInDegrees = range * 0.0145;
    
    // Ensure minimum zoom level for small radius
    const minDelta = 0.01;
    const maxDelta = 2.0;
    
    const delta = Math.max(minDelta, Math.min(maxDelta, radiusInDegrees * 2));
    
    return {
      latitude,
      longitude,
      latitudeDelta: delta,
      longitudeDelta: delta,
    };
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity 
        style={styles.backArrow} 
        onPress={() => router.navigate('/screens/Private_And_Trust_PoliciesScreen')}
      >
        <AntDesign name="arrowleft" size={24} color="#0A4E78" />
      </TouchableOpacity>

      {/* Search Input */}
      <View style={styles.searchSection}>
        <CustomInput placeholder="Search for emergency resources..." />
      </View>

      {/* Location Status */}
      {!locationPermissionGranted && (
        <View style={styles.locationWarning}>
          <Text style={styles.locationWarningText}>
            Location access denied. Showing default map view.
          </Text>
        </View>
      )}

      {/* Map Section */}
      <View style={styles.mapSection}>
        {locationPermissionGranted ? (
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        followsUserLocation={true}
        region={calculateMapRegion()}
      >
            {location && (
              <>
        <Circle
          center={{ latitude, longitude }}
          radius={range * 1609}
          strokeColor="rgba(10, 78, 120, 0.5)"
          fillColor="rgba(10, 78, 120, 0.15)"
        />

        <Marker
          coordinate={{ latitude, longitude }}
          title="Your Location"
          pinColor="#0A4E78"
        />
              </>
            )}

        {disasterMarkers.map((disaster) => (
          <Marker
            key={disaster.id}
            coordinate={{ latitude: disaster.latitude, longitude: disaster.longitude }}
            title={`${disaster.type}${disaster.magnitude ? ` M${disaster.magnitude}` : ''}`}
            description={disaster.place || ''}
            pinColor="#B55A5A"
          />
        ))}
      </MapView>
        ) : (
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={calculateMapRegion()}
          >
            {disasterMarkers.map((disaster) => (
              <Marker
                key={disaster.id}
                coordinate={{ latitude: disaster.latitude, longitude: disaster.longitude }}
                title={`${disaster.type}${disaster.magnitude ? ` M${disaster.magnitude}` : ''}`}
                description={disaster.place || ''}
                pinColor="#B55A5A"
              />
            ))}
          </MapView>
        )}
      </View>

      {/* Alert Radius Section */}
      <View style={styles.radiusSection}>
        <Text style={styles.adjustRadius}>Adjust Alert Radius:</Text>
      <View style={styles.sliderContainer}>
          <Text style={styles.radiusValue}>{range} mi</Text>
        <Slider
            style={styles.slider}
          minimumValue={1}
          maximumValue={50}
          minimumTrackTintColor="#0A4E78"
          maximumTrackTintColor="#B4DCE8"
          thumbTintColor="#A3C1D9"
          value={range}
          onValueChange={val => setRange(Math.round(val))}
        />
          <View style={styles.radiusLabels}>
            <Text style={styles.radiusLabel}>1</Text>
            <Text style={styles.radiusLabel}>50</Text>
          </View>
        </View>
      </View>

      {/* Disaster Type Selection */}
      <View style={styles.disasterSection}>
      <Text style={styles.disasterType}>Select disaster types:</Text>
        <View style={styles.buttonGrid}>
      {['earthquake', 'hurricane', 'flood', 'wildfire', 'toxicSpills', 'extreme', 'urban'].map((key) => {
        const isActive = activeButtons[key as keyof typeof activeButtons];
        const styleActive = styles[`${key}activeButton` as keyof typeof styles];
        const styleInactive = styles[`${key}inactiveButton` as keyof typeof styles];
        const textActive = styles[`active${capitalizeFirstLetter(key)}Text` as keyof typeof styles];
        const textInactive = styles[`inactive${capitalizeFirstLetter(key)}Text` as keyof typeof styles];
        const labelMap: Record<string, string> = {
          earthquake: 'Earthquakes',
          hurricane: 'Hurricanes & Tornadoes',
          flood: 'Floods',
          wildfire: 'Wildfires',
          toxicSpills: 'Toxic Spills & Hazardous Materials',
          extreme: 'Extreme Weather',
          urban: 'Urban Fires & Building Emergencies',
        };

        return (
          <TouchableOpacity
            key={key}
            style={isActive ? styleActive : styleInactive}
            onPress={() => toggleButton(key as keyof typeof activeButtons)}
          >
            <Text style={isActive ? textActive : textInactive}>
              {labelMap[key]}
            </Text>
          </TouchableOpacity>
        );
      })}
        </View>
      </View>

      {/* Location Display */}
      <View style={styles.locationSection}>
        <Text style={styles.description}>Showing alerts near:</Text>
      <Text style={styles.city}>{city || 'your location'}</Text>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Entypo name="home" style={styles.home} size={45} />
        <TouchableOpacity onPress={() => router.navigate('/screens/SOSScreen')}>
          <MaterialIcons name="sos" style={styles.sos} size={55} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.navigate('/screens/AI_Summary_AssistantScreen')}>
          <FontAwesome5 name="robot" style={styles.robot} size={45} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.navigate('/screens/SettingsScreen')}>
          <Fontisto name="player-settings" style={styles.settings} size={45} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.navigate('/screens/Custom_Emergencies_DashboardScreen')}>
          <Feather name="alert-triangle" style={styles.alert} size={45} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBE9F3',
    paddingTop: 50,
  },
  searchSection: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  mapSection: {
    width: '90%',
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  radiusSection: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#B4DCE8',
    borderRadius: 10,
  },
  adjustRadius: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0A4E78',
    marginBottom: 6,
    textAlign: 'center',
  },
  sliderContainer: {
    alignItems: 'center',
  },
  radiusValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0A4E78',
    marginBottom: 6,
  },
  slider: {
    width: '100%',
    height: 30,
  },
  radiusLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 2,
  },
  radiusLabel: {
    fontSize: 11,
    color: '#336B87',
  },
  disasterSection: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 12,
  },
  disasterType: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0A4E78',
    marginBottom: 8,
    textAlign: 'center',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 5,
    paddingBottom: 12,
  },
  locationSection: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#B4DCE8',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 16,
    color: '#0A4E78',
    marginRight: 10,
  },
  city: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A4E78',
  },
  bottomNav: {
    position: 'absolute',
    width: '100%',
    height: 70,
    backgroundColor: '#B4DCE8',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#B4DCE8',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#336B87',
    marginLeft: 10,
  },
  searchIcon: {
    color: '#336B87',
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    maxHeight: 200,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  suggestion: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  suggestionText: {
    color: '#336B87',
    fontSize: 14,
  },
  // Button styles
  earthquakeactiveButton: {
    backgroundColor: '#0A4E78',
    width: '47%',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  earthquakeinactiveButton: {
    backgroundColor: '#B4DCE8',
    width: '47%',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  floodactiveButton: {
    backgroundColor: '#0A4E78',
    width: '47%',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  floodinactiveButton: {
    backgroundColor: '#B4DCE8',
    width: '47%',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  toxicSpillsactiveButton: {
    backgroundColor: '#0A4E78',
    width: '47%',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  toxicSpillsinactiveButton: {
    backgroundColor: '#B4DCE8',
    width: '47%',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  wildfireactiveButton: {
    backgroundColor: '#0A4E78',
    width: '47%',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  wildfireinactiveButton: {
    backgroundColor: '#B4DCE8',
    width: '47%',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  extremeactiveButton: {
    backgroundColor: '#0A4E78',
    width: '47%',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  extremeinactiveButton: {
    backgroundColor: '#B4DCE8',
    width: '47%',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  urbanactiveButton: {
    backgroundColor: '#0A4E78',
    width: '100%',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: -5,
  },
  urbaninactiveButton: {
    backgroundColor: '#B4DCE8',
    width: '100%',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: -5,
  },
  hurricaneactiveButton: {
    backgroundColor: '#0A4E78',
    width: '47%',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  hurricaneinactiveButton: {
    backgroundColor: '#B4DCE8',
    width: '47%',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  // Text styles for buttons
  activeHurricaneText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12,
  },
  inactiveHurricaneText: {
    color: '#0A4E78',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12,
  },
  activeEarthquakeText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12,
  },
  inactiveEarthquakeText: {
    color: '#0A4E78',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12,
  },
  activeFloodText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12,
  },
  inactiveFloodText: {
    color: '#0A4E78',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12,
  },
  activeWildfireText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12,
  },
  inactiveWildfireText: {
    color: '#0A4E78',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12,
  },
  activeUrbanText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12,
  },
  inactiveUrbanText: {
    color: '#0A4E78',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12,
  },
  activeExtremeText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12,
  },
  inactiveExtremeText: {
    color: '#0A4E78',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12,
  },
  activeToxicSpillsText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12,
  },
  inactiveToxicSpillsText: {
    color: '#0A4E78',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12,
  },
  // Bottom navigation icons
  home: {
    color: '#0A4E78',
  } as any,
  sos: {
    color: '#0A4E78',
  } as any,
  robot: {
    color: '#0A4E78',
  } as any,
  settings: {
    color: '#0A4E78',
  } as any,
  alert: {
    color: '#0A4E78',
  } as any,
  backArrow: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  locationWarning: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFD700', // Yellow background for warning
    borderRadius: 10,
    alignItems: 'center',
  },
  locationWarningText: {
    color: '#0A4E78',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
