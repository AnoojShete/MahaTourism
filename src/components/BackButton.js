// components/BackButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
      <Text style={styles.text}>← Back</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 40,
    marginLeft: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#007AFF',
  },
});

export default BackButton;
