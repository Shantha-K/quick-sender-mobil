import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const Login = ({ onRequestOtp }) => {
  const [mobile, setMobile] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const isInvalid = mobile.length > 0 && mobile.length < 10;

  const handleChange = (text) => {
    // Only allow numbers, max 10 digits
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 10);
    setMobile(cleaned);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Onboarding/Shifter.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Let's get you Login!</Text>
      <Text style={styles.subtitle}>Enter your information below</Text>
      <View style={[
        styles.inputWrapper,
        isFocused && styles.inputWrapperFocused,
        isInvalid && styles.inputWrapperError
      ]}>
        <Text style={styles.countryCode}>+91 -</Text>
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          value={mobile}
          onChangeText={handleChange}
          maxLength={10}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {isInvalid && (
        <Text style={styles.errorText}>Invalid mobile Number</Text>
      )}
      <TouchableOpacity
        style={[styles.button, mobile.length !== 10 && styles.buttonDisabled]}
        disabled={mobile.length !== 10}
        onPress={() => onRequestOtp(mobile)}
      >
        <Text style={[styles.buttonText, mobile.length !== 10 && styles.buttonTextDisabled]}>Request OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginBottom: 32,
    backgroundColor: '#fff',
    paddingLeft: 12,
  },
  inputWrapperFocused: {
    borderColor: '#22C55E',
  },
  inputWrapperError: {
    borderColor: '#F87171',
  },
  errorText: {
    color: '#F87171',
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 4,
  },
  countryCode: {
    fontSize: 16,
    color: '#222',
    marginRight: 6,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#222',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#22C55E',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 32,
    left: 24,
    right: 24,
  },
  buttonDisabled: {
    backgroundColor: '#F5F5F5',
  },
  buttonText: {
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: '#BDBDBD',
  },
});

export default Login;
