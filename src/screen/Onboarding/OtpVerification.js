import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Pressable, Image } from 'react-native';


const OtpVerification = ({ mobile, onBack, navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [invalid, setInvalid] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (text, idx) => {
    if (/^[0-9]?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[idx] = text;
      setOtp(newOtp);
      setInvalid(false);
    }
  };

  const isValid = otp.every(d => d.length === 1);

  const handleVerify = () => {
    // Simulate success for demo
    setModalVisible(true);
  };

  const handleResend = () => {
    setTimer(60);
    setOtp(['', '', '', '']);
    setInvalid(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Text style={styles.backArrow}>{'\u2039'}</Text>
      </TouchableOpacity>
      <Text style={styles.header}>OTP Verification</Text>
      <Text style={styles.enterOtp}>Enter OTP</Text>
      <Text style={styles.otpInfo}>An 4 digit OTP has been sent to{`\n`}{mobile}</Text>
      <View style={styles.otpRow}>
        {otp.map((digit, idx) => (
          <TextInput
            key={idx}
            style={[styles.otpInput, invalid && styles.otpInputError]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, idx)}
          />
        ))}
      </View>
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

      {/* Success Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
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
            <Text style={styles.modalTitle}>Verified Successfully</Text>
            <Text style={styles.modalSubtitle}>OTP Verified successfully</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                if (navigation && navigation.replace) {
                  navigation.replace('RegisterAccount', { mobile });
                } else if (navigation && navigation.navigate) {
                  navigation.navigate('RegisterAccount', { mobile });
                }
              }}
            >
              <Text style={styles.modalButtonText}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: 100,
    height: 100,
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
  enterOtp: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
    marginTop: 40,
  },
  otpInfo: {
    fontSize: 14,
    color: '#888',
    marginBottom: 32,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  otpInput: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  otpRowBottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 32,
  },
  otpError: {
    color: '#F87171',
    fontSize: 14,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  resendText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'right',
  },
  resendTime: {
    color: '#22C55E',
    fontWeight: 'bold',
  },
  resendActive: {
    color: '#22C55E',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'right',
  },
  otpInputError: {
    borderColor: '#F87171',
  },
  verifyBtn: {
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
  verifyBtnDisabled: {
    backgroundColor: '#F5F5F5',
  },
  verifyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  verifyTextDisabled: {
    color: '#BDBDBD',
  },
});

export default OtpVerification;
