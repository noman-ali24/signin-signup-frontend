import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { ROUTES } from '../constants/routes';

// Screens
import { SplashScreen } from '../screens/splash/SplashScreen';
import { SignInScreen } from '../screens/auth/SignInScreen';
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import { PhoneScreen } from '../screens/auth/PhoneScreen';
import { PasskeyScreen } from '../screens/auth/PasskeyScreen';
import { TermsScreen } from '../screens/auth/TermsScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { HomeScreen } from '../screens/app/HomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ROUTES.SPLASH}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {/* Splash Flow */}
        <Stack.Screen name={ROUTES.SPLASH} component={SplashScreen} />

        {/* Auth Flows */}
        <Stack.Screen name={ROUTES.SIGN_IN} component={SignInScreen} />
        <Stack.Screen name={ROUTES.SIGN_UP_STEP_1} component={SignUpScreen} />
        <Stack.Screen name={ROUTES.SIGN_UP_PHONE} component={PhoneScreen} />
        <Stack.Screen name={ROUTES.SIGN_UP_PASSKEY} component={PasskeyScreen} />
        <Stack.Screen name={ROUTES.SIGN_UP_TERMS} component={TermsScreen} />
        <Stack.Screen
          name={ROUTES.FORGOT_PASSWORD}
          component={ForgotPasswordScreen}
        />

        {/* Protected App Flow */}
        <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
