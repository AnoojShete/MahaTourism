import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, ImageBackground } from 'react-native';
import COLORS from '../../consts/colors';
import places from '../../consts/places';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const LocationDetailsScreen = ({ route, navigation }) => {
  console.log('Location data:', route.params.location); // Debugging log

  const { location } = route.params;

  const filteredPlaces = places.filter((place) => place.location === location); 
  console.log('Filtered places:', filteredPlaces); // Debugging log

  const Card = ({ place }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('DetailsScreen', place)}
    >
      <ImageBackground 
        source={place.image} 
        style={styles.cardImage} 
        onLoadStart={() => console.log('Loading image:', place.image)}
        onError={() => console.log('Error loading image:', place.image)}
        defaultSource={require('../../assets/placeholder.png')} // Fallback image
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{place.name}</Text>
          <View style={styles.cardDetails}>
            <Icon name="place" size={20} color={COLORS.white} />
            <Text style={styles.cardLocation}>{place.location}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredPlaces}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Card place={item} />}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>{location}</Text>
        }
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardImage: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },
  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
    backgroundColor: Colors.primary,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  cardLocation: {
    marginLeft: 8,
    color: COLORS.white,
  },
});

export default LocationDetailsScreen;
