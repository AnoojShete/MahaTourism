import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const FlightDetailsScreen = ({ route }) => {
  const navigation = useNavigation();

  const { flightDetails, seatType, departureDate, passengers = 1, tripType } = route.params;
  
  // Debugging logs
  console.log('Flight Details:', flightDetails);
  console.log('Seat Type:', seatType);
  console.log('Passengers:', passengers);
  console.log('Trip Type:', tripType);







  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>

      <Text style={styles.header}>Flight Details</Text>
      
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Flight Number:</Text>
        <Text style={styles.value}>{flightDetails.flight.number}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Airline:</Text>
        <Text style={styles.value}>{flightDetails.airline.name}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Departure:</Text>
        <Text style={styles.value}>{flightDetails.departure.airport} ({flightDetails.departure.iata})</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Arrival:</Text>
        <Text style={styles.value}>{flightDetails.arrival.airport} ({flightDetails.arrival.iata})</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Status:</Text>
        <Text style={[styles.value, styles[flightDetails.flight.status.toLowerCase()]]}>
          {"Scheduled"}
        </Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Departure Date:</Text>
        <Text style={styles.value}>{departureDate}</Text>
      </View>


      <View style={styles.detailContainer}>
        <Text style={styles.label}>Seat Type:</Text>
        <Text style={styles.value}>{seatType}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Number of Seats:</Text>
        <Text style={styles.value}>{passengers}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Total Price:</Text>
        <Text style={styles.value}>₹{
          Math.round((seatType === 'First Class' ? 500 * 50:
          seatType === 'Business' ? 400 * 50:
          seatType === 'Premium Economy' ? 300 * 87: 200 * 50) * (passengers || 1) * (tripType === 'Round Trip' ? 2 : 1))
        }</Text>



      </View>


      </ScrollView>

      <View style={styles.buttonContainer}>


      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.bookButton}
        onPress={() => {
          const amount = Math.round((seatType === 'First Class' ? 500 * 50:
            seatType === 'Business' ? 400 * 50:
            seatType === 'Premium Economy' ? 300 * 87: 200 * 50) * (passengers || 1) * (tripType === 'Round Trip' ? 2 : 1));
          console.log('Calculated Amount:', amount);
          navigation.navigate('PaymentScreen', { 
            amount,
            flightDetails,
            seatType,
            departureDate,
            passengers,
            tripType
          });

        }}


      >
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
      </View>
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
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  detailContainer: {
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
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  ontime: {
    color: '#28a745',
  },
  delayed: {
    color: '#dc3545',
  },
  cancelled: {
    color: '#6c757d',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  backButton: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  bookButton: {
    backgroundColor: '#FF671F',
    padding: 15,
    borderRadius: 8,
    flex: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});

export default FlightDetailsScreen;
