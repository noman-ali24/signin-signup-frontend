import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { ArrowRightIcon } from '../assets/icons';
import { COLORS } from '../constants/colors';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'white' | 'outline';
  showArrow?: boolean;
  loading?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  variant = 'primary',
  showArrow = true,
  loading = false,
  disabled,
  style,
  ...touchableProps
}) => {
  const isWhite = variant === 'white';
  const isOutline = variant === 'outline';

  const containerStyles = [
    styles.button,
    isWhite && styles.buttonWhite,
    isOutline && styles.buttonOutline,
    (disabled || loading) && styles.buttonDisabled,
    style,
  ];

  const textStyles = [
    styles.text,
    isWhite && styles.textDark,
    isOutline && styles.textDark,
  ];

  const arrowColor = isWhite || isOutline ? COLORS.primary : COLORS.textWhite;

  return (
    <TouchableOpacity
      style={containerStyles}
      activeOpacity={0.85}
      disabled={disabled || loading}
      {...touchableProps}
    >
      {loading ? (
        <ActivityIndicator color={arrowColor} size="small" />
      ) : (
        <View style={styles.contentRow}>
          <Text style={textStyles}>{title}</Text>
          {showArrow ? (
            <View style={styles.arrowWrapper}>
              <ArrowRightIcon size={16} color={arrowColor} />
            </View>
          ) : null}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonWhite: {
    backgroundColor: COLORS.surfaceWhite,
    shadowOpacity: 0.2,
    elevation: 5,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.textWhite,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  textDark: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  arrowWrapper: {
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
