import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../service';

const NAV_ITEMS = [
  { key: 'parcels', label: 'My parcels', img: require('../assets/Navbar/parcel.png') },
  { key: 'sender', label: 'Sender', img: require('../assets/Navbar/SendParcels.png') },
  { key: 'partner', label: 'Partner', img: require('../assets/Navbar/icons.png') },
  { key: 'calculator', label: 'Calculator', img: require('../assets/Navbar/calc.png') },
];

const HomeNavBar = ({ navigation, activeTab = 'parcels' }) => {
  const handlePartnerPress = async () => {
    try {
      console.log('Partner tab pressed, checking KYC status...');
      const token = await AsyncStorage.getItem('token');
      console.log('Token:', token);
      if (!token) {
        console.log('No token found');
        return;
      }
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };
      console.log('RequestOptions:', requestOptions);
      const response = await fetch(API_URL+'api/auth/kyc-status', requestOptions);
      const text = await response.text();
      console.log('Raw API response:', text);
      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        console.log('JSON parse error:', e);
        return;
      }
      console.log('Parsed KYC API result:', result);
      if (result.kycStatus === 'verify') {
        navigation.replace('Partner');
      } else if (result.kycStatus === 'pending') {
        navigation.replace('KycPending');
      } else if (result.kycStatus === 'verified') {
        navigation.replace('PartnerStartDelivery');
      } else {
        console.log('Unknown kycStatus:', result.kycStatus);
      }
    } catch (error) {
      console.error('KYC API error:', error);
    }
  };

  const tabToScreen = {
    parcels: { screen: 'Home', tab: 'parcels' },
    sender: { screen: 'Home', tab: 'sender' },
    partner: { screen: 'Partner' }, 
    calculator: { screen: 'Home', tab: 'calculator' },
  };

  return (
    <View style={styles.navbarWrapper}>
      <View style={styles.navbar}>
        {NAV_ITEMS.map(item => (
          <View style={styles.navItem} key={item.key}>
            <TouchableOpacity
              style={styles.iconCircle}
              activeOpacity={0.7}
              onPress={() => {
                // Always check KYC status when Partner tab is pressed
                if (item.key === 'partner') {
                  handlePartnerPress();
                } else if (item.key !== activeTab && navigation && tabToScreen[item.key]) {
                  const navTarget = tabToScreen[item.key];
                  if (navTarget.screen === 'Home') {
                    navigation.navigate('Home', { tab: navTarget.tab });
                  } else {
                    navigation.navigate(navTarget.screen);
                  }
                }
              }}
            >
              <Image
                source={item.img}
                style={styles.iconImg}
                tintColor={activeTab === item.key ? '#222' : '#bdbdbd'}
              />
            </TouchableOpacity>
            <Text style={[styles.label, activeTab === item.key && styles.activeLabel]}>{item.label}</Text>
          </View>
        ))}
      </View>
      <View style={styles.navbarLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  navbarWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    paddingBottom: 12,
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    height: 55,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconImg: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 14,
    color: '#bdbdbd',
    fontWeight: '500',
    marginTop: 2,
  },
  activeLabel: {
    color: '#222',
    fontWeight: 'bold',
  },
  navbarLine: {
    marginTop: 8,
    marginHorizontal: '10%',
    height: 6,
    backgroundColor: '#222',
    borderRadius: 3,
    alignSelf: 'center',
  },
});

export default HomeNavBar;
