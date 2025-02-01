import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import COLORS from '../../consts/colors';
import places from '../../consts/places';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const NearMeScreen = ({ navigation }) => {
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
        findNearbyPlaces(location.coords);
      }
    };
    requestLocationPermission();
  }, []);

  const findNearbyPlaces = (coords) => {
    const userLat = coords.latitude;
    const userLng = coords.longitude;
    const nearbyPlaces = places.filter((place) => {
      const distance = Math.sqrt(
        Math.pow(place.latitude - userLat, 2) + Math.pow(place.longitude - userLng, 2)
      );
      return distance <= 50;
    });
    setNearbyPlaces(nearbyPlaces);
  };

  const Card = ({ place }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('DetailsScreen', place)}
    >
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{place.name}</Text>
          <View style={styles.cardDetails}>
            <Icon name="place" size={20} color={COLORS.primary} />
            <Text style={styles.cardLocation}>{place.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={nearbyPlaces}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Card place={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  listContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 10,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLocation: {
    marginLeft: 8,
    color: COLORS.grey,
  },
});

export default NearMeScreen;