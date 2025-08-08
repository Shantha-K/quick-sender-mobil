import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const arrowImg = require('../../assets/Profile/Arrow.png');

const sections = [
  {
    title: '1. Types of data we collect',
    content:
      'Lorem ipsum dolor sit amet consectetur. Tortor porta erat at vitae vulputate. Ipsum vulputate nunc netus ultricies volutpat morbi nam. Adipiscing iaculis vel in fringilla posuere. Enim feugiat pellentesque diam imperdiet. Vitae feugiat consequat tristique nisl nunc malesuada. Elit scelerisque eu massa in sit lorem dictumst. Tortor sed aliquam nisl quisque.',
  },
  {
    title: '2. Types of data we collect',
    content:
      'Lorem ipsum dolor sit amet consectetur. Tortor porta erat at vitae vulputate. Ipsum vulputate nunc netus ultricies volutpat morbi nam. Adipiscing iaculis vel in fringilla posuere. Enim feugiat pellentesque diam imperdiet. Vitae feugiat consequat tristique nisl nunc malesuada. Elit scelerisque eu massa in sit lorem dictumst. Tortor sed aliquam nisl quisque.',
  },
  {
    title: '3. Types of data we collect',
    content:
      'Lorem ipsum dolor sit amet consectetur. Tortor porta erat at vitae vulputate. Ipsum vulputate nunc netus ultricies volutpat morbi nam. Adipiscing iaculis vel in fringilla posuere. Enim feugiat pellentesque diam imperdiet. Vitae feugiat consequat tristique nisl nunc malesuada. Elit scelerisque eu massa in sit lorem dictumst. Tortor sed aliquam nisl quisque.',
  },
  {
    title: '4. Types of data we collect',
    content:
      'Lorem ipsum dolor sit amet consectetur. Tortor porta erat at vitae vulputate. Ipsum vulputate nunc netus ultricies volutpat morbi nam. Adipiscing iaculis vel in fringilla posuere. Enim feugiat pellentesque diam imperdiet. Vitae feugiat consequat tristique nisl nunc malesuada. Elit scelerisque eu massa in sit lorem dictumst. Tortor sed aliquam nisl quisque.',
  },
];

const PrivacyPolicy = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.safeArea}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={arrowImg} style={styles.arrowIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {sections.map((section, idx) => (
          <View key={idx} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.bottomBar} />
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: '#222',
    lineHeight: 24,
    marginBottom: 4,
  },
  bottomBar: {
    height: 6,
    backgroundColor: '#111',
    borderRadius: 3,
    width: '30%',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 2,
  },
});

export default PrivacyPolicy;
