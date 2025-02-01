import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Animated,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
const { width, height } = Dimensions.get('window');
function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Add registration logic here
    navigation.replace('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.HeaderContainer}>
              <Text style={styles.HeaderText}>Register</Text>
            </View>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.Button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}
StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
    backgroundColor: '#fff',   // Optional: background color for the screen
  },
  introText: {
    fontSize: 24,             // Adjust font size
    fontWeight: 'bold',       // Optional: bold text
    color: '#333',            // Optional: text color
  },
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  introText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FF671F',
  },
  HeaderContainer: {
    alignItems: 'center',
    marginTop: height * 0.1,
    marginBottom: height * 0.05,
  },
  HeaderText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF671F',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 18,
    color: '#666',
  },
  formContainer: {
    paddingHorizontal: 20,
    width: '100%',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  Button: {
    backgroundColor: '#FF671F',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  googleButtonText: {
    color: '#333',
    fontSize: 18,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  link: {
    color: '#FF671F',
    fontSize: 16,
  },
});
export default RegisterScreen;