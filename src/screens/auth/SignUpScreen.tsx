import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ROUTES } from '../../constants/routes';
import { COLORS } from '../../constants/colors';
import { MailIcon, UserIcon, LockIcon, PhoneIcon } from '../../assets/icons';
import { BrandHeader } from '../../components/BrandHeader';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  setStep1Data,
  setPhoneData,
  setPasskeyData,
} from '../../redux/slices/registrationSlice';
import {
  authService,
  extractErrorMessage,
} from '../../services';

export const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const registrationState = useAppSelector((state) => state.registration);

  const [fullName, setFullName] = useState(registrationState.fullName);
  const [email, setEmail] = useState(registrationState.email);
  const [phoneNumber, setPhoneNumber] = useState(registrationState.phoneNumber || '');
  const [password, setPassword] = useState(registrationState.password || '');
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
  }>({});

  const validate = () => {
    const newErrors: {
      fullName?: string;
      email?: string;
      phoneNumber?: string;
      password?: string;
    } = {};

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phoneNumber.trim();

    if (!trimmedName) {
      newErrors.fullName = 'Please enter your full name';
    }

    if (!trimmedEmail) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!trimmedPhone) {
      newErrors.phoneNumber = 'Please enter your phone number';
    } else if (trimmedPhone.replace(/[^0-9]/g, '').length < 8) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!password) {
      newErrors.password = 'Please enter your password';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (loading) return; // Prevent multiple clicks

    setServerError(null);
    if (!validate()) return;

    try {
      setLoading(true);

      await authService.signUp({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phoneNumber: phoneNumber.trim(),
        password,
      });

      // Reset input fields
      setFullName('');
      setEmail('');
      setPhoneNumber('');
      setPassword('');

      // Notify user and navigate to Sign In screen
      Alert.alert(
        'Success',
        'Your account has been created successfully! Please sign in.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate(ROUTES.SIGN_IN),
          },
        ]
      );

      navigation.navigate(ROUTES.SIGN_IN);
    } catch (err: any) {
      const errorMessage = extractErrorMessage(err);
      setServerError(errorMessage);
      Alert.alert('Registration Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleMultiStepFlow = () => {
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phoneNumber.trim();

    const newErrors: { fullName?: string; email?: string } = {};
    if (!trimmedName) newErrors.fullName = 'Please enter your full name';
    if (!trimmedEmail) newErrors.email = 'Please enter your email address';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(setStep1Data({ fullName: trimmedName, email: trimmedEmail }));
    if (trimmedPhone) {
      dispatch(setPhoneData(trimmedPhone));
    }
    if (password) {
      dispatch(setPasskeyData({ password, confirmPassword: password }));
    }
    navigation.navigate(ROUTES.SIGN_UP_PHONE);
  };

  return (
    <ScreenWrapper contentContainerStyle={styles.screenContent}>
      <View style={styles.contentContainer}>
        <BrandHeader title="Sign Up" subtitle="Car towing & transport app." />

        {/* Server Error Banner */}
        {serverError ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{serverError}</Text>
          </View>
        ) : null}

        {/* Full Name Input */}
        <CustomInput
          label="Full Name"
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);
            if (serverError) setServerError(null);
            if (errors.fullName) {
              setErrors((prev) => ({ ...prev, fullName: undefined }));
            }
          }}
          icon={<UserIcon size={20} color={COLORS.primary} />}
          error={errors.fullName}
        />

        {/* Email Address Input */}
        <CustomInput
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (serverError) setServerError(null);
            if (errors.email) {
              setErrors((prev) => ({ ...prev, email: undefined }));
            }
          }}
          keyboardType="email-address"
          icon={<MailIcon size={20} color={COLORS.primary} />}
          error={errors.email}
        />

        {/* Phone Number Input */}
        <CustomInput
          label="Phone Number"
          placeholder="Enter your phone number (e.g. 03001234567)"
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
            if (serverError) setServerError(null);
            if (errors.phoneNumber) {
              setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
            }
          }}
          keyboardType="phone-pad"
          icon={<PhoneIcon size={20} color={COLORS.primary} />}
          error={errors.phoneNumber}
        />

        {/* Password Input */}
        <CustomInput
          label="Password"
          placeholder="Enter your password (min 6 characters)"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (serverError) setServerError(null);
            if (errors.password) {
              setErrors((prev) => ({ ...prev, password: undefined }));
            }
          }}
          isPassword
          icon={<LockIcon size={20} color={COLORS.primary} />}
          error={errors.password}
        />

        {/* Sign Up Primary Button */}
        <View style={styles.bottomContainer}>
          <CustomButton
            title="Sign Up"
            onPress={handleSignUp}
            loading={loading}
            disabled={loading}
          />
        </View>

        {/* Option to continue with multi-step onboarding */}
        <TouchableOpacity
          onPress={handleMultiStepFlow}
          style={styles.wizardOptionButton}
          activeOpacity={0.7}
        >
          <Text style={styles.wizardOptionText}>
            Or continue with step-by-step setup →
          </Text>
        </TouchableOpacity>

        {/* Footer Link to Sign In */}
        <View style={styles.footerContainer}>
          <View style={styles.promptRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.SIGN_IN)}
              hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
            >
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenContent: {
    justifyContent: 'center',
    paddingVertical: 24,
  },
  contentContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  errorBanner: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#F87171',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },
  errorBannerText: {
    color: '#B91C1C',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  bottomContainer: {
    marginTop: 8,
    width: '100%',
  },
  wizardOptionButton: {
    marginTop: 14,
    alignItems: 'center',
    paddingVertical: 4,
  },
  wizardOptionText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 4,
  },
  promptRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '400',
  },
  signInLink: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '700',
  },
});
