import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const ParcelDetails = ({ navigation, route }) => {
  const { parcel } = route.params || {};
  if (!parcel) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation && navigation.goBack && navigation.goBack()}>
        <Text style={styles.backArrow}>{'\u2039'}</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Parcel Details</Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.cardId}>ID: {parcel.id}</Text>
            <TouchableOpacity onPress={() => navigation && navigation.navigate && navigation.navigate('ParcelMapView', { parcel })}>
              <Text style={styles.mapView}>Map View</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.status}>Waiting for your Acceptance</Text>
          <Text style={styles.lastUpdate}>Last update: 3 hours ago</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Sender</Text>
          <Text style={styles.infoText}>{parcel.senderName || 'maya'}</Text>
          <Text style={styles.infoText}>{parcel.senderEmail || 'william.maya@mail.com'}</Text>
          <Text style={styles.infoText}>{parcel.senderPhone || '91698 852695'}</Text>
          <Text style={styles.infoText}>{parcel.senderAddress || '11 Rosemount Meadows, Glasgow, G71 8EL'}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Receiver</Text>
          <Text style={styles.infoText}>{parcel.receiverName || 'James May'}</Text>
          <Text style={styles.infoText}>{parcel.receiverEmail || 'james.may@mail.com'}</Text>
          <Text style={styles.infoText}>{parcel.receiverPhone || '01698 852695'}</Text>
          <Text style={styles.infoText}>{parcel.receiverAddress || '11 Rosemount Meadows, Glasgow, G71 8EL'}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Parcel</Text>
          <Text style={styles.infoText}>{parcel.category || 'Electronics'}</Text>
          <Text style={styles.infoText}>{parcel.details || '2 kg Weight, 13 cm Length, 12 cm width, 15 cm height'}</Text>
        </View>
        <View style={styles.amountRow}>
          <TouchableOpacity style={styles.acceptBtn}>
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectBtn}>
            <Text style={styles.rejectText}>Reject</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Payment</Text>
          <Text style={styles.infoText}>{parcel.payment || ''}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 32,
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    top: 48,
    zIndex: 2,
  },
  backArrow: {
    fontSize: 32,
    color: '#222',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  card: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardId: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 13,
  },
  mapView: {
    color: '#00C37A',
    fontWeight: 'bold',
    fontSize: 13,
  },
  status: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  lastUpdate: {
    color: '#888',
    fontSize: 13,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F2F2F2',
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
    marginBottom: 4,
  },
  infoText: {
    color: '#222',
    fontSize: 14,
    marginBottom: 2,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  acceptBtn: {
    backgroundColor: '#00C37A',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  acceptText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rejectBtn: {
    backgroundColor: '#F87171',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  rejectText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ParcelDetails;
