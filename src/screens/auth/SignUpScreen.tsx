import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ROUTES } from '../../constants/routes';
import { COLORS } from '../../constants/colors';
import { MailIcon, UserIcon } from '../../assets/icons';
import { BrandHeader } from '../../components/BrandHeader';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setStep1Data } from '../../redux/slices/registrationSlice';

export const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const registrationState = useAppSelector((state) => state.registration);

  const [fullName, setFullName] = useState(registrationState.fullName);
  const [email, setEmail] = useState(registrationState.email);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});

  const validate = () => {
    const newErrors: { fullName?: string; email?: string } = {};
    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }
    if (!email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;

    dispatch(setStep1Data({ fullName, email }));
    navigation.navigate(ROUTES.SIGN_UP_PHONE);
  };

  return (
    <ScreenWrapper>
      <View>
        <BrandHeader title="Sign Up" subtitle="Car towing & transport app." />

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
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <CustomButton title="Next" onPress={handleNext} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    marginTop: 40,
    width: '100%',
  },
});
