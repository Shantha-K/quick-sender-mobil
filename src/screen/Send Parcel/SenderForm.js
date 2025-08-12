import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SenderForm = ({ navigation }) => {
  const [senderName, setSenderName] = useState('');
  const [senderMobile, setSenderMobile] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderState, setSenderState] = useState('');
  const [senderCity, setSenderCity] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const [errors, setErrors] = useState({});

  const handleNext = async () => {
    const newErrors = {};
    if (!senderName.trim())
      newErrors.senderName = 'Sender Name is required';
    if (!senderMobile.trim())
      newErrors.senderMobile = 'Sender Mobile Number is required';
    if (!senderEmail.trim())
      newErrors.senderEmail = 'Sender Email is required';
    if (!senderState.trim())
      newErrors.senderState = 'Sender State is required';
    if (!senderCity.trim())
      newErrors.senderCity = 'Sender City is required';
    if (!senderAddress.trim())
      newErrors.senderAddress = 'Sender Address is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const senderData = {
        name: senderName,
        email: senderEmail,
        phone: senderMobile,
        address: senderAddress,
        state: senderState,
        city: senderCity,
      };
      await AsyncStorage.setItem('senderData', JSON.stringify(senderData));
      navigation && navigation.navigate('ReceiverForm');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation && navigation.goBack()}
            style={styles.backBtn}
          >
            <Image
              source={require('../../assets/Profile/Arrow.png')}
              style={styles.backArrowImg}
            />
          </TouchableOpacity>
          <Text style={styles.header}>Send Parcel</Text>
          <View style={{ width: 32 }} />
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 24,
            paddingBottom: 120,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Sender Name */}
          <View style={{ marginBottom: 10 }}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Sender Name"
                placeholderTextColor="#bdbdbd"
                value={senderName}
                onChangeText={text => {
                  setSenderName(text);
                  if (errors.senderName)
                    setErrors(prev => ({ ...prev, senderName: undefined }));
                }}
              />
            </View>
            {errors.senderName && (
              <Text style={styles.errorText}>{errors.senderName}</Text>
            )}
          </View>

          {/* Sender Mobile */}
          <View style={{ marginBottom: 10 }}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Sender Mobile Number"
                placeholderTextColor="#bdbdbd"
                keyboardType="phone-pad"
                value={senderMobile}
                maxLength={10}
                onChangeText={text => {
                  setSenderMobile(text);
                  if (errors.senderMobile)
                    setErrors(prev => ({ ...prev, senderMobile: undefined }));
                }}
              />
            </View>
            {errors.senderMobile && (
              <Text style={styles.errorText}>{errors.senderMobile}</Text>
            )}
          </View>

          {/* Sender Email */}
          <View style={{ marginBottom: 10 }}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Sender Email"
                placeholderTextColor="#bdbdbd"
                keyboardType="email-address"
                value={senderEmail}
                onChangeText={text => {
                  setSenderEmail(text);
                  if (errors.senderEmail)
                    setErrors(prev => ({ ...prev, senderEmail: undefined }));
                }}
              />
            </View>
            {errors.senderEmail && (
              <Text style={styles.errorText}>{errors.senderEmail}</Text>
            )}
          </View>

          {/* Sender State */}
          <View style={{ marginBottom: 10 }}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Sender State"
                placeholderTextColor="#bdbdbd"
                value={senderState}
                onChangeText={text => {
                  setSenderState(text);
                  if (errors.senderState)
                    setErrors(prev => ({ ...prev, senderState: undefined }));
                }}
              />
            </View>
            {errors.senderState && (
              <Text style={styles.errorText}>{errors.senderState}</Text>
            )}
          </View>

          {/* Sender City */}
          <View style={{ marginBottom: 10 }}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Sender City"
                placeholderTextColor="#bdbdbd"
                value={senderCity}
                onChangeText={text => {
                  setSenderCity(text);
                  if (errors.senderCity)
                    setErrors(prev => ({ ...prev, senderCity: undefined }));
                }}
              />
            </View>
            {errors.senderCity && (
              <Text style={styles.errorText}>{errors.senderCity}</Text>
            )}
          </View>

          {/* Sender Address */}
          <View style={{ marginBottom: 10 }}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Sender Address"
                placeholderTextColor="#bdbdbd"
                value={senderAddress}
                onChangeText={text => {
                  setSenderAddress(text);
                  if (errors.senderAddress)
                    setErrors(prev => ({ ...prev, senderAddress: undefined }));
                }}
                multiline
              />
            </View>
            {errors.senderAddress && (
              <Text style={styles.errorText}>{errors.senderAddress}</Text>
            )}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.nextBtn}
          activeOpacity={0.85}
          onPress={handleNext}
        >
          <Text style={styles.nextBtnText}>Next</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 56 : 32,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    top: Platform.OS === 'ios' ? 56 : 32,
    zIndex: 2,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrowImg: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    left: 15,
    top: -2,
    //flex: 1,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 14,
    marginBottom: 18,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
  },
  input: {
    fontSize: 17,
    color: '#222',
    paddingVertical: 16,
    paddingHorizontal: 0,
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownArrowImg: {
    width: 18,
    height: 18,
    marginRight: 8,
    resizeMode: 'contain',
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 12,
    marginBottom: 16,
    marginTop: -16,
    zIndex: 10,
  },
  dropdownItem: {
  fontSize: 17,
  color: '#222',
  paddingVertical: 14,
  paddingHorizontal: 18,
  },
  errorText: {
    color: '#F15B5D',
    fontSize: 13,
    marginTop: 2,
    marginLeft: 2,
  },
  nextBtn: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#00C37A',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#F15B5D',
    fontSize: 13,
    marginTop: -12,
    marginLeft: 4,
  },
});

export default SenderForm;
