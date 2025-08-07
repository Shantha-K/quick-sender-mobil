// src/router/index.js
// This file will be used to set up navigation for the app.
// You can add your navigation stack or tab navigator here.

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Profile screen starts
import Profile from '../screen/Profile/Profile';
import EditProfile from '../screen/Profile/EditProfile';
import KycDetails from '../screen/Profile/KycDetails';
import Notifications from '../screen/Profile/Notifications';
import SentParcels from '../screen/Profile/SentParcels';
import DeliveredParcels from '../screen/Profile/DeliveredParcels';
import MyWallet from '../screen/Profile/MyWallet';
import PrivacyPolicy from '../screen/Profile/PrivacyPolicy';
import TermsConditions from '../screen/Profile/TermsConditions';
//Profile screen ends

const Stack = createStackNavigator();

const AppRouter = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>

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
      
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppRouter;
