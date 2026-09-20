import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ROUTES } from '../../constants/routes';
import { BrandLogo, GTTBadge } from '../../assets/icons';
import { CustomButton } from '../../components/CustomButton';
import Svg, { Defs, LinearGradient, Stop, Rect, Path, G } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleGetStarted = () => {
    navigation.replace(ROUTES.SIGN_IN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Rich Automotive Background Art */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <Defs>
            <LinearGradient id="splashGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#0B3742" />
              <Stop offset="40%" stopColor="#082A34" />
              <Stop offset="100%" stopColor="#041B22" />
            </LinearGradient>
            <LinearGradient id="carGrad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
              <Stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
            </LinearGradient>
          </Defs>
          <Rect width={width} height={height} fill="url(#splashGrad)" />

          {/* Stylized Tow Truck / Flatbed Car Silhouette in background */}
          <G opacity={0.12}>
            {/* Flatbed ramp angle */}
            <Path
              d={`M -20 ${height * 0.45} L ${width + 40} ${height * 0.32} L ${width + 40} ${height * 0.65} L -20 ${height * 0.65} Z`}
              fill="url(#carGrad)"
            />
            {/* Flatbed stripes / hazard markings */}
            <Path
              d={`M 0 ${height * 0.52} L ${width} ${height * 0.52}`}
              stroke="#FFFFFF"
              strokeWidth="10"
              strokeDasharray="20 20"
            />
            {/* Curved wireframe speedlines */}
            <Path
              d={`M -40 ${height * 0.85} C ${width * 0.3} ${height * 0.65}, ${width * 0.6} ${height * 0.45}, ${width + 40} ${height * 0.25}`}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1.5"
              fill="none"
            />
            <Path
              d={`M -40 ${height * 0.88} C ${width * 0.3} ${height * 0.68}, ${width * 0.6} ${height * 0.48}, ${width + 40} ${height * 0.28}`}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1.5"
              fill="none"
            />
            <Path
              d={`M -40 ${height * 0.91} C ${width * 0.3} ${height * 0.71}, ${width * 0.6} ${height * 0.51}, ${width + 40} ${height * 0.31}`}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1.5"
              fill="none"
            />
          </G>
        </Svg>
      </View>

      <View style={styles.content}>
        {/* Top Spacer */}
        <View style={styles.topSpacer} />

        {/* Center Branding */}
        <View style={styles.brandCenter}>
          <BrandLogo size={68} color="#FFFFFF" badgeColor="#082A34" />
          <Text style={styles.brandTitle}>AUTOPULSE</Text>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Powered & Supervised badge */}
          <View style={styles.supervisionContainer}>
            <Text style={styles.supervisionText}>Powered and Supervised by</Text>
            <View style={styles.supervisorRow}>
              <GTTBadge size={44} />
              <View style={styles.supervisorInfo}>
                <Text style={styles.badgeCode}>GTT-US</Text>
                <Text style={styles.badgeTitle}>GOLDEN TOUCH</Text>
                <Text style={styles.badgeSubtitle}>TECHNOLOGY LLC</Text>
              </View>
            </View>
          </View>

          {/* White Get Started CTA Button */}
          <CustomButton
            title="Get Started"
            variant="white"
            showArrow={false}
            onPress={handleGetStarted}
            style={styles.ctaButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#072C36',
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingBottom: 36,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topSpacer: {
    height: 40,
  },
  brandCenter: {
    alignItems: 'center',
    marginTop: -40,
  },
  brandTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 4,
    marginTop: 16,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
  },
  supervisionContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  supervisionText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '400',
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  supervisorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  supervisorInfo: {
    justifyContent: 'center',
  },
  badgeCode: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  badgeTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
  badgeSubtitle: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.75)',
    letterSpacing: 0.5,
  },
  ctaButton: {
    height: 54,
    borderRadius: 27,
  },
});
