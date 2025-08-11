import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { API_URL } from '../../service';
const arrowImg = require('../../assets/Profile/Arrow.png');
const dropdownImg = require('../../assets/Profile/Vector2.png');
const cameraImg = require('../../assets/Profile/fcamra.png');

const KycDetails = () => {
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyUploadedModal, setAlreadyUploadedModal] = useState(false);
  const [alreadyUploadedMsg, setAlreadyUploadedMsg] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  // Show modal if kycStatus is 'pending' (or any status you want)
  React.useEffect(() => {
    if (route.params && route.params.kycStatus) {
      const status = route.params.kycStatus.toLowerCase();
      if (status === 'pending') {
        setAlreadyUploadedMsg('Your KYC details already uploaded');
        setAlreadyUploadedModal(true);
      } else if (status === 'verified') {
        setAlreadyUploadedMsg('Your KYC details already verified');
        setAlreadyUploadedModal(true);
      }
    }
  }, [route.params]);
  const [idType, setIdType] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const kycTypes = [
    'Aadhar Card',
    'Driving License',
    'Voter ID',
    'Passport',
    'PAN Card',
  ];
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const handleCamera = (side) => {
    launchCamera({ mediaType: 'photo', quality: 0.7 }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Camera Error', response.errorMessage || 'Unknown error');
        return;
      }
      if (response.assets && response.assets.length > 0) {
        if (side === 'front') setFrontImage(response.assets[0]);
        else setBackImage(response.assets[0]);
      }
    });
  };

  const handleGallery = (side) => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Gallery Error', response.errorMessage || 'Unknown error');
        return;
      }
      if (response.assets && response.assets.length > 0) {
        if (side === 'front') setFrontImage(response.assets[0]);
        else setBackImage(response.assets[0]);
      }
    });
  };

  const handleKycUpload = async () => {
    if (!idType) {
      Alert.alert('Please select KYC type');
      return;
    }
    if (!frontImage || !backImage) {
      Alert.alert('Please select both front and back images');
      return;
    }
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');
      if (!token || !userId) {
        setIsLoading(false);
        Alert.alert('Error', 'User not authenticated. Please login again.');
        return;
      }
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      const formdata = new FormData();
      formdata.append("kycType", idType.toLowerCase().replace(/ /g, ''));
      formdata.append("userId", userId);
      formdata.append("kycFront", {
        uri: frontImage.uri,
        name: frontImage.fileName || 'front.jpg',
        type: frontImage.type || 'image/jpeg',
      });
      formdata.append("kycBack", {
        uri: backImage.uri,
        name: backImage.fileName || 'back.jpg',
        type: backImage.type || 'image/jpeg',
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };
      // Start timer for 2 seconds
      const loadingTimeout = setTimeout(async () => {
        setIsLoading(false);
        setSuccessModalVisible(true);
        await AsyncStorage.setItem('kycPending', 'true');
      }, 2000);
      // Await API but don't block UI
      try {
        const response = await fetch( API_URL+ "api/auth/kyc", requestOptions);
        const result = await response.json();
        console.log('KYC upload result:', result);
      } catch (apiError) {
        console.error('KYC upload error:', apiError);
      }
      // If API finishes before 2s, do nothing (modal will show after 2s)
    } catch (error) {
      setIsLoading(false);
      console.error('KYC upload error:', error);
      Alert.alert('KYC Upload Error', error.message || 'Unknown error');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Loading Overlay */}
      <Modal
        visible={isLoading}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 32, alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Uploading...</Text>
          </View>
        </View>
      </Modal>
      {/* Success Modal */}
      <Modal
        visible={successModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successModalContainer}>
            <View style={styles.successIconWrapper}>
              <View style={styles.successIconCircle}>
                <Text style={styles.successCheck}>✓</Text>
              </View>
            </View>
            <Text style={styles.successTitle}>Your Kyc details uploaded successfully</Text>
            <TouchableOpacity
              style={styles.successDoneBtn}
              onPress={async () => {
                setSuccessModalVisible(false);
                await AsyncStorage.setItem('kycPending', 'true');
                navigation.navigate('Profile', { refreshKyc: true, kycStatus: 'pending' });
              }}
            >
              <Text style={styles.successDoneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Already Uploaded/Verified Modal */}
      <Modal
        visible={alreadyUploadedModal}
        transparent
        animationType="fade"
        onRequestClose={() => setAlreadyUploadedModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successModalContainer}>
            <Text style={styles.successTitle}>{alreadyUploadedMsg}</Text>
            <TouchableOpacity
              style={styles.successDoneBtn}
              onPress={() => {
                setAlreadyUploadedModal(false);
                navigation.goBack();
              }}
            >
              <Text style={styles.successDoneText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={arrowImg} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>KYC Details</Text>
        <View style={{width: 24}} />
      </View>
      <View style={styles.form}>
        <TouchableOpacity
          style={styles.dropdown}
          activeOpacity={0.7}
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <Text style={styles.dropdownText}>{idType ? idType : 'Select ID Proof Type'}</Text>
          <Image source={dropdownImg} style={styles.dropdownIcon} />
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={{
            borderWidth: 1.2,
            borderColor: '#bbb',
            borderRadius: 14,
            backgroundColor: '#fff',
            marginBottom: 16,
            marginTop: -16,
            zIndex: 10,
            position: 'absolute',
            left: 16,
            right: 16,
            top: 110,
            elevation: 5,
          }}>
            {kycTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}
                onPress={() => {
                  setIdType(type);
                  setDropdownVisible(false);
                }}
              >
                <Text style={{ fontSize: 16, color: '#222' }}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <Text style={styles.infoText}>
          Upload front & back side of your ID Proof.{"\n"}Supports : JPG, PNG, PDF.
        </Text>
        <View style={styles.uploadRow}>
          <TouchableOpacity style={styles.uploadBox} activeOpacity={0.7} onPress={() => {
            Alert.alert(
              'Options',
              '',
              [
                { text: 'Camera', onPress: () => handleCamera('front') },
                { text: 'Gallery', onPress: () => handleGallery('front') },
                { text: 'Cancel', style: 'cancel' },
              ],
              { cancelable: true }
            );
          }}>
            {frontImage ? (
              <>
                <Image source={{ uri: frontImage.uri }} style={styles.uploadImg} />
                <View style={styles.uploadLabelOverlay}>
                  <Text style={styles.uploadLabel}>Front</Text>
                </View>
              </>
            ) : (
              <>
                <Image source={cameraImg} style={styles.cameraIcon} />
                <Text style={styles.uploadLabel}>Front</Text>
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadBox} activeOpacity={0.7} onPress={() => {
            Alert.alert(
              'Options',
              '',
              [
                { text: 'Camera', onPress: () => handleCamera('back') },
                { text: 'Gallery', onPress: () => handleGallery('back') },
                { text: 'Cancel', style: 'cancel' },
              ],
              { cancelable: true }
            );
          }}>
            {backImage ? (
              <>
                <Image source={{ uri: backImage.uri }} style={styles.uploadImg} />
                <View style={styles.uploadLabelOverlay}>
                  <Text style={styles.uploadLabel}>Back</Text>
                </View>
              </>
            ) : (
              <>
                <Image source={cameraImg} style={styles.cameraIcon} />
                <Text style={styles.uploadLabel}>Back</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.saveBtn} onPress={handleKycUpload}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModalContainer: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  successIconWrapper: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E6F9ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  successCheck: {
    fontSize: 36,
    color: '#19C37D',
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginBottom: 28,
    marginTop: 4,
  },
  successDoneBtn: {
    backgroundColor: '#19C37D',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignItems: 'center',
    width: '100%',
  },
  successDoneText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 32,
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
    letterSpacing: 0.2,
  },
  form: {
    paddingHorizontal: 16,
    marginBottom: 24,
    marginTop: 24,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: '#bbb',
    borderRadius: 14,
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginBottom: 32,
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 16,
    color: '#aaa',
    flex: 1,
    fontWeight: '400',
  },
  dropdownIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  infoText: {
    fontSize: 17,
    color: '#aaa',
    marginBottom: 32,
    textAlign: 'left',
    fontWeight: '400',
    lineHeight: 24,
  },
  uploadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 16,
  },
  uploadBox: {
    flex: 1,
    height: 120,
    borderWidth: 1.2,
    borderColor: '#bbb',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 0,
    backgroundColor: '#fff',
    marginLeft: 8,
    marginRight: 8,
    aspectRatio: 1.5,
    maxWidth: 180,
    overflow: 'hidden',
  },
  uploadImg: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  uploadLabelOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingVertical: 6,
    alignItems: 'center',
  },
  cameraIcon: {
    width: 32,
    height: 32,
    marginBottom: 10,
    resizeMode: 'contain',
    tintColor: '#888',
  },
  uploadLabel: {
    fontSize: 16,
    color: '#888',
    fontWeight: '400',
    marginTop: 4,
  },
  saveBtn: {
    backgroundColor: '#00C180',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 24,
  },
  saveText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default KycDetails;
