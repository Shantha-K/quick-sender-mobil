import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Image, Alert } from 'react-native';
import CustomDropdown from '../../components/CustomDropdown';
import HomeNavBar from '../../components/HomeNavBar';
import { API_URL } from '../../service';

const RateCalculator = ({ navigation }) => {
  const [tab, setTab] = useState('Domestic');
  const [form, setForm] = useState({
    country: '',
    fromCity: '',
    toCity: '',
    weight: '',
    length: '',
    width: '',
    height: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [rate, setRate] = useState(10); // Demo value

  const countryOptions = ['India', 'USA', 'UK', 'Canada', 'Australia'];
  const cityOptions = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'];

  const handleCalculate = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const raw = JSON.stringify({
        type: tab.toLowerCase(),
        country: form.country,
        fromCity: form.fromCity,
        toCity: form.toCity,
        parcelWeight: Number(form.weight),
        parcelLength: Number(form.length),
        parcelWidth: Number(form.width),
        parcelHeight: Number(form.height),
      });
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      const response = await fetch(API_URL+'api/auth/calculate-rate', requestOptions);
      const result = await response.json();
      if (result && result.rate) {
        setRate(result.rate);
      } else {
        setRate('N/A');
      }
      setModalVisible(true);
    } catch (error) {
      setRate('N/A');
      setModalVisible(true);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Text style={styles.title}>Rate Calculator</Text>
        <Text style={styles.subtitle}>Check our rates and send parcels to anywhere.</Text>
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabBtn, tab === 'Domestic' && styles.tabBtnActive]}
            onPress={() => {
              setTab('Domestic');
              setForm({ country: '', fromCity: '', toCity: '', weight: '', length: '', width: '', height: '' });
            }}
          >
            <Text style={[styles.tabText, tab === 'Domestic' && styles.tabTextActive]}>Domestic</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, tab === 'International' && styles.tabBtnActive]}
            onPress={() => {
              setTab('International');
              setForm({ country: '', fromCity: '', toCity: '', weight: '', length: '', width: '', height: '' });
            }}
          >
            <Text style={[styles.tabText, tab === 'International' && styles.tabTextActive]}>International</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.form}>
          <CustomDropdown
            label="Country"
            value={form.country}
            options={countryOptions}
            onSelect={v => setForm(f => ({ ...f, country: v }))}
            placeholder="Select Country"
          />
          <TextInput style={styles.inputDropdown} placeholder="From City" placeholderTextColor="#B0B0B0" value={form.fromCity} onChangeText={v => setForm(f => ({ ...f, fromCity: v }))} />
          <TextInput style={styles.inputDropdown} placeholder="To City" placeholderTextColor="#B0B0B0" value={form.toCity} onChangeText={v => setForm(f => ({ ...f, toCity: v }))} />
          <TextInput style={styles.inputDropdown} placeholder="Parcel Weight (kg)" placeholderTextColor="#B0B0B0" keyboardType="numeric" value={form.weight} onChangeText={v => setForm(f => ({ ...f, weight: v }))} />
          <TextInput style={styles.inputDropdown} placeholder="Parcel Length (cm)" placeholderTextColor="#B0B0B0" keyboardType="numeric" value={form.length} onChangeText={v => setForm(f => ({ ...f, length: v }))} />
          <TextInput style={styles.inputDropdown} placeholder="Parcel Width (cm)" placeholderTextColor="#B0B0B0" keyboardType="numeric" value={form.width} onChangeText={v => setForm(f => ({ ...f, width: v }))} />
          <TextInput style={styles.inputDropdown} placeholder="Parcel Height (cm)" placeholderTextColor="#B0B0B0" keyboardType="numeric" value={form.height} onChangeText={v => setForm(f => ({ ...f, height: v }))} />
          <TouchableOpacity style={styles.calcBtn} onPress={handleCalculate}>
            <Text style={styles.calcBtnText}>Calculate</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconWrapper}>
              <View style={styles.modalIconCircle}>
                <Image source={require('../../assets/icons/calculator-outline.png')} style={styles.modalIconImg} />
              </View>
            </View>
            <Text style={styles.modalRate}>$ {rate}</Text>
            <Text style={styles.modalSubtitle}>Estimated parcel rate</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <HomeNavBar navigation={navigation} activeTab="calculator" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
    marginLeft: 0,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 28,
    marginLeft: 0,
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 24,
    borderRadius: 8,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    alignSelf: 'center',
    width: '100%',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginHorizontal: 0,
  },
  tabBtnActive: {
    backgroundColor: '#00C180',
  },
  tabText: {
    fontSize: 15,
    color: '#888',
    fontWeight: 'bold',
  },
  tabTextActive: {
    color: '#fff',
  },
  form: {
    marginBottom: 0,
    paddingBottom: 0,
    width: '100%',
    alignSelf: 'center',
  },
  inputDropdown: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: '#222',
    marginBottom: 18,
    borderWidth: 1.2,
    borderColor: '#D9D9D9',
    height: 44,
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  inputDropdownText: {
    fontSize: 14,
    color: '#222',
  },
  calcBtn: {
    backgroundColor: '#00C180',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 12,
    width: '100%',
    alignSelf: 'center',
  },
  calcBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  modalIconWrapper: {
    marginBottom: 18,
  },
  modalIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#00C180',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalIconImg: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  modalRate: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 15,
    color: '#888',
    marginBottom: 18,
  },
  modalButton: {
    backgroundColor: '#00C180',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default RateCalculator;


