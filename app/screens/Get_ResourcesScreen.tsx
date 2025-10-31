import { AntDesign, Entypo, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    Linking,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import HeaderWithMenu from './Header_with_MenuScreen';
import { globalResources } from './Offer_ResourcesScreen';

// Type definitions
interface Resource {
  id: string;
  type: string;
  quantity: string;
  description?: string;
  availableUntil?: string;
  address: string;
  rules?: string;
  photos: string[];
  contactPreference: string;
  contactValue: string;
  createdAt: string;
  status: string;
  offeredBy: string;
  title?: string;
}

const resourceCategories = [
  { id: 'all', label: 'All Resources', icon: 'grid-outline', set: 'Ionicons' },
  { id: 'food', label: 'Food', icon: 'fast-food-outline', set: 'Ionicons' },
  { id: 'water', label: 'Water', icon: 'water', set: 'FontAwesome5' },
  { id: 'shelter', label: 'Shelter', icon: 'home', set: 'MaterialIcons' },
  { id: 'medical', label: 'Medical Supplies', icon: 'medkit', set: 'Ionicons' },
  { id: 'power', label: 'Power', icon: 'battery-charging-full', set: 'MaterialIcons' },
  { id: 'clothing', label: 'Clothing', icon: 'shirt-outline', set: 'Ionicons' },
  { id: 'transportation', label: 'Transportation', icon: 'car-outline', set: 'Ionicons' },
  { id: 'tools', label: 'Tools & Equipment', icon: 'construct-outline', set: 'Ionicons' },
  { id: 'other', label: 'Other', icon: 'dots-three-horizontal', set: 'Entypo' },
];

const GetResourcesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, distance
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    filterResources();
  }, [searchQuery, selectedCategory, sortBy, globalResources]);

  const filterResources = () => {
    let filtered = [...globalResources];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.type === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(resource =>
        resource.type.toLowerCase().includes(query) ||
        resource.description?.toLowerCase().includes(query) ||
        resource.quantity.toLowerCase().includes(query) ||
        resource.address.toLowerCase().includes(query)
      );
    }

    // Sort resources
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        default:
          return 0;
      }
    });

    setFilteredResources(filtered);
  };

  const getCategoryIcon = (category: string) => {
    const cat = resourceCategories.find(c => c.id === category);
    if (!cat) return null;

    switch (cat.set) {
      case 'Ionicons':
        return <Ionicons name={cat.icon} size={24} color="#0A4E78" />;
      case 'FontAwesome5':
        return <FontAwesome5 name={cat.icon} size={24} color="#0A4E78" />;
      case 'MaterialIcons':
        return <MaterialIcons name={cat.icon} size={24} color="#0A4E78" />;
      case 'Entypo':
        return <Entypo name={cat.icon} size={24} color="#0A4E78" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  // Function to mask address for safety - only show state
  const maskAddress = (fullAddress: string) => {
    if (!fullAddress) return 'Location not specified';
    
    // Split address into parts
    const parts = fullAddress.split(',').map(part => part.trim());
    
    if (parts.length >= 2) {
      // Show only the state (last part, excluding zip code)
      const statePart = parts[parts.length - 1];
      // Remove zip code if it exists (5 digits) and any extra spaces
      const stateOnly = statePart.replace(/\s+\d{5}(-\d{4})?$/, '').replace(/\s+$/, '').trim();
      return `📍 ${stateOnly}`;
    } else if (parts.length === 1) {
      // If only one part, show it but add "Area" for safety
      return `📍 ${parts[0]} Area`;
    }
    
    return '📍 General Area';
  };

  const [showContactModal, setShowContactModal] = useState(false);
  const [contactResource, setContactResource] = useState<Resource | null>(null);
  const [contactMessage, setContactMessage] = useState('');

  const handleContact = async (resource: Resource) => {
    const { contactPreference, contactValue, type, quantity, title } = resource;
    
    // Create default message
    let defaultMessage = `Hi! I'm interested in your ${title || type} (${quantity}). `;
    defaultMessage += `I saw your post on the community resource exchange. `;
    defaultMessage += `Could you please let me know if this is still available?`;

    setContactMessage(defaultMessage);
    setContactResource(resource);
    setShowContactModal(true);
  };

  const sendEmail = async () => {
    if (!contactResource) return;

    try {
      const isAvailable = await MailComposer.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert('Error', 'Email is not available on this device');
        return;
      }

      const result = await MailComposer.composeAsync({
        recipients: [contactResource.contactValue],
        subject: `Resource Request: ${contactResource.title || contactResource.type}`,
        body: contactMessage,
      });

      console.log('Email composer result:', result);
      
      if (result.status === 'sent') {
        Alert.alert('Success', 'Email sent successfully!');
        setShowContactModal(false);
      } else if (result.status === 'cancelled') {
        // User cancelled the email composition
        console.log('Email composition was cancelled by user');
      } else {
        // Other status like 'saved' or 'failed'
        console.log('Email composer returned status:', result.status);
        Alert.alert('Info', 'Email composition completed. Check your email app for the draft.');
        setShowContactModal(false);
      }
    } catch (error) {
      console.error('Email composer error:', error);
      Alert.alert('Error', 'Failed to open email composer. Please try again.');
    }
  };

  const sendTextMessage = async () => {
    if (!contactResource) return;

    try {
      // Clean the phone number (remove any non-digit characters)
      const cleanPhoneNumber = contactResource.contactValue.replace(/\D/g, '');
      
      // Create SMS URL
      const message = `sms:${cleanPhoneNumber}?body=${encodeURIComponent(contactMessage)}`;
      
      console.log('Attempting to open SMS with URL:', message);
      
      const supported = await Linking.canOpenURL(message);
      
      if (supported) {
        await Linking.openURL(message);
        setShowContactModal(false);
      } else {
        // Fallback: try to open just the SMS app
        const smsApp = await Linking.canOpenURL('sms:');
        if (smsApp) {
          await Linking.openURL('sms:');
          Alert.alert('Info', 'SMS app opened. Please manually enter the number and message.');
        } else {
          Alert.alert('Error', 'SMS is not available on this device');
        }
      }
    } catch (error) {
      console.error('SMS error:', error);
      Alert.alert('Error', 'Failed to open SMS app. Please try again.');
    }
  };

  const renderResourceItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resourceCard}
      onPress={() => {
        setSelectedResource(item);
        setShowResourceModal(true);
      }}
    >
      {/* Top Row: Icon, Title, Status */}
      <View style={styles.resourceHeader}>
        <View style={styles.resourceIcon}>
          {getCategoryIcon(item.type)}
        </View>
        <View style={styles.resourceInfo}>
          <Text style={styles.resourceTitle}>
            {item.title || item.type}
          </Text>
          <Text style={styles.resourceQuantity}>{item.quantity}</Text>
        </View>
        <View style={styles.resourceStatus}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Available</Text>
          </View>
        </View>
      </View>
      
      {/* Description */}
      {item.description && (
        <Text style={styles.resourceDescription} numberOfLines={2}>
          {item.description}
        </Text>
      )}
      
      {/* Bottom Row: Date, Contact */}
      <View style={styles.resourceFooter}>
        <View style={styles.resourceMeta}>
          <View style={styles.metaItem}>
            <MaterialIcons name="schedule" size={16} color="#666" />
            <Text style={styles.resourceDate}>Posted {formatDate(item.createdAt)}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => handleContact(item)}
        >
          <MaterialIcons name="message" size={16} color="#fff" />
          <Text style={styles.contactButtonText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        selectedCategory === item.id && styles.categoryCardSelected
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <View style={styles.categoryIcon}>
        {getCategoryIcon(item.id)}
      </View>
      <Text style={[
        styles.categoryLabel,
        selectedCategory === item.id && styles.categoryLabelSelected
      ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HeaderWithMenu backRoute="/screens/Resource_TradeScreen" />

      <View style={styles.header}>
        <Text style={styles.title}>Find Resources</Text>
        <Text style={styles.subtitle}>Browse available resources from your community</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search resources..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <MaterialIcons name="filter-list" size={24} color="#0A4E78" />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <Text style={styles.filterTitle}>Sort by:</Text>
          <View style={styles.sortButtons}>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === 'newest' && styles.sortButtonActive]}
              onPress={() => setSortBy('newest')}
            >
              <Text style={[styles.sortButtonText, sortBy === 'newest' && styles.sortButtonTextActive]}>
                Newest
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === 'oldest' && styles.sortButtonActive]}
              onPress={() => setSortBy('oldest')}
            >
              <Text style={[styles.sortButtonText, sortBy === 'oldest' && styles.sortButtonTextActive]}>
                Oldest
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={resourceCategories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Resources List */}
      <View style={styles.resourcesContainer}>
        {filteredResources.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="search-off" size={80} color="#ccc" />
            <Text style={styles.emptyTitle}>No resources found</Text>
            <Text style={styles.emptyMessage}>
              {searchQuery || selectedCategory !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Be the first to offer a resource to your community!'
              }
            </Text>
            {!searchQuery && selectedCategory === 'all' && (
              <TouchableOpacity
                style={styles.offerButton}
                onPress={() => router.navigate('/screens/Offer_ResourcesScreen')}
              >
                <Text style={styles.offerButtonText}>Offer a Resource</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <FlatList
            data={filteredResources}
            renderItem={renderResourceItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.resourcesList}
          />
        )}
      </View>

      {/* Resource Detail Modal */}
      <Modal
        visible={showResourceModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowResourceModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Resource Details</Text>
              <TouchableOpacity
                onPress={() => setShowResourceModal(false)}
                style={styles.closeButton}
              >
                <AntDesign name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {selectedResource && (
              <ScrollView style={styles.modalBody}>
                <View style={styles.modalResourceHeader}>
                  <View style={styles.modalResourceIcon}>
                    {getCategoryIcon(selectedResource.type)}
                  </View>
                  <View style={styles.modalResourceInfo}>
                    <Text style={styles.modalResourceTitle}>{selectedResource.type}</Text>
                    <Text style={styles.modalResourceQuantity}>{selectedResource.quantity}</Text>
                  </View>
                </View>

                {selectedResource.description && (
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Description</Text>
                    <Text style={styles.modalDescription}>{selectedResource.description}</Text>
                  </View>
                )}

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Location</Text>
                  <Text style={styles.modalLocation}>📍 {selectedResource.address}</Text>
                </View>

                {selectedResource.rules && (
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Rules & Conditions</Text>
                    <Text style={styles.modalRules}>{selectedResource.rules}</Text>
                  </View>
                )}

                {selectedResource.availableUntil && (
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Available Until</Text>
                    <Text style={styles.modalDate}>
                      {new Date(selectedResource.availableUntil).toLocaleDateString()}
                    </Text>
                  </View>
                )}

                {selectedResource.photos && selectedResource.photos.length > 0 && (
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Photos</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {selectedResource.photos.map((photo, index) => (
                        <Image key={index} source={{ uri: photo }} style={styles.modalPhoto} />
                      ))}
                    </ScrollView>
                  </View>
                )}

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Posted</Text>
                  <Text style={styles.modalPostedDate}>
                    {formatDate(selectedResource.createdAt)} by {selectedResource.offeredBy}
                  </Text>
                </View>
              </ScrollView>
            )}

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalContactButton}
                onPress={() => {
                  handleContact(selectedResource);
                  setShowResourceModal(false);
                }}
              >
                <Text style={styles.modalContactButtonText}>Contact Provider</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Contact Modal */}
      <Modal
        visible={showContactModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowContactModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Contact Provider</Text>
              <TouchableOpacity
                onPress={() => setShowContactModal(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color="#0A4E78" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {contactResource && (
                <>
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Resource Details</Text>
                    <Text style={styles.modalDescription}>
                      {contactResource.title || contactResource.type} ({contactResource.quantity})
                    </Text>
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Contact Method</Text>
                    <Text style={styles.modalDescription}>
                      {contactResource.contactPreference === 'email' ? 'Email' : 'Text Message'}: {contactResource.contactValue}
                    </Text>
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Message</Text>
                    <Text style={styles.modalDescription}>
                      Review and edit your message before sending:
                    </Text>
                    <TextInput
                      style={styles.messageInput}
                      value={contactMessage}
                      onChangeText={setContactMessage}
                      multiline
                      numberOfLines={6}
                      placeholder="Edit your message here..."
                      placeholderTextColor="#666"
                    />
                  </View>
                </>
              )}
            </ScrollView>

            <View style={styles.modalFooter}>
              <View style={styles.contactButtons}>
                {contactResource?.contactPreference === 'email' ? (
                  <TouchableOpacity
                    style={styles.sendButton}
                    onPress={sendEmail}
                  >
                    <MaterialIcons name="email" size={20} color="#fff" />
                    <Text style={styles.sendButtonText}>Send Email</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.sendButton}
                    onPress={sendTextMessage}
                  >
                    <MaterialIcons name="message" size={20} color="#fff" />
                    <Text style={styles.sendButtonText}>Send Text</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GetResourcesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBE9F3',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0A4E78',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#273E53',
    fontStyle: 'italic',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 10,
    shadowColor: '#0A4E78',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  filterButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#0A4E78',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  filtersContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#0A4E78',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A4E78',
    marginBottom: 10,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  sortButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sortButtonActive: {
    backgroundColor: '#0A4E78',
    borderColor: '#0A4E78',
  },
  sortButtonText: {
    fontSize: 14,
    color: '#666',
  },
  sortButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  categoriesContainer: {
    marginBottom: 15,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 10,
    minWidth: 80,
    shadowColor: '#0A4E78',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  categoryCardSelected: {
    backgroundColor: '#0A4E78',
  },
  categoryIcon: {
    marginBottom: 5,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  categoryLabelSelected: {
    color: '#fff',
  },
  resourcesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resourcesList: {
    paddingBottom: 20,
  },
  resourceCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#0A4E78',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  resourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  resourceIcon: {
    backgroundColor: '#E0F2F7',
    padding: 10,
    borderRadius: 12,
    marginRight: 12,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A4E78',
    marginBottom: 2,
  },
  resourceQuantity: {
    fontSize: 16,
    color: '#273E53',
    marginBottom: 2,
  },
  resourceDate: {
    fontSize: 12,
    color: '#666',
  },
  resourceStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  resourceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  resourceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  resourceMeta: {
    flex: 1,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  resourceLocation: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  resourceDate: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  contactButton: {
    backgroundColor: '#0A4E78',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  offerButton: {
    backgroundColor: '#0A4E78',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  offerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A4E78',
  },
  closeButton: {
    padding: 5,
  },
  modalBody: {
    padding: 20,
  },
  modalResourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalResourceIcon: {
    backgroundColor: '#E0F2F7',
    padding: 15,
    borderRadius: 15,
    marginRight: 15,
  },
  modalResourceInfo: {
    flex: 1,
  },
  modalResourceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A4E78',
    marginBottom: 5,
  },
  modalResourceQuantity: {
    fontSize: 18,
    color: '#273E53',
  },
  modalSection: {
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A4E78',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 16,
    color: '#273E53',
    lineHeight: 24,
  },
  modalLocation: {
    fontSize: 16,
    color: '#273E53',
  },
  modalRules: {
    fontSize: 16,
    color: '#273E53',
    lineHeight: 24,
  },
  modalDate: {
    fontSize: 16,
    color: '#273E53',
  },
  modalPhoto: {
    width: 120,
    height: 90,
    borderRadius: 8,
    marginRight: 10,
  },
  modalPostedDate: {
    fontSize: 16,
    color: '#666',
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  modalContactButton: {
    backgroundColor: '#0A4E78',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalContactButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    fontSize: 16,
    color: '#000',
    textAlignVertical: 'top',
    minHeight: 120,
  },
  contactButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  sendButton: {
    backgroundColor: '#0A4E78',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
