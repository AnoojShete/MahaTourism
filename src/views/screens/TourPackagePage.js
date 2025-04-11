import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator,
  RefreshControl,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { IP_ADDRESS, PORT } from '@env';


// Replace with your actual API endpoint
const API_URL = `http://${IP_ADDRESS}:${PORT}/api/itinerary`;

// Helper function to get icon for category
const getCategoryIcon = (category) => {
  switch(category) {
    case 'Historical': return 'history';
    case 'Beach': return 'beach';
    case 'Temple': return 'temple-buddhist';
    case 'Fort': return 'castle';
    case 'Cave': return 'cave';
    case 'Nature': return 'tree';
    case 'Vineyard': return 'wine';
    case 'Park': return 'nature';
    default: return 'map-marker';
  }
};

// Helper function to format duration
const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes} min`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hrs} hr ${mins} min` : `${hrs} hr`;
};

// Format currency
const formatCurrency = (amount) => {
  return amount ? `₹${parseFloat(amount).toFixed(2)}` : 'Free';
};

const TourPackagePage = () => {
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigation = useNavigation();
  const categories = ['All', 'Historical', 'Beach', 'Temple', 'Fort', 'Cave', 'Nature', 'Vineyard', 'Park', 'Other'];

  const fetchItinerary = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://${IP_ADDRESS}:${PORT}/api/itinerary`, {
        timeout: 10000, // 10 seconds
      });
      if (response.data) {
        setItinerary(response.data);
      } else {
        setError('Failed to fetch itineraries. Please try again later.');
      }
      setLoading(false);
      setRefreshing(false);
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        setError('Timeout error. Please try again later.');
      } else {
        setError('Failed to fetch itineraries. Please try again later.');
      }
      console.error(err);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchItinerary();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchItinerary();
  };

  const filteredItinerary = selectedCategory === 'All' 
    ? itinerary 
    : itinerary.filter(item => item.category === selectedCategory);

  const renderCategoryFilter = () => (
    <View style={styles.categoryFilterContainer}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item && styles.selectedCategoryButton
            ]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text 
              style={[
                styles.categoryButtonText,
                selectedCategory === item && styles.selectedCategoryButtonText
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderItineraryItem = ({ item }) => (
    <TouchableOpacity 
    style={styles.card}
    onPress={() => navigation.navigate('ItineraryDetailsPage', { itineraryId: item.id })}
  >
      <View style={styles.cardHeader}>
        <View style={styles.categoryIconContainer}>
          <Icon name={getCategoryIcon(item.category)} size={24} color="#FFF" />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.locationName}>{item.location_name}</Text>
          <Text style={styles.category}>{item.category}</Text>
        </View>
      </View>
      
      <View style={styles.cardBody}>
        <Text style={styles.description} numberOfLines={3}>
          {item.description}
        </Text>
      </View>
      
      <View style={styles.cardFooter}>
        <View style={styles.infoItem}>
          <Icon name="clock-outline" size={16} color="#666" />
          <Text style={styles.infoText}>{formatDuration(item.visit_duration)}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Icon name="currency-inr" size={16} color="#666" />
          <Text style={styles.infoText}>{formatCurrency(item.entry_fee)}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Icon name="weather-sunset" size={16} color="#666" />
          <Text style={styles.infoText}>{item.recommended_time_of_day}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#F75D37" />
        <Text style={styles.loadingText}>Loading itineraries...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Icon name="alert-circle-outline" size={50} color="#ff6b6b" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchItinerary}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore Itineraries</Text>
        <Text style={styles.subtitle}>Discover amazing places to visit</Text>
      </View>
      
      {renderCategoryFilter()}
      
      <FlatList
  data={filteredItinerary}
  keyExtractor={(item, index) => index.toString()}
  renderItem={renderItineraryItem}
  contentContainerStyle={styles.listContainer}
  showsVerticalScrollIndicator={false}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={["#0066cc"]}
    />
  }
  ListEmptyComponent={
    <View style={styles.emptyContainer}>
      <Icon name="map-search" size={50} color="#ccc" />
      <Text style={styles.emptyText}>No itineraries found</Text>
    </View>
  }
/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    padding: 20,
    backgroundColor: '#F75D37',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  categoryFilterContainer: {
    paddingVertical: 10,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedCategoryButton: {
    backgroundColor: '#F75D37',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
  },
  selectedCategoryButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F75D37',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  cardBody: {
    padding: 15,
  },
  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#666',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#F75D37',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F75D37',
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#999',
  },
});

export default TourPackagePage;