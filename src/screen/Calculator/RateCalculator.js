
// import CustomDropdown from '../../components/CustomDropdown';

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Image } from 'react-native';

// const RateCalculator = () => {
//   const [tab, setTab] = useState('Domestic');
//   const [form, setForm] = useState({
//     country: '',
//     fromCity: '',
//     toCity: '',
//     weight: '',
//     length: '',
//     width: '',
//     height: '',
//   });

//   // Example options, replace with real data as needed
//   const countryOptions = ['India', 'USA', 'UK', 'Canada', 'Australia'];
//   const cityOptions = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'];
//   const [modalVisible, setModalVisible] = useState(false);
//   const [rate, setRate] = useState(10); // Demo value

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Rate Calculator</Text>
//       <Text style={styles.subtitle}>Check our rates and send parcels to anywhere.</Text>
//       <View style={styles.tabRow}>
//         <TouchableOpacity
//           style={[styles.tabBtn, tab === 'Domestic' && styles.tabBtnActive]}
//           onPress={() => setTab('Domestic')}
//         >
//           <Text style={[styles.tabText, tab === 'Domestic' && styles.tabTextActive]}>Domestic</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.tabBtn, tab === 'International' && styles.tabBtnActive]}
//           onPress={() => setTab('International')}
//         >
//           <Text style={[styles.tabText, tab === 'International' && styles.tabTextActive]}>International</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.form}>
//         <CustomDropdown
//           label="Country"
//           value={form.country}
//           options={countryOptions}
//           onSelect={v => setForm(f => ({ ...f, country: v }))}
//           placeholder="Select Country"
//         />
//         <CustomDropdown
//           label="From City"
//           value={form.fromCity}
//           options={cityOptions}
//           onSelect={v => setForm(f => ({ ...f, fromCity: v }))}
//           placeholder="From City"
//         />
//         <CustomDropdown
//           label="To City"
//           value={form.toCity}
//           options={cityOptions}
//           onSelect={v => setForm(f => ({ ...f, toCity: v }))}
//           placeholder="To City"
//         />
//         <TextInput style={styles.input} placeholder="Parcel Weight (kg)" placeholderTextColor="#B0B0B0" keyboardType="numeric" value={form.weight} onChangeText={v => setForm(f => ({ ...f, weight: v }))} />
//         <TextInput style={styles.input} placeholder="Parcel Length (cm)" placeholderTextColor="#B0B0B0" keyboardType="numeric" value={form.length} onChangeText={v => setForm(f => ({ ...f, length: v }))} />
//         <TextInput style={styles.input} placeholder="Parcel Width (cm)" placeholderTextColor="#B0B0B0" keyboardType="numeric" value={form.width} onChangeText={v => setForm(f => ({ ...f, width: v }))} />
//         <TextInput style={styles.input} placeholder="Parcel Height (cm)" placeholderTextColor="#B0B0B0" keyboardType="numeric" value={form.height} onChangeText={v => setForm(f => ({ ...f, height: v }))} />
//       </View>
//       <TouchableOpacity style={styles.calcBtn} onPress={() => setModalVisible(true)}>
//         <Text style={styles.calcBtnText}>Calculate</Text>
//       </TouchableOpacity>

//       {/* Rate Modal */}
//       <Modal
//         visible={modalVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalIconWrapper}>
//               <View style={styles.modalIconCircle}>
//                 {/* Replace with your own icon if available */}
//                 <Image source={require('../../assets/icons/calculator-outline.png')} style={styles.modalIconImg} />
//               </View>
//             </View>
//             <Text style={styles.modalRate}>$ {rate}</Text>
//             <Text style={styles.modalSubtitle}>Estimated parcel rate</Text>
//             <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
//               <Text style={styles.modalButtonText}>Done</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     borderRadius: 24,
//     padding: 32,
//     alignItems: 'center',
//     width: '85%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   modalIconWrapper: {
//     marginBottom: 16,
//   },
//   modalIconCircle: {
//     width: 72,
//     height: 72,
//     borderRadius: 36,
//     backgroundColor: '#E6FAF0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   modalIconImg: {
//     width: 40,
//     height: 40,
//     resizeMode: 'contain',
//   },
//   modalRate: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#222',
//     marginBottom: 4,
//     textAlign: 'center',
//   },
//   modalSubtitle: {
//     fontSize: 15,
//     color: '#888',
//     marginBottom: 24,
//     textAlign: 'center',
//   },
//   modalButton: {
//     backgroundColor: '#00D084',
//     borderRadius: 12,
//     paddingVertical: 14,
//     paddingHorizontal: 40,
//     alignItems: 'center',
//     width: '100%',
//   },
//   modalButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 24,
//     paddingTop: 32,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#222',
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#888',
//     marginBottom: 20,
//   },
//   tabRow: {
//     flexDirection: 'row',
//     marginBottom: 20,
//     backgroundColor: '#F5F5F5',
//     borderRadius: 12,
//     overflow: 'hidden',
//   },
//   tabBtn: {
//     flex: 1,
//     paddingVertical: 12,
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//   },
//   tabBtnActive: {
//     backgroundColor: '#00D084',
//   },
//   tabText: {
//     fontSize: 16,
//     color: '#888',
//     fontWeight: 'bold',
//   },
//   tabTextActive: {
//     color: '#fff',
//   },
//   form: {
//     marginBottom: 24,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#B0B0B0',
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//     marginBottom: 12,
//     color: '#222',
//     backgroundColor: '#fff',
//   },
//   calcBtn: {
//     backgroundColor: '#00D084',
//     borderRadius: 12,
//     paddingVertical: 18,
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   calcBtnText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default RateCalculator;


import CustomDropdown from '../../components/CustomDropdown';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Image, Alert } from 'react-native';

const RateCalculator = () => {
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
  const [rate, setRate] = useState(0);
  const [loading, setLoading] = useState(false);

  const countryOptions = ['India', 'USA', 'UK', 'Canada', 'Australia'];
  const cityOptions = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'];

  const handleCalculate = async () => {
    // Validation
    if (!form.country || !form.fromCity || !form.toCity || !form.weight || !form.length || !form.width || !form.height) {
      Alert.alert('Missing Fields', 'Please fill all fields before calculating.');
      return;
    }

    try {
      setLoading(true);

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        type: tab.toLowerCase(), // "domestic" or "international"
        country: form.country,
        fromCity: form.fromCity,
        toCity: form.toCity,
        parcelWeight: parseFloat(form.weight),
        parcelLength: parseFloat(form.length),
        parcelWidth: parseFloat(form.width),
        parcelHeight: parseFloat(form.height),
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      const response = await fetch("http://localhost:3000/api/auth/calculate-rate", requestOptions);
      const result = await response.json();

      if (response.ok) {
        setRate(result.rate || 0); // Adjust key based on API response
        setModalVisible(true);
      } else {
        Alert.alert('Error', result.message || 'Unable to calculate rate.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong while calculating rate.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate Calculator</Text>
      <Text style={styles.subtitle}>Check our rates and send parcels to anywhere.</Text>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'Domestic' && styles.tabBtnActive]}
          onPress={() => setTab('Domestic')}
        >
          <Text style={[styles.tabText, tab === 'Domestic' && styles.tabTextActive]}>Domestic</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'International' && styles.tabBtnActive]}
          onPress={() => setTab('International')}
        >
          <Text style={[styles.tabText, tab === 'International' && styles.tabTextActive]}>International</Text>
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <CustomDropdown label="Country" value={form.country} options={countryOptions} onSelect={v => setForm(f => ({ ...f, country: v }))} placeholder="Select Country" />
        <CustomDropdown label="From City" value={form.fromCity} options={cityOptions} onSelect={v => setForm(f => ({ ...f, fromCity: v }))} placeholder="From City" />
        <CustomDropdown label="To City" value={form.toCity} options={cityOptions} onSelect={v => setForm(f => ({ ...f, toCity: v }))} placeholder="To City" />
        <TextInput style={styles.input} placeholder="Parcel Weight (kg)" keyboardType="numeric" value={form.weight} onChangeText={v => setForm(f => ({ ...f, weight: v }))} />
        <TextInput style={styles.input} placeholder="Parcel Length (cm)" keyboardType="numeric" value={form.length} onChangeText={v => setForm(f => ({ ...f, length: v }))} />
        <TextInput style={styles.input} placeholder="Parcel Width (cm)" keyboardType="numeric" value={form.width} onChangeText={v => setForm(f => ({ ...f, width: v }))} />
        <TextInput style={styles.input} placeholder="Parcel Height (cm)" keyboardType="numeric" value={form.height} onChangeText={v => setForm(f => ({ ...f, height: v }))} />
      </View>

      {/* Calculate Button */}
      <TouchableOpacity style={styles.calcBtn} onPress={handleCalculate} disabled={loading}>
        <Text style={styles.calcBtnText}>{loading ? 'Calculating...' : 'Calculate'}</Text>
      </TouchableOpacity>

      {/* Rate Modal */}
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
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
    </View>
  );
};

// styles remain unchanged...
// (keep your existing styles here)

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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  modalIconWrapper: {
    marginBottom: 16,
  },
  modalIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E6FAF0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalIconImg: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  modalRate: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 15,
    color: '#888',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#00D084',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: 'center',
    width: '100%',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    overflow: 'hidden',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  tabBtnActive: {
    backgroundColor: '#00D084',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
    fontWeight: 'bold',
  },
  tabTextActive: {
    color: '#fff',
  },
  form: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 12,
    color: '#222',
    backgroundColor: '#fff',
  },
  calcBtn: {
    backgroundColor: '#00D084',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  calcBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default RateCalculator;


