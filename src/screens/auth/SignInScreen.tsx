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
import { MailIcon, LockIcon } from '../../assets/icons';
import { BrandHeader } from '../../components/BrandHeader';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { SocialLoginGroup } from '../../components/SocialButton';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { useAppDispatch } from '../../redux/hooks';
import { loginSuccess } from '../../redux/slices/authSlice';
import {
  authService,
  extractErrorMessage,
  tokenStorage,
} from '../../services';

const { height } = Dimensions.get('window');

export const SignInScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

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
    const newErrors: { email?: string; password?: string } = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
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

  const handleSignIn = async () => {
    if (loading) return; 
    if (!validate()) return;

    try {
      setLoading(true);

      const { token, user } = await authService.signIn({
        email: email.trim().toLowerCase(),
        password,
      });

      await tokenStorage.saveAuthData(token, user);
      
      dispatch(
        loginSuccess({
          user,
          token,
        })
      );

      navigation.reset({
        index: 0,
        routes: [{ name: ROUTES.HOME }],
      });
    } catch (err: any) {
      const errorMessage = extractErrorMessage(err);
      Toast.show({
        type: 'error',
        text1: 'Sign In Failed',
        text2: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (platform: string) => {
    Toast.show({
      type: 'info',
      text1: `${platform} Sign In`,
      text2: `Proceeding with ${platform} authentication...`,
    });
  };

  return (
    <ScreenWrapper contentContainerStyle={styles.screenContent}>
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        
        <View style={styles.headerWrapper}>
          <BrandHeader title="Welcome Back" subtitle="Sign in to continue your journey." />
        </View>

        <View style={styles.formContainer}>
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

          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}
            style={styles.forgotPasswordButton}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          <CustomButton
            title="Sign In"
            onPress={handleSignIn}
            loading={loading}
            style={styles.signInButton}
          />
        </View>

        <View style={styles.socialDivider}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or continue with</Text>
          <View style={styles.line} />
        </View>

        <SocialLoginGroup
          onGooglePress={() => handleSocialLogin('Google')}
          onFacebookPress={() => handleSocialLogin('Facebook')}
          onInstagramPress={() => handleSocialLogin('Instagram')}
        />

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.SIGN_UP_STEP_1)}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Text style={styles.signUpLink}>Sign Up</Text>
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
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  signInButton: {
    marginTop: 8,
  },
  socialDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  orText: {
    marginHorizontal: 16,
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '500',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '400',
  },
  signUpLink: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
  },
});
