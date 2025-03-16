import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios'; // Import axios for API calls

const ForgotPasswordScreen = ({ navigation }) => {
  const [contact, setContact] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [timer, setTimer] = useState(60);

  const handleSendCode = async () => {
    try {
      // Send confirmation code to the user's mobile number
      await axios.post('http://localhost:5000/api/send-confirmation-code', { contact });
      setCodeSent(true);
      Alert.alert('Confirmation code sent!', 'Please check your mobile number.');

      // Start the timer for 1 minute
      const countdown = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      Alert.alert('Error', 'Failed to send confirmation code. Please try again.');
    }
  };

  const handleVerifyCode = () => {
    // Logic to verify the confirmation code
    if (confirmationCode) {
      // Implement verification logic here
      Alert.alert('Success', 'Confirmation code verified! You can now reset your password.');
      navigation.navigate('LoginScreen'); // Navigate back to login screen
    } else {
      Alert.alert('Error', 'Please enter the confirmation code.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../../assets/icons/backbutton.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.headerText}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your mobile number"
        keyboardType="phone-pad"
        value={contact}
        onChangeText={setContact}
      />
      <TouchableOpacity style={styles.button} onPress={handleSendCode}>
        <Text style={styles.buttonText}>Send Confirmation Code</Text>
      </TouchableOpacity>

      {codeSent && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter confirmation code"
            value={confirmationCode}
            onChangeText={setConfirmationCode}
          />
          <Text style={styles.timerText}>{timer > 0 ? `Code valid for ${timer} seconds` : 'Code expired'}</Text>
          <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
            <Text style={styles.buttonText}>Verify Code</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'top',
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 5,
    padding: 20,
  },
  backIcon: {
    width: 24,
    position: 'absolute',
    top: 25,
    left: 20,
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 80,
    textAlign: 'center', // Center the header
    marginTop: 25,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF671F',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timerText: {
    textAlign: 'center',
    marginVertical: 10,
    color: 'red',
  },
});

export default ForgotPasswordScreen;
