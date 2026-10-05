import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ROUTES } from '../../constants/routes';
import { COLORS } from '../../constants/colors';
import { UserIcon, MailIcon } from '../../assets/icons';
import { BrandHeader } from '../../components/BrandHeader';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setStep1Data } from '../../redux/slices/registrationSlice';

const { height } = Dimensions.get('window');

export const NameEmailScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const registration = useAppSelector((state) => state.registration);

  const [fullName, setFullName] = useState(registration.fullName || '');
  const [email, setEmail] = useState(registration.email || '');
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});

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
    const newErrors: { fullName?: string; email?: string } = {};
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      newErrors.fullName = 'Please enter your full name';
    }

    if (!trimmedEmail) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;

    dispatch(
      setStep1Data({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
      })
    );
    navigation.navigate(ROUTES.SIGN_UP_PASSKEY);
  };

  return (
    <ScreenWrapper contentContainerStyle={styles.screenContent}>
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        
        <View style={styles.headerWrapper}>
          <BrandHeader title="Personal Info" subtitle="Step 2: Tell us about yourself" />
        </View>

        <View style={styles.formContainer}>
          <CustomInput
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
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
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            keyboardType="email-address"
            icon={<MailIcon size={20} color={COLORS.primary} />}
            error={errors.email}
          />

          <View style={styles.bottomContainer}>
            <CustomButton title="Next" onPress={handleNext} />
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
  bottomContainer: {
    marginTop: 12,
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
