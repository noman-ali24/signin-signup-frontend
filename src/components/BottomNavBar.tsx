import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  NavHomeIcon,
  NavWalletIcon,
  NavDocumentIcon,
  NavProfileIcon,
} from '../assets/icons';

export type NavTabType = 'home' | 'wallet' | 'orders' | 'profile';

interface BottomNavBarProps {
  activeTab?: NavTabType;
  onTabChange?: (tab: NavTabType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab: controlledActiveTab,
  onTabChange,
}) => {
  const [internalTab, setInternalTab] = useState<NavTabType>('home');
  const activeTab = controlledActiveTab ?? internalTab;

  const handlePress = (tab: NavTabType) => {
    setInternalTab(tab);
    onTabChange?.(tab);
  };

  return (
    <View style={styles.floatingContainer}>
      {/* Home Tab */}
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === 'home' ? styles.activeTabButton : styles.inactiveTabButton,
        ]}
        onPress={() => handlePress('home')}
        activeOpacity={0.85}
      >
        <NavHomeIcon
          size={22}
          color={activeTab === 'home' ? '#FFFFFF' : '#76949C'}
        />
        {activeTab === 'home' ? <View style={styles.activeIndicator} /> : null}
      </TouchableOpacity>

      {/* Wallet Tab */}
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === 'wallet' ? styles.activeTabButton : styles.inactiveTabButton,
        ]}
        onPress={() => handlePress('wallet')}
        activeOpacity={0.85}
      >
        <NavWalletIcon
          size={22}
          color={activeTab === 'wallet' ? '#FFFFFF' : '#76949C'}
        />
        {activeTab === 'wallet' ? <View style={styles.activeIndicator} /> : null}
      </TouchableOpacity>

      {/* Orders / Documents Tab */}
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === 'orders' ? styles.activeTabButton : styles.inactiveTabButton,
        ]}
        onPress={() => handlePress('orders')}
        activeOpacity={0.85}
      >
        <NavDocumentIcon
          size={22}
          color={activeTab === 'orders' ? '#FFFFFF' : '#76949C'}
        />
        {activeTab === 'orders' ? <View style={styles.activeIndicator} /> : null}
      </TouchableOpacity>

      {/* Profile Tab */}
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === 'profile' ? styles.activeTabButton : styles.inactiveTabButton,
        ]}
        onPress={() => handlePress('profile')}
        activeOpacity={0.85}
      >
        <NavProfileIcon
          size={22}
          color={activeTab === 'profile' ? '#FFFFFF' : '#76949C'}
        />
        {activeTab === 'profile' ? <View style={styles.activeIndicator} /> : null}
      </TouchableOpacity>
    </View>
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
    // Soft shadow
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
