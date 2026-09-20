import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BrandLogo } from '../assets/icons';
import { COLORS } from '../constants/colors';

interface BrandHeaderProps {
  appName?: string;
  title: string;
  subtitle?: string;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({
  appName = 'AUTOPULSE',
  title,
  subtitle = 'Car towing & transport app.',
}) => {
  return (
    <View style={styles.container}>
      {/* Brand Icon & Name */}
      <View style={styles.brandRow}>
        <BrandLogo size={28} color={COLORS.primary} badgeColor={COLORS.surfaceWhite} />
        <Text style={styles.brandName}>{appName}</Text>
      </View>

      {/* Screen Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Tagline Subtitle */}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 28,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  brandName: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: COLORS.textSecondary,
    letterSpacing: 0.1,
  },
});
