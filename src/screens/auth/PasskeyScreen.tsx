import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ROUTES } from '../../constants/routes';
import { COLORS } from '../../constants/colors';
import { LockIcon } from '../../assets/icons';
import { BrandHeader } from '../../components/BrandHeader';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setPasskeyData } from '../../redux/slices/registrationSlice';

export const PasskeyScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const registration = useAppSelector((state) => state.registration);

  const [password, setPassword] = useState(registration.password);
  const [confirmPassword, setConfirmPassword] = useState(registration.confirmPassword);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});

  const validate = () => {
    const newErrors: { password?: string; confirmPassword?: string } = {};
    if (!password) {
      newErrors.password = 'Please enter a password';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;

    dispatch(setPasskeyData({ password, confirmPassword }));
    navigation.navigate(ROUTES.SIGN_UP_TERMS);
  };

  return (
    <ScreenWrapper>
      <View>
        <BrandHeader title="Set up Passkey" subtitle="Car towing & transport app." />

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

        <CustomInput
          label="Password"
          placeholder="Enter your Password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            if (errors.confirmPassword) {
              setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
            }
          }}
          isPassword
          icon={<LockIcon size={20} color={COLORS.primary} />}
          error={errors.confirmPassword}
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
