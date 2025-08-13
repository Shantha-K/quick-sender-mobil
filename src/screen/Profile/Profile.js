import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, Modal, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../service';

const profileImg = require('../../assets/Profile/Profile.png');
const editImg = require('../../assets/Profile/Edit.png');
const arrowImg = require('../../assets/Profile/Arrow.png');

const Profile = ({ route }) => {
  const navigation = useNavigation();
  const [name, setName] = useState(route?.params?.name || '');
  const [email, setEmail] = useState(route?.params?.email || '');
  const [profileImageUri, setProfileImageUri] = useState(null);
  const [kycStatus, setKycStatus] = useState(null);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    async function fetchKycStatus() {
      try {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');
        if (token && userId) {
          const myHeaders = new Headers();
          myHeaders.append('Authorization', `Bearer ${token}`);

          const requestOptions = { method: 'GET', headers: myHeaders, redirect: 'follow' };

          const response = await fetch(`${API_URL}api/auth/getregistered/${userId}`, requestOptions);
          const result = await response.json();
          const data = result.data || {};

          setName(data.name || '');
          setEmail(data.email || '');

          if (data.profileImage) {
            let imageUrl = data.profileImage;
            if (!imageUrl.startsWith('http')) {
              let baseUrl = API_URL;
              if (baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0, -1);
              imageUrl = baseUrl + '/' + imageUrl.replace(/^\//, '');
            }
            setProfileImageUri(imageUrl);
          } else {
            setProfileImageUri(null);
          }

          const kycResponse = await fetch(API_URL + 'api/auth/kyc-status', requestOptions);
          const kycText = await kycResponse.text();
          try {
            const kycJson = JSON.parse(kycText);
            setKycStatus(kycJson.kycStatus || null);
          } catch {
            setKycStatus(null);
          }
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
      }
    }

    if (route?.params?.kycStatus) {
      setKycStatus(route.params.kycStatus);
      if (navigation.setParams) navigation.setParams({ kycStatus: undefined });
    } else {
      setKycStatus(null);
    }

    fetchKycStatus();
    const unsubscribe = navigation.addListener('focus', fetchKycStatus);
    return unsubscribe;
  }, [navigation, route?.params?.kycStatus]);

  // Logout handler
  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');
      if (token && userId) {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`);
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          redirect: 'follow',
        };
        await fetch(`${API_URL}api/auth/logout/${userId}`, requestOptions);
      }
      await AsyncStorage.clear();
      setLogoutModalVisible(false);
      setLoggingOut(false);
      console.log('Logged out successfully');
      navigation.reset({ index: 0, routes: [{ name: 'Splash' }] });
    } catch (err) {
      setLoggingOut(false);
      setLogoutModalVisible(false);
      // Optionally show error
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Scrollable content */}
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('Home');
              }
            }}>
              <Image source={arrowImg} style={styles.arrowIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Profile Image and Edit */}
          <View style={styles.profileSection}>
            <View style={styles.profileImgWrapper}>
              <Image
                source={profileImageUri ? { uri: profileImageUri } : profileImg}
                style={styles.profileImg}
              />
              <TouchableOpacity style={styles.editBtn}>
                <Image source={editImg} style={styles.editIcon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>

          {/* Menu List */}
          <View style={styles.menuList}>
            <MenuItem label="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
            <MenuItem
              label="KYC Details"
              right={
                kycStatus !== null ? (
                  <Text
                    style={{
                      color:
                        kycStatus === 'verified'
                          ? '#19C37D'
                          : kycStatus === 'pending'
                          ? '#FFC107'
                          : '#F26A6A',
                      fontWeight: '600',
                      fontSize: 13,
                    }}
                  >
                    {kycStatus && typeof kycStatus === 'string' && kycStatus.trim().length > 0
                      ? kycStatus.charAt(0).toUpperCase() + kycStatus.slice(1)
                      : 'Verify'}
                  </Text>
                ) : null
              }
              onPress={() => navigation.navigate('KycDetails', { kycStatus })}
            />
            <MenuItem label="Notifications" onPress={() => navigation.navigate('Notifications')} />
            <MenuItem label="Sent Parcels" onPress={() => navigation.navigate('SentParcels')} />
            <MenuItem label="Delivered Parcels" onPress={() => navigation.navigate('DeliveredParcels')} />
            <MenuItem label="My Wallet" onPress={() => navigation.navigate('MyWalletScreen')} />
            <MenuItem label="Privacy Policy" onPress={() => navigation.navigate('PrivacyPolicy')} />
            <MenuItem label="Terms & Conditions" onPress={() => navigation.navigate('TermsConditions')} />
          </View>
        </ScrollView>

        {/* Logout Button - Fixed at bottom */}
        <View style={styles.logoutWrapper}>
          <TouchableOpacity style={styles.logoutBtn} onPress={() => setLogoutModalVisible(true)}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <Modal
          visible={logoutModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setLogoutModalVisible(false)}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, width: 300, alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Logout</Text>
              <Text style={{ fontSize: 16, marginBottom: 24 }}>Do you want to logout from this device?</Text>
              {loggingOut ? (
                <ActivityIndicator size="small" color="#F26A6A" />
              ) : (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                  <TouchableOpacity
                    style={{ flex: 1, marginRight: 8, backgroundColor: '#F26A6A', borderRadius: 6, padding: 12, alignItems: 'center' }}
                    onPress={handleLogout}
                  >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flex: 1, marginLeft: 8, backgroundColor: '#eee', borderRadius: 6, padding: 12, alignItems: 'center' }}
                    onPress={() => setLogoutModalVisible(false)}
                  >
                    <Text style={{ color: '#222', fontWeight: 'bold' }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const MenuItem = ({ label, right, onPress }) => (
  <View style={styles.menuItem}>
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.menuLabel}>{label}</Text>
    </TouchableOpacity>
    {right ? right : null}
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: 0,
    justifyContent: 'flex-start',
  },
  logoutWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 32,
    paddingHorizontal: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImgWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#eee',
  },
  editBtn: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#00C180',
    borderRadius: 16,
    padding: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  editIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 8,
    textAlign: 'center',
  },
  menuList: {
    marginBottom: 32,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  menuLabel: {
    fontSize: 17,
    color: '#111',
    fontWeight: '500',
  },
  logoutBtn: {
    backgroundColor: '#00C180',
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
