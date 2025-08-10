import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const NAV_ITEMS = [
  {
    key: 'parcels',
    label: 'My parcels',
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

const PartnerStartDelivery = ({ navigation }) => {
  const activeTab = 'partner';
  const tabToScreen = {
    parcels: { screen: 'Home', tab: 'parcels' },
    sender: { screen: 'Home', tab: 'sender' },
    partner: { screen: 'PartnerStartDelivery' },
    calculator: { screen: 'Home', tab: 'calculator' },
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery partner</Text>
      <Text style={styles.subtitle}>Just a few steps to complete and then you can start earning with dotpixel</Text>
      {/* Delivery Parcel Card */}
      <View style={styles.kycCard}>
        <View style={styles.kycRow}>
          <View style={styles.kycIconWrapper}>
            <Image source={require('../../assets/DashBoard/BigBox.png')} style={styles.kycIcon} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.kycTitle}>Deliver Parcel</Text>
            <Text style={styles.kycDesc}>Start your earning working with us as a delivery partner</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.startBtn} onPress={() => {}}>
          <Text style={styles.startBtnText}>Start Delivery</Text>
        </TouchableOpacity>
      </View>
      {/* Steps */}
      <Text style={styles.stepsTitle}>Steps to work as a delivery partner</Text>
      <View style={styles.stepsWrapper}>
        <View style={styles.stepItem}>
          <Image source={require('../../assets/Partner/accDetails.png')} style={styles.stepIcon} />
          <View style={styles.stepTextWrapper}>
            <Text style={styles.stepNum}>Step 1</Text>
            <Text style={styles.stepLabel}>Complete KYC</Text>
          </View>
        </View>
        <View style={styles.stepLine} />
        <View style={styles.stepItem}>
          <Image source={require('../../assets/Sender/Sendparcels.png')} style={styles.stepIcon} />
          <View style={styles.stepTextWrapper}>
            <Text style={styles.stepNum}>Step 2</Text>
            <Text style={styles.stepLabel}>Receive orders</Text>
          </View>
        </View>
        <View style={styles.stepLine} />
        <View style={styles.stepItem}>
          <Image source={require('../../assets/Sender/Icon.png')} style={styles.stepIcon} />
          <View style={styles.stepTextWrapper}>
            <Text style={styles.stepNum}>Step 3</Text>
            <Text style={styles.stepLabel}>Deliver Orders</Text>
          </View>
        </View>
        <View style={styles.stepLine} />
        <View style={styles.stepItem}>
          <Image source={require('../../assets/Partner/wallet.png')} style={styles.stepIcon} />
          <View style={styles.stepTextWrapper}>
            <Text style={styles.stepNum}>Step 4</Text>
            <Text style={styles.stepLabel}>Earn money</Text>
          </View>
        </View>
      </View>
      {/* Bottom Navbar */}
      <View style={styles.navbarWrapper}>
        <View style={styles.navbar}>
          {NAV_ITEMS.map(item => (
            <View style={styles.navItem} key={item.key}>
              <TouchableOpacity
                style={styles.iconCircle}
                activeOpacity={0.7}
                onPress={() => {
                  if (item.key !== activeTab && navigation && tabToScreen[item.key]) {
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
    marginLeft: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#888',
    marginBottom: 24,
    marginLeft: 4,
  },
  kycCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F2F2F2',
  },
  kycRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  kycIconWrapper: {
    marginRight: 12,
  },
  kycIcon: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },
  kycTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  kycDesc: {
    fontSize: 13,
    color: '#888',
  },
  startBtn: {
    backgroundColor: '#00C180',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  startBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  stepsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
    marginLeft: 4,
  },
  stepsWrapper: {
    marginBottom: 32,
    marginLeft: 4,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    position: 'relative',
  },
  stepIcon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    marginRight: 12,
  },
  stepTextWrapper: {
    flex: 1,
  },
  stepNum: {
    fontSize: 13,
    color: '#F26A6A',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  stepLabel: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  stepLine: {
    position: 'absolute',
    left: 34,
    top: 36,
    height: 32,
    width: 2,
    backgroundColor: '#eee',
    marginBottom: 0,
    zIndex: -1,
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
});

export default PartnerStartDelivery;
