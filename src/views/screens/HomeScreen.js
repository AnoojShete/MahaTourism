import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  DrawerLayoutAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import axios from 'axios';
import LocationDetailsScreen from './LocationDetailsScreen';
import { IP_ADDRESS, PORT } from '@env';

const { width } = Dimensions.get('screen');
const API_BASE_URL = `http://${IP_ADDRESS}:${PORT}/api`; // Replace with your actual API endpoint

const HomeScreen = ({ navigation }) => {
  const [destinations, setDestinations] = useState([]);
  const [recommendedDestinations, setRecommendedDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  // Use useRef instead of useState for the drawer reference
  const drawerRef = useRef(null);

  useEffect(() => {
    fetchDestinations();
    
    // Add a focus listener to handle when the screen comes back into focus
    const unsubscribe = navigation.addListener('focus', () => {
      // Reset any state if needed when returning to this screen
      setSearchQuery('');
      setSearchResults([]);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    } else {
      const filteredResults = destinations.filter(
        destination => 
          destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          destination.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  }, [searchQuery, destinations]);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/destinations`);
      setDestinations(response.data);
      
      // Setting recommended destinations (you can modify this based on your criteria)
      const recommended = response.data.filter(item => item.entry_fee > 0).slice(0, 5);
      setRecommendedDestinations(recommended);
      
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch destinations');
      setLoading(false);
      console.error('Error fetching destinations:', err);
    }
  };

  const handleFlightBooking = () => {
    navigation.navigate('FlightBookingScreen');
  };

  const handleHotelSearch = () => {
    navigation.navigate('HotelSearchScreen');
  };

  const handleNearMe = () => {
    navigation.navigate('HolidayPackageScreen');
  };

  const handleLocations = () => {
    navigation.navigate('TourPackagePage');
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleViewAllPlaces = () => {
    // Navigate to a screen that shows all destinations
    navigation.navigate('LocationDetailsScreen', { destinations });
  };

  const openDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.openDrawer();
    }
  };

  const closeDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.closeDrawer();
    }
  };

  const ListCategories = () => (
    <View style={style.categoryContainer}>
      <TouchableOpacity activeOpacity={0.8} onPress={handleFlightBooking}>
        <View style={style.iconContainer}>
          <Icon name="flight" size={25} color={COLORS.white} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={handleHotelSearch}>
        <View style={style.iconContainer}>
          <Icon name="beach-access" size={25} color={COLORS.white} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={handleNearMe}>
        <View style={style.iconContainer}>
          <Icon name="card-travel" size={25} color={COLORS.white} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={handleLocations}>
        <View style={style.iconContainer}>
          <Icon name="explore" size={25} color={COLORS.white} />
        </View>
      </TouchableOpacity>
    </View>
  );

  const Card = ({ destination }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DestinationDetails', { destination_id: destination.destination_id })}>
        <ImageBackground 
        source={{ uri: destination.image_url }} 
        style={style.cardImage}
        onError={() => console.log('Error loading image:', destination.image_url)}
        defaultSource={require('../../assets/placeholder.png')}
      >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            {destination.name}
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="place" size={20} color={COLORS.white} />
              <Text style={{marginLeft: 5, color: COLORS.white}}>
                {destination.location}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon name="star" size={20} color={COLORS.white} />
              <Text style={{marginLeft: 5, color: COLORS.white}}>5.0</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const RecommendedCard = ({ destination }) => {
    return (
      <ImageBackground 
        style={style.rmCardImage} 
        source={{ uri: destination.image_url }}
        defaultSource={require('../../assets/placeholder.jpg')}
      >
        <Text
          style={{
            color: COLORS.white,
            fontSize: 22,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          {destination.name}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="place" size={22} color={COLORS.white} />
              <Text style={{color: COLORS.white, marginLeft: 5}}>
                {destination.location}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon name="star" size={22} color={COLORS.white} />
              <Text style={{color: COLORS.white, marginLeft: 5}}>5.0</Text>
            </View>
          </View>
          <Text style={{color: COLORS.white, fontSize: 13}}>
            {destination.description}
          </Text>
        </View>
      </ImageBackground>
    );
  };

  const renderSidebar = () => (
    <View style={style.sidebarContainer}>
      <View style={style.sidebarHeader}>
        <Text style={style.sidebarTitle}>MahaTourism</Text>
      </View>
      <View style={style.sidebarContent}>
        <TouchableOpacity style={style.sidebarItem} onPress={() => { closeDrawer(); navigation.navigate('HomeScreen'); }}>
          <Icon name="home" size={24} color={COLORS.primary} />
          <Text style={style.sidebarItemText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.sidebarItem} onPress={() => { closeDrawer(); navigation.navigate('Profile'); }}>
          <Icon name="person" size={24} color={COLORS.primary} />
          <Text style={style.sidebarItemText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.sidebarItem} onPress={() => { closeDrawer(); navigation.navigate('Bookings'); }}>
          <Icon name="book" size={24} color={COLORS.primary} />
          <Text style={style.sidebarItemText}>My Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.sidebarItem} onPress={() => { closeDrawer(); navigation.navigate('Favorites'); }}>
          <Icon name="favorite" size={24} color={COLORS.primary} />
          <Text style={style.sidebarItemText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.sidebarItem} onPress={() => { closeDrawer(); navigation.navigate('Settings'); }}>
          <Icon name="settings" size={24} color={COLORS.primary} />
          <Text style={style.sidebarItemText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.sidebarItem} onPress={() => { closeDrawer(); /* handle logout */ }}>
          <Icon name="logout" size={24} color={COLORS.primary} />
          <Text style={style.sidebarItemText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={width * 0.75}
      drawerPosition="left"
      renderNavigationView={renderSidebar}
    >
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
        <StatusBar translucent={false} backgroundColor={COLORS.primary} />
        <View style={style.header}>
          <TouchableOpacity onPress={openDrawer}>
            <Icon name="sort" size={28} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        {loading ? (
          <View style={style.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={style.loadingText}>Loading destinations...</Text>
          </View>
        ) : error ? (
          <View style={style.errorContainer}>
            <Icon name="error" size={40} color={COLORS.primary} />
            <Text style={style.errorText}>{error}</Text>
            <TouchableOpacity style={style.retryButton} onPress={fetchDestinations}>
              <Text style={style.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                backgroundColor: COLORS.primary,
                height: 120,
                paddingHorizontal: 20,
              }}>
              <View style={{flex: 1}}>
                <Text style={style.headerTitle}>MahaTourism</Text>
                <View style={style.inputContainer}>
                  <Icon name="search" size={28} />
                  <TextInput
                    placeholder="Search place"
                    style={{color: COLORS.dark, flex: 1}}
                    value={searchQuery}
                    onChangeText={handleSearch}
                  />
                  {searchQuery ? (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                      <Icon name="close" size={24} color={COLORS.grey} />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>
            <ListCategories />
            
            {searchQuery.trim() ? (
              <>
                <Text style={style.sectionTitle}>Search Results</Text>
                {searchResults.length > 0 ? (
                  <FlatList
                    contentContainerStyle={{paddingLeft: 20}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={searchResults}
                    renderItem={({item}) => <Card destination={item} />}
                    keyExtractor={item => item.destination_id.toString()}
                  />
                ) : (
                  <Text style={style.noResultsText}>No destinations found matching "{searchQuery}"</Text>
                )}
              </>
            ) : (
              <>
                <View style={style.sectionTitleContainer}>
                  <Text style={style.sectionTitle}>Places</Text>
                  <TouchableOpacity onPress={handleViewAllPlaces}>
                    <View style={style.moreButtonContainer}>
                      <Text style={style.moreButtonText}>More</Text>
                      <Icon name="arrow-forward" size={16} color={COLORS.primary} />
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  <FlatList
                    contentContainerStyle={{paddingLeft: 20}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={destinations}
                    keyExtractor={(item) => item.destination_id.toString()}
                    renderItem={({ item }) => <Card destination={item} />}
                  />
                  <Text style={style.sectionTitle}>Recommended</Text>
                  <FlatList
                    snapToInterval={width - 20}
                    contentContainerStyle={{paddingLeft: 20, paddingBottom: 20}}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={recommendedDestinations}
                    renderItem={({item}) => <RecommendedCard destination={item} />}
                    keyExtractor={item => item.destination_id.toString()}
                  />
                </View>
              </>
            )}
          </ScrollView>
        )}
      </SafeAreaView>
    </DrawerLayoutAndroid>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 50,
  },
  inputContainer: {
    height: 60,
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: 'absolute',
    top: 90,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12,
  },
  categoryContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  moreButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    marginRight: 5,
  },
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  rmCardImage: {
    width: width - 40,
    height: 200,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.primary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: 10,
  },
  retryButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  noResultsText: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    fontSize: 16,
    color: COLORS.dark,
    fontStyle: 'italic',
  },
  sidebarContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  sidebarHeader: {
    padding: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  sidebarTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  sidebarContent: {
    padding: 20,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sidebarItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: COLORS.dark,
  },
});

export default HomeScreen;