import RateCalculator from '../screen/Calculator/RateCalculator';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Onboarding screens start
import Splash from '../screen/Onboarding/Splash';
import Welcome from '../screen/Onboarding/Welcome';
import TrackParcel from '../screen/Onboarding/TrackParcel';
import GetStarted from '../screen/Onboarding/GetStarted';
import Login from '../screen/Onboarding/Login';
import OtpVerification from '../screen/Onboarding/OtpVerification';
import RegisterAccount from '../screen/Onboarding/RegisterAccount';


//Profile screen starts
import Profile from '../screen/Profile/Profile';
import EditProfile from '../screen/Profile/EditProfile';
import KycDetails from '../screen/Profile/KycDetails';
import Notifications from '../screen/Profile/Notifications';
import SentParcels from '../screen/Profile/SentParcels';
import DeliveredParcels from '../screen/Profile/DeliveredParcels';
import MyWallet from '../screen/Profile/MyWallet';
import PrivacyPolicy from '../screen/Profile/PrivacyPolicy';
import TermsConditions from '../screen/Profile/TermsConditions'
//Profile screen ends


//Home screen starts
import Home from '../screen/HomeDashBoard/Home';
import SenderForm from '../screen/Send Parcel/SenderForm';
import ReceiverForm from '../screen/Send Parcel/ReceiverForm';
import ParcelCategoryForm from '../screen/Send Parcel/ParcelCategoryForm';
import KycPending from '../screen/HomeDashBoard/KycPending';
import SummaryScreen from '../screen/Send Parcel/SummaryScreen';
import PartnerStartDelivery from '../screen/HomeDashBoard/PartnerStartDelivery';
import Partner from '../screen/HomeDashBoard/Partner';
import DeliveryParcels from '../screen/StartDelivery/DeliveryParcels';
import ParcelDetails from '../screen/StartDelivery/ParcelDetails';
import ParcelMapView from '../screen/StartDelivery/ParcelMapView';
//Home screen ends

import MyWalletScreen from '../screen/Wallet/MyWalletScreen'; // Importing MyWalletScreen
import TopUpWallet from '../screen/Wallet/TopUpWallet';
import TransactionHistory from '../screen/Wallet/TransactionHistory';
import SendParcelOtpVerification from '../screen/Send Parcel/SendParcelOtpVerification';
import WithDrawScreen from '../screen/Wallet/WithDrawScreen'; // Importing WithDrawScreen
import AddBankAccount from '../screen/Wallet/AddBankAccount';

const Stack = createStackNavigator();

const AppRouter = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}> 

      {/* Onboarding screens start */}
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="TrackParcel" component={TrackParcel} />
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="RegisterAccount" component={RegisterAccount} />


      {/* Profile Screen starts */}

      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="KycDetails" component={KycDetails} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="SentParcels" component={SentParcels} />
      <Stack.Screen name="DeliveredParcels" component={DeliveredParcels} />
      <Stack.Screen name="MyWallet" component={MyWallet} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />
      
      {/* Profile Screen ends */}

      {/* Home screen starts */}
      <Stack.Screen name="Home" component={Home} />
  <Stack.Screen name="SenderForm" component={SenderForm} />
  <Stack.Screen name="ReceiverForm" component={ReceiverForm} />
  <Stack.Screen name="ParcelCategoryForm" component={ParcelCategoryForm} />
  <Stack.Screen name="KycPending" component={KycPending} />
  <Stack.Screen name="SummaryScreen" component={SummaryScreen} />
  <Stack.Screen name="PartnerStartDelivery" component={PartnerStartDelivery} />
  <Stack.Screen name="DeliveryParcels" component={DeliveryParcels} />
  <Stack.Screen name="ParcelDetails" component={ParcelDetails} />
  <Stack.Screen name="ParcelMapView" component={ParcelMapView} />
  <Stack.Screen name="Partner" component={Partner} />
      {/* Home screen ends */}

  <Stack.Screen name="MyWalletScreen" component={MyWalletScreen} />
  <Stack.Screen name="TopUpWallet" component={TopUpWallet} />
  <Stack.Screen name="RateCalculator" component={RateCalculator} />
  <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
  <Stack.Screen name="SendParcelOtpVerification" component={SendParcelOtpVerification} />
  <Stack.Screen name="WithDrawScreen" component={WithDrawScreen} />
  <Stack.Screen name="AddBankAccount" component={AddBankAccount} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppRouter;
