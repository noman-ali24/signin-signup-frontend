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
import { MailIcon } from '../../assets/icons';
import { BrandHeader } from '../../components/BrandHeader';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { ScreenWrapper } from '../../components/ScreenWrapper';

export const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSendReset = () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid registered email');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Reset Link Sent',
        `A password recovery link has been sent to ${email}. Please check your inbox.`,
        [
          {
            text: 'Back to Sign In',
            onPress: () => navigation.navigate(ROUTES.SIGN_IN),
          },
        ]
      );
    }, 800);
  };

  return (
    <ScreenWrapper>
      <View>
        <BrandHeader
          title="Reset Password"
          subtitle="Enter your email to receive recovery instructions."
        />

        <CustomInput
          label="Registered Email"
          placeholder="Enter your email address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (error) setError(undefined);
          }}
          keyboardType="email-address"
          icon={<MailIcon size={20} color={COLORS.primary} />}
          error={error}
        />

        <CustomButton
          title="Send Recovery Link"
          onPress={handleSendReset}
          loading={loading}
          style={styles.actionButton}
        />
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.SIGN_IN)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.backLink}>← Back to Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    marginTop: 12,
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  backLink: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
  },
});
