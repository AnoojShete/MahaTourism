import React, { useState, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Modal,
  ScrollView
} from 'react-native';
import {fetchAllHotels, fetchFeaturedHotels, searchHotels } from './HotelService';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const HotelListScreen = ({ navigation }) => {
  // State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  // Filter state variables
  const [priceRange, setPriceRange] = useState('');
  const [minRating, setMinRating] = useState('');
  const [sortOption, setSortOption] = useState('recommended');
  
  // Load data on component mount
  useEffect(() => {
    loadAllHotels();
  }, []);
  
  // Filter hotels when search query or filters change
  useEffect(() => {
    filterHotels();
  }, [searchQuery, hotels, priceRange, minRating, sortOption]);
  
  const loadAllHotels = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const allHotels = await fetchAllHotels();
      setHotels(allHotels);
      setFilteredHotels(allHotels);
    } catch (error) {
      setError('Failed to load hotels. Please try again later.');
      console.error('Error fetching hotels:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const filterHotels = () => {
    let result = [...hotels];
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(hotel => 
        hotel.name.toLowerCase().includes(query) || 
        hotel.location.toLowerCase().includes(query)
      );
    }
    
    // Apply price range filter
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      result = result.filter(hotel => {
        // Extract numeric value from price_range (e.g. "$100-$200" -> 100)
        const hotelPrice = parseInt(hotel.price_range.replace(/[^0-9]/g, ''));
        return !min || !max || (hotelPrice >= min && hotelPrice <= max);
      });
    }
    
    // Apply rating filter
    if (minRating) {
      const minRatingValue = parseFloat(minRating);
      result = result.filter(hotel => parseFloat(hotel.rating) >= minRatingValue);
    }
    
    // Apply sorting
    switch(sortOption) {
      case 'price_low':
        result.sort((a, b) => {
          const priceA = parseInt(a.price_range.replace(/[^0-9]/g, ''));
          const priceB = parseInt(b.price_range.replace(/[^0-9]/g, ''));
          return priceA - priceB;
        });
        break;
      case 'price_high':
        result.sort((a, b) => {
          const priceA = parseInt(a.price_range.replace(/[^0-9]/g, ''));
          const priceB = parseInt(b.price_range.replace(/[^0-9]/g, ''));
          return priceB - priceA;
        });
        break;
      case 'rating':
        result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      default: // 'recommended'
        // Keep default order or implement recommendation logic
        break;
    }
    
    setFilteredHotels(result);
  };
  
  const resetFilters = () => {
    setPriceRange('');
    setMinRating('');
    setSortOption('recommended');
    setIsFilterModalVisible(false);
  };
  
  const applyFilters = () => {
    setIsFilterModalVisible(false);
    // filterHotels() will be called by useEffect
  };
  
  const renderHotelItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.hotelCard}
      onPress={() => navigation.navigate('HotelDetailScreen', { hotelId: item.hotel_id })}
    >
      <Image 
        source={{ uri: item.image_url || 'https://via.placeholder.com/400x200' }} 
        style={styles.hotelImage}
        resizeMode="cover"
      />
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
        <View style={styles.amenitiesContainer}>
          {item.amenities && item.amenities.slice(0, 3).map((amenity, index) => (
            <View key={index} style={styles.amenityTag}>
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>
        <View style={styles.detailsRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>From</Text>
            <Text style={styles.hotelPrice}>{item.price_range}</Text>
            <Text style={styles.priceNight}>/night</Text>
          </View>
          <TouchableOpacity style={styles.viewDetailsButton}>
            <Text style={styles.viewDetailsText} onPress={() => navigation.navigate('HotelDetailScreen', { hotelId: item.hotel_id })}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  const renderFilterModal = () => (
    <Modal
      visible={isFilterModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsFilterModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Hotels</Text>
            <TouchableOpacity onPress={() => setIsFilterModalVisible(false)}>
              <Icon name="close-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody}>
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Price Range</Text>
              <View style={styles.priceRangeOptions}>
                <TouchableOpacity 
                  style={[styles.priceOption, priceRange === '0-100' && styles.selectedOption]}
                  onPress={() => setPriceRange('0-100')}
                >
                  <Text style={styles.priceOptionText}>$0-$100</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.priceOption, priceRange === '100-200' && styles.selectedOption]}
                  onPress={() => setPriceRange('100-200')}
                >
                  <Text style={styles.priceOptionText}>$100-$200</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.priceOption, priceRange === '200-300' && styles.selectedOption]}
                  onPress={() => setPriceRange('200-300')}
                >
                  <Text style={styles.priceOptionText}>$200-$300</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.priceOption, priceRange === '300-999' && styles.selectedOption]}
                  onPress={() => setPriceRange('300-999')}
                >
                  <Text style={styles.priceOptionText}>$300+</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Rating</Text>
              <View style={styles.ratingOptions}>
                {[5, 4, 3, 2].map(rating => (
                  <TouchableOpacity 
                    key={rating}
                    style={[styles.ratingOption, minRating === rating.toString() && styles.selectedOption]}
                    onPress={() => setMinRating(rating.toString())}
                  >
                    <Text style={styles.ratingOptionText}>{rating}+ <Icon name="star" size={12} color={minRating === rating.toString() ? '#fff' : '#FFD700'} /></Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Sort By</Text>
              <View style={styles.sortOptions}>
                <TouchableOpacity 
                  style={[styles.sortOption, sortOption === 'recommended' && styles.selectedOption]}
                  onPress={() => setSortOption('recommended')}
                >
                  <Text style={styles.sortOptionText}>Recommended</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.sortOption, sortOption === 'price_low' && styles.selectedOption]}
                  onPress={() => setSortOption('price_low')}
                >
                  <Text style={styles.sortOptionText}>Price (Low to High)</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.sortOption, sortOption === 'price_high' && styles.selectedOption]}
                  onPress={() => setSortOption('price_high')}
                >
                  <Text style={styles.sortOptionText}>Price (High to Low)</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.sortOption, sortOption === 'rating' && styles.selectedOption]}
                  onPress={() => setSortOption('rating')}
                >
                  <Text style={styles.sortOptionText}>Rating</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back-outline" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>All Hotels</Text>
          <View style={styles.placeholder}></View>
        </View>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Icon name="search-outline" size={20} color="#777" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search hotels by name or location"
              placeholderTextColor="#999"
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Icon name="close-circle-outline" size={20} color="#777" />
              </TouchableOpacity>
            ) : null}
          </View>
          
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setIsFilterModalVisible(true)}
          >
            <Icon name="options-outline" size={20} color="#FF5733" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF5733" />
            <Text style={styles.loadingText}>Loading hotels...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Icon name="cloud-offline-outline" size={60} color="#e74c3c" />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={loadAllHotels}>
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.resultsHeaderContainer}>
              <Text style={styles.resultsTitle}>
                {filteredHotels.length} {filteredHotels.length === 1 ? 'Hotel' : 'Hotels'} Found
              </Text>
              {(priceRange || minRating || sortOption !== 'recommended') && (
                <TouchableOpacity style={styles.appliedFiltersButton} onPress={() => setIsFilterModalVisible(true)}>
                  <Icon name="filter" size={16} color="#FF5733" />
                  <Text style={styles.appliedFiltersText}>Filters Applied</Text>
                </TouchableOpacity>
              )}
            </View>
            
            <FlatList
              data={filteredHotels}
              renderItem={renderHotelItem}
              keyExtractor={(item) => item.hotel_id.toString()}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Icon name="bed-outline" size={60} color="#ccc" />
                  <Text style={styles.emptyListText}>No hotels match your search</Text>
                  <TouchableOpacity style={styles.resetSearchButton} onPress={() => {
                    setSearchQuery('');
                    resetFilters();
                  }}>
                    <Text style={styles.resetSearchText}>Reset Search</Text>
                  </TouchableOpacity>
                </View>
              }
            />
          </>
        )}
      </View>
      
      {renderFilterModal()}
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
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 32,
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
    height: 44,
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
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  contentContainer: {
    flex: 1,
  },
  resultsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  appliedFiltersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff4f2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ffded7',
  },
  appliedFiltersText: {
    color: '#FF5733',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  listContainer: {
    padding: 16,
  },
  // Hotel card styles
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
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  amenityTag: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  amenityText: {
    fontSize: 12,
    color: '#666',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
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
  // Loading and error states
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
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
  resetSearchButton: {
    marginTop: 16,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  resetSearchText: {
    color: '#333',
    fontWeight: '600',
  },
  // Filter modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBody: {
    flex: 1,
    padding: 16,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  priceRangeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  priceOption: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#FF5733',
  },
  priceOptionText: {
    fontSize: 14,
    color: '#333',
  },
  ratingOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ratingOption: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  ratingOptionText: {
    fontSize: 14,
    color: '#333',
  },
  sortOptions: {
    flexDirection: 'column',
  },
  sortOption: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sortOptionText: {
    fontSize: 14,
    color: '#333',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 14,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  applyButton: {
    flex: 2,
    backgroundColor: '#FF5733',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default HotelListScreen;