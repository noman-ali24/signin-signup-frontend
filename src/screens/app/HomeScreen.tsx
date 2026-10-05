import React, { useState } from 'react';
import {
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
import {
  MovcaPinLogo,
  BellIcon,
  BriefcaseIcon,
  RedPinIcon,
} from '../../assets/icons';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateProfile } from '../../redux/slices/authSlice';
import { authService } from '../../services';

interface ActiveRide {
  id: string;
  pickupLocation: string;
  dropLocation: string;
  price: string;
  cancelSeconds: number;
}

const INITIAL_ACTIVE_RIDES: ActiveRide[] = [
  {
    id: '1',
    pickupLocation: 'New Castle, Virginia, .......',
    dropLocation: 'Nor Folk, Virginia, .....',
    price: '$605',
    cancelSeconds: 5,
  },
  {
    id: '2',
    pickupLocation: 'New Castle, Virginia, .......',
    dropLocation: 'Nor Folk, Virginia, .....',
    price: '$605',
    cancelSeconds: 5,
  },
  {
    id: '3',
    pickupLocation: 'Richmond, Virginia, .......',
    dropLocation: 'Chesapeake, Virginia, .....',
    price: '$450',
    cancelSeconds: 8,
  },
];

export const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [rides, setRides] = useState<ActiveRide[]>(INITIAL_ACTIVE_RIDES);

  React.useEffect(() => {
    // Sync latest profile details from backend
    const syncProfile = async () => {
      try {
        const res = await authService.getProfile();
        if (res?.data?.user) {
          dispatch(
            updateProfile({
              id: res.data.user.id,
              fullName: res.data.user.fullName,
              name: res.data.user.fullName,
              email: res.data.user.email,
            })
          );
        }
      } catch {
        // Optional profile sync
      }
    };

    syncProfile();
  }, [dispatch]);

  const handleToggleOnline = () => {
    setIsOnline((prev) => {
      const next = !prev;
      Alert.alert(
        'Working Status',
        next
          ? 'You are now ONLINE and ready to receive ride requests.'
          : 'You are now OFFLINE. New ride requests are paused.'
      );
      return next;
    });
  };

  const handleNotificationPress = () => {
    Alert.alert(
      'Notifications',
      'You have 2 new ride notifications in your area.'
    );
  };

  const handleAcceptRide = (rideId: string) => {
    Alert.alert(
      'Ride Accepted',
      'You have successfully accepted this ride request. Navigation starting...',
      [
        {
          text: 'Start Trip',
          onPress: () => {
            setRides((prev) => prev.filter((r) => r.id !== rideId));
          },
        },
      ]
    );
  };

  const handleDeclineRide = (rideId: string) => {
    Alert.alert(
      'Decline Ride',
      'Are you sure you want to decline this request?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Decline',
          style: 'destructive',
          onPress: () => {
            setRides((prev) => prev.filter((r) => r.id !== rideId));
          },
        },
      ]
    );
  };

  // Capitalize user name or fallback to User
  const rawName = user?.fullName || user?.name || 'User';
  const displayName = rawName
    ? rawName.charAt(0).toUpperCase() + rawName.slice(1)
    : 'User';

  return (
    <View style={styles.screenContainer}>
      <StatusBar barStyle="light-content" />

      {/* Top Dark Teal Petrol Header */}
      <View style={styles.header}>
        <SafeAreaView>
          {/* Row 1: Logo & Notification Button */}
          <View style={styles.headerTopRow}>
            <View style={styles.brandRow}>
              <MovcaPinLogo size={26} color="#FFFFFF" carColor="#06252E" />
              <Text style={styles.brandTitle}>AUTOPULSE</Text>
            </View>

            {/* Circular Bell Button */}
            <TouchableOpacity
              style={styles.bellButton}
              onPress={handleNotificationPress}
              activeOpacity={0.8}
            >
              <BellIcon size={20} color="#06252E" />
              <View style={styles.bellBadge} />
            </TouchableOpacity>
          </View>

          {/* Row 2: Welcome Text */}
          <Text style={styles.welcomeTitle}>Welcome, {displayName}</Text>

          {/* Row 3: Working Status + Online/Offline Pill Toggle */}
          <View style={styles.statusRow}>
            <View style={styles.statusLabelWrap}>
              <BriefcaseIcon size={18} color="#FFFFFF" />
              <Text style={styles.statusLabelText}>Working Status</Text>
            </View>

            <TouchableOpacity
              style={styles.statusTogglePill}
              onPress={handleToggleOnline}
              activeOpacity={0.85}
            >
              <Text style={styles.statusToggleText}>
                {isOnline ? 'Online' : 'Offline'}
              </Text>
              <View
                style={[
                  styles.statusToggleCircle,
                  isOnline
                    ? styles.statusCircleOnline
                    : styles.statusCircleOffline,
                ]}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* White Bottom Sheet Content Area with Active Rides */}
      <View style={styles.sheetContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.activeRidesHeaderTitle}>Active Rides</Text>

          {rides.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No active ride requests right now.
              </Text>
              <Text style={styles.emptySubtext}>
                New requests will appear here automatically.
              </Text>
            </View>
          ) : (
            rides.map((ride) => (
              <View key={ride.id} style={styles.rideCard}>
                {/* Upper Section: Locations on Left, Payment & Countdown on Right */}
                <View style={styles.cardMainRow}>
                  {/* Left: Pickup & Drop locations */}
                  <View style={styles.locationsColumn}>
                    {/* Pickup Location */}
                    <View style={styles.locationItemRow}>
                      <View style={styles.pickupDot} />
                      <View style={styles.locationTextWrap}>
                        <Text style={styles.locationMetaLabel}>
                          Pick up location
                        </Text>
                        <Text
                          style={styles.locationAddressText}
                          numberOfLines={1}
                        >
                          {ride.pickupLocation}
                        </Text>
                      </View>
                    </View>

                    {/* Dotted Vertical Connector Line */}
                    <View style={styles.dottedConnectorContainer}>
                      <View style={styles.dottedDot} />
                      <View style={styles.dottedDot} />
                      <View style={styles.dottedDot} />
                    </View>

                    {/* Drop Location */}
                    <View style={styles.locationItemRow}>
                      <View style={styles.dropPinWrap}>
                        <RedPinIcon size={14} color="#EF4444" />
                      </View>
                      <View style={styles.locationTextWrap}>
                        <Text style={styles.locationMetaLabel}>
                          Drop location
                        </Text>
                        <Text
                          style={styles.locationAddressText}
                          numberOfLines={1}
                        >
                          {ride.dropLocation}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Right: Price & Countdown Timer */}
                  <View style={styles.fareColumn}>
                    <Text style={styles.farePriceText}>{ride.price}</Text>
                    <View style={styles.countdownBadge}>
                      <Text style={styles.countdownText}>
                        Cancel in {ride.cancelSeconds} Sec
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Lower Section: Action Buttons (Accept & Decline) */}
                <View style={styles.actionButtonsRow}>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    activeOpacity={0.85}
                    onPress={() => handleAcceptRide(ride.id)}
                  >
                    <Text style={styles.acceptButtonText}>Accept</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.declineButton}
                    activeOpacity={0.85}
                    onPress={() => handleDeclineRide(ride.id)}
                  >
                    <Text style={styles.declineButtonText}>Decline</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
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
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 12 : 16,
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
  statusCircleOffline: {
    backgroundColor: '#94A3B8',
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
  activeRidesHeaderTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#06252E',
    marginBottom: 14,
  },

  /* Ride Card */
  rideCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8EDF1',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardMainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationsColumn: {
    flex: 1,
    paddingRight: 12,
  },
  locationItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  pickupDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4ADE80',
    marginTop: 4,
  },
  dropPinWrap: {
    width: 16,
    alignItems: 'center',
    marginTop: 2,
  },
  dottedConnectorContainer: {
    marginLeft: 5,
    paddingVertical: 3,
    gap: 3,
  },
  dottedDot: {
    width: 2,
    height: 3,
    backgroundColor: '#CBD5E1',
    borderRadius: 1,
  },
  locationTextWrap: {
    flex: 1,
  },
  locationMetaLabel: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 2,
  },
  locationAddressText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#06252E',
  },

  /* Fare & Timer */
  fareColumn: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  farePriceText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#06252E',
    marginBottom: 6,
  },
  countdownBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  countdownText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#EF4444',
  },

  /* Action Buttons */
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  acceptButton: {
    flex: 1,
    height: 44,
    backgroundColor: '#026E86',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  declineButton: {
    flex: 1,
    height: 44,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },

  /* Empty state */
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#06252E',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 12,
    color: '#64748B',
  },
});
