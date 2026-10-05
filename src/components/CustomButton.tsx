import React, { useRef } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Animated,
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
  onPressIn,
  onPressOut,
  ...touchableProps
}) => {
  const isWhite = variant === 'white';
  const isOutline = variant === 'outline';
  
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = (e: any) => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
    }).start();
    if (onPressIn) onPressIn(e);
  };

  const handlePressOut = (e: any) => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 10,
      speed: 20,
    }).start();
    if (onPressOut) onPressOut(e);
  };

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
    <Animated.View style={{ transform: [{ scale: scaleAnim }], width: '100%' }}>
      <TouchableOpacity
        style={containerStyles}
        activeOpacity={0.9}
        disabled={disabled || loading}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        {...touchableProps}
      >
        {loading ? (
          <ActivityIndicator color={arrowColor} size="small" />
        ) : (
          <View style={styles.contentRow}>
            <Text style={textStyles}>{title}</Text>
            {showArrow ? (
              <View style={styles.arrowWrapper}>
                <ArrowRightIcon size={18} color={arrowColor} />
              </View>
            ) : null}
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonWhite: {
    backgroundColor: COLORS.surfaceWhite,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 4,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowOpacity: 0,
    elevation: 0,
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
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  textDark: {
    color: COLORS.primary,
  },
  arrowWrapper: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
