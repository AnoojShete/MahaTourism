import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { usePackageAPI } from './PackageService';

const HolidayPackagesScreen = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const { getAllPackages } = usePackageAPI();
  const fetchPackages = async () => {
    try {
      const data = await getAllPackages();
      setPackages(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      Alert.alert('Error', 'Failed to load packages. Please try again.');
    }
  };
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getAllPackages();
        setPackages(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        Alert.alert('Error', 'Failed to load packages. Please try again.');
      }
    };

    fetchPackages();
  }, []);

  const handlePackagePress = (packageItem) => {
    navigation.navigate('PackageDetailScreen', { packageId: packageItem.id });
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchPackages();
  };

  const renderPackageItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => handlePackagePress(item)}
    >
      <Image
        source={{ uri: item.image_url }}
        style={styles.cardImage}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.locationContainer}>
          <Icon name="location-on" size={16} color="#666" />
          <Text style={styles.locationText}>{item.destination}</Text>
        </View>
        <Text style={styles.durationText}>
          {item.duration_nights} Nights / {item.duration_days} Days
        </Text>
        
        <View style={styles.priceRatingContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.originalPrice}>₹{item.base_price}</Text>
            <Text style={styles.discountedPrice}>
              ₹{item.discounted_price}
            </Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{item.discount_percentage}% OFF</Text>
            </View>
          </View>
          
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>
              {item.rating} ({item.reviewCount})
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5722" />
        <Text style={styles.loadingText}>Loading packages...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <Text style={styles.refreshButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Packages</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {packages.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="info" size={48} color="#999" />
          <Text style={styles.emptyText}>No packages available</Text>
        </View>
      ) : (
        <FlatList
          data={packages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPackageItem}
          contentContainerStyle={styles.packagesContainer}
          refreshing={loading}
          onRefresh={handleRefresh}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  searchButton: {
    padding: 8,
  },
  filterContainer: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeFilterButton: {
    backgroundColor: '#FF5722',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
  },
  activeFilterText: {
    color: 'white',
    fontWeight: 'bold',
  },
  packagesContainer: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  durationText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  inclusionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  inclusionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 6,
  },
  inclusionText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  discountBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  discountText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#FF5722',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  refreshButton: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  refreshButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HolidayPackagesScreen;