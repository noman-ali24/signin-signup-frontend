import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-toast-message';
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

const { height } = Dimensions.get('window');

export const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const registrationState = useAppSelector((state) => state.registration);

  const [fullName, setFullName] = useState(registrationState.fullName);
  const [email, setEmail] = useState(registrationState.email);
  const [phoneNumber, setPhoneNumber] = useState(registrationState.phoneNumber || '');
  const [password, setPassword] = useState(registrationState.password || '');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
  }>({});

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const isSubmitting = useRef(false); // Synchronous lock for double-clicks

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

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
    if (loading || isSubmitting.current) return; 
    if (!validate()) return;

    try {
      isSubmitting.current = true;
      setLoading(true);

      const payload = {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phoneNumber: phoneNumber.trim(),
        password,
      };
      console.log('Signup Payload:', payload);

      await authService.signUp(payload);

      setFullName('');
      setEmail('');
      setPhoneNumber('');
      setPassword('');

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Your account has been created successfully! Please sign in.',
        onHide: () => navigation.navigate(ROUTES.SIGN_IN),
      });

      navigation.navigate(ROUTES.SIGN_IN);
    } catch (err: any) {
      const errorMessage = extractErrorMessage(err);
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: errorMessage,
      });
    } finally {
      isSubmitting.current = false;
      setLoading(false);
    }
  };

  const handleMultiStepFlow = () => {
    navigation.navigate(ROUTES.SIGN_UP_PHONE);
  };

  return (
    <ScreenWrapper contentContainerStyle={styles.screenContent}>
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        
        <View style={styles.headerWrapper}>
          <BrandHeader title="Create Account" subtitle="Join AutoPulse today." />
        </View>

        <View style={styles.formContainer}>
          <CustomInput
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              if (errors.fullName) {
                setErrors((prev) => ({ ...prev, fullName: undefined }));
              }
            }}
            icon={<UserIcon size={20} color={COLORS.primary} />}
            error={errors.fullName}
          />

          <CustomInput
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: undefined }));
              }
            }}
            keyboardType="email-address"
            icon={<MailIcon size={20} color={COLORS.primary} />}
            error={errors.email}
          />

          <CustomInput
            label="Phone Number"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={(text) => {
              setPhoneNumber(text);
              if (errors.phoneNumber) {
                setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
              }
            }}
            keyboardType="phone-pad"
            icon={<PhoneIcon size={20} color={COLORS.primary} />}
            error={errors.phoneNumber}
          />

          <CustomInput
            label="Password"
            placeholder="Enter password (min 6 chars)"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: undefined }));
              }
            }}
            isPassword
            icon={<LockIcon size={20} color={COLORS.primary} />}
            error={errors.password}
          />

          <View style={styles.bottomContainer}>
            <CustomButton
              title="Sign Up"
              onPress={handleSignUp}
              loading={loading}
              disabled={loading}
            />
            
            <View style={{ height: 16 }} />

            <CustomButton
              title="Or try step-by-step setup"
              variant="outline"
              onPress={handleMultiStepFlow}
              showArrow={true}
            />
          </View>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.SIGN_IN)}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Text style={styles.signInLink}>Sign In</Text>
          </TouchableOpacity>
        </View>

      </Animated.View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screenContent: {
    paddingVertical: height * 0.05,
  },
  contentContainer: {
    width: '100%',
  },
  headerWrapper: {
    marginBottom: 32,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 24,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3,
    marginBottom: 32,
  },
  bottomContainer: {
    marginTop: 12,
    width: '100%',
  },
  dividerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  wizardOptionText: {
    marginHorizontal: 16,
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '400',
  },
  signInLink: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
  },
});
