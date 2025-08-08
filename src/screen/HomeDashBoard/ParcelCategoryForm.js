import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
} from 'react-native';

const PARCEL_CATEGORIES = [
  'Documents',
  'Electronics',
  'Clothing',
  'Food',
  'Other',
];

const ParcelCategoryForm = ({ navigation }) => {
  const [category, setCategory] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!category.trim()) newErrors.category = 'Parcel Category is required';
    if (!weight.trim()) newErrors.weight = 'Parcel Weight is required';
    if (!length.trim()) newErrors.length = 'Parcel Length is required';
    if (!width.trim()) newErrors.width = 'Parcel Width is required';
    if (!height.trim()) newErrors.height = 'Parcel Height is required';
    if (!amount.trim()) newErrors.amount = 'Parcel Estimated Amount is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      navigation && navigation.navigate('SomeNextScreen');
    }
  };

  const renderError = field =>
    errors[field] ? (
      <Text style={styles.errorText}>{errors[field]}</Text>
    ) : null;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation && navigation.goBack()}
            style={styles.backBtn}
          >
            <Image
              source={require('../../assets/Profile/Arrow.png')}
              style={styles.backArrowImg}
            />
          </TouchableOpacity>
          <Text style={styles.header}>Send Parcel</Text>
          <View style={{ width: 32 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Parcel Category */}
          <View style={styles.fieldWrapper}>
            <TouchableOpacity
              style={styles.inputBox}
              onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
              activeOpacity={0.8}
            >
              <View style={styles.dropdownRow}>
                <Text
                  style={[
                    styles.input,
                    { color: category ? '#222' : '#bdbdbd' },
                  ]}
                >
                  {category || 'Parcel Category'}
                </Text>
                <Image
                  source={require('../../assets/Sender/Vector2.png')}
                  style={styles.dropdownArrowImg}
                />
              </View>
            </TouchableOpacity>
            {renderError('category')}
            {showCategoryDropdown && (
              <View style={styles.dropdownList}>
                {PARCEL_CATEGORIES.map(cat => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => {
                      setCategory(cat);
                      setShowCategoryDropdown(false);
                      if (errors.category)
                        setErrors(prev => ({ ...prev, category: undefined }));
                    }}
                  >
                    <Text style={styles.dropdownItem}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Weight */}
          <View style={styles.fieldWrapper} >
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Parcel Weight (kg)"
                placeholderTextColor="#bdbdbd"
                value={weight}
                onChangeText={text => {
                  setWeight(text);
                  if (errors.weight)
                    setErrors(prev => ({ ...prev, weight: undefined }));
                }}
                keyboardType="numeric"
              />
            </View>
            {renderError('weight')}
          </View>

          {/* Length */}
          <View style={styles.fieldWrapper}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Parcel Length (cm)"
                placeholderTextColor="#bdbdbd"
                value={length}
                onChangeText={text => {
                  setLength(text);
                  if (errors.length)
                    setErrors(prev => ({ ...prev, length: undefined }));
                }}
                keyboardType="numeric"
              />
            </View>
            {renderError('length')}
          </View>

          {/* Width */}
          <View style={styles.fieldWrapper}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Parcel Width (cm)"
                placeholderTextColor="#bdbdbd"
                value={width}
                onChangeText={text => {
                  setWidth(text);
                  if (errors.width)
                    setErrors(prev => ({ ...prev, width: undefined }));
                }}
                keyboardType="numeric"
              />
            </View>
            {renderError('width')}
          </View>

          {/* Height */}
          <View style={styles.fieldWrapper}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Parcel Height (cm)"
                placeholderTextColor="#bdbdbd"
                value={height}
                onChangeText={text => {
                  setHeight(text);
                  if (errors.height)
                    setErrors(prev => ({ ...prev, height: undefined }));
                }}
                keyboardType="numeric"
              />
            </View>
            {renderError('height')}
          </View>

          {/* Amount */}
          <View style={styles.fieldWrapper}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Parcel Estimated Amount"
                placeholderTextColor="#bdbdbd"
                value={amount}
                onChangeText={text => {
                  setAmount(text);
                  if (errors.amount)
                    setErrors(prev => ({ ...prev, amount: undefined }));
                }}
                keyboardType="numeric"
              />
            </View>
            {renderError('amount')}
          </View>
        </ScrollView>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.nextBtn}
          activeOpacity={0.85}
          onPress={handleContinue}
        >
          <Text style={styles.nextBtnText}>Continue</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 56 : 32,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    top: Platform.OS === 'ios' ? 56 : 32,
    zIndex: 2,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrowImg: { width: 28, height: 28, resizeMode: 'contain' },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    left: 15,
    top: -2,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 120,
  },
  fieldWrapper: { marginBottom: 30 }, // consistent gap between fields
  inputBox: {
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 14,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
  },
  input: {
    fontSize: 17,
    color: '#222',
    paddingVertical: 16,
    paddingHorizontal: 0,
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownArrowImg: {
    width: 18,
    height: 18,
    marginRight: 8,
    resizeMode: 'contain',
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 12,
    marginTop: 8, // ensures it doesn't overlap with input
  },
  dropdownItem: {
    fontSize: 17,
    color: '#222',
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  errorText: {
    color: '#F15B5D',
    fontSize: 13,
    marginTop: 4,
    marginLeft: 4,
  },
  nextBtn: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#00C37A',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ParcelCategoryForm;
