import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

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

const KycPending = ({ navigation }) => {
  const activeTab = 'partner';
  // All tabs except 'partner' should navigate to Home and set the correct tab
  const tabToScreen = {
    parcels: { screen: 'Home', tab: 'parcels' },
    sender: { screen: 'Home', tab: 'sender' },
    partner: { screen: 'KycPending' },
    calculator: { screen: 'Home', tab: 'calculator' },
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery partner</Text>
      <Text style={styles.subtitle}>Just a few steps to complete and then you can start earning with dotpixel</Text>
      {/* KYC Pending Card */}
      <View style={styles.kycCard}>
        <View style={styles.kycRow}>
          <View style={styles.kycIconWrapper}>
            <Image source={require('../../assets/Partner/card.png')} style={styles.kycIcon} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.kycTitle}>KYC Pending</Text>
            <Text style={styles.kycDesc}>Waiting to verify your KYC Details</Text>
          </View>
        </View>
        {/* Progress Bar */}
        <View style={styles.progressBarBg}>
          <View style={styles.progressBarFill} />
        </View>
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
// ...existing code...

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
    marginBottom: 16,
  },
  kycIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF7E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  kycIcon: {
    width: 32,
    height: 32,
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
  progressBarBg: {
    height: 6,
    backgroundColor: '#F2F2F2',
    borderRadius: 3,
    marginTop: 8,
    marginBottom: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 6,
    width: '35%',
    backgroundColor: '#22C55E',
    borderRadius: 3,
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
  stepsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 16,
    marginLeft: 4,
  },
  stepsWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F2F2F2',
    marginBottom: 24,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  stepIcon: {
    width: 32,
    height: 32,
    marginRight: 16,
    resizeMode: 'contain',
    tintColor: '#BDBDBD',
  },
  stepTextWrapper: {
    flex: 1,
  },
  stepNum: {
    fontSize: 13,
    color: '#F87171',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  stepLabel: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
    marginBottom: 12,
  },
  stepLine: {
    height: 24,
    borderLeftWidth: 2,
    borderColor: '#E0E0E0',
    marginLeft: 15,
    marginBottom: 0,
  },
});

export default KycPending;
