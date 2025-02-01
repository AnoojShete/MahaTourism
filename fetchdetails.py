import os
import requests
import json

class UnsplashImageFetcher:
    def __init__(self, access_key):
        """
        Initialize the Unsplash Image Fetcher
        
        :param access_key: Your Unsplash API access key
        """
        self.base_url = "https://api.unsplash.com/search/photos"
        self.headers = {
            "Authorization": f"Client-ID {access_key}"
        }
    
    def fetch_destination_images(self, destinations, output_file='updated_destinations.json'):
        """
        Fetch images for each destination from Unsplash
        
        :param destinations: List of destination dictionaries
        :param output_file: File to save updated destinations with image URLs
        :return: Updated destinations list
        """
        updated_destinations = []
        
        for destination in destinations:
            try:
                # Construct search query
                query = f"{destination['name']} {destination['location']} tourism landmark"
                
                # Make API request
                params = {
                    "query": query,
                    "per_page": 1,  # We'll take the first result
                    "orientation": "landscape"
                }
                
                response = requests.get(
                    self.base_url, 
                    headers=self.headers, 
                    params=params
                )
                
                # Check if request was successful
                if response.status_code == 200:
                    results = response.json()
                    
                    # Update image URL if an image is found
                    if results['results']:
                        image_url = results['results'][0]['urls']['regular']
                        destination['image_url'] = image_url
                    else:
                        print(f"No image found for {destination['name']}")
                
                updated_destinations.append(destination)
            
            except Exception as e:
                print(f"Error fetching image for {destination['name']}: {e}")
                updated_destinations.append(destination)
        
        # Save updated destinations to file
        with open(output_file, 'w') as f:
            json.dump({"destinations": updated_destinations}, f, indent=4)
        
        return updated_destinations

# Example usage
def main():
    # Load your destinations
    with open('destinations.json', 'r') as f:
        data = json.load(f)
    
    # Replace with your actual Unsplash Access Key
    UNSPLASH_ACCESS_KEY = "8SRG-WAfUCVdpcxxL0BaocnJC6JOvgE9hyX3rcFUiy0"
    
    # Initialize fetcher
    fetcher = UnsplashImageFetcher(UNSPLASH_ACCESS_KEY)
    
    # Fetch images
    updated_destinations = fetcher.fetch_destination_images(data['destinations'])
    
    # Print out updated destinations
    for dest in updated_destinations:
        print(f"{dest['name']}: {dest.get('image_url', 'No image found')}")

if __name__ == "__main__":
    main()