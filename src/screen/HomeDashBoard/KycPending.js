// import React from 'react';
// import { View, Text, StyleSheet, Image } from 'react-native';

// const steps = [
//   { key: 1, label: 'Complete KYC', icon: require('../../assets/DashBoard/Group.png') },
//   { key: 2, label: 'Receive orders', icon: require('../../assets/DashBoard/Box.png') },
//   { key: 3, label: 'Deliver Orders', icon: require('../../assets/DashBoard/Delivery.png') },
//   { key: 4, label: 'Earn money', icon: require('../../assets/DashBoard/Group.png') },
// ];

// const KycPending = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Delivery partnerrrr</Text>
//       <Text style={styles.subtitle}>Just a few steps to complete and then you can start earning with dotpixel</Text>

//       {/* KYC Pending Card */}
//       <View style={styles.kycCard}>
//         <View style={styles.kycRow}>
//           <View style={styles.kycIconWrapper}>
//             <Image source={require('../../assets/DashBoard/Group.png')} style={styles.kycIcon} />
//           </View>
//           <View style={{ flex: 1 }}>
//             <Text style={styles.kycTitle}>KYC Pending</Text>
//             <Text style={styles.kycDesc}>Waiting to verify your KYC Details</Text>
//           </View>
//         </View>
//         {/* Progress Bar */}
//         <View style={styles.progressBarBg}>
//           <View style={styles.progressBarFill} />
//         </View>
//       </View>

//       {/* Steps */}
//       <Text style={styles.stepsTitle}>Steps to work as a delivery partner</Text>
//       <View style={styles.stepsWrapper}>
//         {/* Vertical line for all steps except last */}
//         <View style={styles.verticalLine} pointerEvents="none" />
//         {steps.map((step, idx) => (
//           <View key={step.key} style={styles.stepItem}>
//             <Image source={step.icon} style={[styles.stepIcon, idx === 0 ? styles.activeStepIcon : styles.inactiveStepIcon]} />
//             <View style={styles.stepTextWrapper}>
//               <Text style={[styles.stepNum, idx === 0 ? styles.activeStepNum : styles.inactiveStepNum]}>Step {step.key}</Text>
//               <Text style={[styles.stepLabel, idx === 0 ? styles.activeStepLabel : styles.inactiveStepLabel]}>{step.label}</Text>
//             </View>
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//     paddingTop: 32,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#222',
//     marginBottom: 4,
//     marginLeft: 4,
//   },
//   subtitle: {
//     fontSize: 13,
//     color: '#888',
//     marginBottom: 24,
//     marginLeft: 4,
//   },
//   kycCard: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 28,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 8,
//     elevation: 2,
//     borderWidth: 1,
//     borderColor: '#F2F2F2',
//   },
//   kycRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   kycIconWrapper: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: '#FFA726',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   kycIcon: {
//     width: 32,
//     height: 32,
//     resizeMode: 'contain',
//     tintColor: '#fff',
//   },
//   kycTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#222',
//     marginBottom: 2,
//   },
//   kycDesc: {
//     fontSize: 13,
//     color: '#888',
//     marginBottom: 8,
//   },
//   progressBarBg: {
//     height: 6,
//     backgroundColor: '#F2F2F2',
//     borderRadius: 3,
//     marginTop: 8,
//     marginBottom: 2,
//     overflow: 'hidden',
//   },
//   progressBarFill: {
//     height: 6,
//     width: '40%',
//     backgroundColor: '#22C55E',
//     borderRadius: 3,
//   },
//   stepsTitle: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#222',
//     marginBottom: 16,
//     marginLeft: 4,
//   },
//   stepsWrapper: {
//     marginTop: 0,
//     marginBottom: 24,
//     position: 'relative',
//     paddingLeft: 0,
//     paddingRight: 0,
//     minHeight: 220,
//     justifyContent: 'center',
//   },
//   verticalLine: {
//     position: 'absolute',
//     left: 31,
//     top: 16,
//     width: 2,
//     height: 180,
//     backgroundColor: '#E0E0E0',
//     zIndex: 0,
//   },
//   stepItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 0,
//     minHeight: 48,
//     position: 'relative',
//     zIndex: 1,
//   },
//   stepIcon: {
//     width: 32,
//     height: 32,
//     marginRight: 16,
//     resizeMode: 'contain',
//   },
//   activeStepIcon: {
//     tintColor: '#BDBDBD',
//     backgroundColor: '#fff',
//   },
//   inactiveStepIcon: {
//     tintColor: '#BDBDBD',
//   },
//   stepTextWrapper: {
//     flex: 1,
//   },
//   stepNum: {
//     fontSize: 13,
//     fontWeight: 'bold',
//     marginBottom: 2,
//   },
//   activeStepNum: {
//     color: '#F87171',
//   },
//   inactiveStepNum: {
//     color: '#BDBDBD',
//   },
//   stepLabel: {
//     fontSize: 15,
//     fontWeight: '500',
//     marginBottom: 12,
//   },
//   activeStepLabel: {
//     color: '#F87171',
//   },
//   inactiveStepLabel: {
//     color: '#BDBDBD',
//   },
// });

// export default KycPending;
