import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const HotelSearchScreen = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');
  const [rooms, setRooms] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get('/api/hotels', {
        params: {
          location,
          checkIn,
          checkOut,
          guests,
          rooms,
        },
      });

      const hotels = response.data;
      console.log('Search results:', hotels);

      // Display the search results or navigate to a hotel listing screen
      Alert.alert('Search Results', `Found ${hotels.length} hotels.`);
    } catch (error) {
      console.error('Error searching for hotels:', error);
      Alert.alert('Error', 'Failed to search for hotels. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Location"
        />
        <View style={styles.dateContainer}>
          <TextInput
            style={styles.dateInput}
            value={checkIn}
            onChangeText={setCheckIn}
            placeholder="Check In"
          />
          <TextInput
            style={styles.dateInput}
            value={checkOut}
            onChangeText={setCheckOut}
            placeholder="Check Out"
          />
        </View>
        <View style={styles.guestRoomContainer}>
          <TextInput
            style={styles.guestRoomInput}
            value={guests}
            onChangeText={setGuests}
            placeholder="Guests"
          />
          <TextInput
            style={styles.guestRoomInput}
            value={rooms}
            onChangeText={setRooms}
            placeholder="Rooms"
          />
        </View>
        <TouchableOpacity
          style={[styles.searchButton, isLoading && styles.disabledButton]}
          onPress={handleSearch}
          disabled={isLoading}
        >
          <Text style={styles.searchButtonText}>
            {isLoading ? 'Searching...' : 'Search'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '90%',
  },
  input: {
    fontSize: 16,
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateInput: {
    width: '48%',
    fontSize: 16,
  },
  guestRoomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  guestRoomInput: {
    width: '48%',
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#FF5733',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HotelSearchScreen;