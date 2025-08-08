import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Calculator = () => (
  <View style={styles.center}>
    <Text style={styles.text}>Calculator Screen (Coming Soon)</Text>
  </View>
);

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 20, color: '#222' },
});

export default Calculator;