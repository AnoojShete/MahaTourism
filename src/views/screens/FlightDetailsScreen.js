import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FlightDetailsScreen = ({ route }) => {
  const navigation = useNavigation();

  const { 
    flightDetails, 
    seatType, 
    departureDate, 
    passengers = 1, 
    tripType,
    departureTime,
    arrivalTime,
    duration,
    price
  } = route.params;
  
  // Debugging logs
  console.log('Flight Details:', flightDetails);
  console.log('Seat Type:', seatType);
  console.log('Passengers:', passengers);
  console.log('Trip Type:', tripType);

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={styles.headerSection}>
          <TouchableOpacity 
            style={styles.backButtonWrapper}
            onPress={() => navigation.goBack()}
          >
            <Image 
              source={require('../../assets/icons/backbutton.png')}
              style={styles.backButtonImage}
            />
          </TouchableOpacity>
          <Text style={styles.header}>Flight Details</Text>
        </View>
        
        <View style={styles.flightSummary}>
          <View style={styles.airlineInfo}>
            <Text style={styles.airlineName}>{flightDetails.airline.name}</Text>
            <Text style={styles.flightNumber}>Flight {flightDetails.flight.number}</Text>
          </View>
          
          <View style={styles.routeTimingContainer}>
            <View style={styles.timeColumn}>
              <Text style={styles.timeText}>{departureTime || '09:00'}</Text>
              <Text style={styles.dateText}>{departureDate}</Text>
              <Text style={styles.cityCode}>{flightDetails.departure.iata}</Text>
              <Text style={styles.cityName}>{flightDetails.departure.airport}</Text>
            </View>
            
            <View style={styles.durationColumn}>
              <Text style={styles.durationText}>{duration}</Text>
              <View style={styles.flightPath}>
                <View style={styles.circle}></View>
                <View style={styles.line}></View>
                <View style={styles.plane}>
                  <Image 
                    source={require('../../assets/icons/backbutton.png')} 
                    style={styles.planeIcon}
                  />
                </View>
                <View style={styles.line}></View>
                <View style={styles.circle}></View>
              </View>
              <Text style={styles.directText}>Direct</Text>
            </View>
            
            <View style={styles.timeColumn}>
              <Text style={styles.timeText}>{arrivalTime || '11:30'}</Text>
              <Text style={styles.dateText}>{departureDate}</Text>
              <Text style={styles.cityCode}>{flightDetails.arrival.iata}</Text>
              <Text style={styles.cityName}>{flightDetails.arrival.airport}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Flight Information</Text>
          
          <View style={styles.detailContainer}>
            <Text style={styles.label}>Flight Number:</Text>
            <Text style={styles.value}>{flightDetails.flight.number}</Text>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Airline:</Text>
            <Text style={styles.value}>{flightDetails.airline.name}</Text>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Status:</Text>
            <Text style={[styles.value, styles[flightDetails.flight.status.toLowerCase()] || styles.scheduled]}>
              {flightDetails.flight.status.charAt(0).toUpperCase() + flightDetails.flight.status.slice(1) || "Scheduled"}
            </Text>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Booking Information</Text>
          
          <View style={styles.detailContainer}>
            <Text style={styles.label}>Seat Type:</Text>
            <Text style={styles.value}>{seatType}</Text>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Number of Seats:</Text>
            <Text style={styles.value}>{passengers}</Text>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Trip Type:</Text>
            <Text style={styles.value}>{tripType}</Text>
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.label}>Total Price:</Text>
            <Text style={styles.price}>₹{
              price || Math.round((seatType === 'First Class' ? 500 * 50 :
              seatType === 'Business' ? 400 * 50 :
              seatType === 'Premium Economy' ? 300 * 87 : 200 * 50) * (passengers || 1) * (tripType === 'Round Trip' ? 2 : 1))
            }</Text>
          </View>
        </View>

        <View style={styles.amenitiesSection}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            <View style={styles.amenityItem}>
              <Text style={styles.amenityText}>Wi-Fi</Text>
            </View>
            <View style={styles.amenityItem}>
              <Text style={styles.amenityText}>Food</Text>
            </View>
            <View style={styles.amenityItem}>
              <Text style={styles.amenityText}>Entertainment</Text>
            </View>
            <View style={styles.amenityItem}>
              <Text style={styles.amenityText}>USB Power</Text>
            </View>
          </View>
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
            const calculatedPrice = price || Math.round((seatType === 'First Class' ? 500 * 50 :
              seatType === 'Business' ? 400 * 50 :
              seatType === 'Premium Economy' ? 300 * 87 : 200 * 50) * (passengers || 1) * (tripType === 'Round Trip' ? 2 : 1));
            
            navigation.navigate('PaymentScreen', { 
              amount: calculatedPrice,
              flightDetails,
              seatType,
              departureDate,
              passengers,
              tripType,
              departureTime,
              arrivalTime
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
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonWrapper: {
    padding: 5,
  },
  backButtonImage: {
    width: 24,
    height: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  flightSummary: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  airlineInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  airlineName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  flightNumber: {
    fontSize: 16,
    color: '#666',
  },
  routeTimingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeColumn: {
    alignItems: 'center',
    width: '30%',
  },
  timeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  cityCode: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cityName: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  durationColumn: {
    alignItems: 'center',
    width: '40%',
  },
  durationText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  flightPath: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 5,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF671F',
  },
  line: {
    height: 1,
    backgroundColor: '#666',
    flex: 1,
  },
  plane: {
    transform: [{ rotate: '90deg' }],
    marginHorizontal: 5,
  },
  planeIcon: {
    width: 16,
    height: 16,
    tintColor: '#FF671F',
  },
  directText: {
    fontSize: 14,
    color: '#666',
  },
  detailsSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
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
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF671F',
  },
  scheduled: {
    color: '#2196F3',
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
  amenitiesSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    width: '50%',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  amenityText: {
    fontSize: 16,
    color: '#666',
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