import React from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Image } from 'react-native';

const CustomDropdown = ({ label, value, options, onSelect, placeholder }) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <View style={{ marginBottom: 12 }}>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ color: value ? '#222' : '#B0B0B0', fontSize: 16 }}>
            {value ? value : placeholder || label}
          </Text>
          <Image
            source={require('../assets/DashBoard/Down.png')}
            style={{ width: 16, height: 16, resizeMode: 'contain', tintColor: '#B0B0B0' }}
          />
        </View>
      </TouchableOpacity>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.dropdown}>
            <FlatList
              data={options}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#fff',
    height: 44,
  },
  dropdownIcon: {
    width: 18,
    height: 18,
    marginLeft: 8,
    tintColor: '#B0B0B0',
  },
  dropdownArrowFallback: {
    fontSize: 18,
    color: '#B0B0B0',
    marginLeft: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 300,
    maxHeight: 320,
    paddingVertical: 8,
    elevation: 8,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 16,
    color: '#222',
  },
});

export default CustomDropdown;
