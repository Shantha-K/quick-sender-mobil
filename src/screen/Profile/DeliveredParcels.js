import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const deliveryImg = require('../../assets/Profile/Delivery.png');
const arrowImg = require('../../assets/Profile/Arrow.png');

const DeliveredParcels = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Pending');

  // Mock data for completed parcels
  const completedParcels = [
    {
      id: '00359007738060313786',
      price: 30,
      sender: 'Harpreet',
      receiver: 'Malvika',
      weight: 35,
      from: '1-10, Halmat apartments, BTM Layout, Bangalore, 561011',
      to: '1-10, Halmat apartments, BTM Layout, Bangalore, 561012',
      status: 'Parcel Delivered',
      updated: '3 hours ago',
    },
    {
      id: '00359007738060313786',
      price: 30,
      sender: 'Malvika',
      receiver: 'Harpreet',
      weight: 35,
      from: '1-10, Halmat apartments, BTM Layout, Bangalore, 561011',
      to: '1-10, Halmat apartments, BTM Layout, Bangalore, 561012',
      status: 'Parcel Delivered',
      updated: '3 hours ago',
    },
  ];

  // Mock data for cancelled parcels
  const cancelledParcels = [
    {
      id: '00359007738060313786',
      price: 30,
      sender: 'Gowtham',
      weight: 35,
      from: '1-10, Halmat apartments, BTM Layout, Bangalore, 561011',
      to: '1-10, Halmat apartments, BTM Layout, Bangalore, 561012',
      status: 'Parcel Rejected',
      updated: '3 hours ago',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={arrowImg} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivered Parcels</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.tabsRow}>
        {['Pending', 'Completed', 'Cancelled'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'Completed' ? (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 24 }}>
          {completedParcels.map((parcel, idx) => (
            <View key={idx} style={styles.parcelCard}>
              <View style={styles.parcelHeader}>
                <Text style={styles.parcelId}>ID: {parcel.id}</Text>
                <Text style={styles.parcelPrice}>${parcel.price}</Text>
              </View>
              <Text style={styles.parcelName}>{parcel.sender}</Text>
              <Text style={styles.parcelWeight}>{parcel.weight} kg</Text>
              <View style={styles.addressRow}>
                <View style={styles.dotGreen} />
                <Text style={styles.addressText}>{parcel.from}</Text>
              </View>
              <View style={styles.addressRow}>
                <View style={styles.dotRed} />
                <Text style={styles.addressText}>{parcel.to}</Text>
              </View>
              <Text style={styles.statusText}>{parcel.status}</Text>
              <View style={styles.progressBarBg}>
                <View style={styles.progressBarFill} />
              </View>
              <Text style={styles.lastUpdate}>Last update: {parcel.updated}</Text>
            </View>
          ))}
        </ScrollView>
      ) : activeTab === 'Cancelled' ? (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 24 }}>
          {cancelledParcels.map((parcel, idx) => (
            <View key={idx} style={styles.parcelCard}>
              <View style={styles.parcelHeader}>
                <Text style={styles.parcelId}>ID: {parcel.id}</Text>
                <Text style={styles.parcelPrice}>${parcel.price}</Text>
              </View>
              <Text style={styles.parcelName}>{parcel.sender}</Text>
              <Text style={styles.parcelWeight}>{parcel.weight} kg</Text>
              <View style={styles.addressRow}>
                <View style={styles.dotGreen} />
                <Text style={styles.addressText}>{parcel.from}</Text>
              </View>
              <View style={styles.addressRow}>
                <View style={styles.dotRed} />
                <Text style={styles.addressText}>{parcel.to}</Text>
              </View>
              <Text style={styles.statusText}>{parcel.status}</Text>
              <View style={styles.progressBarBg}>
                <View style={styles.progressBarFillRed} />
              </View>
              <Text style={styles.lastUpdate}>Last update: {parcel.updated}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.contentContainer}>
          <Image source={deliveryImg} style={styles.illustration} />
          <Text style={styles.noParcelsText}>No parcels found!</Text>
        </View>
      )}
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
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  tabBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
  },
  tabBtnActive: {
    backgroundColor: '#00C180',
    borderColor: '#00C180',
  },
  tabText: {
    color: '#222',
    fontWeight: '500',
    fontSize: 15,
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: 232,
    height: 247,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  noParcelsText: {
    color: '#BDBDBD',
    fontSize: 15,
    textAlign: 'center',
  },
  parcelCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  parcelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFA726',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 8,
    marginHorizontal: -16,
    marginTop: -16,
    marginBottom: 8,
  },
  parcelId: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  parcelPrice: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  parcelName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 2,
    color: '#222',
  },
  parcelWeight: {
    position: 'absolute',
    right: 16,
    top: 44,
    color: '#00C180',
    fontWeight: 'bold',
    fontSize: 15,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  dotGreen: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00C180',
    marginRight: 8,
  },
  dotRed: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F26A6A',
    marginRight: 8,
  },
  addressText: {
    color: '#222',
    fontSize: 13,
  },
  statusText: {
    fontWeight: 'bold',
    color: '#222',
    marginTop: 8,
    marginBottom: 4,
  },
  progressBarBg: {
    height: 5,
    backgroundColor: '#E5E5E5',
    borderRadius: 3,
    marginBottom: 8,
    marginTop: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 5,
    backgroundColor: '#00C180',
    width: '100%',
  },
  progressBarFillRed: {
    height: 5,
    backgroundColor: '#F26A6A',
    width: '30%',
  },
  lastUpdate: {
    color: '#BDBDBD',
    fontSize: 12,
    marginTop: 2,
  },
});

export default DeliveredParcels;
