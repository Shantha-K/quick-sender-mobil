import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, Pressable } from 'react-native';

const RegisterAccount = (props) => {
  const { navigation, route } = props;
  const mobile = props.mobile || (route && route.params && route.params.mobile) || '';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const isValid = name && email && dob;

  const handleSubmit = () => {
    setModalVisible(true);
  };

  const handleDone = () => {
    setModalVisible(false);
    if (navigation && navigation.replace) {
      navigation.replace('Profile'); // Change 'Profile' to your actual next screen if needed
    } else if (navigation && navigation.navigate) {
      navigation.navigate('Profile');
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
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, styles.inputMobile]}
        value={mobile}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="DOB (DD/MM/YYYY)"
        value={dob}
        onChangeText={setDob}
      />
      <TouchableOpacity
        style={[styles.submitBtn, !isValid && styles.submitBtnDisabled]}
        disabled={!isValid}
        onPress={handleSubmit}
      >
        <Text style={[styles.submitText, !isValid && styles.submitTextDisabled]}>Submit</Text>
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
