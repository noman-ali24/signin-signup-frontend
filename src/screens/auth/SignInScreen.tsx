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
import { MailIcon, LockIcon } from '../../assets/icons';
import { BrandHeader } from '../../components/BrandHeader';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { SocialLoginGroup } from '../../components/SocialButton';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { useAppDispatch } from '../../redux/hooks';
import { loginSuccess } from '../../redux/slices/authSlice';

export const SignInScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Please enter your password';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = () => {
    if (!validate()) return;

    setLoading(true);
    // Simulate API authentication
    setTimeout(() => {
      setLoading(false);
      dispatch(
        loginSuccess({
          user: {
            id: 'usr_101',
            name: email.split('@')[0],
            email: email,
          },
          token: 'jwt_mock_token_autopulse_2026',
        })
      );
      navigation.replace(ROUTES.HOME);
    }, 800);
  };

  const handleSocialLogin = (platform: string) => {
    Alert.alert(`${platform} Sign In`, `Proceeding with ${platform} authentication...`);
  };

  return (
    <ScreenWrapper contentContainerStyle={styles.screenContent}>
      <View style={styles.contentContainer}>
        <BrandHeader title="Sign In" subtitle="Car towing & transport app." />

        {/* Input Fields */}
        <CustomInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          keyboardType="email-address"
          icon={<MailIcon size={20} color={COLORS.primary} />}
          error={errors.email}
        />

        <CustomInput
          label="Password"
          placeholder="Enter your Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          isPassword
          icon={<LockIcon size={20} color={COLORS.primary} />}
          error={errors.password}
        />

        {/* Sign In Button */}
        <CustomButton
          title="Sign In"
          onPress={handleSignIn}
          loading={loading}
          style={styles.signInButton}
        />

        {/* Social Icons (Google, Facebook, Instagram) */}
        <SocialLoginGroup
          onGooglePress={() => handleSocialLogin('Google')}
          onFacebookPress={() => handleSocialLogin('Facebook')}
          onInstagramPress={() => handleSocialLogin('Instagram')}
        />

        {/* Bottom Links */}
        <View style={styles.footerContainer}>
          <View style={styles.signupPromptRow}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.SIGN_UP_STEP_1)}
              hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
            >
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}
            style={styles.forgotPasswordButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          </TouchableOpacity>
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
  signInButton: {
    marginTop: 8,
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 4,
  },
  signupPromptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  footerText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '400',
  },
  signUpLink: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '700',
  },
  forgotPasswordButton: {
    padding: 4,
  },
  forgotPasswordText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
});
