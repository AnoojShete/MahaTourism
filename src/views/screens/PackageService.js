import axios from 'axios';
import { IP_ADDRESS, PORT } from '@env';

// Base URL for your backend API
const BASE_URL = `http://${IP_ADDRESS}:${PORT}/api`; // Replace with your actual backend IP/URL

class PackageService {
  // Fetch all packages
  static async getAllPackages() {
    try {
      const response = await axios.get(`${BASE_URL}/packages`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Fetch specific package details
  static async getPackageDetails(packageId) {
    try {
      // Fetch main package details
      const packageResponse = await axios.get(`${BASE_URL}/packages/${packageId}`);
      const packageDetails = packageResponse.data;

      // Fetch additional details concurrently
      const [
        imagesResponse,
        inclusionsResponse,
        exclusionsResponse,
        itineraryResponse,
        accommodationsResponse,
        faqsResponse
      ] = await Promise.all([
        axios.get(`${BASE_URL}/packages/${packageId}/images`),
        axios.get(`${BASE_URL}/packages/${packageId}/inclusions`),
        axios.get(`${BASE_URL}/packages/${packageId}/exclusions`),
        axios.get(`${BASE_URL}/packages/${packageId}/itinerary`),
        axios.get(`${BASE_URL}/packages/${packageId}/accommodations`),
        axios.get(`${BASE_URL}/packages/${packageId}/faqs`)
      ]);

      // Fetch activities for each day of the itinerary
      const itineraryWithActivities = await Promise.all(
        itineraryResponse.data.map(async (day) => {
          const activitiesResponse = await axios.get(
            `${BASE_URL}/packages/${packageId}/activities/${day.day}`
          );
          return {
            ...day,
            activities: activitiesResponse.data.map(act => act.activity)
          };
        })
      );

      // Combine all details
      return {
        ...packageDetails,
        images: imagesResponse.data.map(img => img.image_url),
        inclusions: inclusionsResponse.data,
        exclusions: exclusionsResponse.data.map(exc => exc.name),
        itinerary: itineraryWithActivities,
        accommodations: accommodationsResponse.data,
        faqs: faqsResponse.data
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  // Fetch package activities for a specific day
  static async getPackageActivities(packageId, day) {
    try {
      const response = await axios.get(`${BASE_URL}/packages/${packageId}/activities/${day}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Error handling method
  static handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Data:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      
      throw new Error(
        error.response.data.message || 'An error occurred while fetching data'
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      throw new Error('No response from server. Please check your network connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      throw new Error('An unexpected error occurred');
    }
  }
}

// Create a hook for easier usage in React components
export const usePackageAPI = () => {
  return {
    getAllPackages: () => PackageService.getAllPackages(),
    getPackageDetails: (packageId) => PackageService.getPackageDetails(packageId),
    getPackageActivities: (packageId, day) => PackageService.getPackageActivities(packageId, day)
  };
};

export default PackageService;