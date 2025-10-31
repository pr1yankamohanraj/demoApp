import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Linking, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import HeaderWithMenu from './Header_with_MenuScreen';

type RootStackParamList = {
  Find_Shelter_Earthquake: undefined;
  WebViewScreen: { url: string };
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Find_Shelter_Earthquake'>;
};

const shelterData = [
  {
    id: '1',
    name: 'Los Angeles Convention Center',
    address: '1201 S Figueroa St, Los Angeles, CA 90015',
    latitude: 34.0392,
    longitude: -118.2673,
    status: 'Open',
    phone: '213-741-1151',
    services: {
      firstAid: true,
      petFriendly: true,
      wheelchairAccess: true,
      charging: true,
      meals: true,
      showers: true,
    },
    bedsAvailable: 250,
    capacity: 500,
    distance: 0,
  },
  {
    id: '2',
    name: 'Dodger Stadium Emergency Shelter',
    address: '1000 Vin Scully Ave, Los Angeles, CA 90012',
    latitude: 34.0736,
    longitude: -118.2400,
    status: 'Open',
    phone: '323-224-1500',
    services: {
      firstAid: true,
      petFriendly: false,
      wheelchairAccess: true,
      charging: true,
      meals: true,
      showers: false,
    },
    bedsAvailable: 180,
    capacity: 300,
    distance: 0,
  },
  {
    id: '3',
    name: 'USC Galen Center',
    address: '3400 S Figueroa St, Los Angeles, CA 90089',
    latitude: 34.0224,
    longitude: -118.2851,
    status: 'Open',
    phone: '213-740-0626',
    services: {
      firstAid: true,
      petFriendly: false,
      wheelchairAccess: true,
      charging: true,
      meals: false,
      showers: true,
    },
    bedsAvailable: 120,
    capacity: 200,
    distance: 0,
  },
  {
    id: '4',
    name: 'Santa Monica Civic Auditorium',
    address: '1855 Main St, Santa Monica, CA 90401',
    latitude: 34.0195,
    longitude: -118.4912,
    status: 'Full',
    phone: '310-458-8551',
    services: {
      firstAid: true,
      petFriendly: true,
      wheelchairAccess: true,
      charging: true,
      meals: true,
      showers: true,
    },
    bedsAvailable: 0,
    capacity: 150,
    distance: 0,
  },
  {
    id: '5',
    name: 'Pasadena Convention Center',
    address: '300 E Green St, Pasadena, CA 91101',
    latitude: 34.1478,
    longitude: -118.1445,
    status: 'Open',
    phone: '626-449-7360',
    services: {
      firstAid: true,
      petFriendly: false,
      wheelchairAccess: true,
      charging: true,
      meals: true,
      showers: false,
    },
    bedsAvailable: 75,
    capacity: 120,
    distance: 0,
  },
  {
    id: '6',
    name: 'Long Beach Convention Center',
    address: '300 E Ocean Blvd, Long Beach, CA 90802',
    latitude: 33.7634,
    longitude: -118.1894,
    status: 'Open',
    phone: '562-436-3636',
    services: {
      firstAid: true,
      petFriendly: true,
      wheelchairAccess: true,
      charging: true,
      meals: true,
      showers: true,
    },
    bedsAvailable: 200,
    capacity: 350,
    distance: 0,
  },
];

export default function Find_Shelter_EarthquakeScreen({ navigation }: Props) {
  const [userLocation, setUserLocation] = useState<null | { latitude: number; longitude: number }>(null);
  const [selectedShelter, setSelectedShelter] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationPermission(true);
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
      } else {
        Alert.alert(
          'Location Permission Required',
          'Please enable location services to find shelters near you.',
          [{ text: 'OK' }]
        );
      }
    })();
  }, []);

  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const sortedShelters = userLocation
    ? shelterData
        .map((shelter) => ({
          ...shelter,
          distance: getDistance(userLocation.latitude, userLocation.longitude, shelter.latitude, shelter.longitude),
        }))
        .sort((a, b) => a.distance - b.distance)
    : shelterData;

  const handleCallShelter = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleGetDirections = (latitude: number, longitude: number) => {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`);
  };

  const handleReserveInterest = (shelter: any) => {
    Alert.alert(
      'Reservation Interest',
      `Your interest has been noted for ${shelter.name}. They will contact you if space becomes available.`,
      [{ text: 'OK' }]
    );
  };

  const renderShelterItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedShelter(item);
        setModalVisible(true);
      }}
      style={styles.shelterCard}
    >
      <View style={styles.shelterHeader}>
        <Text style={styles.shelterName}>{item.name}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: item.status === 'Open' ? '#4CAF50' : '#F44336' }
        ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <Text style={styles.shelterAddress}>{item.address}</Text>
      
      <View style={styles.shelterInfo}>
        <View style={styles.infoItem}>
          <MaterialIcons name="bed" size={16} color="#666" />
          <Text style={styles.infoText}>
            {item.bedsAvailable} of {item.capacity} beds available
          </Text>
        </View>

        {userLocation && (
          <View style={styles.infoItem}>
            <MaterialIcons name="location-on" size={16} color="#666" />
            <Text style={styles.infoText}>
              {item.distance?.toFixed(1)} km away
            </Text>
          </View>
        )}
      </View>

      <View style={styles.serviceIcons}>
        {item.services.firstAid && <MaterialIcons name="healing" size={20} color="#4CAF50" />}
        {item.services.petFriendly && <MaterialIcons name="pets" size={20} color="#4CAF50" />}
        {item.services.wheelchairAccess && <MaterialIcons name="accessible" size={20} color="#4CAF50" />}
        {item.services.charging && <MaterialIcons name="battery-charging-full" size={20} color="#4CAF50" />}
        {item.services.meals && <MaterialIcons name="restaurant" size={20} color="#4CAF50" />}
        {item.services.showers && <MaterialIcons name="shower" size={20} color="#4CAF50" />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HeaderWithMenu backRoute="/screens/Earthquake_RecoveryScreen" />
      
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.headerSection}>
            <MaterialIcons name="home" size={60} color="#0A4E78" />
            <Text style={styles.title}>Find Emergency Shelter</Text>
            <Text style={styles.subtitle}>
              Locate nearby shelters with real-time availability and services
            </Text>
          </View>

          {!locationPermission && (
            <View style={styles.locationWarning}>
              <Ionicons name="location" size={24} color="#F44336" />
              <Text style={styles.warningText}>
                Enable location services to find shelters near you
              </Text>
            </View>
          )}

          {userLocation && (
            <View style={styles.mapSection}>
          <MapView
            style={styles.map}
            region={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker
              coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
              title="You Are Here"
              pinColor="blue"
            />
            {sortedShelters.map((shelter) => (
              <Marker
                key={shelter.id}
                coordinate={{ latitude: shelter.latitude, longitude: shelter.longitude }}
                pinColor={shelter.status === 'Full' ? 'red' : 'green'}
                title={shelter.name}
              >
                <Callout tooltip>
                  <View style={styles.callout}>
                    <Text style={styles.calloutTitle}>{shelter.name}</Text>
                        <Text style={styles.calloutStatus}>Status: {shelter.status}</Text>
                        <Text style={styles.calloutDistance}>
                          Distance: {shelter.distance?.toFixed(1)} km
                        </Text>
                        <Text style={styles.calloutBeds}>
                          Beds: {shelter.bedsAvailable}/{shelter.capacity}
                        </Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
            </View>
        )}

          <View style={styles.shelterListSection}>
            <Text style={styles.sectionTitle}>Available Shelters</Text>
        <FlatList
          data={sortedShelters}
          keyExtractor={(item) => item.id}
              renderItem={renderShelterItem}
              scrollEnabled={false}
            />
          </View>

          <View style={styles.quickActionsSection}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => Alert.alert('Report Issue', 'Report a shelter issue or update')}
            >
              <MaterialIcons name="report-problem" size={24} color="#0A4E78" />
              <Text style={styles.actionButtonText}>Report Shelter Issue</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => Alert.alert('Submit Shelter', 'Submit a new shelter location')}
            >
              <MaterialIcons name="add-location" size={24} color="#0A4E78" />
              <Text style={styles.actionButtonText}>Submit New Shelter</Text>
        </TouchableOpacity>
      </View>
        </View>
      </ScrollView>

      {selectedShelter && (
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle} numberOfLines={2}>{selectedShelter.name}</Text>
                <TouchableOpacity
                  style={styles.closeXButton}
                  onPress={() => setModalVisible(false)}
                >
                  <MaterialIcons name="close" size={24} color="#0A4E78" />
                </TouchableOpacity>
              </View>
              
              <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
                <Text style={styles.modalAddress}>{selectedShelter.address}</Text>
                
                <View style={styles.modalStatus}>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: selectedShelter.status === 'Open' ? '#4CAF50' : '#F44336' }
                  ]}>
                    <Text style={styles.statusText}>{selectedShelter.status}</Text>
                  </View>
                  <Text style={styles.modalBeds}>
                    {selectedShelter.bedsAvailable} of {selectedShelter.capacity} beds available
                  </Text>
                </View>

                <View style={styles.modalServices}>
                  <Text style={styles.modalServicesTitle}>Available Services:</Text>
                  <View style={styles.serviceList}>
                    <View style={styles.serviceItem}>
                      <MaterialIcons 
                        name={selectedShelter.services?.firstAid ? "healing" : "healing"} 
                        size={16} 
                        color={selectedShelter.services?.firstAid ? "#4CAF50" : "#999"} 
                      />
                      <Text style={styles.serviceItemText}>First Aid</Text>
                    </View>
                    <View style={styles.serviceItem}>
                      <MaterialIcons 
                        name={selectedShelter.services?.petFriendly ? "pets" : "pets"} 
                        size={16} 
                        color={selectedShelter.services?.petFriendly ? "#4CAF50" : "#999"} 
                      />
                      <Text style={styles.serviceItemText}>Pet Friendly</Text>
                    </View>
                    <View style={styles.serviceItem}>
                      <MaterialIcons 
                        name={selectedShelter.services?.wheelchairAccess ? "accessible" : "accessible"} 
                        size={16} 
                        color={selectedShelter.services?.wheelchairAccess ? "#4CAF50" : "#999"} 
                      />
                      <Text style={styles.serviceItemText}>Wheelchair Access</Text>
                    </View>
                    <View style={styles.serviceItem}>
                      <MaterialIcons 
                        name={selectedShelter.services?.charging ? "battery-charging-full" : "battery-charging-full"} 
                        size={16} 
                        color={selectedShelter.services?.charging ? "#4CAF50" : "#999"} 
                      />
                      <Text style={styles.serviceItemText}>Phone Charging</Text>
                    </View>
                    <View style={styles.serviceItem}>
                      <MaterialIcons 
                        name={selectedShelter.services?.meals ? "restaurant" : "restaurant"} 
                        size={16} 
                        color={selectedShelter.services?.meals ? "#4CAF50" : "#999"} 
                      />
                      <Text style={styles.serviceItemText}>Meals Provided</Text>
                    </View>
                    <View style={styles.serviceItem}>
                      <MaterialIcons 
                        name={selectedShelter.services?.showers ? "shower" : "shower"} 
                        size={16} 
                        color={selectedShelter.services?.showers ? "#4CAF50" : "#999"} 
                      />
                      <Text style={styles.serviceItemText}>Showers Available</Text>
                    </View>
                  </View>
                </View>
              </ScrollView>

              <View style={styles.modalButtons}>
              <TouchableOpacity
                  style={[styles.modalButton, styles.callButton]}
                  onPress={() => handleCallShelter(selectedShelter.phone)}
              >
                  <MaterialIcons name="phone" size={16} color="#FFFFFF" />
                  <Text style={styles.modalButtonText}>Call</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={[styles.modalButton, styles.directionsButton]}
                  onPress={() => handleGetDirections(selectedShelter.latitude, selectedShelter.longitude)}
                >
                  <MaterialIcons name="directions" size={16} color="#FFFFFF" />
                  <Text style={styles.modalButtonText}>Directions</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={[styles.modalButton, styles.reserveButton]}
                  onPress={() => handleReserveInterest(selectedShelter)}
              >
                  <MaterialIcons name="bookmark" size={16} color="#FFFFFF" />
                  <Text style={styles.modalButtonText}>Reserve</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBE9F3',
  },
  scrollContent: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0A4E78',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
  },
  locationWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
  },
  warningText: {
    marginLeft: 10,
    color: '#D32F2F',
    fontSize: 14,
  },
  mapSection: {
    width: '100%',
    height: 350,
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A4E78',
    marginBottom: 10,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  shelterListSection: {
    width: '100%',
    marginBottom: 20,
  },
  shelterCard: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shelterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  shelterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A4E78',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  shelterAddress: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  shelterInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 5,
  },
  serviceIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  quickActionsSection: {
    width: '100%',
    marginTop: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0F7FA',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A4E78',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A4E78',
    flex: 1,
    marginRight: 10,
  },
  closeXButton: {
    padding: 5,
    alignSelf: 'flex-start',
  },
  modalScrollView: {
    width: '100%',
    marginBottom: 15,
    maxHeight: 300,
  },
  modalAddress: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  modalStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalBeds: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A4E78',
  },
  modalServices: {
    width: '100%',
    marginBottom: 20,
  },
  modalServicesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A4E78',
    marginBottom: 10,
  },
  serviceList: {
    //
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  serviceItemText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'column', // Changed from 'row' to 'column'
    alignItems: 'center', // Center buttons
    width: '100%',
    marginTop: 10,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 6,
    width: '80%', // Reduced width
    marginBottom: 10, // Added margin between stacked buttons
  },
  callButton: {
    backgroundColor: '#0A4E78',
  },
  directionsButton: {
    backgroundColor: '#4CAF50',
  },
  reserveButton: {
    backgroundColor: '#FF9800',
  },
  closeButton: {
    backgroundColor: '#F44336',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  callout: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    width: 220,
    alignItems: 'center',
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  calloutStatus: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
  calloutDistance: {
    fontSize: 13,
    color: '#666',
    marginBottom: 3,
  },
  calloutBeds: {
    fontSize: 13,
    color: '#666',
  },
});
