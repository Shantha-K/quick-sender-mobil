// Dummy screen component
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DummyScreen = () => (
  <View style={styles.container}>
    <Text>This is a dummy screen.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DummyScreen;
