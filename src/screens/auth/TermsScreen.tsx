import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated, Dimensions } from 'react-native';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ROUTES } from '../../constants/routes';
import { COLORS } from '../../constants/colors';
import { CheckIcon } from '../../assets/icons';
import { BrandHeader } from '../../components/BrandHeader';
import { CustomButton } from '../../components/CustomButton';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setTermsAccepted, resetRegistration } from '../../redux/slices/registrationSlice';
import { authService, extractErrorMessage } from '../../services';

const { height } = Dimensions.get('window');

export const TermsScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const registration = useAppSelector((state) => state.registration);

  const [accepted, setAccepted] = useState(registration.termsAccepted);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

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

  const handleToggle = () => {
    setAccepted((prev) => {
      const nextVal = !prev;
      dispatch(setTermsAccepted(nextVal));
      if (nextVal) setError(undefined);
      return nextVal;
    });
  };

  const handleOpenTermsModal = () => {
    Toast.show({
      type: 'info',
      text1: 'Terms & Conditions',
      text2: 'By using AutoPulse, you agree to our standard terms of towing service.',
    });
  };

  const handleSignUp = async () => {
    if (loading || isSubmitting.current) return; 
    if (!accepted) {
      setError('Please accept the Terms & Conditions to continue.');
      return;
    }

    try {
      isSubmitting.current = true;
      setLoading(true);

      const payload = {
        fullName: registration.fullName.trim() || 'AutoPulse User',
        email: registration.email.trim().toLowerCase(),
        phoneNumber: registration.phoneNumber?.trim(),
        password: registration.password,
      };
      console.log('Signup Payload:', payload);

      await authService.signUp(payload);

      dispatch(resetRegistration());

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Your account has been created successfully! Please sign in.',
      });

      navigation.navigate(ROUTES.SIGN_IN);
    } catch (err: any) {
      const errorMessage = extractErrorMessage(err);
      setError(errorMessage);
      Toast.show({
        type: 'error',
        text1: 'Sign Up Failed',
        text2: errorMessage,
      });
    } finally {
      isSubmitting.current = false;
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper contentContainerStyle={styles.screenContent}>
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        
        <View style={styles.headerWrapper}>
          <BrandHeader title="Terms & Conditions" subtitle="Step 4: Final step" />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Terms & Conditions</Text>

          <View style={styles.checkboxRow}>
            <TouchableOpacity
              style={[styles.checkbox, accepted && styles.checkboxActive]}
              onPress={handleToggle}
              activeOpacity={0.8}
            >
              {accepted ? <CheckIcon size={14} color="#FFFFFF" /> : null}
            </TouchableOpacity>

            <View style={styles.textContainer}>
              <Text style={styles.normalText}>
                I accept hereby{' '}
                <Text style={styles.underlinedLink} onPress={handleOpenTermsModal}>
                  Terms & Conditions.
                </Text>
              </Text>
            </View>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.bottomContainer}>
            <CustomButton
              title="Sign Up"
              onPress={handleSignUp}
              loading={loading}
              disabled={loading || !accepted}
            />
          </View>
        </View>

        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Text style={styles.backLink}>← Back</Text>
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
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    marginBottom: 12,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: '#F9FAFB',
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  textContainer: {
    flex: 1,
  },
  normalText: {
    fontSize: 13.5,
    color: COLORS.textSecondary,
    fontWeight: '400',
  },
  underlinedLink: {
    color: COLORS.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  errorText: {
    fontSize: 12,
    color: COLORS.error,
    paddingLeft: 4,
  },
  bottomContainer: {
    marginTop: 24,
    width: '100%',
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 12,
    paddingBottom: 4,
  },
  backLink: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
});
