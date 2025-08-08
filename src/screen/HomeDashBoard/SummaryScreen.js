import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../service';

const SummaryScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [sender, setSender] = useState({});
  const [receiver, setReceiver] = useState({});
  const [parcel, setParcel] = useState({});
  const [payment, setPayment] = useState({ paymentType: 'Wallet', deliveryFee: '$30' });
  const [estimatedAmount, setEstimatedAmount] = useState('');
  const [apiResult, setApiResult] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const senderData = await AsyncStorage.getItem('senderData');
        const receiverData = await AsyncStorage.getItem('receiverData');
        const parcelData = await AsyncStorage.getItem('parcelData');
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

  const handlePay = async () => {
    setApiLoading(true);
    setApiResult(null);
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODk0NTEzNzNlNDk4NGJkYmIzOTM4MDYiLCJtb2JpbGUiOiIrOTE5ODc2NTQzMjEwIiwiaWF0IjoxNzU0NTYwOTU1LCJleHAiOjE3NTUxNjU3NTV9.x-hOWATDZmt2bthdWzAI0jz5Xp5Et6iUK7Zwf63tuW8');
      const raw = JSON.stringify({ sender, receiver, parcel, payment });
      const requestOptions = { method: 'POST', headers: myHeaders, body: raw, redirect: 'follow' };
      const response = await fetch(API_URL+'api/auth/delivery/request', requestOptions);
      const result = await response.text();
      setApiResult({ success: true, result });
      console.log('API Result:', result);
    } catch (error) {
      setApiResult({ success: false, error: error.message });
    } finally {
      setApiLoading(false);
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
          <Text>$ {estimatedAmount}</Text>
        </View>
        {/* Payment */}
        <View style={[styles.card, { marginBottom: 20 }]}> 
          <Text style={styles.cardTitle}>Payment</Text>
          <Text>Payment Type : {payment.paymentType}</Text>
          <Text>Delivery Fee : {payment.deliveryFee}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.payBtn} onPress={handlePay} disabled={apiLoading}>
        <Text style={styles.payBtnText}>{apiLoading ? 'Processing...' : `Pay $ ${payment.deliveryFee ? payment.deliveryFee.replace('$', '') : ''}`}</Text>
      </TouchableOpacity>
      {apiResult && (
        <View style={{ marginTop: 16, alignItems: 'center' }}>
          <Text style={{ color: apiResult.success ? 'green' : 'red' }}>
            {apiResult.success ? 'Request sent successfully!' : `Error: ${apiResult.error}`}
          </Text>
        </View>
      )}
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
