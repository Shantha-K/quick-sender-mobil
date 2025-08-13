import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView, Modal } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../service';

const googlePayIcon = require('../../assets/Wallet/Gpay.png');
const phonePayIcon = require('../../assets/Wallet/Phonepe.png');
const arrowImg = require('../../assets/Profile/Arrow.png');
const walletIcon = require('../../assets/Wallet/wallet.png');

const paymentMethods = [
  { key: 'googlepay', label: 'Google Pay', icon: googlePayIcon },
  { key: 'phonepay', label: 'Phone Pay', icon: phonePayIcon },
  { key: 'bank', label: 'Add Bank Account', icon: null },
];

const WithDrawScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [banks, setBanks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);

  // On mount or when coming back from AddBankAccount, update bank state if params present
  useFocusEffect(
    React.useCallback(() => {
      // Always load all banks from AsyncStorage
      const loadBanks = async () => {
        try {
          const stored = await AsyncStorage.getItem('userBanks');
          if (stored) {
            setBanks(JSON.parse(stored));
          } else {
            setBanks([]);
          }
        } catch (e) {
          setBanks([]);
        }
      };
      loadBanks();
      // Remove param if present
      if (route.params?.bank) {
        navigation.setParams({ bank: undefined });
      }
    }, [route.params?.bank])
  );

  const isWithdrawDisabled = !amount;

  const handleWithdraw = async () => {
    if (!selectedMethod) {
      alert('Please select a payment method.');
      return;
    }
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId || !amount) return;
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const raw = JSON.stringify({
        userId,
        amount: Number(amount),
      });
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      const response = await fetch(API_URL + 'api/auth/wallet/withdraw', requestOptions);
      const result = await response.json();
      setModalMessage(result.message || 'Withdraw successful');
      setModalSuccess(result.message && result.message.toLowerCase().includes('success'));
      setModalVisible(true);
    } catch (error) {
      setModalMessage('Something went wrong');
      setModalSuccess(false);
      setModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={arrowImg} style={styles.arrowIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Withdraw</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.label}>Enter the withdrawal amount</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.dollar}>$</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              placeholderTextColor="#BDBDBD"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <Text style={[styles.label, { marginTop: 28 }]}>Payment Method</Text>
          <Text style={styles.subLabel}>Select the payment method you want to use</Text>

          {paymentMethods.map((method, idx) => (
            (method.key === 'bank' && banks.length > 0) ? null : (
              <TouchableOpacity
                key={method.key}
                style={[
                  styles.methodBtn,
                  selectedMethod === method.key && styles.methodBtnActive,
                ]}
                onPress={() => {
                  if (method.key === 'bank') {
                    navigation.navigate('AddBankAccount');
                  } else {
                    setSelectedMethod(method.key);
                  }
                }}
                activeOpacity={0.8}
              >
                {method.icon ? (
                  <Image source={method.icon} style={styles.methodIcon} />
                ) : null}
                <Text style={styles.methodLabel}>{method.label}</Text>
              </TouchableOpacity>
            )
          ))}

          {/* Show all added bank accounts if present */}
          {banks.map((bank, idx) => (
            <TouchableOpacity
              key={bank.account + bank.ifsc + idx}
              style={[
                styles.methodBtn,
                selectedMethod === `addedBank${idx}` && styles.methodBtnActive,
                { flexDirection: 'column', alignItems: 'flex-start', paddingVertical: 16 }
              ]}
              onPress={() => setSelectedMethod(`addedBank${idx}`)}
              activeOpacity={0.8}
            >
              <Text style={[styles.methodLabel, { color: '#222', fontWeight: 'bold', marginBottom: 2 }]}>{bank.name}</Text>
              <Text style={{ color: '#888', fontSize: 15, marginBottom: 2 }}>{bank.bank}</Text>
              <Text style={{ color: '#888', fontSize: 15, marginBottom: 2 }}>{bank.account}</Text>
              <Text style={{ color: '#888', fontSize: 15 }}>{bank.ifsc}</Text>
            </TouchableOpacity>
          ))}
          {/* Add Another Bank Account */}
          {banks.length > 0 && (
            <TouchableOpacity
              style={styles.methodBtn}
              onPress={() => navigation.navigate('AddBankAccount')}
              activeOpacity={0.8}
            >
              <Text style={styles.methodLabel}>Add Another Bank Account</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.withdrawBtn,
            (!isWithdrawDisabled && selectedMethod) && { backgroundColor: '#00C180' },
            isWithdrawDisabled && styles.withdrawBtnDisabled
          ]}
          disabled={isWithdrawDisabled}
          onPress={handleWithdraw}
        >
          <Text style={[
            styles.withdrawText,
            (!isWithdrawDisabled && selectedMethod) && { color: '#fff' },
            isWithdrawDisabled && { color: '#BDBDBD' }
          ]}>Withdraw</Text>
        </TouchableOpacity>
      </View>
      {/* Modal for withdraw result */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 24, padding: 32, alignItems: 'center', width: 300 }}>
            <View style={{ backgroundColor: modalSuccess ? '#00C180' : '#F26A6A', borderRadius: 50, padding: 16, marginBottom: 16 }}>
              {/* Show success icon or insufficient.png for error */}
              <Image source={walletIcon} style={{ width: 48, height: 48, resizeMode: 'contain' }} />
            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#222', marginBottom: 8, textAlign: 'center' }}>{modalMessage}</Text>
            <Text style={{ color: '#BDBDBD', fontSize: 15, marginBottom: 24, textAlign: 'center' }}>
              {modalSuccess ? 'The balance will be deducted from your wallet' : ''}
            </Text>
            <TouchableOpacity
              style={{ backgroundColor: '#00C180', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 32, width: '100%' }}
              onPress={() => {
                setModalVisible(false);
                navigation.reset({
                  index: 1,
                  routes: [
                    { name: 'Profile' },
                    { name: 'MyWalletScreen' },
                  ],
                });
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 17, textAlign: 'center' }}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 16,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  label: {
    fontWeight: 'bold',
    color: '#222',
    fontSize: 15,
    marginBottom: 8,
  },
  subLabel: {
    color: '#BDBDBD',
    fontSize: 13,
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#FAFAFA',
    height: 48,
  },
  dollar: {
    color: '#BDBDBD',
    fontSize: 18,
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#222',
    padding: 0,
  },
  methodBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  methodBtnActive: {
    borderColor: '#00C180',
    backgroundColor: '#F2FFFB',
  },
  methodIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    marginRight: 12,
  },
  methodLabel: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  withdrawBtn: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  withdrawBtnDisabled: {
    backgroundColor: '#F5F5F5',
  },
  withdrawText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#BDBDBD',
  },
});

export default WithDrawScreen;
