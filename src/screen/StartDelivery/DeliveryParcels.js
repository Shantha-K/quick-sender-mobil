import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const mockParcels = [
  {
    id: '00359007738060313786',
    price: 30,
    name: 'James May',
    weight: 35,
    from: '1-10, Halmart apartments, BTM Layout, Bangalore, 561011',
    to: '1-10, Halmart apartments, BTM Layout, Bangalore, 561012',
  },
  {
    id: '00359007738060313786',
    price: 30,
    name: 'Patrick',
    weight: 35,
    from: '1-10, Halmart apartments, BTM Layout, Bangalore, 561011',
    to: '1-10, Halmart apartments, BTM Layout, Bangalore, 561012',
  },
];

const DeliveryParcels = ({ navigation }) => {
  // Set to [] to test empty state, or mockParcels to test list
  const [parcels] = useState(mockParcels); // Replace with real data fetch

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation && navigation.goBack && navigation.goBack()}>
        <Text style={styles.backArrow}>{'\u2039'}</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Deliver Parcels</Text>
      {parcels.length === 0 ? (
        <View style={styles.illustrationWrapper}>
          <Image
            source={require('../../assets/StartDelivery/startdelivary.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
          <Text style={styles.emptyText}>No parcels received{`\n`}yet to deliver</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.listWrapper}>
          {parcels.map((parcel, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => navigation && navigation.navigate && navigation.navigate('ParcelDetails', { parcel })}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardId}>ID: {parcel.id}</Text>
                <Text style={styles.cardPrice}>${parcel.price}</Text>
              </View>
              <View style={styles.cardBody}>
                <View style={styles.cardRow}>
                  <Text style={styles.cardName}>{parcel.name}</Text>
                  <Text style={styles.cardWeight}>{parcel.weight} kg</Text>
                </View>
                <View style={styles.cardRow}>
                  <View style={styles.dotGreen} />
                  <Text style={styles.cardAddress}>{parcel.from}</Text>
                </View>
                <View style={styles.cardRow}>
                  <View style={styles.dotRed} />
                  <Text style={styles.cardAddress}>{parcel.to}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
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
    marginBottom: 32,
    marginTop: 8,
  },
  illustrationWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  emptyText: {
    color: '#B0B0B0',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  listWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F2F2F2',
  },
  cardHeader: {
    backgroundColor: '#FFA726',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cardId: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 13,
  },
  cardPrice: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardBody: {
    padding: 16,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
    flex: 1,
  },
  cardWeight: {
    color: '#00C37A',
    fontWeight: 'bold',
    fontSize: 15,
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
});

export default DeliveryParcels;
