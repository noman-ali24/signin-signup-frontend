import React, { useState } from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ROUTES } from '../../constants/routes';
import { MovcaPinLogo, HourglassIcon } from '../../assets/icons';
import { BottomNavBar, NavTabType } from '../../components/BottomNavBar';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/slices/authSlice';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [activeTab, setActiveTab] = useState<NavTabType>('home');

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Do you want to log out of your account?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          dispatch(logout());
          navigation.reset({
            index: 0,
            routes: [{ name: ROUTES.SIGN_IN }],
          });
        },
      },
    ]);
  };

  const handleTabChange = (tab: NavTabType) => {
    setActiveTab(tab);
    if (tab === 'profile') {
      // Allow sign out from profile tab
      Alert.alert(
        'Account Profile',
        `Logged in as: ${user?.name || 'User'}\nEmail: ${user?.email || 'user@autopulse.app'}`,
        [
          { text: 'OK', onPress: () => setActiveTab('home') },
          {
            text: 'Sign Out',
            style: 'destructive',
            onPress: handleLogout,
          },
        ]
      );
    }
  };

  // Capitalize name or fallback
  const displayName = user?.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
    : 'User';

  return (
    <View style={styles.screenContainer}>
      <StatusBar barStyle="light-content" />

      {/* Top Petrol Header */}
      <View style={styles.header}>
        <SafeAreaView>
          {/* Brand Logo Row */}
          <View style={styles.brandRow}>
            <MovcaPinLogo size={28} color="#FFFFFF" carColor="#06252E" />
            <Text style={styles.brandTitle}>AUTOPULSE</Text>
          </View>

          {/* User Welcome Message */}
          <Text style={styles.welcomeTitle}>Welcome, {displayName}</Text>
          <Text style={styles.subtitle}>AUTOPULSE, got u covered</Text>
        </SafeAreaView>
      </View>

      {/* Center Account Review Section */}
      <View style={styles.centerSection}>
        {/* Circular Progress Gauge with Hourglass */}
        <View style={styles.gaugeContainer}>
          <Svg width={114} height={114} viewBox="0 0 114 114">
            {/* Background Track Circle */}
            <Circle
              cx="57"
              cy="57"
              r="48"
              stroke="#CBD2D5"
              strokeWidth="11"
              fill="#CBD2D5"
            />
            {/* Active Dark Petrol Progress Arc */}
            <Circle
              cx="57"
              cy="57"
              r="48"
              stroke="#06252E"
              strokeWidth="11"
              fill="none"
              strokeDasharray="301.6"
              strokeDashoffset="175"
              strokeLinecap="round"
              transform="rotate(-90 57 57)"
            />
          </Svg>

          {/* Centered Vector Hourglass */}
          <View style={styles.hourglassWrapper}>
            <HourglassIcon size={36} color="#06252E" />
          </View>
        </View>

        {/* Status Text */}
        <Text style={styles.reviewText}>Your account is under Review</Text>
      </View>

      {/* Floating Bottom Navigation Bar */}
      <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#ECEFF1',
  },
  header: {
    backgroundColor: '#06252E',
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 28) + 18 : 20,
    paddingBottom: 54,
    // Soft drop shadow under header
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 24,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  welcomeTitle: {
    fontSize: 27,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#7F9FA9',
    letterSpacing: 0.2,
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 50,
  },
  gaugeContainer: {
    width: 114,
    height: 114,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 26,
  },
  hourglassWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#708389',
    letterSpacing: 0.2,
    textAlign: 'center',
  },
});
