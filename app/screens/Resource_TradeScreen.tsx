import { AntDesign, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HeaderWithMenu from './Header_with_MenuScreen';

export default function Resource_TradeScreen() {
  console.log('Resource Trade Screen loaded - updated version');
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ marginTop: -65 }}>
        <HeaderWithMenu backRoute="/screens/Custom_Emergencies_DashboardScreen" />
      </View>

      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Header Section */}
        <View style={styles.headerSection}>
          <FontAwesome name="exchange" size={80} color="#0A4E78" style={styles.resourceTradeIcon} />
          <Text style={styles.title}>Resource Trade</Text>
          <Text style={styles.description}>
            Connect with your community to share, exchange, and access essential resources during emergencies and recovery.
          </Text>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.featuresContainer}>
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <MaterialIcons name="search" size={30} color="#0A4E78" />
              </View>
              <Text style={styles.featureTitle}>Browse & Search</Text>
              <Text style={styles.featureDescription}>
                Find exactly what you need with our smart search and filtering system
              </Text>
            </View>
            
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <MaterialIcons name="chat" size={30} color="#0A4E78" />
              </View>
              <Text style={styles.featureTitle}>Connect Safely</Text>
              <Text style={styles.featureDescription}>
                Message other users securely and arrange safe exchanges
              </Text>
            </View>
            
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <MaterialIcons name="verified" size={30} color="#0A4E78" />
              </View>
              <Text style={styles.featureTitle}>Verified Community</Text>
              <Text style={styles.featureDescription}>
                All users are verified to ensure safe and reliable exchanges
              </Text>
            </View>
          </View>
        </View>

        {/* Main Action Buttons */}
        <View style={styles.actionSection}>
          <Text style={styles.sectionTitle}>Get Started</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.navigate('/screens/Offer_ResourcesScreen')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="offer" size={40} color="#FFFFFF" style={styles.buttonIcon} />
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Offer Resources</Text>
              <Text style={styles.buttonSubtext}>Share what you have to help others</Text>
            </View>
            <AntDesign name="right" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button2}
            onPress={() => router.navigate('/screens/Get_ResourcesScreen')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="hand-coin" size={40} color="#FFFFFF" style={styles.buttonIcon} />
            <View style={styles.buttonContent}>
              <Text style={styles.button2Text}>Get Resources</Text>
              <Text style={styles.buttonSubtext}>Find what you need from the community</Text>
            </View>
            <AntDesign name="right" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Available Categories Section */}
        <View style={styles.popularSection}>
          <Text style={styles.sectionTitle}>What You Can Offer</Text>
          <Text style={styles.sectionSubtitle}>Choose from these resource categories when offering help</Text>
          <View style={styles.popularContainer}>
            <View style={styles.popularItem}>
              <MaterialCommunityIcons name="food" size={24} color="#0A4E78" />
              <Text style={styles.popularText}>Food</Text>
            </View>
            <View style={styles.popularItem}>
              <MaterialCommunityIcons name="water" size={24} color="#0A4E78" />
              <Text style={styles.popularText}>Water</Text>
            </View>
            <View style={styles.popularItem}>
              <MaterialCommunityIcons name="home" size={24} color="#0A4E78" />
              <Text style={styles.popularText}>Shelter</Text>
            </View>
            <View style={styles.popularItem}>
              <MaterialCommunityIcons name="medical-bag" size={24} color="#0A4E78" />
              <Text style={styles.popularText}>Medical Supplies</Text>
            </View>
            <View style={styles.popularItem}>
              <MaterialCommunityIcons name="lightning-bolt" size={24} color="#0A4E78" />
              <Text style={styles.popularText}>Power</Text>
            </View>
            <View style={styles.popularItem}>
              <MaterialCommunityIcons name="tshirt-crew" size={24} color="#0A4E78" />
              <Text style={styles.popularText}>Clothing</Text>
            </View>
            <View style={styles.popularItem}>
              <MaterialCommunityIcons name="car" size={24} color="#0A4E78" />
              <Text style={styles.popularText}>Transportation</Text>
            </View>
            <View style={styles.popularItem}>
              <MaterialCommunityIcons name="tools" size={24} color="#0A4E78" />
              <Text style={styles.popularText}>Tools & Equipment</Text>
            </View>
            <View style={styles.popularItem}>
              <MaterialCommunityIcons name="dots-horizontal" size={24} color="#0A4E78" />
              <Text style={styles.popularText}>Other</Text>
            </View>
          </View>
        </View>

        {/* Safety Tips Section */}
        <View style={styles.safetySection}>
          <Text style={styles.sectionTitle}>Safety Guidelines</Text>
          
          {/* Meeting Safety */}
          <View style={styles.safetyCard}>
            <MaterialIcons name="location-on" size={30} color="#0A4E78" style={styles.safetyIcon} />
            <View style={styles.safetyContent}>
              <Text style={styles.safetyTitle}>Meeting Location Safety</Text>
              <View style={styles.safetyTextContainer}>
                <Text style={styles.safetyText}>Choose public, well-lit locations like shopping centers or police stations</Text>
                <Text style={styles.safetyText}>Avoid meeting at private residences or isolated areas</Text>
                <Text style={styles.safetyText}>Consider meeting during daylight hours when possible</Text>
                <Text style={styles.safetyText}>Let a friend or family member know where you're going</Text>
              </View>
            </View>
          </View>

          {/* Personal Safety */}
          <View style={styles.safetyCard}>
            <MaterialIcons name="person" size={30} color="#0A4E78" style={styles.safetyIcon} />
            <View style={styles.safetyContent}>
              <Text style={styles.safetyTitle}>Personal Safety Measures</Text>
              <View style={styles.safetyTextContainer}>
                <Text style={styles.safetyText}>Bring a friend or family member with you</Text>
                <Text style={styles.safetyText}>Keep your phone charged and easily accessible</Text>
                <Text style={styles.safetyText}>Trust your instincts - if something feels off, don't proceed</Text>
                <Text style={styles.safetyText}>Don't share personal financial information</Text>
              </View>
            </View>
          </View>

          {/* Item Verification */}
          <View style={styles.safetyCard}>
            <MaterialIcons name="verified" size={30} color="#0A4E78" style={styles.safetyIcon} />
            <View style={styles.safetyContent}>
              <Text style={styles.safetyTitle}>Item Verification</Text>
              <View style={styles.safetyTextContainer}>
                <Text style={styles.safetyText}>Inspect items thoroughly before accepting</Text>
                <Text style={styles.safetyText}>Test equipment or electronics if applicable</Text>
                <Text style={styles.safetyText}>Ask questions about item condition and history</Text>
                <Text style={styles.safetyText}>Be honest about what you're offering</Text>
              </View>
            </View>
          </View>

          {/* Communication Safety */}
          <View style={styles.safetyCard}>
            <MaterialIcons name="chat" size={30} color="#0A4E78" style={styles.safetyIcon} />
            <View style={styles.safetyContent}>
              <Text style={styles.safetyTitle}>Communication Safety</Text>
              <View style={styles.safetyTextContainer}>
                <Text style={styles.safetyText}>Use the app's messaging system for initial contact</Text>
                <Text style={styles.safetyText}>Be cautious about sharing personal contact information</Text>
                <Text style={styles.safetyText}>Report suspicious behavior to app administrators</Text>
                <Text style={styles.safetyText}>Keep conversations professional and respectful</Text>
              </View>
            </View>
          </View>

          {/* Emergency Contacts */}
          <View style={styles.safetyCard}>
            <MaterialIcons name="emergency" size={30} color="#0A4E78" style={styles.safetyIcon} />
            <View style={styles.safetyContent}>
              <Text style={styles.safetyTitle}>Emergency Contacts</Text>
              <View style={styles.safetyTextContainer}>
                <Text style={styles.safetyText}>Local Police: 911</Text>
                <Text style={styles.safetyText}>App Support: Available 24/7 through in-app chat</Text>
                <Text style={styles.safetyText}>Trusted Friend/Family: Keep someone informed of your plans</Text>
                <Text style={styles.safetyText}>Trust your community - most users are here to help</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#CBE9F3',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 5, 
    paddingBottom: 40,
    alignItems: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  resourceTradeIcon: {
    marginBottom: 20,
  },
  title: {
    letterSpacing: 1,
    fontSize: 45,
    textAlign: 'center',
    color: '#0A4E78',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 19,
    color: '#273E53',
    fontWeight: '400',
    marginBottom: 15,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 28,
    color: '#0A4E78',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#273E53',
    fontWeight: '400',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  actionSection: {
    width: '100%',
    marginBottom: 30,
  },
  button: {
    borderRadius: 12,
    backgroundColor: '#336B87',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    height: 100,
    marginBottom: 20,
  },
  buttonIcon: {
    marginRight: 15,
  },
  buttonContent: {
    flex: 1,
    marginRight: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'Inter_500Medium',
    marginBottom: 5,
  },
  buttonSubtext: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  button2: {
    borderRadius: 12,
    backgroundColor: '#336B87',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    height: 100,
  },
  button2Text: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'Inter_500Medium',
    marginBottom: 5,
  },
  featuresSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  featureCard: {
    alignItems: 'center',
    width: '30%',
  },
  featureIconContainer: {
    backgroundColor: '#E0F2F7',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 20,
    color: '#0A4E78',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 16,
    color: '#273E53',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  popularSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  popularContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  popularItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FBFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 8,
    width: '48%',
    justifyContent: 'center',
  },
  popularText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#273E53',
    fontWeight: '500',
  },
  safetySection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  safetyCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 15,
    width: '100%',
  },
  safetyIcon: {
    marginRight: 15,
    marginTop: 5,
  },
  safetyContent: {
    flex: 1,
  },
  safetyTitle: {
    fontSize: 20,
    color: '#0A4E78',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  safetyTextContainer: {
    marginTop: 5,
  },
  safetyText: {
    fontSize: 15,
    color: '#273E53',
    lineHeight: 22,
    marginBottom: 8,
    paddingLeft: 0,
  },
});
