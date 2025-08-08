import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const arrowImg = require('../../assets/Profile/Arrow.png');

const notificationsData = [
  {
    date: 'Today',
    items: [
      {
        title: 'Parcel has been Delivered',
        desc: 'Your parcel has been successfully delivered',
      },
      {
        title: 'Parcel has been Picked',
        desc: 'Your parcel has been successfully picked up by delivery person',
      },
    ],
  },
  {
    date: '11-04-2023',
    items: [
      {
        title: 'Parcel has been Delivered',
        desc: 'Your parcel has been successfully delivered',
      },
      {
        title: 'Parcel has been Picked',
        desc: 'Your parcel has been successfully picked up by delivery person',
      },
    ],
  },
];

const Notifications = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.safeArea}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={arrowImg} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{width: 24}} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {notificationsData.map((section, idx) => (
          <View key={section.date}>
            <Text style={styles.sectionDate}>{section.date}</Text>
            {section.items.map((item, i) => (
              <View key={i} style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.desc}</Text>
              </View>
            ))}
          </View>
        ))}
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    letterSpacing: 0.2,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  sectionDate: {
    fontSize: 18,
    color: '#bbb',
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 12,
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 16,
    color: '#222',
    fontWeight: '400',
  },
});

export default Notifications;
