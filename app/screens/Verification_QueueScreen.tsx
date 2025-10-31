import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import HeaderWithMenu from './Header_with_MenuScreen';

interface VerificationItem {
  id: string;
  type: 'document' | 'photo' | 'identity' | 'resource';
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  submittedAt: Date;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

const mockVerificationItems: VerificationItem[] = [
  {
    id: '1',
    type: 'document',
    title: 'FEMA Application Documents',
    description: 'Proof of residence and damage assessment photos',
    status: 'pending',
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    priority: 'high',
    category: 'Disaster Aid'
  },
  {
    id: '2',
    type: 'photo',
    title: 'Property Damage Photos',
    description: 'Exterior and interior damage documentation',
    status: 'under_review',
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    priority: 'high',
    category: 'Insurance Claim'
  },
  {
    id: '3',
    type: 'identity',
    title: 'Identity Verification',
    description: 'Driver\'s license and social security card',
    status: 'approved',
    submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    priority: 'medium',
    category: 'Account Setup'
  },
  {
    id: '4',
    type: 'resource',
    title: 'Resource Trade Verification',
    description: 'Tools and supplies for community exchange',
    status: 'rejected',
    submittedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    priority: 'low',
    category: 'Community Trade'
  },
  {
    id: '5',
    type: 'document',
    title: 'Insurance Policy Documents',
    description: 'Homeowner\'s insurance policy and claim forms',
    status: 'pending',
    submittedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    priority: 'medium',
    category: 'Insurance'
  }
];

export default function Verification_QueueScreen() {
  const [verificationItems, setVerificationItems] = useState<VerificationItem[]>(mockVerificationItems);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#4CAF50';
      case 'rejected': return '#F44336';
      case 'under_review': return '#FF9800';
      case 'pending': return '#2196F3';
      default: return '#757575';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return 'check-circle';
      case 'rejected': return 'cancel';
      case 'under_review': return 'schedule';
      case 'pending': return 'hourglass-empty';
      default: return 'help';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return 'description';
      case 'photo': return 'photo-camera';
      case 'identity': return 'person';
      case 'resource': return 'inventory';
      default: return 'description';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#757575';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const filteredItems = verificationItems.filter(item => {
    if (selectedFilter === 'all') return true;
    return item.status === selectedFilter;
  });

  const handleItemPress = (item: VerificationItem) => {
    Alert.alert(
      item.title,
      `Status: ${item.status.toUpperCase()}\nCategory: ${item.category}\nSubmitted: ${formatDate(item.submittedAt)}\n\n${item.description}`,
      [
        { text: 'Close', style: 'cancel' },
        { text: 'View Details', onPress: () => console.log('View details for:', item.id) }
      ]
    );
  };

  const getStatusCount = (status: string) => {
    return verificationItems.filter(item => item.status === status).length;
  };

  return (
    <View style={styles.container}>
      <HeaderWithMenu backRoute="/screens/DashboardScreen" />
      
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <FontAwesome5 name="clipboard-check" size={32} color="#0A4E78" />
          <Text style={styles.headerTitle}>Verification Queue</Text>
        </View>
        <Text style={styles.headerSubtitle}>Track your document and resource verifications</Text>
      </View>

      {/* Status Summary */}
      <View style={styles.statusSummary}>
        <View style={styles.statusCard}>
          <Text style={styles.statusNumber}>{getStatusCount('pending')}</Text>
          <Text style={styles.statusLabel}>Pending</Text>
        </View>
        <View style={styles.statusCard}>
          <Text style={styles.statusNumber}>{getStatusCount('under_review')}</Text>
          <Text style={styles.statusLabel}>In Review</Text>
        </View>
        <View style={styles.statusCard}>
          <Text style={styles.statusNumber}>{getStatusCount('approved')}</Text>
          <Text style={styles.statusLabel}>Approved</Text>
        </View>
        <View style={styles.statusCard}>
          <Text style={styles.statusNumber}>{getStatusCount('rejected')}</Text>
          <Text style={styles.statusLabel}>Rejected</Text>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { key: 'all', label: 'All', count: verificationItems.length },
            { key: 'pending', label: 'Pending', count: getStatusCount('pending') },
            { key: 'approved', label: 'Approved', count: getStatusCount('approved') },
            { key: 'rejected', label: 'Rejected', count: getStatusCount('rejected') }
          ].map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterTab,
                selectedFilter === filter.key && styles.filterTabActive
              ]}
              onPress={() => setSelectedFilter(filter.key as any)}
            >
              <Text style={[
                styles.filterTabText,
                selectedFilter === filter.key && styles.filterTabTextActive
              ]}>
                {filter.label} ({filter.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Verification Items List */}
      <ScrollView 
        style={styles.itemsContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {filteredItems.length === 0 ? (
          <View style={styles.emptyState}>
            <FontAwesome5 name="clipboard-list" size={64} color="#CCC" />
            <Text style={styles.emptyStateText}>No verification items found</Text>
            <Text style={styles.emptyStateSubtext}>Items will appear here once submitted</Text>
          </View>
        ) : (
          filteredItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.itemCard}
              onPress={() => handleItemPress(item)}
              activeOpacity={0.7}
            >
              <View style={styles.itemHeader}>
                <View style={styles.itemTypeContainer}>
                  <MaterialIcons 
                    name={getTypeIcon(item.type)} 
                    size={24} 
                    color="#0A4E78" 
                  />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemCategory}>{item.category}</Text>
                  </View>
                </View>
                <View style={styles.itemStatus}>
                  <MaterialIcons 
                    name={getStatusIcon(item.status)} 
                    size={20} 
                    color={getStatusColor(item.status)} 
                  />
                  <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                    {item.status.replace('_', ' ').toUpperCase()}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.itemDescription}>{item.description}</Text>
              
              <View style={styles.itemFooter}>
                <View style={styles.priorityContainer}>
                  <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(item.priority) }]} />
                  <Text style={styles.priorityText}>{item.priority.toUpperCase()} PRIORITY</Text>
                </View>
                <Text style={styles.itemDate}>{formatDate(item.submittedAt)}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <FontAwesome5 name="plus" size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 180,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0A4E78',
    marginLeft: 12,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6C757D',
    marginLeft: 44,
  },
  statusSummary: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  statusCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  statusNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0A4E78',
  },
  statusLabel: {
    fontSize: 12,
    color: '#6C757D',
    marginTop: 4,
  },
  filterContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
  filterTabActive: {
    backgroundColor: '#0A4E78',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6C757D',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
  itemsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 150,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  itemTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemInfo: {
    marginLeft: 12,
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 12,
    color: '#6C757D',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  itemStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
    marginBottom: 12,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6C757D',
  },
  itemDate: {
    fontSize: 12,
    color: '#6C757D',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6C757D',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#ADB5BD',
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 150,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0A4E78',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});