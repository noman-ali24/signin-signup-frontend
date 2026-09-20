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
import { CheckIcon } from '../../assets/icons';
import { BrandHeader } from '../../components/BrandHeader';
import { CustomButton } from '../../components/CustomButton';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setTermsAccepted, resetRegistration } from '../../redux/slices/registrationSlice';
import { loginSuccess } from '../../redux/slices/authSlice';

export const TermsScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const registration = useAppSelector((state) => state.registration);

  const [accepted, setAccepted] = useState(registration.termsAccepted);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleToggle = () => {
    setAccepted((prev) => {
      const nextVal = !prev;
      dispatch(setTermsAccepted(nextVal));
      if (nextVal) setError(undefined);
      return nextVal;
    });
  };

  const handleOpenTermsModal = () => {
    Alert.alert(
      'Terms & Conditions',
      'By using AutoPulse, you agree to our standard terms of towing service, digital transport verification, road assistance dispatch rules, and privacy policy.'
    );
  };

  const handleSignUp = () => {
    if (!accepted) {
      setError('Please accept the Terms & Conditions to continue.');
      return;
    }

    setLoading(true);

    // Simulate API account creation
    setTimeout(() => {
      setLoading(false);

      // Log in the newly registered user
      dispatch(
        loginSuccess({
          user: {
            id: 'usr_new_' + Date.now(),
            name: registration.fullName || 'AutoPulse User',
            email: registration.email || 'user@autopulse.app',
            phone: registration.phoneNumber,
          },
          token: 'jwt_mock_token_reg_' + Date.now(),
        })
      );

      // Reset temporary registration form state
      dispatch(resetRegistration());

      // Navigate to Home Dashboard
      navigation.reset({
        index: 0,
        routes: [{ name: ROUTES.HOME }],
      });
    }, 900);
  };

  return (
    <ScreenWrapper>
      <View>
        <BrandHeader title="Terms & Conditions" subtitle="Car towing & transport app." />

        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Terms & Conditions</Text>

          {/* Custom Checkbox Row */}
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
        </View>
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <CustomButton
          title="Sign Up"
          onPress={handleSignUp}
          loading={loading}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 8,
    width: '100%',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 16,
    paddingLeft: 4,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    // Soft shadow
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
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
    marginTop: 10,
    paddingLeft: 4,
  },
  bottomContainer: {
    marginTop: 40,
    width: '100%',
  },
});
