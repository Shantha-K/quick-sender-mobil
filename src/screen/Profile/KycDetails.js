import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const arrowImg = require('../../assets/Profile/Arrow.png');
const dropdownImg = require('../../assets/Profile/Vector2.png');
const cameraImg = require('../../assets/Profile/fcamra.png');

const KycDetails = () => {
  const navigation = useNavigation();
  const [idType, setIdType] = useState('');
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={arrowImg} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>KYC Details</Text>
        <View style={{width: 24}} />
      </View>
      <View style={styles.form}>
        <TouchableOpacity style={styles.dropdown} activeOpacity={0.7}>
          <Text style={styles.dropdownText}>{idType ? idType : 'Select ID Proof Type'}</Text>
          <Image source={dropdownImg} style={styles.dropdownIcon} />
        </TouchableOpacity>
        <Text style={styles.infoText}>
          Upload front & back side of your ID Proof.{"\n"}Supports : JPG, PNG, PDF.
        </Text>
        <View style={styles.uploadRow}>
          <TouchableOpacity style={styles.uploadBox} activeOpacity={0.7}>
            <Image source={cameraImg} style={styles.cameraIcon} />
            <Text style={styles.uploadLabel}>Front</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadBox} activeOpacity={0.7}>
            <Image source={cameraImg} style={styles.cameraIcon} />
            <Text style={styles.uploadLabel}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
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
    marginTop: 8,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  arrowIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    letterSpacing: 0.2,
  },
  form: {
    paddingHorizontal: 16,
    marginBottom: 24,
    marginTop: 24,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: '#bbb',
    borderRadius: 14,
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginBottom: 32,
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 16,
    color: '#aaa',
    flex: 1,
    fontWeight: '400',
  },
  dropdownIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  infoText: {
    fontSize: 17,
    color: '#aaa',
    marginBottom: 32,
    textAlign: 'left',
    fontWeight: '400',
    lineHeight: 24,
  },
  uploadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 16,
  },
  uploadBox: {
    flex: 1,
    height: 120,
    borderWidth: 1.2,
    borderColor: '#bbb',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 0,
    backgroundColor: '#fff',
    marginLeft: 8,
    marginRight: 8,
    aspectRatio: 1.5,
    maxWidth: 180,
  },
  cameraIcon: {
    width: 32,
    height: 32,
    marginBottom: 10,
    resizeMode: 'contain',
    tintColor: '#888',
  },
  uploadLabel: {
    fontSize: 16,
    color: '#888',
    fontWeight: '400',
    marginTop: 4,
  },
  saveBtn: {
    backgroundColor: '#00C180',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 24,
  },
  saveText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default KycDetails;
