import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

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

const Home = () => {
  const [activeTab, setActiveTab] = useState('parcels');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerBg}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.headerTitle}>Track parcel</Text>
        <TouchableOpacity
          onPress={() => setDropdownOpen(!dropdownOpen)}
          style={{ marginLeft: 8, marginTop: 4 }}
        >
          <Image
            source={
              dropdownOpen
                ? require('../../assets/DashBoard/Up.png')
                : require('../../assets/DashBoard/Down.png')
            }
            style={{ width: 18, height: 18, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
      </View>

        <Image
          source={require('../../assets/DashBoard/profile.png')}
          style={styles.profileImg}
        />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Dropdown Content */}
        {dropdownOpen && (
          <View style={styles.dropdownContent}>
            <Text style={styles.dropdownLabel}>Enter parcel number</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputText}>Tracking Number</Text>
            </View>
            <TouchableOpacity style={styles.trackBtn} activeOpacity={0.8}>
              <Text style={styles.trackBtnText}>Track parcel</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* My Parcels Title */}
        <Text style={styles.sectionTitle}>My parcels</Text>

        {/* Empty State Illustration */}
        <View style={styles.illustrationWrapper}>
          <Image
            source={require('../../assets/DashBoard/Girl.png')}
            style={styles.illustrationImg}
          />
          <Text style={styles.emptyText}>No parcels found!</Text>
        </View>

        {/* Action Cards */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
            <Image
              source={require('../../assets/DashBoard/Group.png')}
              style={styles.actionIcon}
            />
            <Text style={styles.actionTitle}>Send Parcel</Text>
            <Text style={styles.actionDesc}>Click here to send parcels to anyone to their door step</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} activeOpacity={0.8}>
            <Image
              source={require('../../assets/DashBoard/BigBox.png')}
              style={styles.actionIcon}
            />
            <Text style={styles.actionTitle}>Delivery Parcel</Text>
            <Text style={styles.actionDesc}>Start your journey with us as a delivery partner</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navbar */}
      <View style={styles.navbarWrapper}>
        <View style={styles.navbar}>
          {NAV_ITEMS.map(item => (
            <View style={styles.navItem} key={item.key}>
              <TouchableOpacity
                style={styles.iconCircle}
                onPress={() => setActiveTab(item.key)}
                activeOpacity={0.7}
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
    top:5 // Increased gap below label
  },
  inputWrapper: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 24, // Increased gap below input field
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
  navbarWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    paddingBottom: 12,
    paddingTop: 10, // Further increased for more space above icons
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

export default Home;
