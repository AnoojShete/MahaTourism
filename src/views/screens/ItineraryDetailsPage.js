import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import { IP_ADDRESS, PORT } from '@env';

// Helper functions (reused from TourPackagePage)
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

const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes} min`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hrs} hr ${mins} min` : `${hrs} hr`;
};

const formatCurrency = (amount) => {
  return amount ? `₹${parseFloat(amount).toFixed(2)}` : 'Free';
};

const ItineraryDetailsPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { itineraryId } = route.params;
  
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingDate, setBookingDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [participants, setParticipants] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchItineraryDetails();
  }, [itineraryId]);

  useEffect(() => {
    if (itinerary) {
      // Calculate total price based on participants
      const basePrice = itinerary.price || 0;
      setTotalPrice(basePrice * participants);
    }
  }, [participants, itinerary]);

  const fetchItineraryDetails = async () => {
    try {
      setLoading(true);
      console.log(`Fetching details for itinerary ID: ${itineraryId}`); // Debug log
      
      const response = await axios.get(`http://${IP_ADDRESS}:${PORT}/api/itinerary/detail/${itineraryId}`, {
        timeout: 10000,
      });
      
      console.log('API response:', response.data); // Debug log
      
      if (response.data) {
        setItinerary(response.data);
        // Rest of your code...
      } else {
        setError('Failed to fetch itinerary details.');
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching details:', err);
      setError('Failed to fetch itinerary details. Please try again later.');
      setLoading(false);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || bookingDate;
    setShowDatePicker(Platform.OS === 'ios');
    if (currentDate) {
      setBookingDate(currentDate.toISOString().split('T')[0]);
    }
  };

  const decreaseParticipants = () => {
    if (participants > 1) {
      setParticipants(participants - 1);
    }
  };

  const increaseParticipants = () => {
    setParticipants(participants + 1);
  };
  
  const handleBookNow = async () => {
    try {
      // Replace with your actual booking API endpoint
      const response = await axios.post(`http://${IP_ADDRESS}:${PORT}/api/bookings`, {
        itineraryId,
        bookingDate,
        participants,
        totalPrice
      });
      
      if (response.data && response.data.success) {
        Alert.alert(
          "Booking Confirmed!",
          `Your booking for ${itinerary.location_name} on ${bookingDate} has been confirmed. Booking reference: ${response.data.bookingId}`,
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      } else {
        Alert.alert("Booking Failed", "Something went wrong with your booking. Please try again.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Booking Error", "Unable to process your booking. Please try again later.");
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#F75D37" />
        <Text style={styles.loadingText}>Loading itinerary details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Icon name="alert-circle-outline" size={50} color="#ff6b6b" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchItineraryDetails}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!itinerary) {
    return (
      <View style={styles.centered}>
        <Text>No itinerary found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Itinerary Details</Text>
      </View>
      
      <View style={styles.heroSection}>
        <View style={styles.imagePlaceholder}>
          <Icon name={getCategoryIcon(itinerary.category)} size={60} color="#fff" />
        </View>
        <View style={styles.locationDetail}>
          <Text style={styles.locationName}>{itinerary.location_name}</Text>
          <View style={styles.categoryTag}>
            <Icon name={getCategoryIcon(itinerary.category)} size={14} color="#FFF" />
            <Text style={styles.categoryText}>{itinerary.category}</Text>
          </View>
        </View>
      </View>
        
      {/* Details section */}
      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>About This Experience</Text>
        <Text style={styles.description}>{itinerary.description}</Text>
        
        <View style={styles.highlightsContainer}>
          <View style={styles.highlightItem}>
            <Icon name="clock-outline" size={22} color="#F75D37" />
            <Text style={styles.highlightLabel}>Duration</Text>
            <Text style={styles.highlightValue}>{formatDuration(itinerary.visit_duration)}</Text>
          </View>
          
          <View style={styles.highlightItem}>
            <Icon name="currency-inr" size={22} color="#F75D37" />
            <Text style={styles.highlightLabel}>Entry Fee</Text>
            <Text style={styles.highlightValue}>{formatCurrency(itinerary.entry_fee)}</Text>
          </View>
            
          <View style={styles.highlightItem}>
            <Icon name="weather-sunset" size={22} color="#F75D37" />
            <Text style={styles.highlightLabel}>Best Time</Text>
            <Text style={styles.highlightValue}>{itinerary.recommended_time_of_day}</Text>
          </View>
        </View>
        
        {itinerary.special_notes && (
          <View style={styles.specialNotesContainer}>
            <Text style={styles.sectionTitle}>Special Notes</Text>
            <Text style={styles.specialNotes}>{itinerary.special_notes}</Text>
          </View>
        )}
          
        {itinerary.amenities && itinerary.amenities.length > 0 && (
          <View style={styles.amenitiesContainer}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesList}>
              {itinerary.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <Icon name="check-circle" size={16} color="#4CAF50" />
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
      
      <View style={styles.bookingSection}>
        <Text style={styles.sectionTitle}>Book This Experience</Text>
        {/* Date selection */}
        <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Select Date</Text>
            <TouchableOpacity 
              style={styles.dateInput}
              onPress={() => {
                // In a real app, show date picker here
                // For now, we'll use a placeholder date
                const nextDay = new Date();
                nextDay.setDate(nextDay.getDate() + 1);
                handleDateChange(nextDay.toISOString().split('T')[0]);
              }}
            >
              <Text>{bookingDate || 'Select a date'}</Text>
              <Icon name="calendar" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Number of Participants</Text>
          <View style={styles.counterInput}>
            <TouchableOpacity onPress={decreaseParticipants} style={styles.counterButton}>
              <Icon name="minus" size={20} color={participants > 1 ? "#F75D37" : "#ccc"} />
            </TouchableOpacity>
            <Text style={styles.counterValue}>{participants}</Text>
            <TouchableOpacity onPress={increaseParticipants} style={styles.counterButton}>
              <Icon name="plus" size={20} color="#F75D37" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total Price:</Text>
          <Text style={styles.priceValue}>₹{itinerary.entry_fee * participants}</Text>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.bookButton,
            (!bookingDate) ? styles.bookButtonDisabled : null
          ]} 
          onPress={bookingDate ? handleBookNow : () => Alert.alert("Please select a date", "You need to select a booking date before proceeding.")}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F75D37',
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  heroSection: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  imagePlaceholder: {
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationDetail: {
    marginBottom: 5,
  },
  locationName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F75D37',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  categoryText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: '500',
  },
  detailsSection: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 20,
  },
  highlightsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  highlightItem: {
    alignItems: 'center',
    flex: 1,
  },
  highlightLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  highlightValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 3,
  },
  specialNotesContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  specialNotes: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  amenitiesContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  amenitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 8,
  },
  amenityText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#444',
  },
  bookingSection: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5,
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#f9f9f9',
  },
  counterInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
  },
  counterButton: {
    padding: 5,
  },
  counterValue: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    marginVertical: 15,
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F75D37',
  },
  bookButton: {
    backgroundColor: '#F75D37',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonDisabled: {
    backgroundColor: '#ffaa90',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
});

export default ItineraryDetailsPage;