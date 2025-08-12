import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView, Modal } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const arrowImg = require('../../assets/Wallet/Arrow.png');
const vectorImg = require('../../assets/Wallet/Vector2.png');

const AddBankAccount = () => {
  const navigation = useNavigation();
  const [selectedBank, setSelectedBank] = useState('Select Bank');
  const [showBankList, setShowBankList] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [holderName, setHolderName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const staticBanks = [
    'HDFC Bank',
    'ICICI Bank',
    'SBI',
    'Axis Bank',
    'Kotak Mahindra',
    'Yes Bank',
    'IndusInd Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'IDFC FIRST Bank',
    'Canara Bank',
    'Union Bank of India',
    'Central Bank of India',
    'Bank of India',
    'Indian Bank',
    'UCO Bank',
    'Bank of Maharashtra',
    'Punjab & Sind Bank',
  ];


  const allFieldsFilled = selectedBank !== 'Select Bank' && accountNumber && ifsc && holderName;

  const handleAdd = async () => {
    if (!allFieldsFilled) {
      alert('Please fill all parameters');
      return;
    }
    // Save new bank to AsyncStorage (append to array)
    try {
      const prev = await AsyncStorage.getItem('userBanks');
      let banks = [];
      if (prev) {
        banks = JSON.parse(prev);
      }
      banks.push({
        name: holderName,
        bank: selectedBank,
        account: accountNumber,
        ifsc: ifsc,
      });
      await AsyncStorage.setItem('userBanks', JSON.stringify(banks));
    } catch (e) { /* ignore */ }
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={arrowImg} style={styles.arrowIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Bank Account</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          {/* Bank Dropdown */}
          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={() => setShowBankList(!showBankList)}
            activeOpacity={0.8}
          >
            <Text style={[styles.input, { color: selectedBank === 'Select Bank' ? '#BDBDBD' : '#222' }]}>
              {selectedBank}
            </Text>
            <Image source={vectorImg} style={styles.vectorIcon} />
          </TouchableOpacity>
          {showBankList && (
            <View style={styles.dropdownList}>
              {staticBanks.map((bank, idx) => (
                <TouchableOpacity
                  key={bank + idx}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedBank(bank);
                    setShowBankList(false);
                  }}
                >
                  <Text style={styles.dropdownText}>{bank}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Account Number */}
          <TextInput
            style={styles.inputWrapper}
            placeholder="Account Number"
            placeholderTextColor="#BDBDBD"
            keyboardType="number-pad"
            value={accountNumber}
            onChangeText={setAccountNumber}
          />
          {/* IFSC Code */}
          <TextInput
            style={styles.inputWrapper}
            placeholder="IFSC Code"
            placeholderTextColor="#BDBDBD"
            autoCapitalize="characters"
            value={ifsc}
            onChangeText={setIfsc}
          />
          {/* Holder Name */}
          <TextInput
            style={styles.inputWrapper}
            placeholder="Holder Name"
            placeholderTextColor="#BDBDBD"
            value={holderName}
            onChangeText={setHolderName}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.addBtn,
            allFieldsFilled ? { backgroundColor: '#00C180' } : { backgroundColor: '#BDBDBD' }
          ]}
          onPress={handleAdd}
          activeOpacity={allFieldsFilled ? 0.7 : 1}
        >
          <Text style={[styles.addText, allFieldsFilled ? { color: '#fff' } : { color: '#fff' }]}>Add</Text>
        </TouchableOpacity>
      </View>
      {/* Success Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 24, padding: 32, alignItems: 'center', width: 300 }}>
            <View style={{ backgroundColor: '#00C180', borderRadius: 50, padding: 16, marginBottom: 16 }}>
              <Text style={{ fontSize: 32, color: '#fff' }}>✓</Text>
            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#222', marginBottom: 8, textAlign: 'center' }}>Your Account details added successfully</Text>
            <TouchableOpacity
              style={{ backgroundColor: '#00C180', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 32, width: '100%', marginTop: 16 }}
              onPress={() => {
                setModalVisible(false);
                navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [
                      { name: 'MyWalletScreen' },
                      { name: 'WithDrawScreen' },
                    ],
                  })
                );
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#FAFAFA',
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  vectorIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    marginBottom: 16,
    marginTop: -12,
    zIndex: 10,
    position: 'absolute',
    left: 20,
    right: 20,
    top: 90,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  dropdownText: {
    fontSize: 16,
    color: '#222',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  addBtn: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addBtnDisabled: {
    backgroundColor: '#F5F5F5',
  },
  addText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#BDBDBD',
  },
});

export default AddBankAccount;
