import 'react-native-gesture-handler';
import '@react-native-async-storage/async-storage';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import HomeScreen from './src/views/screens/HomeScreen';
import DetailsScreen from './src/views/screens/DetailsScreen';
import HotelSearchScreen from './src/views/screens/HotelSearchScreen';
import FlightBookingScreen from './src/views/screens/FlightBookingScreen';
import NearMeScreen from './src/views/screens/NearMeScreen';
import LocationScreen from './src/views/screens/LocationScreen';
import LoginScreen from './src/views/screens/LoginScreen';
import LocationDetailsScreen from './src/views/screens/LocationDetailsScreen';
import RegisterScreen from './src/views/screens/RegisterScreen';
import ForgotPasswordScreen from './src/views/screens/ForgotPasswordScreen';
import FlightDetailsScreen from './src/views/screens/FlightDetailsScreen';
import PaymentScreen from './src/views/screens/PaymentScreen';
import BookingsScreen from './src/views/screens/BookingsScreen';
import TourPackagePage from './src/views/screens/TourPackagePage';
import ItineraryDetailsPage from './src/views/screens/ItineraryDetailsPage';
import HolidayPackageScreen from './src/views/screens/HolidayPackageScreen';
import PackageDetailScreen from './src/views/screens/PackageDetailScreen';
import DestinationDetails from './src/views/screens/DestinationDetails';
import HotelListScreen from './src/views/screens/HotelListScreen';
import HotelDetailScreen from './src/views/screens/HotelDetailScreen';
import BookingScreen from './src/views/screens/BookingScreen';
import BookingConfirmationScreen from './src/views/screens/BookingConfirmationScreen';
import FlightOptionsScreen from './src/views/screens/FlightOptionsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="HotelSearchScreen" component={HotelSearchScreen} />
        <Stack.Screen name="FlightBookingScreen" component={FlightBookingScreen} />
        <Stack.Screen name="NearMeScreen" component={NearMeScreen} />
        <Stack.Screen name="LocationScreen" component={LocationScreen} />
        <Stack.Screen name="LocationDetailsScreen" component={LocationDetailsScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="FlightDetailsScreen" component={FlightDetailsScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="BookingsScreen" component={BookingsScreen} />
        <Stack.Screen name="TourPackagePage" component={TourPackagePage} />
        <Stack.Screen name="ItineraryDetailsPage" component={ItineraryDetailsPage} />
        <Stack.Screen name="HolidayPackageScreen" component={HolidayPackageScreen} />
        <Stack.Screen name="PackageDetailScreen" component={PackageDetailScreen} />
        <Stack.Screen name="DestinationDetails" component={DestinationDetails} />
        <Stack.Screen name="HotelListScreen" component={HotelListScreen} />
        <Stack.Screen name="HotelDetailScreen" component={HotelDetailScreen} />
        <Stack.Screen name="BookingScreen" component={BookingScreen} />
        <Stack.Screen name="BookingConfirmationScreen" component={BookingConfirmationScreen} />
        <Stack.Screen name="FlightOptionsScreen" component={FlightOptionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;