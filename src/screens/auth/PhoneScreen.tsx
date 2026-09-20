import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
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

export const PhoneScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const savedPhone = useAppSelector((state) => state.registration.phoneNumber);

  const [phoneNumber, setPhoneNumber] = useState(savedPhone);
  const [error, setError] = useState<string | undefined>();

  const validate = () => {
    if (!phoneNumber.trim()) {
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
    navigation.navigate(ROUTES.SIGN_UP_PASSKEY);
  };

  return (
    <ScreenWrapper>
      <View>
        <BrandHeader title="Phone Number" subtitle="Car towing & transport app." />

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
