import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Modal,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import postsData from '../../assets/posts.json';
import HeaderWithMenu from './Header_with_MenuScreen';

interface Post {
  id: string;
  author: string;
  region: string;
  created_at: string;
  title: string;
  description: string;
  verified?: boolean;
  resourceLinks?: Array<{ label: string; url: string }>;
  community: string;
}

export default function Community_PulseScreen() {
  const [trendingOnly, setTrendingOnly] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState('All Communities');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [voteCounts, setVoteCounts] = useState<Record<number | string, number>>({});
  const [dislikeCounts, setDislikeCounts] = useState<Record<number | string, number>>({});
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [regionSearchText, setRegionSearchText] = useState('');
  const [newPostData, setNewPostData] = useState({
    type: 'question',
    title: '',
    description: '',
    author: '',
    community: 'General',
    region: 'All Regions'
  });
  const [posts, setPosts] = useState<Post[]>(postsData);

  const states = [
    'All Regions', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const handleVote = (postId: string | number, isLike: boolean) => {
    if (isLike) {
      setVoteCounts(prev => ({
        ...prev,
        [postId]: (prev[postId] || 0) + 1
      }));
    } else {
      setDislikeCounts(prev => ({
        ...prev,
        [postId]: (prev[postId] || 0) + 1
      }));
    }
  };

  const handleShare = async (post: Post) => {
    try {
      await Share.share({
        message: `${post.title}\n\n${post.description}\n\nShared from Community Pulse`,
        title: post.title
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleCreatePost = () => {
    if (!newPostData.title.trim() || !newPostData.description.trim() || !newPostData.author.trim()) {
      Alert.alert('Error', 'Please fill in all required fields (Title, Description, and Author)');
      return;
    }

    const newPost: Post = {
      id: Date.now().toString(),
      author: newPostData.author,
      region: newPostData.region,
      created_at: new Date().toISOString(),
      title: newPostData.title,
      description: newPostData.description,
      community: newPostData.community
    };

    setPosts(prev => [newPost, ...prev]);
    setNewPostData({
      type: 'question',
      title: '',
      description: '',
      author: '',
      community: 'General',
      region: 'All Regions'
    });
    setShowNewPostModal(false);
    Alert.alert('Success', 'Your post has been created!');
  };

  const filtered = posts.filter(post => {
    const matchesCommunity = selectedCommunity === 'All Communities' || post.community === selectedCommunity;
    const matchesRegion = selectedRegion === 'All Regions' || post.region === selectedRegion;
    const matchesTrending = !trendingOnly || (voteCounts[post.id] || 0) >= 5;
    return matchesCommunity && matchesRegion && matchesTrending;
  });

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'question': return <MaterialIcons name="help-outline" size={20} color="#0A4E78" />;
      case 'alert': return <MaterialIcons name="warning" size={20} color="#FF6B35" />;
      case 'resource': return <MaterialIcons name="link" size={20} color="#4CAF50" />;
      case 'discussion': return <MaterialIcons name="forum" size={20} color="#9C27B0" />;
      default: return <MaterialIcons name="article" size={20} color="#666" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  const renderPostItem = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.postMeta}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <View style={styles.postInfo}>
            <Text style={styles.postAuthor}>by {item.author}</Text>
            <Text style={styles.postDate}>{formatDate(item.created_at)}</Text>
          </View>
        </View>
        {item.verified && (
          <MaterialIcons name="verified" size={16} color="#4CAF50" />
        )}
      </View>
      
      <Text style={styles.postDescription}>{item.description}</Text>
      
      {item.resourceLinks && (
        <View style={styles.resourceLinks}>
          {item.resourceLinks.map((link, index) => (
            <TouchableOpacity key={index} style={styles.resourceLink}>
              <MaterialIcons name="link" size={16} color="#0A4E78" />
              <Text style={styles.resourceLinkText}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      
      <View style={styles.postFooter}>
        <View style={styles.postActions}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => handleVote(item.id, true)}
          >
            <MaterialIcons name="thumb-up" size={16} color="#0A4E78" />
            <Text style={styles.actionText}>{voteCounts[item.id] || 0}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => handleVote(item.id, false)}
          >
            <MaterialIcons name="thumb-down" size={16} color="#FF6B35" />
            <Text style={styles.actionText}>{dislikeCounts[item.id] || 0}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={() => handleShare(item)}
          >
            <MaterialIcons name="share" size={16} color="#0A4E78" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.postTags}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.community}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.region}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderWithMenu backRoute="/screens/DashboardScreen" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Community Pulse</Text>
          <Text style={styles.welcomeSubtitle}>
            Stay connected with your community during emergencies
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={[styles.trendingButton, trendingOnly && styles.trendingButtonActive]}
            onPress={() => setTrendingOnly(!trendingOnly)}
          >
            <MaterialIcons 
              name="trending-up" 
              size={20} 
              color={trendingOnly ? "#fff" : "#0A4E78"} 
            />
            <Text style={[styles.trendingText, trendingOnly && styles.trendingTextActive]}>
              Trending
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.newPostButton}
            onPress={() => {
              console.log('New Post button clicked, setting modal to true');
              setShowNewPostModal(true);
            }}
          >
            <MaterialIcons name="add" size={20} color="#fff" />
            <Text style={styles.newPostText}>New Post</Text>
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <View style={styles.filtersSection}>
          <Text style={styles.filtersTitle}>Filter Posts</Text>
          <View style={styles.filtersRow}>
            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => Alert.alert(
                'Select Community',
                'Choose a community to filter by',
                [
                  { text: 'All Communities', onPress: () => setSelectedCommunity('All Communities') },
                  { text: 'General', onPress: () => setSelectedCommunity('General') },
                  { text: 'Earthquakes', onPress: () => setSelectedCommunity('Earthquakes') },
                  { text: 'Hurricanes & Tornadoes', onPress: () => setSelectedCommunity('Hurricanes & Tornadoes') },
                  { text: 'Wildfires', onPress: () => setSelectedCommunity('Wildfires') },
                  { text: 'Floods', onPress: () => setSelectedCommunity('Floods') },
                  { text: 'Cancel', style: 'cancel' }
                ]
              )}
            >
              <MaterialIcons name="filter-list" size={16} color="#0A4E78" />
              <Text style={styles.filterText}>{selectedCommunity}</Text>
              <MaterialIcons name="keyboard-arrow-down" size={16} color="#0A4E78" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.filterButton}
              onPress={() => Alert.alert(
                'Select Region',
                'Choose a region to filter by',
                [
                  { text: 'All Regions', onPress: () => setSelectedRegion('All Regions') },
                  { text: 'California', onPress: () => setSelectedRegion('California') },
                  { text: 'Texas', onPress: () => setSelectedRegion('Texas') },
                  { text: 'Florida', onPress: () => setSelectedRegion('Florida') },
                  { text: 'Cancel', style: 'cancel' }
                ]
              )}
            >
              <MaterialIcons name="location-on" size={16} color="#0A4E78" />
              <Text style={styles.filterText}>{selectedRegion}</Text>
              <MaterialIcons name="keyboard-arrow-down" size={16} color="#0A4E78" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Posts List */}
        <View style={styles.postsSection}>
          <Text style={styles.postsTitle}>
            {filtered.length} {filtered.length === 1 ? 'Post' : 'Posts'}
          </Text>
          <FlatList
            data={filtered}
            renderItem={renderPostItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>

      {/* New Post Modal */}
      <Modal
        visible={showNewPostModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowNewPostModal(false)}
        statusBarTranslucent={true}
        onShow={() => console.log('Modal is now visible')}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: '80%' }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create New Post</Text>
              <TouchableOpacity
                onPress={() => setShowNewPostModal(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color="#0A4E78" />
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.modalBody}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Post Type</Text>
                  <View style={styles.typeSelector}>
                    {['question', 'alert', 'resource', 'discussion'].map((type) => (
                      <TouchableOpacity
                        key={type}
                        style={[
                          styles.typeOption,
                          newPostData.type === type && styles.typeOptionSelected
                        ]}
                        onPress={() => setNewPostData(prev => ({ ...prev, type }))}
                      >
                        {getPostIcon(type)}
                        <Text style={[
                          styles.typeOptionText,
                          newPostData.type === type && styles.typeOptionTextSelected
                        ]}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Title *</Text>
                  <TextInput
                    style={styles.textInput}
                    value={newPostData.title}
                    onChangeText={(text) => setNewPostData(prev => ({ ...prev, title: text }))}
                    placeholder="Enter your post title..."
                    placeholderTextColor="#999"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Author *</Text>
                  <TextInput
                    style={styles.textInput}
                    value={newPostData.author}
                    onChangeText={(text) => setNewPostData(prev => ({ ...prev, author: text }))}
                    placeholder="Enter your name..."
                    placeholderTextColor="#999"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Description *</Text>
                  <TextInput
                    style={styles.textArea}
                    value={newPostData.description}
                    onChangeText={(text) => setNewPostData(prev => ({ ...prev, description: text }))}
                    placeholder="Share your thoughts, questions, or resources..."
                    placeholderTextColor="#999"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Community</Text>
                  <TouchableOpacity
                    style={styles.dropdownContainer}
                    onPress={() => Alert.alert(
                      'Select Community',
                      'Choose a community',
                      [
                        { text: 'General', onPress: () => setNewPostData(prev => ({ ...prev, community: 'General' })) },
                        { text: 'Earthquakes', onPress: () => setNewPostData(prev => ({ ...prev, community: 'Earthquakes' })) },
                        { text: 'Hurricanes & Tornadoes', onPress: () => setNewPostData(prev => ({ ...prev, community: 'Hurricanes & Tornadoes' })) },
                        { text: 'Wildfires', onPress: () => setNewPostData(prev => ({ ...prev, community: 'Wildfires' })) },
                        { text: 'Floods', onPress: () => setNewPostData(prev => ({ ...prev, community: 'Floods' })) },
                        { text: 'Cancel', style: 'cancel' }
                      ]
                    )}
                  >
                    <Text style={styles.dropdownText}>{newPostData.community}</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={20} color="#0A4E78" />
                  </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Region</Text>
                  <TouchableOpacity
                    style={styles.dropdownContainer}
                    onPress={() => {
                      console.log('Region dropdown pressed');
                      setShowRegionDropdown(true);
                    }}
                  >
                    <Text style={styles.dropdownText}>{newPostData.region}</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={20} color="#0A4E78" />
                  </TouchableOpacity>
                </View>
              </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowNewPostModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.createButton}
                onPress={handleCreatePost}
              >
                <Text style={styles.createButtonText}>Create Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Region Dropdown Modal */}
      <Modal
        visible={showRegionDropdown}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowRegionDropdown(false)}
        onShow={() => console.log('Region dropdown modal shown')}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { height: '85%', width: '95%', backgroundColor: '#fff' }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Region</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowRegionDropdown(false)}
              >
                <MaterialIcons name="close" size={24} color="#0A4E78" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 16, color: '#0A4E78', textAlign: 'center', marginBottom: 15 }}>
                  Select your region from the list below:
                </Text>
                <TextInput
                  style={styles.regionSearchInput}
                  placeholder="Search states..."
                  placeholderTextColor="#999"
                  value={regionSearchText}
                  onChangeText={setRegionSearchText}
                />
              </View>
              {states
                .filter(state => 
                  state.toLowerCase().includes(regionSearchText.toLowerCase())
                )
                .map((state, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.regionOption,
                    newPostData.region === state && styles.regionOptionSelected
                  ]}
                  activeOpacity={0.7}
                  onPress={() => {
                    console.log('Selected region:', state);
                    console.log('Previous region:', newPostData.region);
                    setNewPostData(prev => {
                      console.log('Setting region to:', state);
                      return { ...prev, region: state };
                    });
                    setShowRegionDropdown(false);
                    // Temporary test - show alert to confirm selection
                    setTimeout(() => {
                      Alert.alert('Region Selected', `You selected: ${state}`);
                    }, 100);
                  }}
                >
                  <Text style={[
                    styles.regionOptionText,
                    newPostData.region === state && styles.regionOptionTextSelected
                  ]}>
                    {state}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBE9F3',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  welcomeSection: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0A4E78',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#0A4E78',
    textAlign: 'center',
    lineHeight: 22,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  trendingButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#A5CFE0',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0A4E78',
  },
  trendingButtonActive: {
    backgroundColor: '#0A4E78',
  },
  trendingText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#0A4E78',
  },
  trendingTextActive: {
    color: '#fff',
  },
  newPostButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#0A4E78',
    borderRadius: 12,
  },
  newPostText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  filtersSection: {
    marginBottom: 24,
  },
  filtersTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0A4E78',
    marginBottom: 12,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 12,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#A5CFE0',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0A4E78',
  },
  filterText: {
    fontSize: 14,
    color: '#0A4E78',
    flex: 1,
    marginLeft: 8,
  },
  postsSection: {
    marginBottom: 24,
  },
  postsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0A4E78',
    marginBottom: 16,
  },
  postCard: {
    backgroundColor: '#E4F2FA',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  postMeta: {
    flex: 1,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0A4E78',
    marginBottom: 4,
    lineHeight: 24,
  },
  postInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  postAuthor: {
    fontSize: 14,
    color: '#0A4E78',
  },
  postDate: {
    fontSize: 14,
    color: '#0A4E78',
  },
  postDescription: {
    fontSize: 16,
    color: '#0A4E78',
    lineHeight: 22,
    marginBottom: 16,
  },
  resourceLinks: {
    marginBottom: 16,
  },
  resourceLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#D3EAF4',
    borderRadius: 8,
    marginBottom: 8,
  },
  resourceLinkText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#0A4E78',
    textDecorationLine: 'underline',
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 14,
    color: '#0A4E78',
  },
  postTags: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#A5CFE0',
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: '#0A4E78',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#A5CFE0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A4E78',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    flex: 1,
    paddingVertical: 10,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#A5CFE0',
  },
  inputGroup: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A4E78',
    marginBottom: 8,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  typeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#E4F2FA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A5CFE0',
  },
  typeOptionSelected: {
    backgroundColor: '#0A4E78',
    borderColor: '#0A4E78',
  },
  typeOptionText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#0A4E78',
  },
  typeOptionTextSelected: {
    color: '#fff',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#A5CFE0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#0A4E78',
    backgroundColor: '#fff',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#A5CFE0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#0A4E78',
    backgroundColor: '#fff',
    minHeight: 100,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#A5CFE0',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 16,
    color: '#0A4E78',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#E4F2FA',
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A4E78',
  },
  createButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#0A4E78',
    borderRadius: 12,
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  regionOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E4F2FA',
    backgroundColor: '#fff',
  },
  regionOptionSelected: {
    backgroundColor: '#0A4E78',
  },
  regionOptionText: {
    fontSize: 16,
    color: '#0A4E78',
    fontWeight: '500',
  },
  regionOptionTextSelected: {
    color: '#fff',
  },
  regionSearchInput: {
    borderWidth: 1,
    borderColor: '#A5CFE0',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#0A4E78',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
});
