import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
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
import {
  MovcaPinLogo,
  UserIcon,
  BellIcon,
  BriefcaseIcon,
  ShieldIcon,
  SettingsIcon,
  HelpCircleIcon,
  DocumentTextIcon,
  LogoutIcon,
  ChevronRightIcon,
  EditIcon,
  TripIcon,
  BookmarkIcon,
  StarIcon,
} from '../../assets/icons';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/slices/authSlice';
import { authService, tokenStorage } from '../../services';

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // User details fallback
  const rawName = user?.fullName || user?.name || 'AutoPulse User';
  const email = user?.email || 'user@autopulse.app';
  const phone = user?.phone || '+1 (555) 019-2834';
  const initial = rawName.charAt(0).toUpperCase();

  const confirmLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out of your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: performLogout,
        },
      ]
    );
  };

  const performLogout = async () => {
    try {
      setIsLoggingOut(true);
      const token = await tokenStorage.getToken();
      if (token) {
        await authService.logout(token);
      }
    } catch (err) {
      console.log('Error during logout:', err);
    } finally {
      await tokenStorage.clearToken();
      dispatch(logout());
      setIsLoggingOut(false);
      navigation.reset({
        index: 0,
        routes: [{ name: ROUTES.SIGN_IN }],
      });
    }
  };

  const handleNotificationPress = () => {
    Alert.alert('Notifications', 'No new profile notifications.');
  };

  const handleEditProfile = () => {
    Alert.alert(
      'Edit Profile',
      `Current Details:\n\n• Name: ${rawName}\n• Email: ${email}\n• Phone: ${phone}\n\nProfile editing preferences can be updated in Personal Information.`,
      [{ text: 'Close', style: 'cancel' }]
    );
  };

  const menuItems = [
    {
      id: 'personal',
      title: 'Personal Information',
      subtitle: 'Name, email & phone number',
      icon: <UserIcon size={20} color={COLORS.primary} />,
      onPress: () =>
        Alert.alert(
          'Personal Information',
          `Full Name: ${rawName}\nEmail: ${email}\nPhone: ${phone}`
        ),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Trip alerts, receipts & promo updates',
      icon: <BellIcon size={20} color={COLORS.primary} />,
      onPress: () =>
        Alert.alert(
          'Notifications',
          'Push notifications for vehicle transport and ride alerts are currently Enabled.'
        ),
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      subtitle: 'Passkey, 2FA & active sessions',
      icon: <ShieldIcon size={20} color={COLORS.primary} />,
      onPress: () =>
        Alert.alert(
          'Privacy & Security',
          'Biometrics & Passkey login are active. Session encryption is enabled.'
        ),
    },
    {
      id: 'settings',
      title: 'Settings',
      subtitle: 'Language, units & dark mode',
      icon: <SettingsIcon size={20} color={COLORS.primary} />,
      onPress: () =>
        Alert.alert(
          'App Settings',
          'System preferences, English (US), Imperial Units, Auto dark-mode sync.'
        ),
    },
    {
      id: 'help',
      title: 'Help & Support',
      subtitle: 'FAQ, 24/7 hotline & emergency towing',
      icon: <HelpCircleIcon size={20} color={COLORS.primary} />,
      onPress: () =>
        Alert.alert(
          'Help & Support',
          'Need roadside assistance or towing help?\n\nDispatch Helpline: +1 (800) 555-AUTO\nSupport: support@autopulse.app'
        ),
    },
    {
      id: 'terms',
      title: 'Terms & Conditions',
      subtitle: 'Service policy, privacy rules & legal info',
      icon: <DocumentTextIcon size={20} color={COLORS.primary} />,
      onPress: () =>
        Alert.alert(
          'Terms & Conditions',
          'AutoPulse Terms of Service & Privacy Policy protect your location data and road transport guarantees.'
        ),
    },
    {
      id: 'logout',
      title: 'Logout',
      subtitle: 'Sign out of your AutoPulse account',
      icon: <LogoutIcon size={20} color="#EF4444" />,
      isDestructive: true,
      onPress: confirmLogout,
    },
  ];

  return (
    <View style={styles.screenContainer}>
      <StatusBar barStyle="light-content" />

      {/* Top Dark Teal Petrol Header - Matching HomeScreen */}
      <View style={styles.header}>
        <SafeAreaView>
          {/* Row 1: Brand & Notification Bell */}
          <View style={styles.headerTopRow}>
            <View style={styles.brandRow}>
              <MovcaPinLogo size={26} color="#FFFFFF" carColor="#06252E" />
              <Text style={styles.brandTitle}>AUTOPULSE</Text>
            </View>

            <TouchableOpacity
              style={styles.bellButton}
              onPress={handleNotificationPress}
              activeOpacity={0.8}
            >
              <BellIcon size={20} color="#06252E" />
              <View style={styles.bellBadge} />
            </TouchableOpacity>
          </View>

          {/* Row 2: Title */}
          <Text style={styles.welcomeTitle}>My Profile</Text>

          {/* Row 3: Account Status */}
          <View style={styles.statusRow}>
            <View style={styles.statusLabelWrap}>
              <BriefcaseIcon size={18} color="#FFFFFF" />
              <Text style={styles.statusLabelText}>Account Status</Text>
            </View>

            <View style={styles.statusTogglePill}>
              <Text style={styles.statusToggleText}>Verified</Text>
              <View
                style={[styles.statusToggleCircle, styles.statusCircleOnline]}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>

      {/* White Curved Sheet Content Area */}
      <View style={styles.sheetContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Hero Card inside White Sheet */}
          <View style={styles.profileHeroCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>{initial}</Text>
              </View>
              <View style={styles.onlineBadge} />
            </View>

            <Text style={styles.userName}>{rawName}</Text>
            <Text style={styles.userEmail}>{email}</Text>

            <TouchableOpacity
              style={styles.editProfileButton}
              activeOpacity={0.85}
              onPress={handleEditProfile}
            >
              <EditIcon size={14} color="#FFFFFF" />
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Statistics Section */}
          <View style={styles.statsContainer}>
            {/* Stat 1: Trips */}
            <View style={styles.statCard}>
              <View style={[styles.statIconWrap, { backgroundColor: '#E0F7F6' }]}>
                <TripIcon size={20} color="#0D9488" />
              </View>
              <Text style={styles.statNumber}>28</Text>
              <Text style={styles.statLabel}>Trips</Text>
            </View>

            {/* Stat 2: Saved Places */}
            <View style={styles.statCard}>
              <View style={[styles.statIconWrap, { backgroundColor: '#E0F2FE' }]}>
                <BookmarkIcon size={20} color="#0284C7" />
              </View>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Saved Places</Text>
            </View>

            {/* Stat 3: Favorites */}
            <View style={styles.statCard}>
              <View style={[styles.statIconWrap, { backgroundColor: '#FEF3C7' }]}>
                <StarIcon size={20} color="#D97706" />
              </View>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
          </View>

          {/* Account Settings Header */}
          <Text style={styles.sectionHeader}>ACCOUNT SETTINGS</Text>

          {/* Menu Items Card Container */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={item.onPress}
                  activeOpacity={0.7}
                  disabled={isLoggingOut}
                >
                  <View
                    style={[
                      styles.menuIconContainer,
                      item.isDestructive && styles.destructiveIconContainer,
                    ]}
                  >
                    {item.id === 'logout' && isLoggingOut ? (
                      <ActivityIndicator size="small" color="#EF4444" />
                    ) : (
                      item.icon
                    )}
                  </View>

                  <View style={styles.menuTextContainer}>
                    <Text
                      style={[
                        styles.menuTitle,
                        item.isDestructive && styles.destructiveText,
                      ]}
                    >
                      {item.title}
                    </Text>
                    {item.subtitle ? (
                      <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                    ) : null}
                  </View>

                  <ChevronRightIcon size={18} color="#94A3B8" />
                </TouchableOpacity>

                {index < menuItems.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#06252E',
  },

  /* Dark Teal Petrol Header */
  header: {
    backgroundColor: '#06252E',
    paddingHorizontal: 20,
    paddingTop:
      Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 12 : 16,
    paddingBottom: 28,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  bellButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellBadge: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#EF4444',
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusLabelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statusTogglePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    gap: 6,
  },
  statusToggleText: {
    fontSize: 12,
    color: '#A0B4B9',
    fontWeight: '500',
  },
  statusToggleCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  statusCircleOnline: {
    backgroundColor: '#22C55E',
  },

  /* White Curved Sheet */
  sheetContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 110,
  },

  /* Profile Hero Card */
  profileHeroCard: {
    backgroundColor: '#072C36',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(2, 110, 134, 0.4)',
    borderWidth: 2.5,
    borderColor: '#026E86',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#22C55E',
    borderWidth: 2.5,
    borderColor: '#072C36',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 14,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#026E86',
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 18,
    gap: 6,
  },
  editProfileText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  /* Statistics */
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8EDF1',
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  statIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 17,
    fontWeight: '800',
    color: '#06252E',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },

  /* Menu List */
  sectionHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8EDF1',
    paddingHorizontal: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  menuIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  destructiveIconContainer: {
    backgroundColor: '#FEE2E2',
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#06252E',
    marginBottom: 2,
  },
  destructiveText: {
    color: '#EF4444',
  },
  menuSubtitle: {
    fontSize: 11,
    color: '#94A3B8',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
});
