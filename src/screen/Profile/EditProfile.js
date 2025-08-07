import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const profileImg = require('../../assets/Profile/Profile.png');
const editImg = require('../../assets/Profile/Edit.png');
const arrowImg = require('../../assets/Profile/Arrow.png');

const EditProfile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+91 - 9876543210');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={arrowImg} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{width: 24}} />
      </View>
      <View style={styles.profileSection}>
        {/* <View style={styles.profileCircleBg}> */}
          <View style={styles.avatarWrapper}>
            <Image source={profileImg} style={styles.profileImg} />
            <TouchableOpacity style={styles.editBtn}>
              <Image source={editImg} style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        {/* </View> */}
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input, styles.inputActive]}
          value={phone}
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="DOB (DD/MM/YYYY)"
          placeholderTextColor="#aaa"
          value={dob}
          onChangeText={setDob}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="#aaa"
          value={address}
          onChangeText={setAddress}
        />
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  arrowIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
//   profileCircleBg: {
//     width: 220,
//     height: 220,
//     borderRadius: 110,
//     backgroundColor: '#fafafa',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 0,
//   },
  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
  },
  editBtn: {
    position: 'absolute',
    right: -8,
    bottom: -8,
    backgroundColor: '#00C180',
    borderRadius: 16,
    padding: 8,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  editIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  form: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 17,
    color: '#111',
    marginBottom: 18,
    backgroundColor: '#fff',
  },
  inputActive: {
    borderColor: '#00C180',
    color: '#111',
    fontWeight: 'bold',
  },
  saveBtn: {
    backgroundColor: '#00C180',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  saveText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfile;
