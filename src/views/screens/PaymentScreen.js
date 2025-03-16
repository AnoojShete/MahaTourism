import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // Debugging logs
  console.log('Payment Screen Route Params:', route.params);
  console.log('Amount Received:', route.params?.amount);
  console.log('Flight Details:', route.params?.flightDetails);
  console.log('Passengers:', route.params?.passengers);

  // Generate a random transaction ID
  const transactionId = 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase();

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFlightDetails = () => {
    try {
      const flightDetails = route.params?.flightDetails;
      if (!flightDetails) {
        throw new Error('No flight details found');
      }

      // Validate flight object structure
      if (!flightDetails.flight || typeof flightDetails.flight !== 'object' ||
          !flightDetails.airline || typeof flightDetails.airline !== 'object' ||
          !flightDetails.departure || typeof flightDetails.departure !== 'object' ||
          !flightDetails.arrival || typeof flightDetails.arrival !== 'object') {
        throw new Error('Invalid flight data structure');
      }

      const requiredFields = {
        'Flight Number': flightDetails.flight?.number,
        'Airline': flightDetails.airline?.name,
        'Departure Airport': flightDetails.departure?.airport,
        'Departure Code': flightDetails.departure?.iata,
        'Arrival Airport': flightDetails.arrival?.airport,
        'Arrival Code': flightDetails.arrival?.iata,
      };


    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      throw new Error(`Missing flight details: ${missingFields.join(', ')}`);
    }

    return true;
    } catch (error) {
      Alert.alert(
        'Validation Error',
        error.message + '. Please try booking again.'
      );
      return false;
    }

  };



  // Function to send email
  const sendTicketEmail = async (bookingDetails) => {
    try {
      // Validate booking details before sending
      if (!bookingDetails.flightNumber || !bookingDetails.airline || 
          !bookingDetails.departure || !bookingDetails.arrival) {
        throw new Error('Incomplete booking details');
      }

      // In a real app, you would integrate with your backend email service here
      const response = await fetch('/api/send-confirmation-email', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: bookingDetails.email,
          subject: `Flight Booking Confirmation - ${bookingDetails.flightNumber}`,
          booking: bookingDetails,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };

  const handleViewDetails = () => {
    if (!validateFlightDetails()) {
      return;
    }
    navigation.navigate('FlightDetailsScreen', {
      flightDetails: route.params?.flightDetails
    });
  };

  const handleConfirmPayment = async () => {
    try {
      // Validate email
      if (!email) {
        setEmailError('Please enter your email address');
        return;
      }
      if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address');
        return;
      }

      // Validate flight details
      if (!validateFlightDetails()) {
        Alert.alert('Error', 'Invalid flight details. Please try booking again.');
        return;
      }

      // Validate amount
      if (!route.params?.amount || isNaN(route.params.amount)) {
        Alert.alert('Error', 'Invalid payment amount. Please try again.');
        return;
      }


      const flightDetails = route.params?.flightDetails;

      // Create booking object with null checks
      const booking = {
        flightNumber: flightDetails?.flight?.number,
        airline: flightDetails?.airline?.name,
        departure: flightDetails?.departure?.airport 
          ? `${flightDetails.departure.airport} (${flightDetails.departure.iata})`
          : null,
        arrival: flightDetails?.arrival?.airport 
          ? `${flightDetails.arrival.airport} (${flightDetails.arrival.iata})`
          : null,
        passengers: route.params?.passengers || [],
        amount: route.params?.amount,
        date: new Date().toLocaleDateString(),
        email: email,
        transactionId: transactionId
      };

      // Validate booking object
      const missingFields = Object.entries(booking)
        .filter(([key, value]) => !value && key !== 'passengers')
        .map(([key]) => key);

      if (missingFields.length > 0) {
        throw new Error(`Missing required booking information: ${missingFields.join(', ')}`);
      }

      // Update payment status
      setPaymentStatus('completed');

      // Save booking
      try {
        const storedBookings = await AsyncStorage.getItem('bookings');
        const bookings = storedBookings ? JSON.parse(storedBookings) : [];
        if (!Array.isArray(bookings)) {
          throw new Error('Invalid bookings data');
        }
        bookings.push(booking);
        await AsyncStorage.setItem('bookings', JSON.stringify(bookings));
      } catch (storageError) {
        console.error('Error saving booking:', storageError);
        throw new Error('Failed to save booking. Please try again.');
      }

      // Send email
      try {
        await sendTicketEmail(booking);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        throw new Error('Failed to send confirmation email. Your booking was successful but the email could not be sent.');
      }


      Alert.alert(
        'Booking Confirmed',
        'Your ticket has been successfully booked and sent to your email!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('BookingsScreen')
          }
        ]
      );
    } catch (error) {
      console.error('Error processing booking:', error);
      Alert.alert(
        'Error',
        error.message || 'Failed to process booking. Please try again.'
      );
      setPaymentStatus('failed');
    }
  };

  // Rest of the component remains the same...
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Payment Details</Text>

        <View style={styles.qrContainer}>
          <Image
            source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=anoojshete@okaxis&pn=FlightBooking&am=' + (route.params?.amount || '0') + '&tn=' + transactionId }}
            style={styles.qrCode}
          />
          <Text style={styles.scanText}>Scan QR code to pay</Text>
        </View>

        <View style={styles.emailContainer}>
          <Text style={styles.cardHeader}>Email Address</Text>
          <TextInput
            style={styles.emailInput}
            placeholder="Enter your email address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError('');
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.cardHeader}>Transaction Details</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.label}>Transaction ID:</Text>
            <Text style={styles.value}>{transactionId}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Amount:</Text>
            <Text style={styles.value}>₹{route.params?.amount || '0'}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Payment Status:</Text>
            <Text style={[styles.value, styles[paymentStatus]]}>
              {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
            </Text>
          </View>
        </View>

        {/* Rest of the existing cards... */}
        <View style={styles.instructionsCard}>
          <Text style={styles.cardHeader}>Payment Instructions</Text>
          <Text style={styles.instruction}>1. Open your UPI payment app</Text>
          <Text style={styles.instruction}>2. Scan the QR code above</Text>
          <Text style={styles.instruction}>3. Enter your UPI PIN to confirm payment</Text>
          <Text style={styles.instruction}>4. Ensure payment is made to: anoojshete@okaxis</Text>
          <Text style={styles.instruction}>5. Wait for payment confirmation</Text>
        </View>

        <View style={styles.supportCard}>
          <Text style={styles.cardHeader}>Need Help?</Text>
          <Text style={styles.supportText}>Contact our support team:</Text>
          <Text style={styles.supportEmail}>support@mahatourism.com</Text>
          <Text style={styles.supportPhone}>+91 1800-123-4567</Text>
        </View>
      </ScrollView>

  <View style={styles.buttonContainer}>
    <TouchableOpacity 
      style={styles.viewDetailsButton}
      onPress={handleViewDetails}
    >
      <Text style={styles.buttonText}>View Details</Text>
    </TouchableOpacity>

    <TouchableOpacity 
      style={styles.cancelButton}
      onPress={() => navigation.goBack()}
    >
      <Text style={styles.buttonText}>Cancel</Text>
    </TouchableOpacity>

    <TouchableOpacity 
      style={styles.confirmButton}
      onPress={handleConfirmPayment}
    >
      <Text style={styles.buttonText}>Confirm Payment</Text>
    </TouchableOpacity>

  </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#333',
  },
  // Add new styles for email input
  emailContainer: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emailInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 14,
    marginTop: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#333',
  },
  qrContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    margin: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  qrCode: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  scanText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  detailsCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  instructionsCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instruction: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    paddingLeft: 10,
  },
  supportCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    marginBottom: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  supportText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  supportEmail: {
    fontSize: 16,
    color: '#FF671F',
    marginBottom: 5,
  },
  supportPhone: {
    fontSize: 16,
    color: '#FF671F',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  viewDetailsButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: '#FF671F',
    padding: 15,
    borderRadius: 8,
    flex: 2,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pending: {
    color: '#ffc107',
  },
  completed: {
    color: '#28a745',
  },
  failed: {
    color: '#dc3545',
  },
});

export default PaymentScreen;
