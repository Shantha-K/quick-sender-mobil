import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const profileImg = require('../../assets/Profile/Profile.png');
const editImg = require('../../assets/Profile/Edit.png');
const arrowImg = require('../../assets/Profile/Arrow.png');


const Profile = ({ route }) => {
  const navigation = useNavigation();
  const [name, setName] = useState(route?.params?.name || '');
  const [email, setEmail] = useState(route?.params?.email || '');
  const [profileImageUri, setProfileImageUri] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const uri = await AsyncStorage.getItem('profileImage');
        if (uri) setProfileImageUri(uri);
      } catch (e) {}
    })();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={arrowImg} style={styles.arrowIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{width: 24}} />
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
          <MenuItem label="KYC Details" right={<Text style={styles.verify}>Verify</Text>} onPress={() => navigation.navigate('KycDetails')} />
          <MenuItem label="Notifications" onPress={() => navigation.navigate('Notifications')} />
          <MenuItem label="Sent Parcels" onPress={() => navigation.navigate('SentParcels')} />
          <MenuItem label="Delivered Parcels" onPress={() => navigation.navigate('DeliveredParcels')} />
          <MenuItem label="My Wallet" onPress={() => navigation.navigate('MyWallet')} />
          <MenuItem label="Privacy Policy" onPress={() => navigation.navigate('PrivacyPolicy')} />
          <MenuItem label="Terms & Conditions" onPress={() => navigation.navigate('TermsConditions')} />
        </View>
        {/* Logout Button */}
      </View>
      <View style={styles.logoutWrapper}>
        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
  verify: {
    color: '#F26A6A',
    fontWeight: 'bold',
    fontSize: 15,
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
