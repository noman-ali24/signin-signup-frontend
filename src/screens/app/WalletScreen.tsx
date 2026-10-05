import React from 'react';
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
  NavWalletIcon,
} from '../../assets/icons';

export const WalletScreen: React.FC = () => {
  const handleWithdraw = () => {
    Alert.alert(
      'Withdraw Funds',
      'Transfer available balance of $1,248.50 to your connected bank account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Withdraw',
          onPress: () =>
            Alert.alert('Success', 'Withdrawal request initiated successfully.'),
        },
      ]
    );
  };

  const handleAddPayment = () => {
    Alert.alert(
      'Add Payment Method',
      'Select payment method to link: Debit Card, Credit Card, or Bank Account.'
    );
  };

  const handleNotificationPress = () => {
    Alert.alert('Notifications', 'No new wallet notifications.');
  };

  const transactions = [
    {
      id: 'tx_1',
      title: 'Trip Payout #4829',
      date: 'Today, 2:45 PM',
      amount: '+$45.00',
      status: 'Completed',
    },
    {
      id: 'tx_2',
      title: 'Trip Payout #4828',
      date: 'Today, 11:20 AM',
      amount: '+$82.50',
      status: 'Completed',
    },
    {
      id: 'tx_3',
      title: 'Weekly Bank Transfer',
      date: 'Oct 3, 2026',
      amount: '-$500.00',
      status: 'Transferred',
    },
    {
      id: 'tx_4',
      title: 'Towing Service Bonus',
      date: 'Oct 1, 2026',
      amount: '+$60.00',
      status: 'Completed',
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
          <Text style={styles.welcomeTitle}>My Wallet</Text>

          {/* Row 3: Working Status / Payout Status */}
          <View style={styles.statusRow}>
            <View style={styles.statusLabelWrap}>
              <BriefcaseIcon size={18} color="#FFFFFF" />
              <Text style={styles.statusLabelText}>Payout Status</Text>
            </View>

            <View style={styles.statusTogglePill}>
              <Text style={styles.statusToggleText}>Active</Text>
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
          {/* Balance Card inside the White Sheet */}
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Total Available Balance</Text>
            <Text style={styles.balanceAmount}>$1,248.50</Text>

            <View style={styles.balanceMetaRow}>
              <Text style={styles.dailyEarningText}>
                Today's Earnings: +$127.50
              </Text>
              <TouchableOpacity
                style={styles.withdrawButton}
                activeOpacity={0.85}
                onPress={handleWithdraw}
              >
                <Text style={styles.withdrawButtonText}>Withdraw</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Payment Methods */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>PAYMENT METHODS</Text>
            <TouchableOpacity onPress={handleAddPayment} activeOpacity={0.7}>
              <Text style={styles.addPaymentText}>+ Add New</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardContainer}>
            <View style={styles.methodRow}>
              <View style={styles.methodIconWrap}>
                <NavWalletIcon size={20} color="#06252E" />
              </View>
              <View style={styles.methodTextWrap}>
                <Text style={styles.methodName}>Chase Bank (Checking)</Text>
                <Text style={styles.methodSub}>•••• 4892 • Default</Text>
              </View>
              <View style={styles.activeBadge}>
                <Text style={styles.activePillText}>Active</Text>
              </View>
            </View>
          </View>

          {/* Recent Transactions */}
          <Text style={[styles.sectionTitle, { marginTop: 24, marginBottom: 12 }]}>
            RECENT TRANSACTIONS
          </Text>
          <View style={styles.cardContainer}>
            {transactions.map((tx, idx) => (
              <View key={tx.id}>
                <View style={styles.txRow}>
                  <View style={styles.txLeft}>
                    <Text style={styles.txTitle}>{tx.title}</Text>
                    <Text style={styles.txDate}>{tx.date}</Text>
                  </View>
                  <Text
                    style={[
                      styles.txAmount,
                      tx.amount.startsWith('+')
                        ? styles.txPositive
                        : styles.txNegative,
                    ]}
                  >
                    {tx.amount}
                  </Text>
                </View>
                {idx < transactions.length - 1 ? (
                  <View style={styles.divider} />
                ) : null}
              </View>
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

  /* Balance Card */
  balanceCard: {
    backgroundColor: '#072C36',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  balanceLabel: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginVertical: 10,
  },
  balanceMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  dailyEarningText: {
    fontSize: 12,
    color: '#4ADE80',
    fontWeight: '600',
  },
  withdrawButton: {
    backgroundColor: '#026E86',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  withdrawButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /* Payment Methods & Transactions */
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.8,
  },
  addPaymentText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#026E86',
  },
  cardContainer: {
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
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  methodIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  methodTextWrap: {
    flex: 1,
  },
  methodName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#06252E',
  },
  methodSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  activeBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activePillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#16A34A',
  },

  /* Transactions */
  txRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  txLeft: {
    flex: 1,
  },
  txTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#06252E',
    marginBottom: 3,
  },
  txDate: {
    fontSize: 12,
    color: '#94A3B8',
  },
  txAmount: {
    fontSize: 15,
    fontWeight: '700',
  },
  txPositive: {
    color: '#16A34A',
  },
  txNegative: {
    color: '#EF4444',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
});
