import React, { useState } from 'react';
import { Platform, Alert } from 'react-native';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, Pressable } from 'react-native';
import { API_URL } from '../../service';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';
const RegisterAccount = (props) => {
  const { navigation, route } = props;
  const [countryCode, setCountryCode] = useState('+91');
  const [mobile, setMobile] = useState(props.mobile || (route && route.params && route.params.mobile) || '');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [dobDate, setDobDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);


  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  // Image picker handler
 
  const [modalVisible, setModalVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
const [registeredUser, setRegisteredUser] = useState(null); // 🆕 add this at the top

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = email.length === 0 || emailRegex.test(email);
  const isValid = name && email && dob && address && isEmailValid;

   const handlePickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        quality: 0.7,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Image Picker Error', response.errorMessage || 'Unknown error');
          return;
        }
        if (response.assets && response.assets.length > 0) {
          setProfileImage(response.assets[0]);
        }
      }
    );
  };
  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODk0YTUxODc4OWQzYWU4ZThhZGUzNGIiLCJtb2JpbGUiOiI5MTk4NzY1NDMyMTEiLCJpYXQiOjE3NTQ2MzY4MjIsImV4cCI6MTc1NTI0MTYyMn0.H0sZDz3Ls7mhVY_QgiS7AQK0j3SURYKjMl-E0nY91W4');
      const formdata = new FormData();
      formdata.append('name', name);
      formdata.append('email', email);
      formdata.append('mobile', mobile.replace(/\D/g, ''));
      formdata.append('dob', dob);
      formdata.append('address', address);
      if (profileImage) {
        formdata.append('profileImage', {
          uri: profileImage.uri,
          name: profileImage.fileName || 'profile.jpg',
          type: profileImage.mimeType || 'image/jpeg',
        });
      }
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };
      const response = await fetch(API_URL+'api/auth/register', requestOptions);
      const result = await response.json();
      if (response.ok) {
          setRegisteredUser(result.data); // 🆕 store user data
          // Save userId from API response in AsyncStorage
          const userId = result.data?._id;
          if (userId) {
            try {
              const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
              await AsyncStorage.setItem('userId', userId);
            } catch (e) {
              console.error('Failed to save userId to AsyncStorage:', e);
            }
          }
        setModalVisible(true);
        console.log('Registration successful:', result, 'UserId:', userId);
      } else {
        // If account already exists, navigate to Home
        if (result?.message && result.message.toLowerCase().includes('already')) {
          if (navigation && navigation.replace) {
            navigation.replace('Home');
          } else if (navigation && navigation.navigate) {
            navigation.navigate('Home');
          } else if (navigation && navigation.reset) {
            navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
          }
        } else {
          setError(result?.message || 'Registration failed');
          console.error('Registration error:', result);
        }
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

  const { name, email } = registeredUser || {}; // ✅ pull from state

  if (navigation && navigation.replace) {
    navigation.replace('Home', { name, email});
  } else if (navigation && navigation.navigate) {
    navigation.navigate('Home', { name, email });
  } else if (navigation && navigation.reset) {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home', params: { name, email} }],
    });
  }
};


  // const handleDone = () => {
  //   setModalVisible(false);
  //   // Always go to Home screen after registration
  //   if (navigation && navigation.replace) {
  //     navigation.replace('Home',{
  //       name:data.name

  //     });
  //   } else if (navigation && navigation.navigate) {
  //     navigation.navigate('Home');
  //   } else if (navigation && navigation.reset) {
  //     navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  //   }
  // };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation && navigation.goBack && navigation.goBack()}>
        <Text style={styles.backArrow}>{'\u2039'}</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Register Account</Text>
      <View style={styles.avatarWrapper}>
        <View style={styles.avatarCircle}>
          {profileImage ? (
            <Image source={{ uri: profileImage.uri }} style={styles.avatarImg}  />
          ) : (
            <Image source={require('../../assets/Profile/Profile.png')} style={styles.avatarImg} />
          )}
        </View>
        <TouchableOpacity style={styles.editBtn} onPress={handlePickImage}>
          <Image source={require('../../assets/Profile/Edit.png')} style={styles.editIcon} />
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
          focusedInput === 'email' && styles.inputFocused,
          !isEmailValid && { borderColor: '#F87171' }
        ]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        onFocus={() => setFocusedInput('email')}
        onBlur={() => setFocusedInput('')}
        autoCapitalize="none"
      />
      {!isEmailValid && (
        <Text style={{ color: '#F87171', marginBottom: 8, marginLeft: 4 }}>Enter a valid email address</Text>
      )}
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

      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.input,
          focusedInput === 'dob' && styles.inputFocused,
          { justifyContent: 'center' }
        ]}
        onPress={() => {
          setShowDatePicker(true);
          setFocusedInput('dob');
        }}
        onBlur={() => setFocusedInput('')}
      >
        <Text style={{ color: dob ? '#222' : '#888', fontSize: 16 }}>
          {dob ? dob : 'DOB (DD/MM/YYYY)'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dobDate || new Date(2000, 0, 1)}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              const d = selectedDate;
              const day = String(d.getDate()).padStart(2, '0');
              const month = String(d.getMonth() + 1).padStart(2, '0');
              const year = d.getFullYear();
              setDob(`${day}/${month}/${year}`);
              setDobDate(selectedDate);
            }
          }}
        />
      )}

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
    width: 120,
    height: 120,
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
