import React, { useEffect, useRef } from 'react';
import {
  Animated,
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
import { BrandLogo, UserIcon } from '../../assets/icons';
import { CustomButton } from '../../components/CustomButton';
import Svg, {
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Rect,
  Circle,
  Path,
  G,
} from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Entrance animations for logo and content
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const slideUpAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, slideUpAnim]);

  const handleGetStarted = () => {
    navigation.replace(ROUTES.SIGN_IN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Atmospheric Automotive & Pulse Background Art */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <Defs>
            {/* Primary Dark Petrol Gradient */}
            <LinearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#082A34" />
              <Stop offset="45%" stopColor="#051C23" />
              <Stop offset="100%" stopColor="#020E12" />
            </LinearGradient>

            {/* Ambient Cyan Glow behind Logo */}
            <RadialGradient
              id="centerGlow"
              cx="50%"
              cy="40%"
              rx="55%"
              ry="40%"
              fx="50%"
              fy="40%"
            >
              <Stop offset="0%" stopColor="#00E5FF" stopOpacity="0.18" />
              <Stop offset="50%" stopColor="#027088" stopOpacity="0.08" />
              <Stop offset="100%" stopColor="#051C23" stopOpacity="0" />
            </RadialGradient>
          </Defs>

          {/* Base Background */}
          <Rect width={width} height={height} fill="url(#bgGrad)" />

          {/* Radial Ambient Center Glow */}
          <Rect width={width} height={height} fill="url(#centerGlow)" />

          {/* Concentric Pulse / Radar Rings (Automotive Network Concept) */}
          <G opacity={0.18}>
            <Circle
              cx={width / 2}
              cy={height * 0.38}
              r={120}
              stroke="#00E5FF"
              strokeWidth="1"
              strokeDasharray="4 6"
              fill="none"
            />
            <Circle
              cx={width / 2}
              cy={height * 0.38}
              r={180}
              stroke="#00E5FF"
              strokeWidth="1"
              strokeDasharray="6 8"
              fill="none"
            />
            <Circle
              cx={width / 2}
              cy={height * 0.38}
              r={250}
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="0.8"
              strokeDasharray="8 12"
              fill="none"
            />
          </G>

          {/* Forward Road Perspective Vector Grid */}
          <G opacity={0.15}>
            {/* Vanishing Horizon Point */}
            <Path
              d={`M ${width * 0.15} ${height} L ${width * 0.44} ${height * 0.62} M ${width * 0.85} ${height} L ${width * 0.56} ${height * 0.62}`}
              stroke="#00E5FF"
              strokeWidth="1.5"
            />
            <Path
              d={`M ${width * 0.3} ${height} L ${width * 0.47} ${height * 0.62} M ${width * 0.7} ${height} L ${width * 0.53} ${height * 0.62}`}
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1"
              strokeDasharray="6 6"
            />
            {/* Horizontal Distance Crossbars */}
            <Path
              d={`M ${width * 0.22} ${height * 0.9} L ${width * 0.78} ${height * 0.9}`}
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1"
            />
            <Path
              d={`M ${width * 0.32} ${height * 0.78} L ${width * 0.68} ${height * 0.78}`}
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
            />
            <Path
              d={`M ${width * 0.4} ${height * 0.68} L ${width * 0.6} ${height * 0.68}`}
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1"
            />
          </G>
        </Svg>
      </View>

      {/* Main Foreground Content */}
      <View style={styles.content}>
        <View style={styles.topSpacer} />

        {/* Center Branding Hero */}
        <Animated.View
          style={[
            styles.brandCenter,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Glassmorphic Logo Shield */}
          <View style={styles.logoBadgeContainer}>
            <View style={styles.logoBadgeGlow} />
            <View style={styles.logoBadge}>
              <BrandLogo size={58} color="#FFFFFF" badgeColor="#06222A" />
            </View>
          </View>

          {/* Bold Brand Title */}
          <Text style={styles.brandTitle}>AUTOPULSE</Text>

          {/* Subtitle Badge */}
          <View style={styles.taglineBadge}>
            <Text style={styles.taglineText}>CAR TOWING & TRANSPORT APP</Text>
          </View>
        </Animated.View>

        {/* Bottom Actions & Supervision Section */}
        <Animated.View
          style={[
            styles.bottomSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }],
            },
          ]}
        >
          {/* Frosted Glass Developer Badge */}
          <View style={styles.supervisorCard}>
            <View style={styles.badgeWrapper}>
              <View style={styles.avatarCircle}>
                <UserIcon size={22} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.supervisorInfo}>
              <Text style={styles.supervisorLabel}>DEVELOPED & CRAFTED BY</Text>
              <Text style={styles.badgeCode}>NOMAN ALI</Text>
              <Text style={styles.badgeSubtitle}>REACT NATIVE FULL STACK DEVELOPER</Text>
            </View>
          </View>

          {/* Get Started Button */}
          <CustomButton
            title="Get Started"
            variant="white"
            showArrow={true}
            onPress={handleGetStarted}
            style={styles.ctaButton}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#06222A',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topSpacer: {
    height: 20,
  },
  brandCenter: {
    alignItems: 'center',
    marginTop: -20,
  },
  logoBadgeContainer: {
    width: 104,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  logoBadgeGlow: {
    position: 'absolute',
    width: 114,
    height: 114,
    borderRadius: 57,
    backgroundColor: 'rgba(0, 229, 255, 0.15)',
  },
  logoBadge: {
    width: 98,
    height: 98,
    borderRadius: 49,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.22)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  brandTitle: {
    fontSize: 35,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 5,
    textAlign: 'center',
  },
  taglineBadge: {
    backgroundColor: 'rgba(0, 229, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.28)',
    borderRadius: 14,
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginTop: 10,
  },
  taglineText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#4FE8FF',
    letterSpacing: 2,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
  },
  supervisorCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
    // Soft glass shadow
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  badgeWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 229, 255, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 229, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  supervisorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  supervisorLabel: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#7EA2AC',
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  badgeCode: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.6,
  },
  badgeSubtitle: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 0.5,
    marginTop: 1,
  },
  ctaButton: {
    height: 56,
    borderRadius: 28,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
});
