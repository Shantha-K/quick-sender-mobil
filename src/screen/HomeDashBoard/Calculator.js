import React, { useEffect } from 'react';
const Calculator = ({ navigation }) => {
  useEffect(() => {
    navigation.replace('RateCalculator');
  }, [navigation]);
  return null;
};
export default Calculator;