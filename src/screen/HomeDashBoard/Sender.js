import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const steps = [
  { key: 1, label: 'Book delivery', icon: require('../../assets/Sender/Sendparcels.png') },
  { key: 2, label: 'Choose Delivery partnner', icon: require('../../assets/Sender/truck-delivery.png') },
  { key: 3, label: 'Track your order', icon: require('../../assets/Sender/map-marker-distance.png') },
  { key: 4, label: 'Deliver at door step', icon: require('../../assets/Sender/Icon.png') },
];

const Sender = ({ navigation }) => (
  <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
    <View style={styles.innerContainer}>
      <Text style={styles.title}>Send Parcel</Text>
      <Text style={styles.subtitle}>Just a few steps to send parcel anywhere you want</Text>

      <View style={styles.card}>
        <View style={styles.cardRow}>
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

      <Text style={styles.stepsTitle}>Steps to work as a delivery partner</Text>
      <View style={styles.stepsWrapper}>
        {steps.map((step, idx) => (
          <View key={step.key} style={styles.stepItem}>
            <View style={styles.stepIconWrapper}>
              <Image source={step.icon} style={styles.stepIcon} />
              {idx < steps.length - 1 && <View style={styles.stepLine} />}
            </View>
            <View style={styles.stepTextWrapper}>
              <Text style={styles.stepNum}>Step {step.key}</Text>
              <Text style={styles.stepLabel}>{step.label}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
    marginLeft: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#888',
    marginBottom: 24,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F2F2F2',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF7E6',
    marginRight: 16,
    resizeMode: 'contain',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 13,
    color: '#888',
  },
  sendBtn: {
    backgroundColor: '#22C55E',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  sendBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 16,
    marginLeft: 4,
  },
  stepsWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F2F2F2',
    marginBottom: 24,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align to top for line positioning
    marginBottom: 32,
  },
  stepIconWrapper: {
    width: 32,
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  stepIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    tintColor: '#BDBDBD',
  },
  stepLine: {
    position: 'absolute',
    top: 32,  // directly below icon
    width: 2,
    height: 24,
    backgroundColor: '#E0E0E0',
    borderRadius: 1,
  },
  stepTextWrapper: {
    flex: 1,
  },
  stepNum: {
    fontSize: 13,
    color: '#F87171',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  stepLabel: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
    marginBottom: 0,
  },
});

export default Sender;
