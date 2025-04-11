import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute, useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { IP_ADDRESS, PORT } from '@env';

const BASE_API_URL = `http://${IP_ADDRESS}:${PORT}/api`;

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

const BookingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
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
  const [error, setError] = useState(null);
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    numAdults: 1,
    numChildren: 0,
    travelDate: new Date(),
    specialRequests: ''
  });
  
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

  // UI state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      });
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({
        ...formData,
        travelDate: selectedDate
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    const today = new Date();
    if (formData.travelDate < today) {
      newErrors.travelDate = 'Travel date must be in the future';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Function to calculate total price
  const calculateTotalPrice = () => {
    const adultPrice = formData.numAdults * (packageDetails?.discounted_price || 0);
    const childPrice = formData.numChildren * ((packageDetails?.discounted_price || 0) * 0.7);
    const taxes = (adultPrice + childPrice) * 0.18;
    return (adultPrice + childPrice + taxes).toFixed(2);
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Generate a booking ID
      const bookingId = `BK-${Date.now().toString().slice(-6)}`;
      
      // Create booking data
      const bookingData = {
        booking_id: bookingId,
        package_id: packageId,
        package_name: packageDetails?.title || 'Travel Package',
        package_destination: packageDetails?.destination || 'Destination',
        package_duration: `${packageDetails?.duration_nights || 0} Nights / ${packageDetails?.duration_days || 0} Days`,
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: formData.phone,
        travel_date: formData.travelDate.toISOString(),
        adults: formData.numAdults,
        children: formData.numChildren,
        special_requests: formData.specialRequests || 'None',
        total_price: calculateTotalPrice(),
        booking_date: new Date().toISOString(),
        status: 'confirmed'
      };
      
      // Save booking to backend
      // await axios.post(`${BASE_API_URL}/bookings`, bookingData);
      
      // Send confirmation email through backend
      try {
        await axios.post(`${BASE_API_URL}/send-confirmation-email`, {
          to: formData.email,
          name: formData.fullName,
          bookingId: bookingId,
          packageName: packageDetails?.title,
          travelDate: formatDate(formData.travelDate),
          totalPrice: calculateTotalPrice()
        });
      } catch (error) {
        console.error('Booking error:', error);
        Alert.alert(
          'Booking Error',
          'There was a problem processing your booking. Please try again later.'
        );
      }
      
      // Show success message
      Alert.alert(
        'Booking Confirmed',
        `Your booking for ${packageDetails?.title} has been confirmed. A confirmation email has been sent to ${formData.email}`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('BookingConfirmationScreen', {
              bookingDetails: {
                bookingId: bookingId,
                packageName: packageDetails?.title,
                destination: packageDetails?.destination,
                duration: `${packageDetails?.duration_nights || 0} Nights / ${packageDetails?.duration_days || 0} Days`,
                travelDate: formatDate(formData.travelDate),
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                adults: formData.numAdults,
                children: formData.numChildren,
                specialRequests: formData.specialRequests,
                totalPrice: calculateTotalPrice(),
                bookingDate: formatDate(new Date())
              }
            })
          }
        ]
      );
    } catch (error) {
      console.error('Booking error:', error);
      Alert.alert(
        'Booking Error',
        'There was a problem processing your booking. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Your Package</Text>
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView style={styles.scrollView}>
          {/* Package Summary */}
          <View style={styles.packageSummary}>
            <Text style={styles.packageTitle}>{packageDetails?.title || 'Package Details'}</Text>
            <View style={styles.packageDetails}>
              <View style={styles.detailItem}>
                <Icon name="location-on" size={18} color="#FF5722" />
                <Text style={styles.detailText}>{packageDetails?.destination || 'Unknown Location'}</Text>
              </View>
              
              <View style={styles.detailItem}>
                <Icon name="date-range" size={18} color="#FF5722" />
                <Text style={styles.detailText}>
                  {packageDetails?.duration_nights || 0} Nights / {packageDetails?.duration_days || 0} Days
                </Text>
              </View>
              
              <View style={styles.detailItem}>
                <Icon name="attach-money" size={18} color="#FF5722" />
                <Text style={styles.detailText}>
                  ₹{packageDetails?.discounted_price || 0} per person
                </Text>
              </View>
            </View>
          </View>
          
          {/* Booking Form */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Personal Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={[styles.textInput, errors.fullName && styles.inputError]}
                placeholder="Enter your full name"
                value={formData.fullName}
                onChangeText={(value) => handleInputChange('fullName', value)}
              />
              {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={[styles.textInput, errors.email && styles.inputError]}
                placeholder="Enter your email address"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={[styles.textInput, errors.phone && styles.inputError]}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
              />
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            </View>
            
            <Text style={[styles.formTitle, { marginTop: 20 }]}>Trip Details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Travel Date</Text>
              <TouchableOpacity 
                style={[styles.datePickerButton, errors.travelDate && styles.inputError]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateText}>{formatDate(formData.travelDate)}</Text>
                <Icon name="calendar-today" size={18} color="#666" />
              </TouchableOpacity>
              {errors.travelDate && <Text style={styles.errorText}>{errors.travelDate}</Text>}
              
              {showDatePicker && (
                <DateTimePicker
                  value={formData.travelDate}
                  mode="date"
                  display="default"
                  minimumDate={new Date()}
                  onChange={handleDateChange}
                />
              )}
            </View>
            
            <View style={styles.rowContainer}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.inputLabel}>Adults</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={formData.numAdults}
                    onValueChange={(value) => handleInputChange('numAdults', value)}
                    style={styles.picker}
                    mode="dropdown"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <Picker.Item key={`adult-${num}`} label={`${num}`} value={num} />
                    ))}
                  </Picker>
                </View>
              </View>
              
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                <Text style={styles.inputLabel}>Children</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={formData.numChildren}
                    onValueChange={(value) => handleInputChange('numChildren', value)}
                    style={styles.picker}
                    mode="dropdown"
                  >
                    {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                      <Picker.Item key={`child-${num}`} label={`${num}`} value={num} />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Special Requests (Optional)</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Any special requirements or requests?"
                multiline
                numberOfLines={4}
                value={formData.specialRequests}
                onChangeText={(value) => handleInputChange('specialRequests', value)}
              />
            </View>
            
            {/* Price Summary */}
            <View style={styles.priceSummary}>
              <Text style={styles.summaryTitle}>Price Summary</Text>
              
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Adults ({formData.numAdults} × ₹{packageDetails?.discounted_price || 0})</Text>
                <Text style={styles.priceValue}>₹{(formData.numAdults * (packageDetails?.discounted_price || 0)).toFixed(2)}</Text>
              </View>
              
              {formData.numChildren > 0 && (
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Children ({formData.numChildren} × ₹{((packageDetails?.discounted_price || 0) * 0.7).toFixed(2)})</Text>
                  <Text style={styles.priceValue}>₹{(formData.numChildren * ((packageDetails?.discounted_price || 0) * 0.7)).toFixed(2)}</Text>
                </View>
              )}
              
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Taxes & Fees</Text>
                <Text style={styles.priceValue}>₹{((formData.numAdults * (packageDetails?.discounted_price || 0) + formData.numChildren * ((packageDetails?.discounted_price || 0) * 0.7)) * 0.18).toFixed(2)}</Text>
              </View>
              
              <View style={[styles.priceRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalValue}>
                  ₹{calculateTotalPrice()}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.bookButtonText}>Confirm Booking</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  packageSummary: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 10,
  },
  packageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  packageDetails: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 15,
    color: '#666',
    marginLeft: 8,
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#333',
  },
  inputError: {
    borderColor: '#F44336',
  },
  errorText: {
    color: '#F44336',
    fontSize: 12,
    marginTop: 4,
  },
  datePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  dateText: {
    fontSize: 15,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerContainer: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  priceSummary: {
    marginTop: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  footer: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  bookButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookingScreen;