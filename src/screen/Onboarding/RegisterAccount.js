import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, Pressable } from 'react-native';

const RegisterAccount = (props) => {
  const { navigation, route } = props;
  const [countryCode, setCountryCode] = useState('+91');
  const [mobile, setMobile] = useState(props.mobile || (route && route.params && route.params.mobile) || '');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');


  const [address, setAddress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isValid = name && email && dob && address;

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODk0YTUxODc4OWQzYWU4ZThhZGUzNGIiLCJtb2JpbGUiOiI5MTk4NzY1NDMyMTEiLCJpYXQiOjE3NTQ2MzY4MjIsImV4cCI6MTc1NTI0MTYyMn0.H0sZDz3Ls7mhVY_QgiS7AQK0j3SURYKjMl-E0nY91W4');
      const raw = JSON.stringify({
        name,
        email,
        mobile: mobile.replace(/\D/g, ''),
        dob,
        address
      });
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      const response = await fetch('http://13.126.81.242:3000/api/auth/register', requestOptions);
      const result = await response.json();
      if (response.ok) {
        setModalVisible(true);
      } else {
        setError(result?.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDone = () => {
    setModalVisible(false);
    // Always go to Home screen after registration
    if (navigation && navigation.replace) {
      navigation.replace('Home');
    } else if (navigation && navigation.navigate) {
      navigation.navigate('Home');
    } else if (navigation && navigation.reset) {
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation && navigation.goBack && navigation.goBack()}>
        <Text style={styles.backArrow}>{'\u2039'}</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Register Account</Text>
      <View style={styles.avatarWrapper}>
        <View style={styles.avatarCircle}>
          {/* <Image source={require('../../assets/Onboarding/avatar.png')} style={styles.avatarImg} /> */}
        </View>
        <TouchableOpacity style={styles.editBtn}>
          {/* <Image source={require('../../assets/Onboarding/edit.png')} style={styles.editIcon} /> */}
        </TouchableOpacity>
      </View>
      <TextInput
        style={[
          styles.input,
          focusedInput === 'name' && styles.inputFocused
        ]}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        onFocus={() => setFocusedInput('name')}
        onBlur={() => setFocusedInput('')}
      />
      <TextInput
        style={[
          styles.input,
          focusedInput === 'email' && styles.inputFocused
        ]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        onFocus={() => setFocusedInput('email')}
        onBlur={() => setFocusedInput('')}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <TextInput
          style={[
            styles.input,
            styles.inputMobile,
            { width: 70, marginRight: 8, textAlign: 'center' },
            focusedInput === 'countryCode' && styles.inputFocused
          ]}
          value={countryCode}
          onChangeText={setCountryCode}
          maxLength={4}
          onFocus={() => setFocusedInput('countryCode')}
          onBlur={() => setFocusedInput('')}
        />
        <TextInput
          style={[
            styles.input,
            styles.inputMobile,
            { flex: 1 },
            focusedInput === 'mobile' && styles.inputFocused
          ]}
          placeholder="Phone Number"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
          maxLength={15}
          onFocus={() => setFocusedInput('mobile')}
          onBlur={() => setFocusedInput('')}
        />
      </View>
      <TextInput
        style={[
          styles.input,
          focusedInput === 'dob' && styles.inputFocused
        ]}
        placeholder="DOB (DD/MM/YYYY)"
        value={dob}
        onChangeText={setDob}
        onFocus={() => setFocusedInput('dob')}
        onBlur={() => setFocusedInput('')}
      />

      <TextInput
        style={[
          styles.input,
          focusedInput === 'address' && styles.inputFocused
        ]}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        onFocus={() => setFocusedInput('address')}
        onBlur={() => setFocusedInput('')}
        multiline
        numberOfLines={2}
      />

      {error ? (
        <Text style={{ color: '#F87171', marginBottom: 8 }}>{error}</Text>
      ) : null}
      <TouchableOpacity
        style={[styles.submitBtn, (!isValid || loading) && styles.submitBtnDisabled]}
        disabled={!isValid || loading}
        onPress={handleSubmit}
      >
        <Text style={[styles.submitText, (!isValid || loading) && styles.submitTextDisabled]}>
          {loading ? 'Submitting...' : 'Submit'}
        </Text>
      </TouchableOpacity>
      {/* Success Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleDone}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconWrapper}>
              <View style={styles.modalIconCircle}>
                <Image
                  source={require('../../assets/Onboarding/verify-icon.png')}
                  style={styles.modalIconImg}
                  resizeMode="contain"
                />
              </View>
            </View>
            <Text style={styles.modalTitle}>Account created successfully</Text>
            <Text style={styles.modalSubtitle}>Your account created successfully</Text>
            <Pressable style={styles.modalButton} onPress={handleDone}>
              <Text style={styles.modalButtonText}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  backBtn: {
    position: 'absolute',
    left: 16,
    top: 48,
    zIndex: 2,
  },
  backArrow: {
    fontSize: 32,
    color: '#222',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 32,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImg: {
    width: 80,
    height: 80,
  },
  editBtn: {
    position: 'absolute',
    right: 110,
    bottom: 0,
    backgroundColor: '#22C55E',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    width: 16,
    height: 16,
    tintColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#222',
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  inputMobile: {
    color: '#222',
    backgroundColor: '#F3F4F6',
    borderColor: '#22C55E',
  },
  inputFocused: {
    borderColor: '#22C55E',
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  submitBtn: {
    backgroundColor: '#22C55E',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
    marginTop: 16,
  },
  submitBtnDisabled: {
    backgroundColor: '#F5F5F5',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitTextDisabled: {
    color: '#BDBDBD',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  modalIconWrapper: {
    marginBottom: 16,
  },
  modalIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E6FAF0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalIconImg: {
    width: 40,
    height: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 15,
    color: '#888',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#22C55E',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    width: 200,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RegisterAccount;
