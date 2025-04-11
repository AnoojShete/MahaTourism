import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import axios from 'axios';
import { IP_ADDRESS, PORT } from '@env';

const BASE_URL = `http://${IP_ADDRESS}:${PORT}/api`;
const DestinationDetails = ({ route, navigation }) => {
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { destination_id } = route.params;

  useEffect(() => {
    fetchDestinationDetails();
  }, []);

  const fetchDestinationDetails = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await axios.get(`${BASE_URL}/destinations/${destination_id}`);
      console.log('Destination details:', response.data);
      setDestination(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching destination details:', err);
      setError('Failed to load destination details. Please try again later.');
      setLoading(false);
    }
  };

  const openMaps = () => {
    if (destination && destination.latitude && destination.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}`;
      Linking.openURL(url);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading destination details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="error-outline" size={50} color={COLORS.red} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={fetchDestinationDetails}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!destination) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="search-off" size={50} color={COLORS.grey} />
        <Text style={styles.errorText}>Destination not found</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground 
        source={{ uri: destination.image_url }} 
        style={styles.imageContainer}
        defaultSource={require('../../assets/placeholder.png')}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back-ios" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{destination.name}</Text>
          {destination.entry_fee ? (
            <View style={styles.feeContainer}>
              <Text style={styles.feeText}>
                ${parseFloat(destination.entry_fee).toFixed(2)}
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.infoRow}>
          <Icon name="place" size={20} color={COLORS.primary} />
          <Text style={styles.infoText}>{destination.location}</Text>
        </View>

        {destination.address && (
          <View style={styles.infoRow}>
            <Icon name="home" size={20} color={COLORS.primary} />
            <Text style={styles.infoText}>{destination.address}</Text>
          </View>
        )}

        {destination.open_hours && (
          <View style={styles.infoRow}>
            <Icon name="access-time" size={20} color={COLORS.primary} />
            <Text style={styles.infoText}>{destination.open_hours}</Text>
          </View>
        )}

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>{destination.description}</Text>

        <View style={styles.divider} />

        {destination.latitude && destination.longitude && (
          <TouchableOpacity 
            style={styles.directionButton}
            onPress={openMaps}
          >
            <Icon name="directions" size={18} color={COLORS.white} />
            <Text style={styles.directionButtonText}>Get Directions</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.grey,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.dark,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  retryButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  imageContainer: {
    height: 300,
    justifyContent: 'flex-start',
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.dark,
    flex: 1,
  },
  feeContainer: {
    backgroundColor: COLORS.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  feeText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    color: COLORS.dark,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.light,
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.dark,
  },
  directionButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  directionButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: 8,
  }
});

export default DestinationDetails;