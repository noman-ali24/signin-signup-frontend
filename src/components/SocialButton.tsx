import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FacebookIcon, GoogleIcon, InstagramIcon } from '../assets/icons';
import { COLORS } from '../constants/colors';

interface SocialButtonProps {
  type: 'google' | 'facebook' | 'instagram';
  onPress?: () => void;
}

export const SocialButton: React.FC<SocialButtonProps> = ({ type, onPress }) => {
  const renderIcon = () => {
    switch (type) {
      case 'google':
        return <GoogleIcon size={22} />;
      case 'facebook':
        return <FacebookIcon size={22} />;
      case 'instagram':
        return <InstagramIcon size={22} />;
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={onPress}
      accessibilityRole="button"
    >
      <View style={styles.iconCenter}>{renderIcon()}</View>
    </TouchableOpacity>
  );
};

export const SocialLoginGroup: React.FC<{
  onGooglePress?: () => void;
  onFacebookPress?: () => void;
  onInstagramPress?: () => void;
}> = ({ onGooglePress, onFacebookPress, onInstagramPress }) => {
  return (
    <View style={styles.groupContainer}>
      <SocialButton type="google" onPress={onGooglePress} />
      <SocialButton type="facebook" onPress={onFacebookPress} />
      <SocialButton type="instagram" onPress={onInstagramPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  groupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginVertical: 20,
  },
  card: {
    width: 60,
    height: 52,
    backgroundColor: '#F8F9FA',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  iconCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
