
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const steps = [
  { key: 1, label: 'Book delivery', icon: require('../../assets/Sender/Sendparcels.png') },
  { key: 2, label: 'Choose Delivery partnner', icon: require('../../assets/Sender/truck-delivery.png') },
  { key: 3, label: 'Track your order', icon: require('../../assets/Sender/map-marker-distance.png') },
  { key: 4, label: 'Deliver at door step', icon: require('../../assets/Sender/Icon.png') },
];

const Sender = ({ navigation }) => (
  <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ paddingBottom: 32 }}>
    <View style={{ paddingHorizontal: 24, paddingTop: 32 }}>
      <Text style={styles.header}>Send Parcel</Text>
      <Text style={styles.subHeader}>Just a few steps to send parcel anywhere you want</Text>

      <View style={styles.card}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../assets/DashBoard/Group.png')} style={styles.cardIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Send Parcels</Text>
            <Text style={styles.cardDesc}>Click here to send parcels to anyone to their door step</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.sendBtn} activeOpacity={0.85} onPress={() => navigation && navigation.navigate('SenderForm')}>
          <Text style={styles.sendBtnText}>Send Parcel</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.stepsHeader}>Steps to work as a delivery partner</Text>
      <View style={{ marginTop: 16 }}>
        {steps.map((step, idx) => (
          <View key={step.key} style={styles.stepRow}>
            <Image source={step.icon} style={styles.stepIcon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.stepNum}>Step {step.key}</Text>
              <Text style={styles.stepLabel}>{step.label}</Text>
            </View>
            {idx < steps.length - 1 && <View style={styles.stepLine} />}
          </View>
        ))}
      </View>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
    marginTop: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#bdbdbd',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardIcon: {
    width: 48,
    height: 48,
    marginRight: 16,
    resizeMode: 'contain',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: '#bdbdbd',
    marginBottom: 12,
  },
  sendBtn: {
    backgroundColor: '#00C37A',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  sendBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  stepsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  stepIcon: {
    width: 40,
    height: 40,
    marginRight: 16,
    resizeMode: 'contain',
  },
  stepNum: {
    color: '#F15B5D',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  stepLabel: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  stepLine: {
    position: 'absolute',
    left: 20,
    top: 40,
    width: 2,
    height: 32,
    backgroundColor: '#e0e0e0',
    zIndex: -1,
  },
});

export default Sender;