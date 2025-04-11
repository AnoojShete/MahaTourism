import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, ImageBackground, ActivityIndicator } from 'react-native';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { IP_ADDRESS, PORT } from '@env';

const API_BASE_URL = `http://${IP_ADDRESS}:${PORT}/api`; // Replace with your actual API endpoint

const LocationDetailsScreen = ({ route, navigation }) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { location } = route.params;

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      // Fetch destinations filtered by location
      const response = await axios.get(`${API_BASE_URL}/destinations`, {
        params: { location: location }
      });
      console.log('API response:', response.data);
      setDestinations(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching destinations:', err);
      setError('Failed to load destinations. Please try again later.');
      setLoading(false);
    }
  };

  const Card = ({ destination }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('DestinationDetails', { destination_id: destination.destination_id })}
    >
      <ImageBackground 
        source={{ uri: destination.image_url }} 
        style={styles.cardImage}
        onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
        defaultSource={require('../../assets/placeholder.png')}
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{destination.name}</Text>
          <View style={styles.cardDetails}>
            <Icon name="place" size={20} color={COLORS.white} />
            <Text style={styles.cardLocation}>{destination.location}</Text>
          </View>
          {destination.entry_fee && (
            <View style={styles.feeContainer}>
              <Text style={styles.feeText}>
                {destination.entry_fee > 0 
                  ? `$${parseFloat(destination.entry_fee).toFixed(2)}` 
                  : 'Free Entry'}
              </Text>
            </View>
          )}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loaderText}>Loading destinations...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="error-outline" size={50} color={COLORS.red} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchDestinations}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Destinations</Text>
        <Text style={styles.subtitle}>Discover amazing places to visit</Text>
      </View>
      <FlatList
        data={destinations}
        keyExtractor={(item) => item.destination_id.toString()}
        renderItem={({ item }) => <Card destination={item} />}
        contentContainerStyle={styles.listContainer}
        
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="location-off" size={50} color={COLORS.grey} />
            <Text style={styles.emptyText}>No destinations found in {location}</Text>
          </View>
        }
        onRefresh={fetchDestinations}
        refreshing={loading}
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
    paddingBottom: 80,
  },
  header: {
    padding: 20,
    backgroundColor: '#F75D37',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  resultCount: {
    fontSize: 14,
    color: COLORS.grey,
    marginTop: 4,
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
    backgroundColor: 'rgba(0,0,0,0.4)',
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
  feeContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  feeText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    color: COLORS.grey,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.dark,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.grey,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LocationDetailsScreen;