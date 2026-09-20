import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
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
  ...textInputProps
}) => {
  const [showPassword, setShowPassword] = useState(!isPassword);

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={[styles.inputContainer, error ? styles.inputError : null]}>
        {icon ? <View style={styles.iconContainer}>{icon}</View> : null}

        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={COLORS.textMuted}
          secureTextEntry={isPassword && !showPassword}
          autoCapitalize="none"
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
              <EyeOffIcon size={20} color={COLORS.textMuted} />
            ) : (
              <EyeIcon size={20} color={COLORS.textMuted} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
    width: '100%',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
    paddingLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 26,
    height: 54,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#F0F2F5',
    // Elevation and soft shadow
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  iconContainer: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    paddingVertical: 0,
  },
  toggleButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 12,
    color: COLORS.error,
    marginTop: 4,
    paddingLeft: 6,
  },
});
