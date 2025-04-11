import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FlightOptionsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { flightsData, seatType, departureDate, passengers, tripType } = route.params;

  // Function to calculate actual flight duration from API data
  const calculateActualDuration = (departureTime, arrivalTime) => {
    const dep = new Date(departureTime);
    const arr = new Date(arrivalTime);
    const diffMs = arr - dep;
    
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  // Function to format time from ISO string
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Calculate price based on seat type and duration
  const calculatePrice = (flight) => {
    // Get actual duration in minutes
    const depTime = new Date(flight.departure.scheduled);
    const arrTime = new Date(flight.arrival.scheduled);
    const durationMinutes = (arrTime - depTime) / (1000 * 60);
    
    const baseMultiplier = seatType === 'First Class' ? 8 :
                         seatType === 'Business' ? 6 :
                         seatType === 'Premium Economy' ? 4 : 2;
    
    // Price based on duration and seat type
    return Math.round((durationMinutes * baseMultiplier) * (passengers || 1) * (tripType === 'Round Trip' ? 2 : 1));
  };

  // Render each flight option with actual data
  const renderFlightItem = ({ item, index }) => {
    // Use actual times from API response
    const departureTime = formatTime(item.departure.scheduled);
    const arrivalTime = formatTime(item.arrival.scheduled);
    const duration = calculateActualDuration(item.departure.scheduled, item.arrival.scheduled);
    const price = calculatePrice(item);
    
    return (
        <TouchableOpacity 
        style={styles.flightCard}
        onPress={() => {
          navigation.navigate('FlightDetailsScreen', {
            flightDetails: item,
            seatType: seatType,
            departureDate: departureDate,
            passengers: passengers,
            tripType: tripType,
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            duration: duration,
            price: price
          });
        }}
      >
        <View style={styles.airlineRow}>
          <Text style={styles.airlineName}>{item.airline.name}</Text>
          <Text style={styles.flightNumber}>Flight {item.flight.number}</Text>
        </View>

        <View style={styles.timingRow}>
          <View style={styles.timeBlock}>
            <Text style={styles.timeText}>{departureTime}</Text>
            <Text style={styles.airportCode}>{item.departure.iata}</Text>
          </View>
          
          <View style={styles.durationContainer}>
            <Text style={styles.durationText}>{duration}</Text>
            <View style={styles.flightPath}>
              <View style={styles.circle}></View>
              <View style={styles.line}></View>
              <View style={styles.circle}></View>
            </View>
            <Text style={styles.directText}>Direct</Text>
          </View>
          
          <View style={styles.timeBlock}>
            <Text style={styles.timeText}>{arrivalTime}</Text>
            <Text style={styles.airportCode}>{item.arrival.iata}</Text>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.amenities}>
            <Text style={styles.amenityText}>Wi-Fi</Text>
            <Text style={styles.amenityText}>• USB</Text>
            <Text style={styles.amenityText}>• Food</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.priceValue}>₹{price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image 
            source={require('../../assets/icons/backbutton.png')}
            style={styles.backButtonImage}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Flight Options</Text>
      </View>

      <View style={styles.routeInfo}>
        <Text style={styles.routeText}>
          {flightsData[0]?.departure?.iata} → {flightsData[0]?.arrival?.iata}
        </Text>
        <Text style={styles.dateText}>{departureDate} • {passengers} Passenger{passengers > 1 ? 's' : ''}</Text>
      </View>

      <FlatList
        data={flightsData}
        renderItem={renderFlightItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonImage: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  routeInfo: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
  },
  routeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    padding: 10,
  },
  flightCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  airlineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  airlineName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  flightNumber: {
    fontSize: 14,
    color: '#666',
  },
  timingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  timeBlock: {
    alignItems: 'center',
    width: '25%',
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  airportCode: {
    fontSize: 16,
    color: '#333',
  },
  durationContainer: {
    alignItems: 'center',
    width: '50%',
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
    marginHorizontal: 5,
  },
  directText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  amenities: {
    flexDirection: 'row',
  },
  amenityText: {
    fontSize: 14,
    color: '#666',
    marginRight: 5,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF671F',
  },
});

export default FlightOptionsScreen;