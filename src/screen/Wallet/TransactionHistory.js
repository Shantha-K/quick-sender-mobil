import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const TransactionHistory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const transactions = route.params?.transactions || [];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{'\u2039'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction History</Text>
        <View style={{width: 24}} />
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: 32}}>
        {transactions.length === 0 ? (
          <View style={styles.emptyState}><Text style={styles.emptyText}>No Records Found</Text></View>
        ) : (
          [...transactions].reverse().map((txn, idx) => (
            <View key={idx} style={styles.txnCard}>
              <View style={styles.txnCardRow}>
                <Text style={styles.txnTitle}>{txn.type === 'topup' ? 'Top up successful' : 'Payment successful'}</Text>
                <Text style={styles.txnTime}>{getTimeAgo(txn.date)}</Text>
              </View>
              <Text style={styles.txnDesc}>{txn.type === 'topup' ? `you successfully top-up your wallet for ₹${txn.amount}` : `Your parcel has been successfully booked ₹${txn.amount}`}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

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
  emptyState: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  emptyText: {
    color: '#B0B0B0',
    fontSize: 16,
  },
});

export default TransactionHistory;
