import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const ParcelMapView = ({ navigation, route }) => {
  const { parcel } = route.params || {};
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation && navigation.goBack && navigation.goBack()}>
        <Text style={styles.backArrow}>{'\u2039'}</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Parcel Details</Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.cardId}>ID: {parcel?.id || '00359007738060313786'}</Text>
            <Text style={styles.summary}>Summary</Text>
          </View>
          <Text style={styles.status}>Waiting for your Acceptance</Text>
          <Text style={styles.lastUpdate}>Last update: 3 Minutes ago</Text>
        </View>
        <Image source={require('../../assets/StartDelivery/Map.png')} style={styles.mapImg} resizeMode="cover" />
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>{parcel?.senderName || 'David'} (Sender)</Text>
          <View style={styles.cardRow}>
            <View style={styles.dotGreen} />
            <Text style={styles.cardAddress}>{parcel?.from || '1-10, Halmart apartments, BTM Layout, Bangalore, 561011'}</Text>
          </View>
          <View style={styles.cardRow}>
            <View style={styles.dotRed} />
            <Text style={styles.cardAddress}>{parcel?.to || '1-10, Halmart apartments, BTM Layout, Bangalore, 561012'}</Text>
          </View>
        </View>
        <View style={styles.timelineRow}>
          <Image source={require('../../assets/StartDelivery/Step circle.png')} style={styles.timelineIcon} />
          <Text style={styles.timelineText}>Parcel handed over to the delivery person.</Text>
        </View>
        <View style={styles.amountRow}>
          <TouchableOpacity style={styles.acceptBtn}>
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectBtn}>
            <Text style={styles.rejectText}>Reject</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.deliveredText}>Parcel Delivered</Text>
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
  summary: {
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
  mapImg: {
    width: '90%',
    height: 180,
    alignSelf: 'center',
    borderRadius: 12,
    marginBottom: 16,
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
  cardAddress: {
    color: '#222',
    fontSize: 13,
    marginLeft: 8,
    flex: 1,
  },
  dotGreen: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00C37A',
  },
  dotRed: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F87171',
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  timelineIcon: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  timelineText: {
    color: '#222',
    fontSize: 14,
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
  deliveredText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default ParcelMapView;
