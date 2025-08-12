import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ActivityIndicator, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../service';

const SendParcelOtpVerification = ({ navigation, route }) => {
  const { otp, userId } = route?.params || {};
  const [enteredOtp, setEnteredOtp] = useState(['', '', '', '']);
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];
  const [timer, setTimer] = useState(60);
  const [invalid, setInvalid] = useState(false);
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (text, idx) => {
    if (/^[0-9]?$/.test(text)) {
      const newOtp = [...enteredOtp];
      newOtp[idx] = text;
      setEnteredOtp(newOtp);
      setInvalid(false);
      if (text && idx < otpRefs.length - 1) {
        otpRefs[idx + 1].current.focus();
      }
      if (!text && idx > 0) {
        otpRefs[idx - 1].current.focus();
      }
    }
  };

  const isValid = enteredOtp.every(d => d.length === 1);

  const handleVerify = async () => {
    const inputOtp = enteredOtp.join('');
    setInvalid(false);
    setApiError('');
    setLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const raw = JSON.stringify({ userId, otp: inputOtp });
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      const response = await fetch(API_URL+'api/auth/wallet/verify-otp', requestOptions);
      const result = await response.json();
      setLoading(false);
      if (result && (result.status === true || result.success === true)) {
        // Withdraw amount after OTP verification
        try {
          const AsyncStorageLib = (await import('@react-native-async-storage/async-storage')).default;
          const userIdFromStorage = await AsyncStorageLib.getItem('userId');
          const parcelData = await AsyncStorageLib.getItem('parcelData');
          console.log('Parcel Data:', parcelData);
          let estimatedAmount = 0;
          if (parcelData) {
            const parcelObj = JSON.parse(parcelData);
            estimatedAmount = parseFloat(parcelObj.estimatedAmount || 0);
          }
          const withdrawHeaders = new Headers();
          withdrawHeaders.append('Content-Type', 'application/json');
          const withdrawRaw = JSON.stringify({ userId: userIdFromStorage, amount: estimatedAmount });
          const withdrawOptions = {
            method: 'POST',
            headers: withdrawHeaders,
            body: withdrawRaw,
            redirect: 'follow',
          };
          const withdrawResponse = await fetch(API_URL+'api/auth/wallet/withdraw', withdrawOptions);
          const withdrawResult = await withdrawResponse.text();
          console.log(withdrawResult);
        } catch (withdrawError) {
          console.error('Withdraw error:', withdrawError);
        }
        setModalVisible(true);
        setInvalid(false);
        setApiError('');
      } else {
        setInvalid(true);
        setApiError(result?.message || 'Invalid OTP. Please enter the correct OTP sent to your mobile.');
      }
    } catch (error) {
      setLoading(false);
      setInvalid(true);
      setApiError(error.message || 'Network error. Please try again.');
    }
  };

  const handleResend = () => {
    setTimer(60);
    setEnteredOtp(['', '', '', '']);
    setInvalid(false);
    // Optionally, call resend OTP API here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>OTP Verification</Text>
      <Text style={styles.enterOtp}>Enter OTP: {otp}</Text>
      <Text style={styles.otpInfo}>A 4 digit OTP has been sent to your registered mobile number</Text>
      <View style={styles.otpRow}>
        {enteredOtp.map((digit, idx) => (
          <TextInput
            key={idx}
            ref={otpRefs[idx]}
            style={[styles.otpInput, invalid && styles.otpInputError]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, idx)}
            returnKeyType={idx === enteredOtp.length - 1 ? 'done' : 'next'}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace' && !digit && idx > 0) {
                otpRefs[idx - 1].current.focus();
              }
            }}
          />
        ))}
      </View>
      {apiError ? (
        <Text style={styles.otpError}>{apiError}</Text>
      ) : null}
      <View style={styles.otpRowBottom}>
        {timer > 0 ? (
          <Text style={styles.resendText}>
            Resend OTP in <Text style={styles.resendTime}>{timer} s</Text>
          </Text>
        ) : (
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendActive}>Resend OTP</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={[styles.verifyBtn, !isValid && styles.verifyBtnDisabled]} disabled={!isValid} onPress={handleVerify}>
        <Text style={[styles.verifyText, !isValid && styles.verifyTextDisabled]}>Verify</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 24, alignItems: 'center', width: '85%' }}>
            <View style={{ backgroundColor: '#E6FFF3', borderRadius: 100, padding: 8, marginBottom: 16 }}>
              <View style={{ backgroundColor: '#00C97E', borderRadius: 100, padding: 14, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../../assets/Sender/Sendparcels.png')} style={{ width: 38, height: 38 }} />
              </View>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginBottom: 8 }}>Your Parcel has been booked successfully</Text>
            <Text style={{ color: '#888', fontSize: 14, textAlign: 'center', marginBottom: 24 }}>
              You can track your parcel with
              tracking id: #20827332341
            </Text>
            <TouchableOpacity
              style={{ backgroundColor: '#00C97E', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 32, width: '100%' }}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Home');
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>Track Parcel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {loading && <ActivityIndicator size="large" color="#00C37A" style={{ marginTop: 24 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 64,
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 16,
  },
  enterOtp: {
    fontSize: 16,
    color: '#222',
    marginBottom: 8,
  },
  otpInfo: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 24,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  otpInput: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 22,
    marginHorizontal: 8,
    backgroundColor: '#fff',
  },
  otpInputError: {
    borderColor: '#F15B5D',
  },
  otpError: {
    color: '#F15B5D',
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  otpRowBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  resendText: {
    color: '#888',
    fontSize: 14,
  },
  resendTime: {
    color: '#00C37A',
    fontWeight: 'bold',
  },
  resendActive: {
    color: '#00C37A',
    fontWeight: 'bold',
    fontSize: 14,
  },
  verifyBtn: {
    backgroundColor: '#00C37A',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 48,
    alignItems: 'center',
    marginBottom: 16,
  },
  verifyBtnDisabled: {
    backgroundColor: '#bdbdbd',
  },
  verifyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  verifyTextDisabled: {
    color: '#eee',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#00C37A',
    fontWeight: 'bold',
    marginBottom: 24,
  },
  doneBtn: {
    backgroundColor: '#00C37A',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  doneBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SendParcelOtpVerification;
