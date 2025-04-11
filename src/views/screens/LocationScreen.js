import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import COLORS from '../../consts/colors';
import places from '../../consts/places';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const LocationScreen = ({ navigation }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = () => {
      const uniqueLocations = [...new Set(places.map(place => place.location))];
      setLocations(uniqueLocations);
    };
    fetchLocations();
  }, []);

  const handleLocationPress = (location) => {
    navigation.navigate('LocationDetailsScreen', { location });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={locations}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleLocationPress(item)}>
            <View style={styles.locationCard}>
              <Icon name="place" size={24} color={COLORS.primary} />
              <Text style={styles.locationText}>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
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
  locationCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  locationText: {
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 12,
  },
});

export default LocationScreen;