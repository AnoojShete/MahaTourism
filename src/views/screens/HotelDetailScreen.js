import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Share
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getHotelDetails } from './HotelService';

const { width } = Dimensions.get('window');

const HotelDetailScreen = ({ route, navigation }) => {
  const { hotelId } = route.params;
  const [hotel, setHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  useEffect(() => {
    loadHotelDetails();
  }, [hotelId]);

  const loadHotelDetails = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const hotelData = await getHotelDetails(hotelId);
      setHotel(hotelData);
      if (hotelData.room_types && hotelData.room_types.length > 0) {
        setSelectedRoomType(hotelData.room_types[0]);
      }
    } catch (error) {
      setError('Failed to load hotel details. Please try again later.');
      console.error('Error fetching hotel details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (!hotel) return;
    
    try {
      await Share.share({
        message: `Check out ${hotel.name} in ${hotel.location}! ${hotel.description}`,
      });
    } catch (error) {
      console.error('Error sharing hotel:', error);
    }
  };

  const handleBookNow = () => {
    // Navigate to booking screen with selected hotel and room type
    navigation.navigate('BookingScreen', {
      hotelId: hotel.hotel_id,
      hotelName: hotel.name,
      roomType: selectedRoomType,
    });
  };

  const renderImageCarousel = () => {
    if (!hotel || !hotel.images) return null;
    
    return (
      <View style={styles.imageCarouselContainer}>
        <FlatList
          data={hotel.images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const contentOffset = e.nativeEvent.contentOffset.x;
            const index = Math.floor(contentOffset / width);
            setActiveImageIndex(index);
          }}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item || 'https://via.placeholder.com/400x250' }}
              style={styles.carouselImage}
              resizeMode="cover"
            />
          )}
          keyExtractor={(_, index) => `image-${index}`}
        />
        
        <View style={styles.imagePaginationContainer}>
          {hotel.images.map((_, index) => (
            <View
              key={`dot-${index}`}
              style={[
                styles.paginationDot,
                index === activeImageIndex && styles.activePaginationDot
              ]}
            />
          ))}
        </View>
        
        <View style={styles.imageActionsContainer}>
          <TouchableOpacity style={styles.imageActionButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.rightActions}>
            <TouchableOpacity style={styles.imageActionButton} onPress={handleShare}>
              <Icon name="share-social-outline" size={22} color="#fff" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.imageActionButton}>
              <Icon name="heart-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderRoomTypeItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.roomTypeCard,
        selectedRoomType && selectedRoomType.id === item.id && styles.selectedRoomTypeCard
      ]}
      onPress={() => setSelectedRoomType(item)}
    >
      <Image
        source={{ uri: item.image_url || 'https://via.placeholder.com/100x100' }}
        style={styles.roomTypeImage}
        resizeMode="cover"
      />
      <View style={styles.roomTypeInfo}>
        <Text style={styles.roomTypeName}>{item.name}</Text>
        <Text style={styles.roomTypePrice}>${item.price_per_night}<Text style={styles.priceNight}>/night</Text></Text>
        <View style={styles.roomTypeFeatures}>
          <View style={styles.roomFeature}>
            <Icon name="people-outline" size={14} color="#666" />
            <Text style={styles.roomFeatureText}>{item.capacity} Guests</Text>
          </View>
          <View style={styles.roomFeature}>
            <Icon name="bed-outline" size={14} color="#666" />
            <Text style={styles.roomFeatureText}>{item.bed_type}</Text>
          </View>
        </View>
      </View>
      <Icon 
        name={selectedRoomType && selectedRoomType.id === item.id ? "checkmark-circle" : "checkmark-circle-outline"} 
        size={24} 
        color={selectedRoomType && selectedRoomType.id === item.id ? "#FF5733" : "#ccc"} 
        style={styles.roomTypeCheckmark} 
      />
    </TouchableOpacity>
  );

  const renderAmenities = () => {
    if (!hotel || !hotel.amenities) return null;
    
    const amenities = showAllAmenities ? hotel.amenities : hotel.amenities.slice(0, 6);
    
    return (
      <View style={styles.amenitiesContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Amenities</Text>
        </View>
        
        <View style={styles.amenitiesGrid}>
          {amenities.map((amenity, index) => (
            <View key={`amenity-${index}`} style={styles.amenityItem}>
              {getAmenityIcon(amenity)}
              <Text style={styles.amenityName}>{amenity}</Text>
            </View>
          ))}
        </View>
        
        {hotel.amenities.length > 6 && (
          <TouchableOpacity 
            style={styles.showMoreButton}
            onPress={() => setShowAllAmenities(!showAllAmenities)}
          >
            <Text style={styles.showMoreText}>
              {showAllAmenities ? 'Show Less' : `Show All (${hotel.amenities.length})`}
            </Text>
            <Icon 
              name={showAllAmenities ? "chevron-up" : "chevron-down"} 
              size={16} 
              color="#FF5733" 
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  // Helper function to get icon for amenity type
  const getAmenityIcon = (amenity) => {
    let iconName = 'checkmark-circle-outline';
    
    if (amenity.toLowerCase().includes('wifi')) iconName = 'wifi-outline';
    else if (amenity.toLowerCase().includes('breakfast')) iconName = 'restaurant-outline';
    else if (amenity.toLowerCase().includes('pool')) iconName = 'water-outline';
    else if (amenity.toLowerCase().includes('parking')) iconName = 'car-outline';
    else if (amenity.toLowerCase().includes('gym')) iconName = 'barbell-outline';
    else if (amenity.toLowerCase().includes('spa')) iconName = 'leaf-outline';
    else if (amenity.toLowerCase().includes('ac') || amenity.toLowerCase().includes('air')) iconName = 'thermometer-outline';
    else if (amenity.toLowerCase().includes('tv')) iconName = 'tv-outline';
    else if (amenity.toLowerCase().includes('bar')) iconName = 'wine-outline';
    
    return <Icon name={iconName} size={18} color="#FF5733" style={styles.amenityIcon} />;
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5733" />
        <Text style={styles.loadingText}>Loading hotel details...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Icon name="cloud-offline-outline" size={60} color="#e74c3c" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadHotelDetails}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (!hotel) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Icon name="warning-outline" size={60} color="#e74c3c" />
        <Text style={styles.errorText}>Hotel information not found.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {renderImageCarousel()}
        
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.hotelName}>{hotel.name}</Text>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{hotel.rating}</Text>
                <Text style={styles.reviewCount}>({hotel.review_count || 0} reviews)</Text>
              </View>
            </View>
            
            <View style={styles.locationContainer}>
              <Icon name="location-outline" size={18} color="#FF5733" />
              <Text style={styles.locationText}>{hotel.location}</Text>
            </View>
          </View>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{hotel.description}</Text>
          </View>
          
          {renderAmenities()}
          
          <View style={styles.roomTypesContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Room Types</Text>
            </View>
            
            <FlatList
              data={hotel.room_types || []}
              renderItem={renderRoomTypeItem}
              keyExtractor={(item) => `room-${item.id}`}
              scrollEnabled={false}
            />
          </View>
          
          <View style={styles.mapContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Location</Text>
            </View>
            
            <View style={styles.mapPlaceholder}>
              <Icon name="map-outline" size={30} color="#666" />
              <Text style={styles.mapPlaceholderText}>Map View</Text>
            </View>
            
            <View style={styles.addressContainer}>
              <Icon name="navigate-circle-outline" size={18} color="#FF5733" />
              <Text style={styles.addressText}>{hotel.address || hotel.location}</Text>
            </View>
          </View>
          
          <View style={styles.policiesContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Policies</Text>
            </View>
            
            <View style={styles.policyItem}>
              <Icon name="time-outline" size={18} color="#666" />
              <View style={styles.policyContent}>
                <Text style={styles.policyTitle}>Check-in / Check-out</Text>
                <Text style={styles.policyText}>Check-in: 2:00 PM - Check-out: 12:00 PM</Text>
              </View>
            </View>
            
            <View style={styles.policyItem}>
              <Icon name="card-outline" size={18} color="#666" />
              <View style={styles.policyContent}>
                <Text style={styles.policyTitle}>Payment Options</Text>
                <Text style={styles.policyText}>Credit Card, Debit Card, PayPal</Text>
              </View>
            </View>
            
            <View style={styles.policyItem}>
              <Icon name="information-circle-outline" size={18} color="#666" />
              <View style={styles.policyContent}>
                <Text style={styles.policyTitle}>Cancellation Policy</Text>
                <Text style={styles.policyText}>Free cancellation up to 24 hours before check-in</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.reviewsContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Guest Reviews</Text>
              <TouchableOpacity style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>See All</Text>
                <Icon name="chevron-forward" size={16} color="#FF5733" />
              </TouchableOpacity>
            </View>
            
            {(hotel.reviews && hotel.reviews.length > 0) ? (
              hotel.reviews.slice(0, 2).map((review, index) => (
                <View key={`review-${index}`} style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewerInfo}>
                      <View style={styles.reviewerAvatar}>
                        <Text style={styles.reviewerInitial}>{review.guest_name.charAt(0)}</Text>
                      </View>
                      <View>
                        <Text style={styles.reviewerName}>{review.guest_name}</Text>
                        <Text style={styles.reviewDate}>{review.date}</Text>
                      </View>
                    </View>
                    <View style={styles.reviewRating}>
                      <Text style={styles.reviewRatingText}>{review.rating}</Text>
                      <Icon name="star" size={12} color="#FFD700" />
                    </View>
                  </View>
                  <Text style={styles.reviewText}>{review.comment}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noReviewsText}>No reviews yet.</Text>
            )}
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceValue}>
            ${selectedRoomType ? selectedRoomType.price_per_night : hotel.price_range.replace(/[^0-9]/g, '')}
          </Text>
          <Text style={styles.priceNight}>/night</Text>
        </View>
        
        <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: 20,
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
  // Image carousel styles
  imageCarouselContainer: {
    position: 'relative',
    height: 250,
  },
  carouselImage: {
    width,
    height: 250,
  },
  imageActionsContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  rightActions: {
    flexDirection: 'row',
  },
  imageActionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  imagePaginationContainer: {
    position: 'absolute',
    bottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginHorizontal: 4,
  },
  activePaginationDot: {
    backgroundColor: '#fff',
    width: 12,
    height: 8,
  },
  // Content styles
  contentContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    backgroundColor: '#fff',
    paddingBottom: 100,
  },
  headerContainer: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  hotelName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  descriptionContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  // Amenities styles
  amenitiesContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    width: '33.33%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  amenityIcon: {
    marginRight: 8,
  },
  amenityName: {
    fontSize: 14,
    color: '#666',
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    padding: 8,
  },
  showMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF5733',
    marginRight: 4,
  },
  // Room types styles
  roomTypesContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  roomTypeCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    position: 'relative',
  },
  selectedRoomTypeCard: {
    borderWidth: 2,
    borderColor: '#FF5733',
    backgroundColor: '#fff4f2',
  },
  roomTypeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  roomTypeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  roomTypeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  roomTypePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5733',
    marginBottom: 8,
  },
  priceNight: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#666',
  },
  roomTypeFeatures: {
    flexDirection: 'row',
  },
  roomFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  roomFeatureText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  roomTypeCheckmark: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  // Map styles
  mapContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  mapPlaceholder: {
    height: 160,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  // Policies styles
  policiesContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  policyItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  policyContent: {
    marginLeft: 12,
    flex: 1,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  policyText: {
    fontSize: 14,
    color: '#666',
  },
  // Reviews styles
  reviewsContainer: {
    padding: 16,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF5733',
    marginRight: 4,
  },
  reviewItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF5733',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  reviewerInitial: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  reviewDate: {
    fontSize: 12,
    color: '#888',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  reviewRatingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 4,
  },
  reviewText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  noReviewsText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 16,
  },
  // Bottom bar styles
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  priceContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF5733',
  },
  bookButton: {
    backgroundColor: '#FF5733',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default HotelDetailScreen;