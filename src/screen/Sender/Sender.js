import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Sender = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Sender Screen (Dummy)</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 22, color: '#00C37A', fontWeight: 'bold' },
});

export default Sender;
