import json

# Function to load data from a JSON file
def load_data_from_file(filename):
    with open(filename, 'r') as file:
        return json.load(file)

# Function to extract airport information
def extract_airports(data):
    airports = []

    for flight in data['data']:
        # Extract departure details
        departure = flight.get('departure', {})
        departure_airport = departure.get('airport', 'N/A')
        departure_iata = departure.get('iata', 'N/A')

        # Extract arrival details
        arrival = flight.get('arrival', {})
        arrival_airport = arrival.get('airport', 'N/A')
        arrival_iata = arrival.get('iata', 'N/A')

        # Append to airports list
        airports.append({
            'Departure Airport': departure_airport,
            'Departure IATA': departure_iata,
            'Arrival Airport': arrival_airport,
            'Arrival IATA': arrival_iata,
        })

    return airports

# Function to print extracted airport details
def print_airports(airports):
    for airport in airports:
        print(f"Departure Airport: {airport['Departure Airport']} (IATA: {airport['Departure IATA']})")
        print(f"Arrival Airport: {airport['Arrival Airport']} (IATA: {airport['Arrival IATA']})")
        print("-" * 40)

# Load the data from the JSON file
data = load_data_from_file('flights_response.json')

# Extract airport details
airport_details = extract_airports(data)

# Print the details
print_airports(airport_details)
