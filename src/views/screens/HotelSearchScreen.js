import React, { useState, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Alert, 
  FlatList, 
  Image, 
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions
} from 'react-native';
import { fetchFeaturedHotels, searchHotels } from './HotelService';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import HotelListScreen from './HotelListScreen';

import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('window');

const HotelSearchScreen = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');
  const [rooms, setRooms] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFeaturedLoading, setIsFeaturedLoading] = useState(true);
  const [hotels, setHotels] = useState([]);
  const [priceRange, setPriceRange] = useState('');
  const [rating, setRating] = useState('');
  const [error, setError] = useState(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch featured hotels on component mount
    loadFeaturedHotels();
  }, []);
  
  const loadFeaturedHotels = async () => {
    setIsFeaturedLoading(true);
    setError(null);
    
    try {
      const featuredHotels = await fetchFeaturedHotels();
      setHotels(featuredHotels);
    } catch (error) {
      setError('Failed to load featured hotels. Please try again later.');
      console.error('Error fetching featured hotels:', error);
    } finally {
      setIsFeaturedLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!location) {
      Alert.alert('Missing Info', 'Please enter a location');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const searchParams = {
        location,
        checkIn,
        checkOut,
        guests,
        rooms,
        priceRange,
        rating
      };
      
      const searchResults = await searchHotels(searchParams);
      setHotels(searchResults);
      
      if (searchResults.length === 0) {
        Alert.alert('No Results', 'No hotels found matching your criteria.');
      }
    } catch (error) {
      setError('Failed to search for hotels. Please try again later.');
      console.error('Error searching for hotels:', error);
      Alert.alert('Error', 'Failed to search for hotels. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderHotelItem = ({ item }) => (
    <TouchableOpacity style={styles.hotelCard}>
      <Image 
        source={{ uri: item.image_url || 'https://via.placeholder.com/400x200' }} 
        style={styles.hotelImage}
        resizeMode="cover"
      />
      {/* <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.imageGradient}
      /> */}
      <View style={styles.ratingBadge}>
        <Text style={styles.ratingText}>{item.rating}</Text>
        <Icon name="star" size={12} color="#FFD700" />
      </View>
      {item.is_featured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>Featured</Text>
        </View>
      )}
      <View style={styles.hotelInfo}>
        <Text style={styles.hotelName} numberOfLines={1}>{item.name}</Text>
        <View style={styles.locationContainer}>
          <Icon name="location-outline" size={14} color="#FF5733" />
          <Text style={styles.hotelLocation} numberOfLines={1}>{item.location}</Text>
        </View>
        <View style={styles.detailsRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>From</Text>
            <Text style={styles.hotelPrice}>{item.price_range}</Text>
            <Text style={styles.priceNight}>/night</Text>
          </View>
          <TouchableOpacity style={styles.viewDetailsButton}>
            <Text style={styles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTopHotelItem = ({ item }) => (
    <TouchableOpacity style={styles.topHotelCard}>
      <Image 
        source={{ uri: item.image_url || 'https://via.placeholder.com/400x200' }} 
        style={styles.topHotelImage}
        resizeMode="cover"
      />
      <View style={styles.topHotelBadge}>
        <Text style={styles.topHotelRating}>{item.rating} <Icon name="star" size={10} color="#FFD700" /></Text>
      </View>
      <View style={styles.topHotelInfo}>
        <Text style={styles.topHotelName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.topHotelLocation} numberOfLines={1}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryTabs = () => (
    <View style={styles.categoryTabsContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryTabs}>
        <TouchableOpacity 
          style={[styles.categoryTab, activeTab === 'all' && styles.activeTab]} 
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.categoryTabText, activeTab === 'all' && styles.activeTabText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.categoryTab, activeTab === 'popular' && styles.activeTab]} 
          onPress={() => setActiveTab('popular')}
        >
          <Text style={[styles.categoryTabText, activeTab === 'popular' && styles.activeTabText]}>Popular</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.categoryTab, activeTab === 'trending' && styles.activeTab]} 
          onPress={() => setActiveTab('trending')}
        >
          <Text style={[styles.categoryTabText, activeTab === 'trending' && styles.activeTabText]}>Trending</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.categoryTab, activeTab === 'luxury' && styles.activeTab]} 
          onPress={() => setActiveTab('luxury')}
        >
          <Text style={[styles.categoryTabText, activeTab === 'luxury' && styles.activeTabText]}>Luxury</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.categoryTab, activeTab === 'budget' && styles.activeTab]} 
          onPress={() => setActiveTab('budget')}
        >
          <Text style={[styles.categoryTabText, activeTab === 'budget' && styles.activeTabText]}>Budget</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  const handleHotelPress = () => {
    navigation.navigate('HotelListScreen');
  };
  const renderContent = () => {
    if (isFeaturedLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF5733" />
          <Text style={styles.loadingText}>Discovering amazing stays for you...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Icon name="cloud-offline-outline" size={60} color="#e74c3c" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadFeaturedHotels}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <>
        {!isLoading && (
          <View style={styles.topHotelsSection}>
            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.sectionTitle}>Top Rated</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText} onPress={handleHotelPress}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={hotels.slice(0, 5)}
              renderItem={renderTopHotelItem}
              keyExtractor={(item) => `top-${item.hotel_id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.topHotelsContainer}
            />
          </View>
        )}

        {renderCategoryTabs()}

        <View style={styles.resultsHeaderContainer}>
          <Text style={styles.resultsTitle}>
            {hotels.length > 0 ? `${hotels.length} Hotels Found` : 'Featured Hotels'}
          </Text>
          <TouchableOpacity style={styles.sortButton}>
            <Icon name="options-outline" size={18} color="#333" />
            <Text style={styles.sortButtonText}>Sort</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={hotels}
          renderItem={renderHotelItem}
          keyExtractor={(item) => item.hotel_id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="bed-outline" size={60} color="#ccc" />
              <Text style={styles.emptyListText}>No hotels available</Text>
            </View>
          }
        />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Find your perfect stay</Text>
            <Text style={styles.headerSubtitle}>Discover amazing hotels</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Icon name="person-circle-outline" size={32} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Icon name="search-outline" size={20} color="#777" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              value={location}
              onChangeText={setLocation}
              placeholder="Where are you going?"
              placeholderTextColor="#999"
            />
          </View>
          
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setIsFilterVisible(!isFilterVisible)}
          >
            <Icon name="options-outline" size={20} color="#FF5733" />
          </TouchableOpacity>
        </View>
      </View>

      {isFilterVisible && (
        <View style={styles.filterPanel}>
          <View style={styles.filterRow}>
            <View style={styles.filterItem}>
              <Text style={styles.filterLabel}>Check In</Text>
              <View style={styles.filterInputContainer}>
                <Icon name="calendar-outline" size={16} color="#777" style={styles.filterIcon} />
                <TextInput
                  style={styles.filterInputText}
                  value={checkIn}
                  onChangeText={setCheckIn}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#999"
                />
              </View>
            </View>
            
            <View style={styles.filterItem}>
              <Text style={styles.filterLabel}>Check Out</Text>
              <View style={styles.filterInputContainer}>
                <Icon name="calendar-outline" size={16} color="#777" style={styles.filterIcon} />
                <TextInput
                  style={styles.filterInputText}
                  value={checkOut}
                  onChangeText={setCheckOut}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#999"
                />
              </View>
            </View>
          </View>
          
          <View style={styles.filterRow}>
            <View style={styles.filterItem}>
              <Text style={styles.filterLabel}>Guests</Text>
              <View style={styles.filterInputContainer}>
                <Icon name="people-outline" size={16} color="#777" style={styles.filterIcon} />
                <TextInput
                  style={styles.filterInputText}
                  value={guests}
                  onChangeText={setGuests}
                  placeholder="2 Adults"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>
            </View>
            
            <View style={styles.filterItem}>
              <Text style={styles.filterLabel}>Rooms</Text>
              <View style={styles.filterInputContainer}>
                <Icon name="bed-outline" size={16} color="#777" style={styles.filterIcon} />
                <TextInput
                  style={styles.filterInputText}
                  value={rooms}
                  onChangeText={setRooms}
                  placeholder="1 Room"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
          
          <View style={styles.filterRow}>
            <View style={styles.filterItem}>
              <Text style={styles.filterLabel}>Price Range</Text>
              <View style={styles.filterInputContainer}>
                <Icon name="cash-outline" size={16} color="#777" style={styles.filterIcon} />
                <TextInput
                  style={styles.filterInputText}
                  value={priceRange}
                  onChangeText={setPriceRange}
                  placeholder="e.g. $-$$$"
                  placeholderTextColor="#999"
                />
              </View>
            </View>
            
            <View style={styles.filterItem}>
              <Text style={styles.filterLabel}>Min Rating</Text>
              <View style={styles.filterInputContainer}>
                <Icon name="star-outline" size={16} color="#777" style={styles.filterIcon} />
                <TextInput
                  style={styles.filterInputText}
                  value={rating}
                  onChangeText={setRating}
                  placeholder="e.g. 4"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.searchButton, isLoading && styles.disabledButton]}
            onPress={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingButtonContent}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.searchButtonText}>Searching...</Text>
              </View>
            ) : (
              <>
                <Icon name="search-outline" size={18} color="#fff" />
                <Text style={styles.searchButtonText}>Search Hotels</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  filterButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  filterPanel: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  filterItem: {
    width: '48%',
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  filterInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  filterIcon: {
    marginRight: 6,
  },
  filterInputText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  searchButton: {
    flexDirection: 'row',
    backgroundColor: '#FF5733',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  loadingButtonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: '#ffaa91',
  },
  contentContainer: {
    flex: 1,
  },
  topHotelsSection: {
    marginTop: 16,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#FF5733',
    fontWeight: '600',
  },
  topHotelsContainer: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  topHotelCard: {
    width: 140,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginRight: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  topHotelImage: {
    width: '100%',
    height: 100,
  },
  topHotelBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  topHotelRating: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  topHotelInfo: {
    padding: 8,
  },
  topHotelName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  topHotelLocation: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  categoryTabsContainer: {
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryTabs: {
    paddingHorizontal: 16,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF5733',
  },
  categoryTabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#FF5733',
    fontWeight: '600',
  },
  resultsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  sortButtonText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  hotelCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  hotelImage: {
    width: '100%',
    height: 180,
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 4,
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF5733',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  featuredText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  hotelInfo: {
    padding: 12,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  hotelLocation: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
    marginRight: 4,
  },
  hotelPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5733',
  },
  priceNight: {
    fontSize: 12,
    color: '#666',
    marginLeft: 2,
  },
  viewDetailsButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  viewDetailsText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginVertical: 12,
  },
  retryButton: {
    backgroundColor: '#FF5733',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
});

export default HotelSearchScreen;