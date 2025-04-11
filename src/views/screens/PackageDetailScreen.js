import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  StatusBar,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { IP_ADDRESS, PORT } from '@env';

// Get window dimensions
const { width } = Dimensions.get('window');

// Base API URL - replace with your actual backend URL
const BASE_API_URL = `http://${IP_ADDRESS}:${PORT}/api`;

const ItineraryDay = ({ day, isExpanded, onToggle }) => {
  // Ensure day.activities is an array
  const activities = Array.isArray(day.activities) ? day.activities : [];
  
  return (
    <View style={styles.itineraryDayContainer}>
      <TouchableOpacity 
        style={styles.itineraryDayHeader} 
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <View style={styles.dayNumberContainer}>
          <Text style={styles.dayNumber}>Day {day.day || '?'}</Text>
        </View>
        <View style={styles.dayTitleContainer}>
          <Text style={styles.dayTitle}>{day.title || 'Itinerary Day'}</Text>
        </View>
        <Icon 
          name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
          size={24} 
          color="#666" 
        />
      </TouchableOpacity>
      
      {isExpanded && (
        <View style={styles.itineraryDayContent}>
          <Text style={styles.itineraryDescription}>{day.description || 'No description available'}</Text>
          <View style={styles.activitiesList}>
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <View key={index} style={styles.activityItem}>
                  <Icon name="check-circle" size={16} color="#4CAF50" />
                  <Text style={styles.activityText}>{activity || ''}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.activityText}>No activities scheduled</Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
};
const ImageGallery = ({ images }) => {
  // Ensure images is an array
  const safeImages = Array.isArray(images) && images.length > 0 ? images : [];
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    if (safeImages.length === 0) return;
    
    const slideIndex = Math.floor(event.nativeEvent.contentOffset.x / width);
    if (slideIndex >= 0 && slideIndex < safeImages.length && slideIndex !== activeIndex) {
      setActiveIndex(slideIndex);
    }
  };

  // Don't render anything if there are no images
  if (safeImages.length === 0) {
    return (
      <View style={[styles.galleryContainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>No images available</Text>
      </View>
    );
  }

  return (
    <View style={styles.galleryContainer}>
      <FlatList
        data={safeImages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        keyExtractor={(_, index) => `image-${index}`}
        renderItem={({ item }) => (
          <Image 
            source={{ uri: item }} 
            style={{ width, height: 250, resizeMode: 'cover' }} 
          />
        )}
      />
      {safeImages.length > 1 && (
        <View style={styles.paginationContainer}>
          {safeImages.map((_, index) => (
            <View
              key={`dot-${index}`}
              style={[
                styles.paginationDot,
                index === activeIndex && styles.activeDot
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const fetchPackageDetails = async (packageId) => {
  try {
    // Fetch package main details
    const packageResponse = await axios.get(`${BASE_API_URL}/packages/${packageId}`);
    const packageDetails = packageResponse.data || {};

    // Default images, inclusions, exclusions, itinerary, accommodations, faqs
    let images = [];
    let inclusions = [];
    let exclusions = [];
    let itinerary = [];
    let accommodations = [];
    let faqs = [];

    try {
      const imagesResponse = await axios.get(`${BASE_API_URL}/packages/${packageId}/images`);
      images = Array.isArray(imagesResponse.data) ? imagesResponse.data.map(img => img.image_url) : [];
    } catch (e) {
      console.error('Failed to fetch images:', e);
    }

    try {
      const inclusionsResponse = await axios.get(`${BASE_API_URL}/packages/${packageId}/inclusions`);
      inclusions = Array.isArray(inclusionsResponse.data) ? inclusionsResponse.data : [];
    } catch (e) {
      console.error('Failed to fetch inclusions:', e);
    }

    try {
      const exclusionsResponse = await axios.get(`${BASE_API_URL}/packages/${packageId}/exclusions`);
      exclusions = Array.isArray(exclusionsResponse.data) ? exclusionsResponse.data.map(exc => exc.name) : [];
    } catch (e) {
      console.error('Failed to fetch exclusions:', e);
    }

    try {
      const itineraryResponse = await axios.get(`${BASE_API_URL}/packages/${packageId}/itinerary`);
      const itineraryData = Array.isArray(itineraryResponse.data) ? itineraryResponse.data : [];
      
      itinerary = await Promise.all(
        itineraryData.map(async (day) => {
          try {
            const activitiesResponse = await axios.get(
              `${BASE_API_URL}/packages/${packageId}/activities/${day.day}`
            );
            return {
              ...day,
              activities: Array.isArray(activitiesResponse.data) ? 
                activitiesResponse.data.map(act => act.activity) : []
            };
          } catch (e) {
            console.error(`Failed to fetch activities for day ${day.day}:`, e);
            return {
              ...day,
              activities: []
            };
          }
        })
      );
    } catch (e) {
      console.error('Failed to fetch itinerary:', e);
    }

    try {
      const accommodationsResponse = await axios.get(`${BASE_API_URL}/packages/${packageId}/accommodations`);
      accommodations = Array.isArray(accommodationsResponse.data) ? accommodationsResponse.data : [];
    } catch (e) {
      console.error('Failed to fetch accommodations:', e);
    }

    try {
      const faqsResponse = await axios.get(`${BASE_API_URL}/packages/${packageId}/faqs`);
      faqs = Array.isArray(faqsResponse.data) ? faqsResponse.data : [];
    } catch (e) {
      console.error('Failed to fetch faqs:', e);
    }

    // Combine all details
    return {
      ...packageDetails,
      images,
      inclusions,
      exclusions,
      itinerary,
      accommodations,
      faqs
    };

  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};

const PackageDetailScreen = () => {
  const route = useRoute();
  const { packageId } = route.params || {};
  const [packageDetails, setPackageDetails] = useState({
    images: [],
    inclusions: [],
    exclusions: [],
    itinerary: [],
    accommodations: [],
    faqs: [],
    title: '',
    destination: '',
    rating: 0,
    reviewCount: 0,
    base_price: 0,
    discounted_price: 0,
    discount_percentage: 0,
    duration_nights: 0,
    duration_days: 0,
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDayIndex, setExpandedDayIndex] = useState(0);
  const navigation = useNavigation();
  const loadPackageDetails = async () => {
    if (!packageId) {
      setError('Package ID is missing');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchPackageDetails(packageId);
      setPackageDetails(data);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch package details:', error);
      setError('Failed to load package details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackageDetails();
  }, [packageId]);

  const toggleDayExpansion = (index) => {
    setExpandedDayIndex(expandedDayIndex === index ? -1 : index);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5722" />
        <Text style={styles.loadingText}>Loading package details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Icon name="error-outline" size={50} color="#F44336" />
        <Text style={styles.loadingText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={loadPackageDetails}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Safe arrays for rendering
  const safeImages = Array.isArray(packageDetails.images) ? packageDetails.images : [];
  const safeInclusions = Array.isArray(packageDetails.inclusions) ? packageDetails.inclusions : [];
  const safeExclusions = Array.isArray(packageDetails.exclusions) ? packageDetails.exclusions : [];
  const safeItinerary = Array.isArray(packageDetails.itinerary) ? packageDetails.itinerary : [];
  const safeAccommodations = Array.isArray(packageDetails.accommodations) ? packageDetails.accommodations : [];
  const safeFaqs = Array.isArray(packageDetails.faqs) ? packageDetails.faqs : [];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView style={styles.scrollView}>
        {safeImages.length > 0 ? (
          <ImageGallery images={safeImages} />
        ) : (
          <View style={[styles.galleryContainer, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee' }]}>
            <Text>No images available</Text>
          </View>
        )}
        
        <View style={styles.headerContainer}>
          <Text style={styles.packageTitle}>{packageDetails.title || 'Package Details'}</Text>
          <View style={styles.locationContainer}>
            <Icon name="location-on" size={18} color="#666" />
            <Text style={styles.locationText}>{packageDetails.destination || 'Unknown Location'}</Text>
          </View>
          
          <View style={styles.ratingPriceContainer}>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={18} color="#FFD700" />
              <Text style={styles.ratingText}>
                {packageDetails.rating || 0} ({packageDetails.reviewCount || 0} reviews)
              </Text>
            </View>
            
            <View style={styles.priceContainer}>
              <Text style={styles.originalPrice}>₹{packageDetails.base_price || 0}</Text>
              <Text style={styles.discountedPrice}>
                ₹{packageDetails.discounted_price || 0}
              </Text>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{packageDetails.discount_percentage || 0}% OFF</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.durationBookContainer}>
            <Text style={styles.durationText}>
              {packageDetails.duration_nights || 0} Nights / {packageDetails.duration_days || 0} Days
            </Text>
            
            <TouchableOpacity style={styles.bookNowButton}>
              <Text style={styles.bookNowText} onPress={() => navigation.navigate('BookingScreen', { packageId: packageId },{ packageDetails: packageDetails })} >Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.descriptionText}>{packageDetails.description || 'No description available'}</Text>
        </View>
        
        {safeInclusions.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Inclusions</Text>
            <View style={styles.inclusionsContainer}>
              {safeInclusions.map((inclusion, index) => (
                <View key={index} style={styles.inclusionBox}>
                  <Icon name={inclusion.icon || 'check-circle'} size={24} color="#FF5722" />
                  <Text style={styles.inclusionText}>{inclusion.name || ''}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        {safeExclusions.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Exclusions</Text>
            <View style={styles.exclusionsContainer}>
              {safeExclusions.map((exclusion, index) => (
                <View key={index} style={styles.exclusionItem}>
                  <Icon name="remove-circle-outline" size={16} color="#F44336" />
                  <Text style={styles.exclusionText}>{exclusion || ''}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        {safeItinerary.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Itinerary</Text>
            <View style={styles.itineraryContainer}>
              {safeItinerary.map((day, index) => (
                <ItineraryDay
                  key={index}
                  day={{
                    ...day,
                    activities: Array.isArray(day.activities) ? day.activities : []
                  }}
                  isExpanded={expandedDayIndex === index}
                  onToggle={() => toggleDayExpansion(index)}
                />
              ))}
            </View>
          </View>
        )}
        
        {safeAccommodations.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Accommodation</Text>
            {safeAccommodations.map((hotel, index) => (
              <View key={index} style={styles.hotelCard}>
                {hotel.image ? (
                  <Image
                    source={{ uri: hotel.image }}
                    style={styles.hotelImage}
                   
                  />
                ) : (
                  <View style={[styles.hotelImage, { backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }]}>
                    <Text>No image</Text>
                  </View>
                )}
                <View style={styles.hotelDetails}>
                  <Text style={styles.hotelName}>{hotel.name || 'Unknown Hotel'}</Text>
                  <View style={styles.hotelLocationContainer}>
                    <Icon name="location-on" size={14} color="#666" />
                    <Text style={styles.hotelLocation}>{hotel.location || 'Unknown Location'}</Text>
                  </View>
                  <View style={styles.hotelRatingContainer}>
                    {Array(Math.floor(hotel.starRating || 0))
                      .fill()
                      .map((_, i) => (
                        <Icon key={i} name="star" size={16} color="#FFD700" />
                      ))}
                    {(hotel.starRating || 0) % 1 !== 0 && (
                      <Icon name="star-half" size={16} color="#FFD700" />
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
        
        {safeFaqs.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            {safeFaqs.map((faq, index) => (
              <View key={index} style={styles.faqItem}>
                <Text style={styles.faqQuestion}>{faq.question || ''}</Text>
                <Text style={styles.faqAnswer}>{faq.answer || ''}</Text>
              </View>
            ))}
          </View>
        )}
        
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.fullWidthButton}>
            <Text style={styles.fullWidthButtonText}  onPress={() => navigation.navigate('BookingScreen', { packageId: packageId },{ packageDetails: packageDetails })}>Book This Package</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  galleryContainer: {
    height: 250,
    position: 'relative',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 16,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 12,
    height: 8,
  },
  headerContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  packageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  ratingPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discountedPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  discountBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  discountText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  durationBookContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 16,
    color: '#666',
  },
  bookNowButton: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bookNowText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  inclusionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  inclusionBox: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  inclusionText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  exclusionsContainer: {
    marginTop: 4,
  },
  exclusionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  exclusionText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  itineraryContainer: {
    marginTop: 8,
  },
  itineraryDayContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    overflow: 'hidden',
  },
  itineraryDayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  dayNumberContainer: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 12,
  },
  dayNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  dayTitleContainer: {
    flex: 1,
  },
  dayTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  itineraryDayContent: {
    padding: 12,
    backgroundColor: 'white',
  },
  itineraryDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 20,
  },
  activitiesList: {
    marginTop: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  activityText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  hotelCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  hotelImage: {
    width: 120,
    height: 100,
    resizeMode: 'cover',
  },
  hotelDetails: {
    flex: 1,
    padding: 12,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  hotelLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  hotelLocation: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  hotelRatingContainer: {
    flexDirection: 'row',
  },
  faqItem: {
    marginBottom: 16,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  footerContainer: {
    padding: 16,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 20,
  },
  fullWidthButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  fullWidthButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: '#FF5722',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PackageDetailScreen;