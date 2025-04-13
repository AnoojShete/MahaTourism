
import { IP_ADDRESS, PORT } from '@env';
const API_BASE_URL = `http://${IP_ADDRESS}:${PORT}/api/hotels`; // Replace with your actual backend URL

// Fetch all hotels
export const fetchAllHotels = async () => {
  const response = await fetch(`${API_BASE_URL}`);
  if (!response.ok) throw new Error('Failed to fetch all hotels');
  return await response.json();
};

// Fetch featured hotels (e.g., top rated)
export const fetchFeaturedHotels = async () => {
  const response = await fetch(`${API_BASE_URL}/featured`);
  if (!response.ok) throw new Error('Failed to fetch featured hotels');
  return await response.json();
};

// Search hotels with filters (optional backend support required)
export const searchHotels = async (params) => {
  // Prepare query string
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      queryParams.append(key, value);
    }
  });

  const response = await fetch(`${API_BASE_URL}/search?${queryParams.toString()}`);
  if (!response.ok) throw new Error('Hotel search failed');
  return await response.json();
};

// Fetch hotel details by ID
export const getHotelDetails = async (hotelId) => {
  const response = await fetch(`${API_BASE_URL}/${hotelId}`);
  if (!response.ok) throw new Error('Failed to fetch hotel details');
  return await response.json();
};
