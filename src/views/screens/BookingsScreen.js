import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookingsScreen = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const storedBookings = await AsyncStorage.getItem('bookings');
        if (storedBookings) {
          setBookings(JSON.parse(storedBookings));
        }
      } catch (error) {
        console.error('Error loading bookings:', error);
      }
    };

    loadBookings();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Bookings</Text>
      
      {bookings.length > 0 ? (
        <ScrollView>
          {bookings.map((booking, index) => (
            <View key={index} style={styles.bookingCard}>
              <Text style={styles.bookingTitle}>Booking #{index + 1}</Text>
              <Text style={styles.bookingText}>Flight: {booking.flightNumber}</Text>
              <Text style={styles.bookingText}>Airline: {booking.airline}</Text>
              <Text style={styles.bookingText}>Departure: {booking.departure}</Text>
              <Text style={styles.bookingText}>Arrival: {booking.arrival}</Text>
              <Text style={styles.bookingText}>Passengers: {booking.passengers}</Text>
              <Text style={styles.bookingText}>Total: ₹{booking.amount}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noBookingsText}>No bookings found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  bookingCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  bookingText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  noBookingsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BookingsScreen;
