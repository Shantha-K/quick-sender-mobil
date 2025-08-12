import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Image, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../service';

const SummaryScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [sender, setSender] = useState({});
  const [receiver, setReceiver] = useState({});
  const [parcel, setParcel] = useState({});
  const [payment, setPayment] = useState({ paymentType: 'Wallet', deliveryFee: '$30' });
  const [estimatedAmount, setEstimatedAmount] = useState('');
  const [showLowBalanceModal, setShowLowBalanceModal] = useState(false);
  const [walletBalance, setWalletBalance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const senderData = await AsyncStorage.getItem('senderData');
        const receiverData = await AsyncStorage.getItem('receiverData');
        const parcelData = await AsyncStorage.getItem('parcelData');
        const profilePic = await AsyncStorage.getItem('profilePic');
        setSender(senderData ? JSON.parse(senderData) : {});
        setReceiver(receiverData ? JSON.parse(receiverData) : {});
        const parcelObj = parcelData ? JSON.parse(parcelData) : {};
        setParcel(parcelObj);
        setEstimatedAmount(parcelObj.estimatedAmount || '');
      } catch (e) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchWalletBalance = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        setWalletBalance(null);
        return;
      }
      const response = await fetch(
        API_URL+`api/auth/wallet/${userId}`,
        { method: 'GET', redirect: 'follow' }
      );
      const result = await response.json();
      setWalletBalance(parseFloat(result.balance || 0));
    } catch (error) {
      setWalletBalance(null);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchWalletBalance();
    });
    return unsubscribe;
  }, [navigation]);

  const handlePay = async () => {
    const est = parseFloat(estimatedAmount || 0);
    if (walletBalance === null) {
      setShowLowBalanceModal(true);
      return;
    }
    if (walletBalance < est) {
      setShowLowBalanceModal(true);
      return;
    }
    // Sufficient balance, send OTP
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found in storage');
        return;
      }
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const raw = JSON.stringify({ userId });
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      const response = await fetch(API_URL+'api/auth/wallet/request-otp', requestOptions);
      const result = await response.json();
      console.log(result);
      if (result && result.otp) {
        navigation.navigate('SendParcelOtpVerification', { otp: result.otp, userId });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" /></View>;
  }

  return (
    <View style={styles.container}>
      {/* Header Row: Arrow and Title */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation && navigation.goBack()}>
          <Image source={require('../../assets/Sender/Arrow.png')} style={styles.backArrowImg} />
        </TouchableOpacity>
        <Text style={styles.header}>Summary</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Sender */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.cardTitle}>Sender</Text>
            <TouchableOpacity><Text style={styles.edit}>Edit</Text></TouchableOpacity>
          </View>
          <Text>{sender.name}</Text>
          <Text>{sender.email}</Text>
          <Text>{sender.phone}</Text>
          <Text>{sender.address}</Text>
        </View>
        {/* Receiver */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.cardTitle}>Receiver</Text>
            <TouchableOpacity><Text style={styles.edit}>Edit</Text></TouchableOpacity>
          </View>
          <Text>{receiver.name}</Text>
          <Text>{receiver.email}</Text>
          <Text>{receiver.phone}</Text>
          <Text>{receiver.address}</Text>
        </View>
        {/* Parcel */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.cardTitle}>Parcel</Text>
            <TouchableOpacity><Text style={styles.edit}>Edit</Text></TouchableOpacity>
          </View>
          <Text>{parcel.productName}</Text>
          <Text>{`${parcel.weight}, ${parcel.length} Length, ${parcel.width} width, ${parcel.height} height`}</Text>
        </View>
        {/* Estimated Amount */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.cardTitle}>Parcel Estimated Amount</Text>
            <TouchableOpacity><Text style={styles.edit}>Edit</Text></TouchableOpacity>
          </View>
          <Text>₹ {estimatedAmount}</Text>
        </View>
        {/* Payment */}
        <View style={[styles.card, { marginBottom: 20 }]}> 
          <Text style={styles.cardTitle}>Payment</Text>
          <Text>Payment Type : {payment.paymentType}</Text>
          <Text>Delivery Fee : ₹{payment.deliveryFee ? payment.deliveryFee.replace(/[^\d.]/g, '') : ''}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.payBtn} onPress={handlePay} disabled={false}>
        <Text style={styles.payBtnText}>{`Pay ₹${(() => {
          const est = parseFloat(estimatedAmount || 0);
          return est.toFixed(2);
        })()}`}</Text>
      </TouchableOpacity>
      {/* Low Balance Modal */}
      <Modal
        visible={showLowBalanceModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLowBalanceModal(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 24, alignItems: 'center', width: '85%' }}>
            <View style={{ backgroundColor: '#E6FFF3', borderRadius: 100, padding: 8, marginBottom: 16 }}>
              <View style={{ backgroundColor: '#00C97E', borderRadius: 100, padding: 14, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../../assets/Partner/wallet.png')} style={{ width: 38, height: 38 }} />
              </View>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginBottom: 8 }}>Your wallet balance is very low</Text>
            <Text style={{ color: '#888', fontSize: 14, textAlign: 'center', marginBottom: 24 }}>
              Add required money to your wallet in order to send parcel
            </Text>
            <TouchableOpacity
              style={{ backgroundColor: '#00C97E', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 32, width: '100%' }}
              onPress={() => {
                setShowLowBalanceModal(false);
                navigation.navigate('MyWalletScreen');
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>Add Money</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 32, paddingHorizontal: 12 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  backBtn: { padding: 4, marginLeft: 0 },
  backArrowImg: { width: 28, height: 28, resizeMode: 'contain' },
  header: { fontSize: 22, fontWeight: 'bold', color: '#222', textAlign: 'center', flex: 1 },
  card: { backgroundColor: '#F8F8F8', borderRadius: 12, padding: 14, marginBottom: 12 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardTitle: { fontWeight: 'bold', fontSize: 15, color: '#222' },
  edit: { color: '#00C37A', fontWeight: 'bold', fontSize: 14 },
  payBtn: { backgroundColor: '#00C37A', borderRadius: 12, padding: 18, alignItems: 'center', marginBottom: 16 },
  payBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default SummaryScreen;
