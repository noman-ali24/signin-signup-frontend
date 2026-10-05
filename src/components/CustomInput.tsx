import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import { EyeIcon, EyeOffIcon } from '../assets/icons';
import { COLORS } from '../constants/colors';

interface CustomInputProps extends TextInputProps {
  label?: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
  error?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  icon,
  isPassword = false,
  error,
  style,
  onFocus,
  onBlur,
  ...textInputProps
}) => {
  const [showPassword, setShowPassword] = useState(!isPassword);
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const borderColor = error
    ? COLORS.error
    : focusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#E5E7EB', COLORS.primary],
      });

  const shadowOpacity = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.03, 0.12],
  });

  return (
    <View style={styles.wrapper}>
      {label ? (
        <Text style={[styles.label, isFocused && styles.labelFocused, error && styles.labelError]}>
          {label}
        </Text>
      ) : null}

      <Animated.View
        style={[
          styles.inputContainer,
          {
            borderColor,
            shadowOpacity,
            shadowOffset: { width: 0, height: isFocused ? 4 : 2 },
            shadowRadius: isFocused ? 8 : 4,
            elevation: isFocused ? 4 : 1,
            backgroundColor: isFocused ? '#FFFFFF' : '#F9FAFB',
          },
        ]}
      >
        {icon ? <View style={[styles.iconContainer, isFocused && styles.iconFocused]}>{icon}</View> : null}

        <TextInput
          style={[styles.input, style]}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={isPassword && !showPassword}
          autoCapitalize="none"
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...textInputProps}
        />

        {isPassword ? (
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setShowPassword((prev) => !prev)}
            activeOpacity={0.7}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            {showPassword ? (
              <EyeOffIcon size={20} color={isFocused ? COLORS.primary : "#9CA3AF"} />
            ) : (
              <EyeIcon size={20} color={isFocused ? COLORS.primary : "#9CA3AF"} />
            )}
          </TouchableOpacity>
        ) : null}
      </Animated.View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 8,
    paddingLeft: 4,
    letterSpacing: 0.3,
  },
  labelFocused: {
    color: COLORS.primary,
  },
  labelError: {
    color: COLORS.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    shadowColor: COLORS.primary,
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
  },
  iconFocused: {
    opacity: 1,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
    paddingVertical: 0,
    fontWeight: '500',
  },
  toggleButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 12,
    color: COLORS.error,
    marginTop: 6,
    paddingLeft: 6,
    fontWeight: '500',
  },
});
