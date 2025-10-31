import { useClerk } from '@clerk/clerk-expo';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen () {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../BackgroundImage.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={[styles.whiteOverlay, { pointerEvents: 'none' }]} />
      <View style={styles.container}>
        <Image 
          source={require('../../assets/images/AppLogo.png')}
          style={styles.appLogo}
          resizeMode="contain"
          tintColor="#0A4E78"
        />
        <Text style={styles.title1}> CRISIS </Text>
        <Text style={styles.title2}> ALERT </Text>
        <Text style={styles.title3}>LOOP </Text>
        <Text style={styles.caption}> Stay Informed, Stay Safe. </Text>
        <Text style={styles.explanation1}> Real-time crisis notification and help </Text>
        <Text style={styles.explanation2}> for first responders, parents, and </Text>
        <Text style={styles.explanation3}> everyday citizens. </Text>
        <View style={styles.iconRow}>
         <Feather
            name="alert-circle"
            size= {90}
            color="#0A4E78"
         />
          <Feather 
            name="users" 
            size={90}  
            color="#0A4E78"
          />
          <Ionicons 
            name="walk-outline" 
            size={90} 
            color="#0A4E78"
          />
        </View>
        {}
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.navigate('/screens/SignInScreen')}
        >
          <Text style={styles.buttonText}>
            Get Started
          </Text>
        </TouchableOpacity>
        
        {/* Temporary sign-out button for development */}
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
        >
          <Text style={styles.signOutButtonText}>
            Clear Session (Dev)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 105,
  },
  whiteOverlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(255, 255, 255, 0.23)', 
    zIndex: 2,
  },
  appLogo: {
    width: 250,
    height: 250,
    position: 'absolute',
    marginTop: -485,
    marginLeft: -170,
  },
  appIcon: {
    width: 170,
    height: 170,
    position: 'absolute',
    marginTop: -500,
    marginLeft: -190,
    tintColor: '#0A4E78',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  title1: {
    position: 'absolute',
    letterSpacing: 1, 
    fontSize: 45,
    textAlign: 'left',
    marginRight:-100,
    color: '#0A4E78',
    fontWeight: "bold",
    marginTop:-580,
  },
  title2: {
    position: 'absolute',
    letterSpacing: 1, 
    fontSize: 45,
    textAlign: 'left',
    marginRight:-100,
    color: '#0A4E78',
    fontWeight: "bold",
    marginTop:-490,
  },
  title3: {
    position: 'absolute',
    letterSpacing: 1, 
    fontSize: 45,
    color: '#0A4E78',
    marginBottom:10,
    textAlign: 'left',
    marginRight:-100,
    fontWeight: "bold",
    marginTop:-390,
  },
  caption: {
    position: 'absolute',
    fontSize: 25,
    marginTop:-250,
    color: '#273E53',
    fontWeight: "400",
    marginBottom:15,
  },
 explanation1: {
  position: 'absolute',
  fontSize: 22,
  marginTop:-160,
  color: '#273E53',
  fontWeight: "500",
 },
 explanation2: {
  position: 'absolute',
  fontSize: 22,
  marginTop:-100,
  color: '#273E53',
  fontWeight: "500",
 },
 explanation3: {
  position: 'absolute',
  fontSize: 22,
  marginTop:-40,
  color: '#273E53',
  fontWeight: "500",
 },
  button: {
    backgroundColor: '#0A4E78',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: 320,
    marginTop: 700,
    marginLeft:0,
  },
  buttonText: {
    color: '#FFFFFF', 
    textAlign: 'center', 
    fontSize: 23,
    fontFamily: 'Inter_500Medium',
  },
  iconRow: {
    flexDirection: 'row',
    position:'absolute',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: -270, 
  },
  signOutButton: {
    backgroundColor: '#FF0000', // Red color for sign out
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    width: 320,
    marginTop: 20, // Adjust as needed
    marginLeft: 0,
  },
  signOutButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 23,
    fontFamily: 'Inter_500Medium',
  },
});

