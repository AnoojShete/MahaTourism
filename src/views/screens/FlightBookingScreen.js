import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import COLORS from '../../consts/colors';
const handleSearch = async () => {
  try {
    const response = await axios.get('/api/flights', {
      params: { origin, destination, departureDate, returnDate, passengers },
    });
    setFlights(response.data);
  } catch (error) {
    console.error(error);
  }
};
const FlightBookingApp = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);

  const handleSearch = async () => {
    try {
      const response = await axios.get('/api/flights', {
        params: { origin, destination, departureDate, returnDate, passengers },
      });
      setFlights(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Flight Booking</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputGroup}>
          <Feather name="map-pin" size={20} color={COLORS.primary}/>
          <TextInput
            style={styles.input}
            placeholder="Origin"
            value={origin}
            onChangeText={setOrigin}
          />
        </View>
        <View style={styles.inputGroup}>
          <Feather name="map-pin" size={20} color={COLORS.primary} />
          <TextInput
            style={styles.input}
            placeholder="Destination"
            value={destination}
            onChangeText={setDestination}
          />
        </View>
        <View style={styles.inputGroup}>
          <Feather name="calendar" size={20} color={COLORS.primary}/>
          <TextInput
            style={styles.input}
            placeholder="Departure Date"
            value={departureDate}
            onChangeText={setDepartureDate}
          />
        </View>
        <View style={styles.inputGroup}>
          <Feather name="calendar" size={20} color={COLORS.primary} />
          <TextInput
            style={styles.input}
            placeholder="Return Date"
            value={returnDate}
            onChangeText={setReturnDate}
          />
        </View>
        <View style={styles.inputGroup}>
          <Feather name="users" size={20} color={COLORS.primary} />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Passengers"
            value={passengers.toString()}
            onChangeText={(text) => setPassengers(parseInt(text, 10))}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search Flights</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingVertical: 40,
  },
  header: {
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FlightBookingApp;