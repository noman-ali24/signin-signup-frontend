import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ToastConfig, ToastProps } from 'react-native-toast-message';
import { COLORS } from '../constants/colors';
import { BellIcon, RedPinIcon } from '../assets/icons'; // Reusing some icons or just simple text

// Custom Toast configurations matching the app's theme
export const toastConfig: ToastConfig = {
  success: ({ text1, text2 }: ToastProps) => (
    <View style={[styles.toastContainer, styles.successContainer]}>
      <View style={styles.iconContainer}>
        <Text style={styles.successIcon}>✓</Text>
      </View>
      <View style={styles.textContainer}>
        {text1 ? <Text style={styles.title}>{text1}</Text> : null}
        {text2 ? <Text style={styles.message}>{text2}</Text> : null}
      </View>
    </View>
  ),
  error: ({ text1, text2 }: ToastProps) => (
    <View style={[styles.toastContainer, styles.errorContainer]}>
      <View style={styles.iconContainer}>
        <Text style={styles.errorIcon}>✕</Text>
      </View>
      <View style={styles.textContainer}>
        {text1 ? <Text style={[styles.title, styles.errorTitle]}>{text1}</Text> : null}
        {text2 ? <Text style={styles.message}>{text2}</Text> : null}
      </View>
    </View>
  ),
  info: ({ text1, text2 }: ToastProps) => (
    <View style={[styles.toastContainer, styles.infoContainer]}>
      <View style={styles.iconContainer}>
        <Text style={styles.infoIcon}>ℹ</Text>
      </View>
      <View style={styles.textContainer}>
        {text1 ? <Text style={[styles.title, styles.infoTitle]}>{text1}</Text> : null}
        {text2 ? <Text style={styles.message}>{text2}</Text> : null}
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: COLORS.surfaceWhite,
    borderRadius: 12,
    padding: 16,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
    borderLeftWidth: 6,
  },
  successContainer: {
    borderLeftColor: COLORS.success,
  },
  errorContainer: {
    borderLeftColor: COLORS.error,
  },
  infoContainer: {
    borderLeftColor: COLORS.primary,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  successIcon: {
    color: COLORS.success,
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorIcon: {
    color: COLORS.error,
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoIcon: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  errorTitle: {
    color: COLORS.error,
  },
  infoTitle: {
    color: COLORS.primary,
  },
  message: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});
