import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../service';

const MyWalletScreen = () => {
  const navigation = useNavigation();
  const [balance, setBalance] = useState(0.0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true);
      try {
        const userId = await AsyncStorage.getItem('userId');
        let fetchedName = '';
        if (!userId) return;
        // Fetch user name
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const myHeaders = new Headers();
          myHeaders.append('Authorization', `Bearer ${token}`);
          const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
          };
          const response = await fetch(API_URL+`api/auth/getregistered/${userId}`, requestOptions);
          const result = await response.json();
          if (result.success && result.data && typeof result.data.name === 'string') {
            fetchedName = result.data.name;
          }
        }
        // Fetch wallet balance
        const requestOptions2 = {
          method: 'GET',
          redirect: 'follow',
        };
        const response2 = await fetch(API_URL+`api/auth/wallet/${userId}`, requestOptions2);
        const result2 = await response2.json();
        if (result2.success) {
          setBalance(result2.balance);
          setTransactions(result2.transactions || []);
        }
        if (fetchedName) {
          setUserName(fetchedName);
        }
      } catch (e) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchBalance();
    const unsubscribe = navigation.addListener('focus', fetchBalance);
    return unsubscribe;
  }, [navigation]);

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
      <View style={[styles.card, {
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.18,
        shadowRadius: 24,
        elevation: 16,
      }]}>
        <View style={{alignSelf: 'stretch', alignItems: 'center'}}>
          <Text style={[styles.cardBalanceLabel, {color: '#222', textAlign: 'center'}]}>My balance</Text>
          <Text style={[styles.cardBalance, {color: '#222', textAlign: 'center'}]}>₹ {loading ? '...' : balance.toFixed(2)}</Text>
        </View>
        <Text style={[styles.cardName, {color: '#222', textAlign: 'left'}]}>{userName ? userName : 'Loading...'}</Text>
        <Text style={[styles.cardNumber, {color: '#222', textAlign: 'left'}]}>{'**** **** **** 3629'}</Text>
      </View>

      {/* Transaction History */}
      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>Transaction History</Text>
        <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory', { transactions })}>
          <Text style={styles.sellAll}>See All</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.emptyState}><Text style={styles.emptyText}>Loading...</Text></View>
      ) : transactions.length === 0 ? (
        <View style={styles.emptyState}><Text style={styles.emptyText}>No Records Found</Text></View>
      ) : (
        <View style={{marginHorizontal:0, marginBottom:24}}>
          {[...transactions].reverse().slice(0, 4).map((txn, idx) => (
            <View key={idx} style={styles.txnCard}>
              <View style={styles.txnCardRow}>
                <Text style={styles.txnTitle}>{txn.type === 'topup' ? 'Top up successful' : 'Payment successful'}</Text>
                <Text style={styles.txnTime}>{getTimeAgo(txn.date)}</Text>
              </View>
              <Text style={styles.txnDesc}>{txn.type === 'topup' ? `You successfully top-up your wallet for ₹${txn.amount}` : `Your parcel has been successfully booked ₹${txn.amount}`}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Bottom Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.topUpBtn} onPress={() => navigation.navigate('TopUpWallet')}>
          <Text style={styles.topUpText}>Top - up wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.withdrawBtn} onPress={() => navigation.navigate('WithDrawScreen')}>
          <Text style={styles.withdrawText}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Add helper function for time ago
function getTimeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay > 0) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  if (diffHr > 0) return `${diffHr} hour${diffHr > 1 ? 's' : ''} ago`;
  if (diffMin > 0) return `${diffMin} min${diffMin > 1 ? 's' : ''} ago`;
  return 'Just now';
}

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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 16,
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
    color: '#00D084',
    fontWeight: 'bold',
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
  txnCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F2F2F2',
  },
  txnCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  txnTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
  },
  txnTime: {
    color: '#B0B0B0',
    fontSize: 13,
  },
  txnDesc: {
    color: '#222',
    fontSize: 14,
    marginTop: 2,
  },
});

export default MyWalletScreen;
