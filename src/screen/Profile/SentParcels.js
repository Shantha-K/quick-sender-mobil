import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const arrowImg = require('../../assets/Profile/Arrow.png');
const rightImg = require('../../assets/Profile/Right.png');

const TABS = [
  { label: 'Pending' },
  { label: 'Completed' },
  { label: 'Cancelled' },
];

const parcelsData = [
  {
    id: '00359007738060313786',
    status: 'On the way to pick up location',
    time: 'Last update: 3 hours ago',
    progress: 0.2,
  },
  {
    id: '00806031378690077312',
    status: 'Parcel Picked',
    time: 'Last update: 21 hours ago',
    progress: 0.35,
  },
  {
    id: '00690077312806031378',
    status: 'Parcel on the way',
    time: 'Last update: 2 days ago',
    progress: 0.7,
  },
];

const SentParcels = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(0); // 0 = Pending
  return (
    <View style={styles.safeArea}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={arrowImg} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sent Parcels</Text>
        <View style={{width: 24}} />
      </View>
      <View style={styles.tabsRow}>
        {TABS.map((tab, idx) => (
          <TouchableOpacity
            key={tab.label}
            style={[styles.tabBtn, activeTab === idx && styles.tabBtnActive]}
            onPress={() => setActiveTab(idx)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === idx && styles.tabTextActive]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Pending Tab */}
        {activeTab === 0 && parcelsData.map((parcel, idx) => (
          <View style={styles.card} key={parcel.id}>
            <Text style={styles.parcelId}>{parcel.id}</Text>
            <Text style={styles.statusLabel}>{parcel.status}</Text>
            <Text style={styles.statusTime}>{parcel.time}</Text>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarPending, { width: `${parcel.progress * 100}%` }]} />
            </View>
            <TouchableOpacity style={styles.detailsRow} activeOpacity={0.7}>
              <View style={styles.detailsTextRow}>
                <Text style={styles.detailsText}>Details</Text>
                <Image source={rightImg} style={styles.detailsImg} />
              </View>
            </TouchableOpacity>
          </View>
        ))}
        {/* Completed Tab */}
        {activeTab === 1 && parcelsData.map((parcel, idx) => (
          <View style={styles.card} key={parcel.id}>
            <Text style={styles.parcelId}>{parcel.id}</Text>
            <Text style={styles.statusLabel}>Parcel Delivered</Text>
            <Text style={styles.statusTime}>{parcel.time}</Text>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarPending, { width: '100%' }]} />
            </View>
            <TouchableOpacity style={styles.detailsRow} activeOpacity={0.7}>
              <View style={styles.detailsTextRow}>
                <Text style={styles.detailsText}>Details</Text>
                <Image source={rightImg} style={styles.detailsImg} />
              </View>
            </TouchableOpacity>
          </View>
        ))}
        {/* Cancelled Tab */}
        {activeTab === 2 && (
          <View style={styles.card}>
            <Text style={styles.parcelId}>00359007738060313786</Text>
            <Text style={styles.statusLabelCancelled}>Cancelled</Text>
            <Text style={styles.statusTime}>Last update: 3 hours ago</Text>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarCancelled, { width: '30%' }]} />
            </View>
            <TouchableOpacity style={styles.detailsRow} activeOpacity={0.7}>
              <View style={styles.detailsTextRow}>
                <Text style={styles.detailsText}>Details</Text>
                <Image source={rightImg} style={styles.detailsImg} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
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
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  arrowIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    letterSpacing: 0.2,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 24,
    marginTop: 8,
  },
  tabBtn: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    paddingVertical: 14,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBtnActive: {
    backgroundColor: '#00C180',
  },
  tabText: {
    fontSize: 17,
    color: '#222',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  parcelId: {
    fontSize: 18,
    color: '#111',
    fontWeight: '500',
    marginBottom: 18,
  },
  statusLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
  },
  statusLabelCancelled: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E57373',
    marginBottom: 4,
  },
  statusTime: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 12,
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    backgroundColor: '#f6f6f6',
    borderRadius: 4,
    marginBottom: 18,
    overflow: 'hidden',
  },
  progressBarPending: {
    height: '100%',
    backgroundColor: '#00C180',
    borderRadius: 4,
  },
  progressBarCancelled: {
    height: '100%',
    backgroundColor: '#E57373',
    borderRadius: 4,
  },
  detailsRow: {
    marginTop: 8,
    alignItems: 'flex-end',
  },
  detailsTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#111',
    paddingBottom: 2,
    alignSelf: 'flex-start',
  },
  detailsText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111',
    marginRight: 6,
  },
  detailsImg: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: 2,
  },
});

export default SentParcels;
