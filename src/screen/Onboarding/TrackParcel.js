import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const TrackParcel = ({ onNext }) => (
  <View style={styles.container}>
    <Image
      source={require('../../assets/Onboarding/box-man.png')}
      style={styles.image}
      resizeMode="contain"
    />
    <View style={styles.card}>
      <View style={styles.indicatorWrapper}>
        <View style={styles.indicatorInactive} />
        <View style={styles.indicatorActive} />
        <View style={styles.indicatorInactive} />
      </View>
      <Text style={styles.title}>Track your parcel{`\n`}from anywhere</Text>
      <Text style={styles.subtitle}>
        It is a long established fact that a reader will be distracted by the readable content.
      </Text>
      <TouchableOpacity style={styles.button} onPress={onNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 320,
    marginTop: 40,
  },
  card: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  indicatorWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  indicatorActive: {
    width: 32,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
    marginHorizontal: 4,
  },
  indicatorInactive: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#22C55E',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TrackParcel;
