import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Parcels from './Parcels';
import Sender from './Sender';
import Partner from './Partner';
import Calculator from './Calculator';
import HomeNavBar from '../../components/HomeNavBar';

const NAV_ITEMS = [
  {
    key: 'parcels',
    label: 'Parcels',
    img: require('../../assets/Navbar/parcel.png'),
  },
  {
    key: 'sender',
    label: 'Sender',
    img: require('../../assets/Navbar/SendParcels.png'),
  },
  {
    key: 'partner',
    label: 'Partner',
    img: require('../../assets/Navbar/icons.png'),
  },
  {
    key: 'calculator',
    label: 'Calculator',
    img: require('../../assets/Navbar/calc.png'),
  },
];

const Home = ({ navigation ,route}) => {
    const { name, email} = route.params || {};
    console.log('name',name,email)
    const [activeTab, setActiveTab] = useState('parcels');
    useEffect(() => {
      if (route && route.params && route.params.tab) {
        setActiveTab(route.params.tab);
      }
    }, [route && route.params && route.params.tab]);
    console.log('Rendering Home.js screen');
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {activeTab === 'parcels' && (
            <Parcels navigation={navigation} name={name} email={email} />
          )}
          {activeTab === 'sender' && <Sender navigation={navigation} />}
          {activeTab === 'partner' && <Partner navigation={navigation} />}
          {activeTab === 'calculator' && <Calculator navigation={navigation} />}
        </View>
        {/* Use shared HomeNavBar instead of local nav bar */}
        <HomeNavBar navigation={navigation} activeTab={activeTab} />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  headerBg: {
    backgroundColor: '#00C37A',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 48,
    paddingBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginLeft: -8,
  },
  headerRight: {
    marginLeft: 12,
  },
  profileImg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    resizeMode: 'cover',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 32,
    marginLeft: 24,
    marginBottom: 12,
  },
  dropdownContent: {
    backgroundColor: '#00C37A',
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 32,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  dropdownLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#222',
    marginBottom: 24,
    top: 5,
  },
  inputWrapper: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  inputText: {
    fontSize: 15,
    color: '#bdbdbd',
  },
  trackBtn: {
    backgroundColor: '#222',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  trackBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  illustrationWrapper: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  illustrationImg: {
    width: 220,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#bdbdbd',
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    marginHorizontal: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#00C37A',
    borderRadius: 12,
    marginHorizontal: 8,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
  },
  actionIcon: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  actionDesc: {
    fontSize: 13,
    color: '#222',
    textAlign: 'center',
  },
});

export default Home;
