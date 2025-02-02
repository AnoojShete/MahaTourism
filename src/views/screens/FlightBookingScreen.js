import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const FlightBookingScreen = () => {
  const [tripType, setTripType] = useState('One Way');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1))); // Default to tomorrow
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [seatType, setSeatType] = useState('First Class');
  const [flightDetails, setFlightDetails] = useState(null);

  const handleSearchFlights = async () => {
    try {
      const response = await axios.get(`http://api.aviationstack.com/v1/flights`, {
        params: {
          access_key: '137439d6a83f0a8d8793d96a5484b4c2',
          // Add parameters to filter for flights in India
        },
      });
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
      <Text style={styles.dateLabel}>Depart</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Departure Date"
          value={departureDate.toLocaleDateString()}
          editable={false}
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={(date) => {
          setDepartureDate(date);
          setShowDatePicker(false);
        }}
        onCancel={() => setShowDatePicker(false)}
        minimumDate={new Date()} // Prevent past dates
      />

      {tripType === 'Round Trip' && (
        <>
          <Text style={styles.dateLabel}>Return</Text>
          <TouchableOpacity onPress={() => setShowReturnDatePicker(true)}>
            <TextInput
              style={styles.input}
              placeholder="Return Date"
              value={returnDate.toLocaleDateString()}
              editable={false}
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={showReturnDatePicker}
            mode="date"
            onConfirm={(date) => {
              setReturnDate(date);
              setShowReturnDatePicker(false);
            }}
            onCancel={() => setShowReturnDatePicker(false)}
            minimumDate={new Date()} // Prevent past dates
          />
        </>
      )}

      <Text style={styles.seatLabel}>Seat Numbers</Text>
      <View style={styles.passengerContainer}>
        <TouchableOpacity onPress={() => setPassengers(passengers - 1 < 1 ? 1 : passengers - 1)}>
          <Text style={styles.adjustButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.passengerCount}>{passengers}</Text>
        <TouchableOpacity onPress={() => setPassengers(passengers + 1)}>
          <Text style={styles.adjustButton}>+</Text>
        </TouchableOpacity>
      </View>
      
      <Picker
        selectedValue={seatType}
        style={styles.picker}
        onValueChange={(itemValue) => setSeatType(itemValue)}
      >
        <Picker.Item label="First Class" value="First Class" />
        <Picker.Item label="Economy" value="Economy" />
        <Picker.Item label="Premium Economy" value="Premium Economy" />
        <Picker.Item label="Business" value="Business" />
      </Picker>

      <TouchableOpacity style={styles.searchButton} onPress={handleSearchFlights}>
        <Text style={styles.searchButtonText}>View Details</Text>
      </TouchableOpacity>

      {flightDetails && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsHeader}>Flight Details:</Text>
          {/* Render flight details here */}
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
  dateLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  seatLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  passengerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  adjustButton: {
    fontSize: 24,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  passengerCount: {
    fontSize: 18,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
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
