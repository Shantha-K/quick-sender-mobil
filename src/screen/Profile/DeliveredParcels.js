import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const deliveryImg = require('../../assets/Profile/Delivery.png');
const arrowImg = require('../../assets/Profile/Arrow.png');

const DeliveredParcels = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Pending');

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
    
      <View style={styles.contentContainer}>
        <Image source={deliveryImg} style={styles.illustration} />
        <Text style={styles.noParcelsText}>No parcels found!</Text>
      </View>
      
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
});

export default DeliveredParcels;
