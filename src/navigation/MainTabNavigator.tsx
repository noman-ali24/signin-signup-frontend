import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { ROUTES } from '../constants/routes';
import {
  NavHomeIcon,
  NavWalletIcon,
  NavDocumentIcon,
  NavProfileIcon,
} from '../assets/icons';
import { HomeScreen } from '../screens/app/HomeScreen';
import { WalletScreen } from '../screens/app/WalletScreen';
import { OrdersScreen } from '../screens/app/OrdersScreen';
import { ProfileScreen } from '../screens/app/ProfileScreen';

export type MainTabParamList = {
  [ROUTES.HOME_TAB]: undefined;
  [ROUTES.WALLET]: undefined;
  [ROUTES.ORDERS]: undefined;
  [ROUTES.PROFILE]: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const currentRouteName = state.routes[state.index].name;

  return (
    <View style={styles.floatingContainer}>
      {/* Home Tab */}
      <TouchableOpacity
        style={[
          styles.tabButton,
          currentRouteName === ROUTES.HOME_TAB
            ? styles.activeTabButton
            : styles.inactiveTabButton,
        ]}
        onPress={() => navigation.navigate(ROUTES.HOME_TAB)}
        activeOpacity={0.85}
      >
        <NavHomeIcon
          size={22}
          color={currentRouteName === ROUTES.HOME_TAB ? '#FFFFFF' : '#76949C'}
        />
        {currentRouteName === ROUTES.HOME_TAB ? (
          <View style={styles.activeIndicator} />
        ) : null}
      </TouchableOpacity>

      {/* Wallet Tab */}
      <TouchableOpacity
        style={[
          styles.tabButton,
          currentRouteName === ROUTES.WALLET
            ? styles.activeTabButton
            : styles.inactiveTabButton,
        ]}
        onPress={() => navigation.navigate(ROUTES.WALLET)}
        activeOpacity={0.85}
      >
        <NavWalletIcon
          size={22}
          color={currentRouteName === ROUTES.WALLET ? '#FFFFFF' : '#76949C'}
        />
        {currentRouteName === ROUTES.WALLET ? (
          <View style={styles.activeIndicator} />
        ) : null}
      </TouchableOpacity>

      {/* Orders Tab */}
      <TouchableOpacity
        style={[
          styles.tabButton,
          currentRouteName === ROUTES.ORDERS
            ? styles.activeTabButton
            : styles.inactiveTabButton,
        ]}
        onPress={() => navigation.navigate(ROUTES.ORDERS)}
        activeOpacity={0.85}
      >
        <NavDocumentIcon
          size={22}
          color={currentRouteName === ROUTES.ORDERS ? '#FFFFFF' : '#76949C'}
        />
        {currentRouteName === ROUTES.ORDERS ? (
          <View style={styles.activeIndicator} />
        ) : null}
      </TouchableOpacity>

      {/* Profile Tab */}
      <TouchableOpacity
        style={[
          styles.tabButton,
          currentRouteName === ROUTES.PROFILE
            ? styles.activeTabButton
            : styles.inactiveTabButton,
        ]}
        onPress={() => navigation.navigate(ROUTES.PROFILE)}
        activeOpacity={0.85}
      >
        <NavProfileIcon
          size={22}
          color={currentRouteName === ROUTES.PROFILE ? '#FFFFFF' : '#76949C'}
        />
        {currentRouteName === ROUTES.PROFILE ? (
          <View style={styles.activeIndicator} />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME_TAB}
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name={ROUTES.HOME_TAB} component={HomeScreen} />
      <Tab.Screen name={ROUTES.WALLET} component={WalletScreen} />
      <Tab.Screen name={ROUTES.ORDERS} component={OrdersScreen} />
      <Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 16,
    right: 16,
    height: 76,
    backgroundColor: '#38555E',
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  tabButton: {
    width: 54,
    height: 54,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#026E86',
  },
  inactiveTabButton: {
    backgroundColor: '#1C3840',
  },
  activeIndicator: {
    width: 16,
    height: 3.5,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    marginTop: 4,
  },
});
