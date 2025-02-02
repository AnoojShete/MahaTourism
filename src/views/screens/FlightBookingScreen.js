import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

const FlightBookingScreen = () => {
  const [tripType, setTripType] = useState('One Way');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [seatType, setSeatType] = useState('Economy');
  const [flightDetails, setFlightDetails] = useState(null);

  // Cache to store flight data
  const flightCache = {};

  const handleSearchFlights = async () => {
    const cacheKey = `${from}-${to}-${departureDate}`;
    
    // Check if data is in cache
    if (flightCache[cacheKey]) {
      setFlightDetails(flightCache[cacheKey]);
      return;
    }

    try {
      const response = await axios.get(`http://api.aviationstack.com/v1/flights`, {
        params: {
          access_key: '137439d6a83f0a8d8793d96a5484b4c2',
          // Add parameters to filter for flights in India
          // Example: from, to, departureDate, etc.
        },
      });
      flightCache[cacheKey] = response.data; // Store in cache
      setFlightDetails(response.data);
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Flight Booking</Text>
      
      <View style={styles.tripTypeContainer}>
        <TouchableOpacity onPress={() => setTripType('One Way')} style={[styles.tripTypeButton, tripType === 'One Way' && styles.activeButton]}>
          <Text>One Way</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTripType('Round Trip')} style={[styles.tripTypeButton, tripType === 'Round Trip' && styles.activeButton]}>
          <Text>Round Trip</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="From"
        value={from}
        onChangeText={setFrom}
      />
      <TextInput
        style={styles.input}
        placeholder="To"
        value={to}
        onChangeText={setTo}
      />
      <TextInput
        style={styles.input}
        placeholder="Departure Date"
        value={departureDate}
        onChangeText={setDepartureDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Passengers"
        keyboardType="numeric"
        value={passengers.toString()}
        onChangeText={(text) => setPassengers(parseInt(text, 10))}
      />
      <TextInput
        style={styles.input}
        placeholder="Seat Type (Economy, Business, etc.)"
        value={seatType}
        onChangeText={setSeatType}
      />

      <TouchableOpacity style={styles.searchButton} onPress={handleSearchFlights}>
        <Text style={styles.searchButtonText}>View Details</Text>
      </TouchableOpacity>

      {flightDetails && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsHeader}>Flight Details:</Text>
          {/* Render flight details here, e.g., flight number, status, etc. */}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tripTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tripTypeButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#FF671F',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#FF671F',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FlightBookingScreen;
