
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Partner = ({ navigation }) => {
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
            <Text style={styles.kycDesc}>Complete KYC to Deliver the parcels & earn money</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.kycBtn} onPress={() => navigation && navigation.navigate('KycDetails')}>
          <Text style={styles.kycBtnText}>Complete KYC</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  kycBtn: {
    backgroundColor: '#22C55E',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  kycBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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

export default Partner;