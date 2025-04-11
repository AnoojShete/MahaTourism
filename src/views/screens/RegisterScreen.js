import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios'; // Import axios for API calls
import { IP_ADDRESS, PORT } from '@env';

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleRegister = async () => {
    // Input validation
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    console.log('Registering user with data:', {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    });

    try {
      // my device: 192.168.193.247
      const response = await axios.post(`http://${IP_ADDRESS}:${PORT}/api/register`, {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
      });
      // Handle successful registration (e.g., navigate to LoginScreen)
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Registration failed. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../../assets/icons/backbutton.png')} style={styles.backIcon} />

      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Register</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff', // Light blue background for a softer look
    padding: 30, // Increased padding for better spacing
  },
  headerContainer: {
    alignItems: 'center', // Center the header
    marginBottom: 20,
    marginTop: 15,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text
  },
  input: {
    backgroundColor: '#e0e0e0', // Slightly darker input background
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#FF8C00', // Brighter orange for the register button
    shadowColor: '#000', // Adding shadow for depth
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 5,
    padding: 20,
  },

  backIcon: {
    width: 30,
    height: 30,
  },

  registerButtonText: {

    color: '#fff',
    fontSize: 20, // Increased font size for better readability
    fontWeight: 'bold', // Bold text for emphasis
  },
});

export default RegisterScreen;
