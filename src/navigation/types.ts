import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { ROUTES } from '../constants/routes';

export type RootStackParamList = {
  [ROUTES.SPLASH]: undefined;
  [ROUTES.SIGN_IN]: undefined;
  [ROUTES.SIGN_UP_STEP_1]: undefined;
  [ROUTES.SIGN_UP_PHONE]: undefined;
  [ROUTES.SIGN_UP_PASSKEY]: undefined;
  [ROUTES.SIGN_UP_TERMS]: undefined;
  [ROUTES.FORGOT_PASSWORD]: undefined;
  [ROUTES.HOME]: undefined;
};

export type RootNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export type RootRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
