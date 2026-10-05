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

type OrderFilter = 'all' | 'completed' | 'active' | 'cancelled';

interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  pickup: string;
  drop: string;
  price: string;
  status: 'Completed' | 'In Progress' | 'Cancelled';
}

const ORDERS_DATA: OrderItem[] = [
  {
    id: 'ord_1',
    orderNumber: '#AP-9281',
    date: 'Today, 1:30 PM',
    pickup: 'Downtown Plaza, Richmond',
    drop: 'West End Terminal, Henrico',
    price: '$85.00',
    status: 'Completed',
  },
  {
    id: 'ord_2',
    orderNumber: '#AP-9280',
    date: 'Yesterday, 4:15 PM',
    pickup: 'North Boulevard 120, Norfolk',
    drop: 'Ocean View Beach, Norfolk',
    price: '$120.00',
    status: 'Completed',
  },
  {
    id: 'ord_3',
    orderNumber: '#AP-9279',
    date: 'Oct 2, 2026',
    pickup: 'Airport Cargo Road, Richmond',
    drop: 'Mechanicsville Hub, VA',
    price: '$65.00',
    status: 'Cancelled',
  },
];

export const OrdersScreen: React.FC = () => {
  const [filter, setFilter] = useState<OrderFilter>('all');

  const filteredOrders = ORDERS_DATA.filter((o) => {
    if (filter === 'completed') return o.status === 'Completed';
    if (filter === 'active') return o.status === 'In Progress';
    if (filter === 'cancelled') return o.status === 'Cancelled';
    return true;
  });

  const handleNotificationPress = () => {
    Alert.alert('Notifications', 'No new order updates at this time.');
  };

  const handleOrderPress = (order: OrderItem) => {
    Alert.alert(
      `Order ${order.orderNumber}`,
      `Route: ${order.pickup} ➔ ${order.drop}\nStatus: ${order.status}\nTotal Payout: ${order.price}`
    );
  };

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
          <Text style={styles.welcomeTitle}>Orders & Activity</Text>

          {/* Row 3: Status / Feed */}
          <View style={styles.statusRow}>
            <View style={styles.statusLabelWrap}>
              <BriefcaseIcon size={18} color="#FFFFFF" />
              <Text style={styles.statusLabelText}>Order Feed</Text>
            </View>

            <View style={styles.statusTogglePill}>
              <Text style={styles.statusToggleText}>Live</Text>
              <View
                style={[styles.statusToggleCircle, styles.statusCircleOnline]}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>

      {/* White Curved Sheet Content Area */}
      <View style={styles.sheetContainer}>
        {/* Filter Pills row placed at top of sheet */}
        <View style={styles.filterBarContainer}>
          {(['all', 'completed', 'active', 'cancelled'] as OrderFilter[]).map(
            (tab) => {
              const isActive = filter === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.filterPill,
                    isActive && styles.filterPillActive,
                  ]}
                  onPress={() => setFilter(tab)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.filterPillText,
                      isActive && styles.filterPillTextActive,
                    ]}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Text>
                </TouchableOpacity>
              );
            }
          )}
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredOrders.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No orders found</Text>
              <Text style={styles.emptySub}>
                No orders match the selected filter.
              </Text>
            </View>
          ) : (
            filteredOrders.map((order) => (
              <TouchableOpacity
                key={order.id}
                style={styles.orderCard}
                activeOpacity={0.8}
                onPress={() => handleOrderPress(order)}
              >
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.orderNum}>{order.orderNumber}</Text>
                    <Text style={styles.orderDate}>{order.date}</Text>
                  </View>
                  <View style={styles.priceWrap}>
                    <Text style={styles.orderPrice}>{order.price}</Text>
                    <View
                      style={[
                        styles.statusBadge,
                        order.status === 'Completed'
                          ? styles.statusCompletedBadge
                          : styles.statusCancelledBadge,
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          order.status === 'Completed'
                            ? styles.statusCompletedText
                            : styles.statusCancelledText,
                        ]}
                      >
                        {order.status}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.divider} />

                {/* Locations */}
                <View style={styles.locationsContainer}>
                  {/* Pickup */}
                  <View style={styles.locationItemRow}>
                    <View style={styles.pickupDot} />
                    <View style={styles.locTextWrap}>
                      <Text style={styles.locLabel}>Pick up</Text>
                      <Text style={styles.locAddress} numberOfLines={1}>
                        {order.pickup}
                      </Text>
                    </View>
                  </View>

                  {/* Dotted connector */}
                  <View style={styles.dottedConnector}>
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                  </View>

                  {/* Drop */}
                  <View style={styles.locationItemRow}>
                    <View style={styles.dropPinWrap}>
                      <RedPinIcon size={14} color="#EF4444" />
                    </View>
                    <View style={styles.locTextWrap}>
                      <Text style={styles.locLabel}>Drop off</Text>
                      <Text style={styles.locAddress} numberOfLines={1}>
                        {order.drop}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
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
  filterBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  filterPill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterPillActive: {
    backgroundColor: '#026E86',
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 110,
  },

  /* Order Card */
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8EDF1',
    padding: 16,
    marginBottom: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderNum: {
    fontSize: 15,
    fontWeight: '700',
    color: '#06252E',
  },
  orderDate: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  priceWrap: {
    alignItems: 'flex-end',
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#06252E',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusCompletedBadge: {
    backgroundColor: '#DCFCE7',
  },
  statusCancelledBadge: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusCompletedText: {
    color: '#16A34A',
  },
  statusCancelledText: {
    color: '#EF4444',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: 12,
  },

  /* Locations */
  locationsContainer: {
    gap: 2,
  },
  locationItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pickupDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22C55E',
  },
  dropPinWrap: {
    width: 10,
    alignItems: 'center',
  },
  locTextWrap: {
    flex: 1,
  },
  locLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '500',
  },
  locAddress: {
    fontSize: 13,
    fontWeight: '600',
    color: '#06252E',
  },
  dottedConnector: {
    marginLeft: 4,
    paddingVertical: 2,
    gap: 2,
  },
  dot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#CBD5E1',
  },

  /* Empty state */
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#06252E',
    marginBottom: 4,
  },
  emptySub: {
    fontSize: 13,
    color: '#64748B',
  },
});
