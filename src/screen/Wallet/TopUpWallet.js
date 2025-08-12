import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Modal, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../service';

const initialPaymentMethods = [
  { id: '1', label: 'Google Pay' },
  { id: '2', label: 'Phone Pay' },
  { id: '3', label: 'Add Credit Card' },
  { id: '4', label: 'Add Debit Card' },
];

const TopUpWallet = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('1');
  const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods);
  const [showCard, setShowCard] = useState(false);
  const [cardNumber, setCardNumber] = useState('3629');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleTopUp = async () => {
    setLoading(true);
    setApiError('');
    try {
      const userId = await AsyncStorage.getItem('userId');
      console.log('User ID:', userId); // Debug
      if (!userId || !amount) {
        setApiError('Please enter a valid amount.');
        setLoading(false);
        return;
      }
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const raw = JSON.stringify({ userId, amount: parseFloat(amount) });
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      const response = await fetch(API_URL+'api/auth/wallet/topup', requestOptions);
      const result = await response.json();
      if (result.success) {
        setModalVisible(true);
        // Do not store wallet balance in AsyncStorage
      } else {
        setApiError(result.message || 'Top-up failed');
      }
    } catch (error) {
      setApiError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{'\u2039'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Top - up wallet</Text>
        <View style={{width: 24}} />
      </View>

      {/* Amount Input */}
      <Text style={styles.label}>Enter the amount of Top - up</Text>
      <TextInput
        style={styles.input}
        placeholder="₹ 0.00"
        placeholderTextColor="#B0B0B0"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      {/* Payment Method */}
      <Text style={styles.label}>Payment Method</Text>
      <Text style={styles.subLabel}>Select the payment method you want to use</Text>
      <FlatList
        data={paymentMethods}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          if (item.id === '3' && showCard) {
            return (
              <TouchableOpacity
                style={[styles.methodBtn, selectedMethod === 'card' && styles.methodBtnSelected]}
                onPress={() => setSelectedMethod('card')}
                activeOpacity={1}
              >
                <Text style={[styles.methodText, selectedMethod === 'card' && styles.methodTextSelected]}>Credit Card  **** {cardNumber}</Text>
                {selectedMethod === 'card' && <Text style={styles.checkMark}>✓</Text>}
              </TouchableOpacity>
            );
          }
          if (item.id === 'add_another_card') {
            return (
              <TouchableOpacity
                style={[styles.methodBtn, selectedMethod === 'add_another_card' && styles.methodBtnSelected]}
                onPress={() => setSelectedMethod('add_another_card')}
              >
                <Text style={[styles.methodText, selectedMethod === 'add_another_card' && styles.methodTextSelected]}>Add Another Credit Card</Text>
                {selectedMethod === 'add_another_card' && <Text style={styles.checkMark}>✓</Text>}
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity
              style={[styles.methodBtn, selectedMethod === item.id && styles.methodBtnSelected]}
              onPress={() => {
                setSelectedMethod(item.id);
                if (item.id === '3' && !showCard) {
                  setShowCard(true);
                  setPaymentMethods(prev => [
                    ...prev.slice(0, 3),
                    { id: 'card', label: 'Credit Card', cardNumber },
                    { id: 'add_another_card', label: 'Add Another Credit Card' },
                    ...prev.slice(3)
                  ]);
                }
              }}
            >
              <Text style={[styles.methodText, selectedMethod === item.id && styles.methodTextSelected]}>{item.label}</Text>
              {selectedMethod === item.id && <Text style={styles.checkMark}>✓</Text>}
            </TouchableOpacity>
          );
        }}
        style={{marginBottom: 32}}
      />

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueBtn} onPress={handleTopUp} disabled={loading}>
        <Text style={styles.continueText}>{loading ? 'Processing...' : 'Continue'}</Text>
      </TouchableOpacity>
      {apiError ? (
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 8 }}>{apiError}</Text>
      ) : null}

      {/* Success Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconWrapper}>
              {/* Replace with your own icon if available */}
              <View style={styles.successCircle}>
                <Image source={require('../../assets/Wallet/Send parcels.png')} style={styles.successIcon} />
              </View>
            </View>
            <Text style={styles.modalTitle}>Top-up Successful</Text>
            <Text style={styles.modalDesc}>The balance will be added to your wallet</Text>
            <TouchableOpacity style={styles.modalBtn} onPress={() => {
              setModalVisible(false);
              navigation.goBack();
            }}>
              <Text style={styles.modalBtnText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '85%',
  },
  modalIconWrapper: {
    marginBottom: 24,
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E6FFF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  successIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalDesc: {
    fontSize: 15,
    color: '#888',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalBtn: {
    backgroundColor: '#00D084',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: 'center',
    width: '100%',
  },
  modalBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
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
  label: {
    fontSize: 16,
    color: '#222',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subLabel: {
    fontSize: 14,
    color: '#B0B0B0',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    marginBottom: 24,
    color: '#222',
  },
  methodBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  methodBtnSelected: {
    borderColor: '#00D084',
    backgroundColor: '#E6FFF5',
  },
  methodText: {
    fontSize: 16,
    color: '#222',
  },
  methodTextSelected: {
    color: '#00D084',
    fontWeight: 'bold',
  },
  checkMark: {
    fontSize: 20,
    color: '#00D084',
    marginLeft: 8,
  },
  continueBtn: {
    backgroundColor: '#00D084',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TopUpWallet;
