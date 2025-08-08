import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Calculator = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Calculator Screen (Dummy)</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 22, color: '#00C37A', fontWeight: 'bold' },
});

export default Calculator;
