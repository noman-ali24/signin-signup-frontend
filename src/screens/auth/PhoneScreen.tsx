import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ROUTES } from '../../constants/routes';
import { COLORS } from '../../constants/colors';
import { PhoneIcon } from '../../assets/icons';
import { BrandHeader } from '../../components/BrandHeader';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setPhoneData } from '../../redux/slices/registrationSlice';

const { height } = Dimensions.get('window');

export const PhoneScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const savedPhone = useAppSelector((state) => state.registration.phoneNumber);

  const [phoneNumber, setPhoneNumber] = useState(savedPhone);
  const [error, setError] = useState<string | undefined>();
  
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
    if (!phoneNumber || !phoneNumber.trim()) {
      setError('Please enter your phone number');
      return false;
    }
    if (phoneNumber.replace(/[^0-9]/g, '').length < 8) {
      setError('Please enter a valid phone number');
      return false;
    }
    setError(undefined);
    return true;
  };

  const handleNext = () => {
    if (!validate()) return;

    dispatch(setPhoneData(phoneNumber));
    navigation.navigate(ROUTES.SIGN_UP_NAME_EMAIL);
  };

  return (
    <ScreenWrapper contentContainerStyle={styles.screenContent}>
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        
        <View style={styles.headerWrapper}>
          <BrandHeader title="Phone Number" subtitle="Step 1: Your contact info" />
        </View>

        <View style={styles.formContainer}>
          <CustomInput
            label="Phone Number"
            placeholder="+1 000 000 0000"
            value={phoneNumber}
            onChangeText={(text) => {
              setPhoneNumber(text);
              if (error) setError(undefined);
            }}
            keyboardType="phone-pad"
            icon={<PhoneIcon size={20} color={COLORS.primary} />}
            error={error}
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
