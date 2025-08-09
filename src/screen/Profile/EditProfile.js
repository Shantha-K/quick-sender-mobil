import { Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, SafeAreaView, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../service';
const profileImg = require('../../assets/Profile/Profile.png');
const editImg = require('../../assets/Profile/Edit.png');
const arrowImg = require('../../assets/Profile/Arrow.png');
const verifyIcon = require('../../assets/Onboarding/verify-icon.png');

const EditProfile = ({route}) => {
  // const { _id } = route.params || {};

  const navigation = useNavigation();
// console.log('userid12',_id)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [profileImageUri, setProfileImageUri] = useState(null);

  // Open gallery to pick new profile image
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
          const img = response.assets[0];
          setProfileImageUri(img.uri);
        }
      }
    );
  };

  React.useEffect(() => {
    // Get userId and token from AsyncStorage instead of route params
    const getUserId = async () => {
      try {
        const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
        const userId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('token');
        console.log('userid from AsyncStorage', userId);
        if (!userId || !token) return;
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`);
        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };
        fetch(API_URL + 'api/auth/getregistered/' + userId, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            const data = result.data || {};
            setName(data.name || '');
            setEmail(data.email || '');
            setPhone(data.mobile || '');
            setDob(data.dob || '');
            setAddress(data.address || '');
            // Set profile image from API (handle relative path)
            if (data.profileImage) {
              let imageUrl = data.profileImage;
              if (imageUrl && !imageUrl.startsWith('http')) {
                // Remove trailing slash from API_URL if present
                let baseUrl = API_URL;
                if (baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0, -1);
                imageUrl = baseUrl + '/' + imageUrl.replace(/^\//, '');
              }
              setProfileImageUri(imageUrl);
            } else {
              setProfileImageUri(null);
            }
            console.log('Profile fetched:', data);
          });
      } catch (e) {
        console.error('Failed to get userId/token from AsyncStorage:', e);
      }
    };
    getUserId();
  }, []);

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
            <Image
              source={profileImageUri ? { uri: profileImageUri } : profileImg}
              style={styles.profileImg}
            />
            <TouchableOpacity style={styles.editBtn} onPress={handlePickImage}>
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
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={async () => {
            try {
              const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
              const token = await AsyncStorage.getItem('token');
              const userId = await AsyncStorage.getItem('userId');
              if (!token || !userId) {
                alert('User not authenticated.');
                return;
              }
              const myHeaders = new Headers();
              myHeaders.append('Authorization', `Bearer ${token}`);
              const formdata = new FormData();
              formdata.append('name', name);
              formdata.append('email', email);
              formdata.append('mobile', phone);
              formdata.append('dob', dob);
              formdata.append('address', address);
              // If you have a profileImage, append it here (uncomment and set profileImage state if needed)
              // if (profileImage) formdata.append('profileImage', profileImage);
              const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow',
              };
              // Use the correct API URL with userId in the path
              const response = await fetch(`${API_URL}api/auth/editprofile/${userId}`, requestOptions);
              const text = await response.text();
              console.log('EditProfile raw response:', text);
              let result;
              try {
                result = JSON.parse(text);
              } catch (e) {
                alert('Server error: ' + text);
                return;
              }
              if (result && (result.status === true || result.success === true)) {
                setModalVisible(true);
              } else {
                alert(result?.message || 'Failed to update profile.');
              }
            } catch (e) {
              console.error('EditProfile error:', e);
              alert('Failed to update profile.');
            }
          }}
        >
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
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
                  source={verifyIcon}
                  style={styles.modalIconImg}
                  resizeMode="contain"
                />
              </View>
            </View>
            <Text style={styles.modalTitle}>Profile Updated Successfully</Text>
            <Text style={styles.modalSubtitle}>Your profile has been updated successfully</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Profile');
              }}
            >
              <Text style={styles.modalButtonText}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  // Modal styles (copied from OtpVerification)
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
});

export default EditProfile;
