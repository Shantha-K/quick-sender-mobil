import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SentParcels = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Sent Parcels</Text>
    <Text style={styles.subtitle}>This is the Sent Parcels screen.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default SentParcels;
