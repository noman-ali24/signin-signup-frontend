import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ROUTES } from '../../constants/routes';
import { COLORS } from '../../constants/colors';
import { BrandLogo, UserIcon } from '../../assets/icons';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/slices/authSlice';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Top App Header */}
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <BrandLogo size={28} color={COLORS.primary} badgeColor={COLORS.surfaceWhite} />
            <Text style={styles.brandName}>AUTOPULSE</Text>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* User Welcome Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <UserIcon size={32} color={COLORS.primary} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.welcomeLabel}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.name || 'Valued Member'}</Text>
            <Text style={styles.userEmail}>{user?.email || 'authenticated@autopulse.app'}</Text>
            {user?.phone ? <Text style={styles.userPhone}>{user.phone}</Text> : null}
          </View>
        </View>

        {/* Status Badge */}
        <View style={styles.statusCard}>
          <View style={styles.statusDot} />
          <View style={styles.statusTextContainer}>
            <Text style={styles.statusTitle}>Dispatch Network Active</Text>
            <Text style={styles.statusSubtitle}>
              Connected to Golden Touch Technology 24/7 towing & recovery fleet.
            </Text>
          </View>
        </View>

        {/* Quick Action Cards */}
        <Text style={styles.sectionTitle}>Transport Services</Text>

        <View style={styles.servicesGrid}>
          <View style={styles.serviceCard}>
            <Text style={styles.serviceIcon}>🚛</Text>
            <Text style={styles.serviceTitle}>Request Tow Truck</Text>
            <Text style={styles.serviceDesc}>Flatbed & wheel-lift recovery on demand.</Text>
          </View>

          <View style={styles.serviceCard}>
            <Text style={styles.serviceIcon}>📍</Text>
            <Text style={styles.serviceTitle}>Live Transport GPS</Text>
            <Text style={styles.serviceDesc}>Real-time vehicle transport tracking.</Text>
          </View>

          <View style={styles.serviceCard}>
            <Text style={styles.serviceIcon}>🛡️</Text>
            <Text style={styles.serviceTitle}>Roadside Assistance</Text>
            <Text style={styles.serviceDesc}>Battery jumpstart, tire changes & lockout.</Text>
          </View>

          <View style={styles.serviceCard}>
            <Text style={styles.serviceIcon}>📋</Text>
            <Text style={styles.serviceTitle}>Service History</Text>
            <Text style={styles.serviceDesc}>Past invoices, receipts and records.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1.5,
  },
  logoutButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#FFE4E6',
  },
  logoutText: {
    color: '#E11D48',
    fontSize: 13,
    fontWeight: '700',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8EFF2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  welcomeLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    textTransform: 'capitalize',
  },
  userEmail: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  userPhone: {
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 2,
    fontWeight: '600',
  },
  statusCard: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#16A34A',
    marginRight: 12,
  },
  statusTextContainer: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#166534',
    marginBottom: 2,
  },
  statusSubtitle: {
    fontSize: 12,
    color: '#15803D',
    lineHeight: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  servicesGrid: {
    gap: 14,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  serviceIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  serviceDesc: {
    fontSize: 12.5,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});
