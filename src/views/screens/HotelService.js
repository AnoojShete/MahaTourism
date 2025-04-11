import axios from 'axios';
import { IP_ADDRESS, PORT } from '@env';

const API_CONFIG = `http://${IP_ADDRESS}:${PORT}/api`;
// Create an axios instance with default configuration
const apiClient = axios.create({
  baseURL: `http://${IP_ADDRESS}:${PORT}/api`,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

/**
 * Fetch featured hotels from the API
 * @returns {Promise<Array>} Array of featured hotel objects
 */
export const fetchAllHotels = async () => {
  try {
    const response = await apiClient.get('/api/hotels');
    return response.data;
  } catch (error) {
    console.error('API Error - fetchAllHotels:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch All hotels');
  }
};
export const fetchFeaturedHotels = async () => {
  try {
    const response = await apiClient.get('/api/hotels/featured');
    return response.data;
  } catch (error) {
    console.error('API Error - fetchFeaturedHotels:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch featured hotels');
  }
};

/**
 * Search for hotels based on provided parameters
 * @param {Object} searchParams - Search parameters object
 * @returns {Promise<Array>} Array of hotel objects matching the search criteria
 */
export const searchHotels = async (searchParams) => {
  try {
    const response = await apiClient.get('/api/hotels/search', {
      params: searchParams
    });
    return response.data;
  } catch (error) {
    console.error('API Error - searchHotels:', error);
    throw new Error(error.response?.data?.message || 'Failed to search for hotels');
  }
};

/**
 * Get detailed information for a specific hotel
 * @param {string|number} hotelId - The ID of the hotel to fetch
 * @returns {Promise<Object>} Detailed hotel information
 */
export const getHotelDetails = async (hotelId) => {
  try {
    const response = await apiClient.get(`/api/hotels/${hotelId}`);
    return response.data;
  } catch (error) {
    console.error('API Error - getHotelDetails:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch hotel details');
  }
};

/**
 * Get hotel reviews for a specific hotel
 * @param {string|number} hotelId - The ID of the hotel to fetch reviews for
 * @returns {Promise<Array>} Array of review objects
 */
export const getHotelReviews = async (hotelId) => {
  try {
    const response = await apiClient.get(`/api/hotels/${hotelId}/reviews`);
    return response.data;
  } catch (error) {
    console.error('API Error - getHotelReviews:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch hotel reviews');
  }
};