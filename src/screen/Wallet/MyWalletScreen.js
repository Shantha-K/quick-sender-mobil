import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const cardBg = require('../../assets/Profile/WalletCardBg.png'); // Optional: use a gradient or image for card background
const emptyIcon = require('../../assets/Profile/empty.png'); // Optional: placeholder icon for empty state

const MyWalletScreen = () => {
  const navigation = useNavigation();
  // Demo data, replace with real data from API/state
  const balance = 0.0;
  const name = 'Jhon Smith';
  const cardNumber = '**** **** **** 3629';
  const hasTransactions = false;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{'\u2039'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wallet</Text>
        <View style={{width: 24}} />
      </View>

      {/* Wallet Card */}
      <View style={[styles.card, {backgroundColor: styles.topUpBtn.backgroundColor}]}> 
        <Text style={styles.cardBalanceLabel}>My balance</Text>
        <Text style={styles.cardBalance}>₹ {balance.toFixed(2)}</Text>
        <Text style={styles.cardName}>{name}</Text>
        <Text style={styles.cardNumber}>{cardNumber}</Text>
      </View>

      {/* Transaction History */}
      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>Transaction History</Text>
        <TouchableOpacity>
          <Text style={styles.sellAll}>Sell All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.emptyState}>
        {/* <Image source={emptyIcon} style={styles.emptyIcon} /> */}
        <Text style={styles.emptyText}>No Records Found</Text>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.topUpBtn} onPress={() => navigation.navigate('TopUpWallet')}>
          <Text style={styles.topUpText}>Top - up wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.withdrawBtn}>
          <Text style={styles.withdrawText}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 24,
    marginBottom: 16,
  },
  backArrow: {
    fontSize: 32,
    color: '#222',
    fontWeight: 'bold',
    width: 24,
    textAlign: 'left',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#00D084', // Use top-up button color
    borderRadius: 24,
    marginHorizontal: 24,
    padding: 24,
    marginBottom: 24,
    alignItems: 'flex-start',
    shadowColor: '#00E09E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  cardBalanceLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  cardBalance: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 16,
    letterSpacing: 2,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 8,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  sellAll: {
    fontSize: 14,
    color: '#B0B0B0',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  emptyIcon: {
    width: 48,
    height: 48,
    marginBottom: 8,
    tintColor: '#B0B0B0',
  },
  emptyText: {
    color: '#B0B0B0',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 32,
  },
  topUpBtn: {
    flex: 1,
    backgroundColor: '#00D084',
    borderRadius: 12,
    paddingVertical: 16,
    marginRight: 8,
    alignItems: 'center',
  },
  topUpText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  withdrawBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 12,
    paddingVertical: 16,
    marginLeft: 8,
    alignItems: 'center',
  },
  withdrawText: {
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyWalletScreen;
