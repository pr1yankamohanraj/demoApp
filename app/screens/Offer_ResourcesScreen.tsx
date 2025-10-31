import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import HeaderWithMenu from './Header_with_MenuScreen';

// Data storage for resources
let globalResources = [];

const resourceCategories = [
  { id: 'food', label: 'Food', icon: 'food-variant', value: 'food' },
  { id: 'water', label: 'Water', icon: 'cup-water', value: 'water' },
  { id: 'shelter', label: 'Shelter', icon: 'home', value: 'shelter' },
  { id: 'medical', label: 'Medical Supplies', icon: 'medical-bag', value: 'medical supplies' },
  { id: 'power', label: 'Power', icon: 'lightning-bolt', value: 'power' },
  { id: 'clothing', label: 'Clothing', icon: 'tshirt-crew-outline', value: 'clothing' },
  { id: 'transportation', label: 'Transportation', icon: 'car-outline', value: 'transportation' },
  { id: 'tools', label: 'Tools & Equipment', icon: 'wrench-outline', value: 'tools' },
  { id: 'other', label: 'Other', icon: 'plus', value: 'other' },
];

export default function OfferResourcesScreen() {
  const [selectedResource, setSelectedResource] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [offerAnother, setOfferAnother] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [noExpiration, setNoExpiration] = useState(false);
  const [error, setError] = useState('');
  const [rules, setRules] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [contactPreference, setContactPreference] = useState('');
  const [contactValue, setContactValue] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resourceTitle, setResourceTitle] = useState('');

  // Contact preference options with icons - only text and email
  const contactOptions = [
    { id: 'email', label: 'Email', icon: 'email', value: 'email' },
    { id: 'text', label: 'Text Message', icon: 'message', value: 'text' },
  ];

  useEffect(() => {
    (async () => {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      await ImagePicker.requestCameraPermissionsAsync();
    })();
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      days.push({
        date: currentDate,
        dayNumber: currentDate.getDate(),
        isCurrentMonth: currentDate.getMonth() === month,
      });
    }
    return days;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (event?.type === 'dismissed') {
      setShowDatePicker(false);
      return;
    }
    
    // Update the date when user selects a date
    if (selectedDate) {
      setDate(selectedDate);
    }
    
    // Keep the picker open on Android, close on iOS
    if (Platform.OS === 'ios') {
      setShowDatePicker(false);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      if (!result.canceled) {
        setPhotos([...photos, result.assets[0].uri]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const takePhoto = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      if (!result.canceled) {
        setPhotos([...photos, result.assets[0].uri]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const removePhoto = (uri: string) => {
    setPhotos(photos.filter((photo) => photo !== uri));
  };

  const validateForm = () => {
    if (!resourceTitle || !selectedResource || !quantity || !contactPreference || !contactValue) {
      setError('Please fill in all required fields.');
      return false;
    }
    
    if (contactPreference === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue)) {
      setError('Please enter a valid email address.');
      return false;
    }
    
    if (contactPreference === 'text' && contactValue.length < 10) {
      setError('Please enter a valid phone number (at least 10 digits).');
      return false;
    }
    
    if (!agreedToTerms) {
      setError('You must agree to the terms before submitting.');
      return false;
    }
    
    setError('');
    return true;
  };

  const resetForm = () => {
    setSelectedResource('');
    setQuantity('');
    setDescription('');
    setDate(new Date());
    setNoExpiration(false);
    setRules('');
    setPhotos([]);
    setContactPreference('');
    setContactValue('');
    setAgreedToTerms(false);
    setError('');
    setResourceTitle('');
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create resource object
      const newResource = {
        id: Date.now().toString(),
        type: selectedResource,
        quantity: quantity,
        description: description,
        availableUntil: noExpiration ? null : date.toISOString(),
        address: 'Location will be shared when contacted',
        rules: rules,
        photos: photos,
        contactPreference: contactPreference,
        contactValue: contactValue,
        createdAt: new Date().toISOString(),
        status: 'available',
        offeredBy: 'Current User', // In real app, this would be user ID
        title: resourceTitle,
      };
      
      // Add to global storage (simulating database)
      globalResources.push(newResource);
      
      setSuccess(true);
      setLoading(false);
      
      if (offerAnother) {
        Alert.alert(
          'Success!',
          'Your resource has been posted successfully. Other users can now see and request your resource. Would you like to offer another resource?',
          [
            {
              text: 'Offer Another Resource',
              onPress: () => {
                resetForm();
                setSuccess(false);
              }
            },
            {
              text: 'Back to Home',
              onPress: () => {
                router.navigate('/screens/Resource_TradeScreen');
              }
            }
          ]
        );
      } else {
        Alert.alert(
          'Success!',
          'Your resource has been posted successfully. Other users can now see and request your resource. Thank you for helping your community!',
          [
            {
              text: 'Back to Home',
              onPress: () => {
                router.navigate('/screens/Resource_TradeScreen');
              }
            }
          ]
        );
      }
      
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to submit resource. Please try again.');
    }
  };



  if (success) {
    return (
      <View style={styles.outerContainer}>
        <HeaderWithMenu backRoute="/screens/Resource_TradeScreen" />
        <View style={styles.successContainer}>
          <View style={styles.successCard}>
            <MaterialCommunityIcons name="check-circle" size={60} color="#4CAF50" />
            <Text style={styles.successTitle}>Resource Posted Successfully!</Text>
            <Text style={styles.successMessage}>
              Your {selectedResource} has been added to the community resource pool. 
              Other users can now find and request your resource.
            </Text>
            <TouchableOpacity
              style={styles.successButton}
              onPress={() => {
                if (offerAnother) {
                  resetForm();
                  setSuccess(false);
                } else {
                  router.navigate('/screens/Resource_TradeScreen');
                }
              }}
            >
              <Text style={styles.successButtonText}>
                {offerAnother ? 'Offer Another Resource' : 'Back to Resource Trade'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>
      <HeaderWithMenu backRoute="/screens/Resource_TradeScreen" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons name="gift-outline" size={40} color="#0A4E78" />
          <Text style={styles.title}>Offer a Resource</Text>
        </View>
        <Text style={styles.subtitle}>Help your community by sharing what you have</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            What are you offering? <Text style={{ color: 'red' }}>*</Text>
          </Text>
          <View style={styles.categoriesContainer}>
            {resourceCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedResource === category.value && styles.categoryButtonSelected
                ]}
                onPress={() => setSelectedResource(category.value)}
              >
                <MaterialCommunityIcons 
                  name={category.icon} 
                  size={24} 
                  color={selectedResource === category.value ? '#FFFFFF' : '#0A4E78'} 
                />
                <Text style={[
                  styles.categoryButtonText,
                  selectedResource === category.value && styles.categoryButtonTextSelected
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedResource && (
            <Text style={styles.selectedCategoryText}>
              Selected: {resourceCategories.find(cat => cat.value === selectedResource)?.label}
            </Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Title of your resource <Text style={{ color: 'red' }}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter a short title (e.g. Bottled Water, First Aid Kit, Spare Room)"
            value={resourceTitle}
            onChangeText={setResourceTitle}
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Quantity <Text style={{ color: 'red' }}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter quantity with unit (e.g. 5 bottles, 2 meals, 1 room, 10 gallons, 3 boxes)"
            value={quantity}
            onChangeText={setQuantity}
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description (optional but encouraged)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Any extra info? (e.g. brand, condition, expiration date, special instructions)"
            value={description}
            onChangeText={setDescription}
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Available until (optional)</Text>
          <View style={styles.dateOptionsContainer}>
            <TouchableOpacity 
              style={[styles.dateButton, noExpiration && styles.dateButtonSelected]} 
              onPress={() => {
                setNoExpiration(true);
                setShowDatePicker(false);
              }}
            >
              <Text style={[styles.dateButtonText, noExpiration && styles.dateButtonTextSelected]}>
                No Expiration
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.dateButton, !noExpiration && styles.dateButtonSelected]} 
              onPress={() => {
                setNoExpiration(false);
                setShowDatePicker(true);
              }}
            >
              <Text style={[styles.dateButtonText, !noExpiration && styles.dateButtonTextSelected]}>
                Set Expiration Date
              </Text>
            </TouchableOpacity>
          </View>
          {!noExpiration && (
            <>
              <TouchableOpacity 
                style={styles.dateSelectorButton}
                onPress={() => setShowDatePicker(true)}
              >
                <MaterialCommunityIcons name="calendar" size={20} color="#0A4E78" />
                <Text style={styles.dateSelectorText}>
                  {date.toDateString()}
                </Text>
                <MaterialCommunityIcons name="chevron-down" size={20} color="#0A4E78" />
              </TouchableOpacity>
              
              <Modal
                visible={showDatePicker}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowDatePicker(false)}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.calendarModal}>
                    <View style={styles.calendarHeader}>
                      <Text style={styles.calendarTitle}>Select Expiration Date</Text>
                      <TouchableOpacity 
                        onPress={() => setShowDatePicker(false)}
                        style={styles.closeButton}
                      >
                        <MaterialCommunityIcons name="close" size={24} color="#0A4E78" />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.calendarContainer}>
                      <View style={styles.calendarHeader}>
                        <TouchableOpacity onPress={() => {
                          const newDate = new Date(date);
                          newDate.setMonth(date.getMonth() - 1);
                          setDate(newDate);
                        }}>
                          <MaterialCommunityIcons name="chevron-left" size={24} color="#0A4E78" />
                        </TouchableOpacity>
                        <Text style={styles.monthYearText}>
                          {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </Text>
                        <TouchableOpacity onPress={() => {
                          const newDate = new Date(date);
                          newDate.setMonth(date.getMonth() + 1);
                          setDate(newDate);
                        }}>
                          <MaterialCommunityIcons name="chevron-right" size={24} color="#0A4E78" />
                        </TouchableOpacity>
                      </View>
                      
                      <View style={styles.weekDaysContainer}>
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                          <Text key={day} style={styles.weekDayText}>{day}</Text>
                        ))}
                      </View>
                      
                      <View style={styles.daysContainer}>
                        {getDaysInMonth(date).map((day, index) => (
                          <TouchableOpacity
                            key={index}
                            style={[
                              styles.dayButton,
                              day.isCurrentMonth && day.date && styles.currentMonthDay,
                              day.date && day.date.toDateString() === date.toDateString() && styles.selectedDay,
                              day.date && day.date < new Date() && styles.pastDay,
                            ]}
                            onPress={() => {
                              if (day.date && day.date >= new Date()) {
                                setDate(day.date);
                              }
                            }}
                            disabled={!day.date || day.date < new Date()}
                          >
                            <Text style={[
                              styles.dayText,
                              day.isCurrentMonth && day.date && styles.currentMonthDayText,
                              day.date && day.date.toDateString() === date.toDateString() && styles.selectedDayText,
                              day.date && day.date < new Date() && styles.pastDayText,
                            ]}>
                              {day.dayNumber}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                    <View style={styles.calendarFooter}>
                      <TouchableOpacity 
                        style={styles.cancelButton}
                        onPress={() => setShowDatePicker(false)}
                      >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.confirmButton}
                        onPress={() => setShowDatePicker(false)}
                      >
                        <Text style={styles.confirmButtonText}>Confirm</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </>
          )}
        </View>



        <View style={styles.inputGroup}>
          <Text style={styles.label}>Any Rules or Conditions? (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="e.g. Pickup only before 6PM, no kids allowed, must show ID"
            value={rules}
            onChangeText={setRules}
            placeholderTextColor="#666"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Contact Preference <Text style={{ color: 'red' }}>*</Text>
          </Text>
          <View style={styles.categoriesContainer}>
            {contactOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.categoryButton,
                  contactPreference === option.value && styles.categoryButtonSelected
                ]}
                onPress={() => {
                  setContactPreference(option.value);
                  setContactValue('');
                }}
              >
                <MaterialCommunityIcons
                  name={option.icon as any}
                  size={24}
                  color={contactPreference === option.value ? '#FFFFFF' : '#0A4E78'}
                />
                <Text style={[
                  styles.categoryButtonText,
                  contactPreference === option.value && styles.categoryButtonTextSelected
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {contactPreference && (
            <Text style={styles.selectedCategoryText}>
              Selected: {contactOptions.find(opt => opt.value === contactPreference)?.label}
            </Text>
          )}
        </View>

        {(contactPreference === 'email' ||
          contactPreference === 'text') && (
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder={
                contactPreference === 'email'
                  ? 'Enter your email'
                  : 'Enter your phone number'
              }
              keyboardType={
                contactPreference === 'email'
                  ? 'email-address'
                  : 'phone-pad'
              }
              value={contactValue}
              onChangeText={setContactValue}
              placeholderTextColor="#666"
              autoCapitalize="none"
            />
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Photo Upload (Optional)</Text>
          <Text style={styles.photoSubtext}>Add photos to help others see what you're offering</Text>
          <View style={styles.photoButtonsRow}>
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <MaterialCommunityIcons name="image-multiple" size={20} color="#fff" />
              <Text style={styles.imageButtonText}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
              <MaterialCommunityIcons name="camera" size={20} color="#fff" />
              <Text style={styles.imageButtonText}>Camera</Text>
            </TouchableOpacity>
          </View>
          {photos.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScroll}>
              {photos.map((uri, index) => (
                <View key={uri} style={styles.photoContainer}>
                  <Image source={{ uri }} style={styles.imagePreview} />
                  <TouchableOpacity style={styles.deleteButton} onPress={() => removePhoto(uri)}>
                    <Text style={styles.deleteButtonText}>×</Text>
                  </TouchableOpacity>
                  <Text style={styles.photoNumber}>{index + 1}</Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        <View style={[styles.inputGroup, styles.switchContainer]}>
          <Text style={styles.switchLabel}>Would you like to offer another resource after this?</Text>
          <Switch
            value={offerAnother}
            onValueChange={setOfferAnother}
            trackColor={{ false: '#ccc', true: '#0A4E78' }}
            thumbColor={offerAnother ? '#0A4E78' : '#f4f3f4'}
          />
        </View>

        <View style={[styles.inputGroup, styles.termsContainer]}>
          <TouchableOpacity
            style={styles.termsRow}
            onPress={() => setAgreedToTerms(!agreedToTerms)}
          >
            <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
              {agreedToTerms && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.termsText}>
              I agree to the <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Community Guidelines</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.submitButton, loading && { opacity: 0.7 }]}
          disabled={loading}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>
            {loading ? 'Posting Resource...' : 'Post Resource'}
          </Text>
        </TouchableOpacity>
      </ScrollView>


    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#CBE9F3',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  contentContainer: {
    paddingVertical: 20,
    paddingBottom: 90,
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0A4E78',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#273E53',
    marginBottom: 30,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  inputGroup: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 25,
    shadowColor: '#0A4E78',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f7f9fc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#aac8e5',
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  pickerWrapper: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#aac8e5',
    backgroundColor: '#f7f9fc',
    overflow: 'hidden',
  },
  picker: {
    height: 52,
    width: '100%',
    color: '#0A4E78',
  },
  dateOptionsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: '#f7f9fc',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#aac8e5',
    flex: 1,
  },
  dateButtonSelected: {
    backgroundColor: '#0A4E78',
    borderColor: '#0A4E78',
  },
  dateButtonText: {
    color: '#0A4E78',
    fontWeight: '700',
    fontSize: 16,
  },
  dateButtonTextSelected: {
    color: '#fff',
  },
  selectedDate: {
    fontSize: 16,
    marginTop: 10,
    color: '#0A4E78',
    fontWeight: '500',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationButton: {
    backgroundColor: '#0A4E78',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationButtonText: {
    fontSize: 20,
  },
  photoSubtext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  photoButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 12,
  },
  imageButton: {
    backgroundColor: '#0A4E78',
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  imageButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  photoScroll: {
    width: '100%',
  },
  photoContainer: {
    position: 'relative',
    marginRight: 14,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#0A4E78',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
  },
  imagePreview: {
    width: 120,
    height: 90,
    resizeMode: 'cover',
  },
  deleteButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#b00020',
    borderRadius: 12,
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 20,
  },
  photoNumber: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: 'white',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 12,
    fontWeight: '600',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: {
    fontWeight: '600',
    fontSize: 16,
    color: '#1a1a1a',
    flex: 1,
    marginRight: 12,
  },
  termsContainer: {
    paddingVertical: 15,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#0A4E78',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#0A4E78',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#273E53',
    lineHeight: 20,
  },
  termsLink: {
    color: '#0A4E78',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  error: {
    color: '#b00020',
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '600',
    backgroundColor: '#ffebee',
    padding: 10,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: '#0A4E78',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#0A4E78',
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 10,
  },
  submitText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  successCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#0A4E78',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 10,
  },
  successIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A4E78',
    marginBottom: 15,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#273E53',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  successButton: {
    backgroundColor: '#0A4E78',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  successButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10,
  },
  categoryButton: {
    width: '30%', // Adjust as needed for grid layout
    aspectRatio: 1.2, // Make buttons slightly taller than wide
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f7fa',
    borderWidth: 1,
    borderColor: '#aac8e5',
  },
  categoryButtonSelected: {
    backgroundColor: '#0A4E78',
    borderColor: '#0A4E78',
  },
  categoryButtonText: {
    fontSize: 12,
    color: '#0A4E78',
    marginTop: 5,
    textAlign: 'center',
  },
  categoryButtonTextSelected: {
    color: '#fff',
  },
  selectedCategoryText: {
    fontSize: 14,
    color: '#0A4E78',
    fontWeight: '500',
    marginTop: 10,
    textAlign: 'center',
  },
  locationWarningOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  locationWarningCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#0A4E78',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 10,
  },
  locationWarningTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A4E78',
    marginBottom: 15,
  },
  locationWarningMessage: {
    fontSize: 16,
    color: '#273E53',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  locationWarningButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  locationWarningButton: {
    backgroundColor: '#0A4E78',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  locationWarningButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  dateSelectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f7f9fc',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#aac8e5',
    marginTop: 10,
  },
  dateSelectorText: {
    fontSize: 16,
    color: '#0A4E78',
    fontWeight: '500',
    flex: 1,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarModal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A4E78',
  },
  closeButton: {
    padding: 5,
  },
  calendarPicker: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  calendarFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#0A4E78',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  calendarContainer: {
    marginVertical: 20,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A4E78',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekDayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    width: 40,
    textAlign: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  dayButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 20,
  },
  currentMonthDay: {
    backgroundColor: '#f0f7fa',
  },
  selectedDay: {
    backgroundColor: '#0A4E78',
  },
  pastDay: {
    backgroundColor: '#f0f0f0',
  },
  dayText: {
    fontSize: 16,
    color: '#ccc',
  },
  currentMonthDayText: {
    color: '#0A4E78',
    fontWeight: '500',
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pastDayText: {
    color: '#ccc',
  },
});

// Export for use in other screens
export { globalResources };
