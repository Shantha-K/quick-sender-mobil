import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReceiverForm = ({ navigation }) => {
  const [receiverName, setReceiverName] = useState('');
  const [receiverMobile, setReceiverMobile] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [receiverState, setReceiverState] = useState('');
  const [receiverCity, setReceiverCity] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [states, setStates] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        const response = await fetch(
          'https://countriesnow.space/api/v0.1/countries/states',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country: 'India' }),
          },
        );
        const data = await response.json();
        if (data && data.data && data.data.states) {
          setStates(data.data.states.map(s => s.name));
        } else {
          setStates([]);
        }
      } catch (e) {
        setStates([]);
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, []);

  const handleNext = async () => {
    const newErrors = {};
    if (!receiverName.trim())
      newErrors.receiverName = 'Receiver Name is required';
    if (!receiverMobile.trim())
      newErrors.receiverMobile = 'Receiver Mobile Number is required';
    if (!receiverEmail.trim())
      newErrors.receiverEmail = 'Receiver Email is required';
    if (!receiverState.trim())
      newErrors.receiverState = 'Receiver State is required';
    if (!receiverCity.trim())
      newErrors.receiverCity = 'Receiver City is required';
    if (!receiverAddress.trim())
      newErrors.receiverAddress = 'Receiver Address is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const receiverData = {
        name: receiverName,
        email: receiverEmail,
        phone: receiverMobile,
        address: receiverAddress,
        state: receiverState,
        city: receiverCity,
      };
      await AsyncStorage.setItem('receiverData', JSON.stringify(receiverData));
      navigation && navigation.navigate('ParcelCategoryForm');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation && navigation.goBack()}
            style={styles.backBtn}
          >
            <Image
              source={require('../../assets/Profile/Arrow.png')}
              style={styles.backArrowImg}
            />
          </TouchableOpacity>
          <Text style={styles.header}>Send Parcel</Text>
          <View style={{ width: 32 }} />
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 24,
            paddingBottom: 120,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Receiver Name */}
          <View style={{ marginBottom: 10 }}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Receiver Name"
                placeholderTextColor="#bdbdbd"
                value={receiverName}
                onChangeText={text => {
                  setReceiverName(text);
                  if (errors.receiverName)
                    setErrors(prev => ({ ...prev, receiverName: undefined }));
                }}
              />
            </View>
            {errors.receiverName && (
              <Text style={styles.errorText}>{errors.receiverName}</Text>
            )}
          </View>

          {/* Receiver Mobile */}
          <View style={{ marginBottom: 10 }}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Receiver Mobile Number"
                placeholderTextColor="#bdbdbd"
                keyboardType="phone-pad"
                maxLength={10}
                value={receiverMobile}
                onChangeText={text => {
                  setReceiverMobile(text);
                  if (errors.receiverMobile)
                    setErrors(prev => ({ ...prev, receiverMobile: undefined }));
                }}
              />
            </View>
            {errors.receiverMobile && (
              <Text style={styles.errorText}>{errors.receiverMobile}</Text>
            )}
          </View>

          {/* Receiver Email */}
          <View style={{ marginBottom: 10 }}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Receiver Email"
                placeholderTextColor="#bdbdbd"
                keyboardType="email-address"
                value={receiverEmail}
                onChangeText={text => {
                  setReceiverEmail(text);
                  if (errors.receiverEmail)
                    setErrors(prev => ({ ...prev, receiverEmail: undefined }));
                }}
              />
            </View>
            {errors.receiverEmail && (
              <Text style={styles.errorText}>{errors.receiverEmail}</Text>
            )}
          </View>

          {/* Receiver State */}
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity
              style={styles.inputBox}
              onPress={() => setShowStateDropdown(!showStateDropdown)}
              activeOpacity={0.8}
            >
              <View style={styles.dropdownRow}>
                <Text
                  style={[
                    styles.input,
                    { color: receiverState ? '#222' : '#bdbdbd' },
                  ]}
                >
                  {receiverState || 'Receiver State'}
                </Text>
                <Image
                  source={require('../../assets/Sender/Vector2.png')}
                  style={styles.dropdownArrowImg}
                />
              </View>
            </TouchableOpacity>
            {errors.receiverState && (
              <Text style={styles.errorText}>{errors.receiverState}</Text>
            )}
            {showStateDropdown && (
              <View style={styles.dropdownList}>
                {loadingStates ? (
                  <ActivityIndicator
                    size="small"
                    color="#00C37A"
                    style={{ margin: 12 }}
                  />
                ) : states.length > 0 ? (
                  states.map(state => (
                    <TouchableOpacity
                      key={state}
                      onPress={() => {
                        setReceiverState(state);
                        setShowStateDropdown(false);
                        if (errors.receiverState)
                          setErrors(prev => ({
                            ...prev,
                            receiverState: undefined,
                          }));
                      }}
                    >
                      <Text style={styles.dropdownItem}>{state}</Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={{ padding: 16, color: '#bdbdbd' }}>
                    No states found
                  </Text>
                )}
              </View>
            )}
          </View>

          {/* Receiver City */}
          <View style={{ marginBottom: 10 }}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Receiver City"
                placeholderTextColor="#bdbdbd"
                value={receiverCity}
                onChangeText={text => {
                  setReceiverCity(text);
                  if (errors.receiverCity)
                    setErrors(prev => ({ ...prev, receiverCity: undefined }));
                }}
              />
            </View>
            {errors.receiverCity && (
              <Text style={styles.errorText}>{errors.receiverCity}</Text>
            )}
          </View>

          {/* Receiver Address */}
          <View style={{ marginBottom: 10 }}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Receiver Address"
                placeholderTextColor="#bdbdbd"
                value={receiverAddress}
                onChangeText={text => {
                  setReceiverAddress(text);
                  if (errors.receiverAddress)
                    setErrors(prev => ({
                      ...prev,
                      receiverAddress: undefined,
                    }));
                }}
                multiline
              />
            </View>
            {errors.receiverAddress && (
              <Text style={styles.errorText}>{errors.receiverAddress}</Text>
            )}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.nextBtn}
          activeOpacity={0.85}
          onPress={handleNext}
        >
          <Text style={styles.nextBtnText}>Next</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 56 : 32,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    top: Platform.OS === 'ios' ? 56 : 32,
    zIndex: 2,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrowImg: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    //flex: 1,
    left: 15,
    top: -2,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 14,
    marginBottom: 18,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
  },
  input: {
    fontSize: 17,
    color: '#222',
    paddingVertical: 16,
    paddingHorizontal: 0,
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownArrowImg: {
    width: 18,
    height: 18,
    marginRight: 8,
    resizeMode: 'contain',
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 12,
    marginBottom: 16,
    marginTop: -16,
    zIndex: 10,
  },
  dropdownItem: {
    fontSize: 17,
    color: '#222',
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  errorText: {
    color: '#F15B5D',
    fontSize: 13,
    marginTop: -12,
    marginLeft: 4,
  },
  nextBtn: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#00C37A',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ReceiverForm;
