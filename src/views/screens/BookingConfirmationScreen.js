import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Share,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute, useNavigation } from '@react-navigation/native';

const BookingConfirmationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { bookingDetails } = route.params || {};

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I've just booked my trip to ${bookingDetails?.package_destination} with ${bookingDetails?.package_name}! We're leaving on ${bookingDetails?.travel_date}. Can't wait!`,
        title: 'My Upcoming Trip',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleReturnHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Booking Confirmed</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.confirmationContainer}>
          <View style={styles.successIcon}>
            <Icon name="check-circle" size={80} color="#4CAF50" />
          </View>
          
          <Text style={styles.confirmationTitle}>Thank You for Your Booking!</Text>
          <Text style={styles.confirmationSubtitle}>
            Your trip to {bookingDetails?.package_destination} is confirmed.
          </Text>
          
          <View style={styles.bookingInfoCard}>
            <View style={styles.bookingInfoHeader}>
              <Text style={styles.bookingReference}>Booking ID: {bookingDetails?.bookingId}</Text>
              <Text style={styles.bookingDate}>Booked on: {bookingDetails?.bookingDate}</Text>
            </View>
            
            <View style={styles.bookingInfoBody}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Package:</Text>
                <Text style={styles.infoValue}>{bookingDetails?.packageName}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Destination:</Text>
                <Text style={styles.infoValue}>{bookingDetails?.destination}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Duration:</Text>
                <Text style={styles.infoValue}>{bookingDetails?.duration}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Travel Date:</Text>
                <Text style={styles.infoValue}>{bookingDetails?.travelDate}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Travelers:</Text>
                <Text style={styles.infoValue}>
                  {bookingDetails?.adults} Adults, {bookingDetails?.children} Children
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Total Price:</Text>
                <Text style={styles.totalPrice}>₹{bookingDetails?.totalPrice}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.contactInfoCard}>
            <Text style={styles.contactInfoTitle}>Contact Information</Text>
            
            <View style={styles.contactDetail}>
              <Icon name="person" size={20} color="#666" />
              <Text style={styles.contactText}>{bookingDetails?.name}</Text>
            </View>
            
            <View style={styles.contactDetail}>
              <Icon name="email" size={20} color="#666" />
              <Text style={styles.contactText}>{bookingDetails?.email}</Text>
            </View>
            
            <View style={styles.contactDetail}>
              <Icon name="phone" size={20} color="#666" />
              <Text style={styles.contactText}>{bookingDetails?.phone}</Text>
            </View>
          </View>
          
          <View style={styles.nextStepsCard}>
            <Text style={styles.nextStepsTitle}>Next Steps</Text>
            
            <View style={styles.stepItem}>
              <Icon name="email" size={24} color="#FF5722" />
              <View style={styles.stepTextContainer}>
                <Text style={styles.stepText}>
                  We've sent a confirmation email to {bookingDetails?.to_email} with all your booking details.
                </Text>
              </View>
            </View>
            
            <View style={styles.stepItem}>
              <Icon name="receipt" size={24} color="#FF5722" />
              <View style={styles.stepTextContainer}>
                <Text style={styles.stepText}>
                  Your payment receipt and e-voucher will be sent within 24 hours.
                </Text>
              </View>
            </View>
            
            <View style={styles.stepItem}>
              <Icon name="phone-in-talk" size={24} color="#FF5722" />
              <View style={styles.stepTextContainer}>
                <Text style={styles.stepText}>
                  Our travel expert will contact you soon to discuss further details.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.footerButton, styles.shareButton]}
          onPress={handleShare}
        >
          <Icon name="share" size={20} color="#FF5722" />
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.footerButton, styles.homeButton]}
          onPress={handleReturnHome}
        >
          <Text style={styles.homeButtonText}>Return to Home</Text>
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
  header: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  confirmationContainer: {
    padding: 16,
  },
  successIcon: {
    alignItems: 'center',
    marginVertical: 24,
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  confirmationSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  bookingInfoCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bookingInfoHeader: {
    backgroundColor: '#FF5722',
    padding: 16,
  },
  bookingReference: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  bookingDate: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  bookingInfoBody: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoLabel: {
    width: 100,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  totalPrice: {
    flex: 1,
    fontSize: 16,
    color: '#FF5722',
    fontWeight: 'bold',
  },
  contactInfoCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  contactInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  contactDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
  },
  nextStepsCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  nextStepsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  stepText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#FF5722',
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginRight: 12,
  },
  shareButtonText: {
    color: '#FF5722',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  homeButton: {
    backgroundColor: '#FF5722',
    flex: 1,
  },
  homeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BookingConfirmationScreen;