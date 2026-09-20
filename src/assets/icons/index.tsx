import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

// Brand Pin with Car Logo (as in the MOVCA reference screenshot)
export const BrandLogo: React.FC<{ size?: number; color?: string; badgeColor?: string }> = ({
  size = 48,
  color = '#072C36',
  badgeColor = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size * 1.25} viewBox="0 0 48 60" fill="none">
      {/* Outer Pin Body */}
      <Path
        d="M24 0C10.745 0 0 10.745 0 24C0 39.5 24 60 24 60C24 60 48 39.5 48 24C48 10.745 37.255 0 24 0Z"
        fill={color}
      />
      {/* Inner Circle / Car silhouette */}
      <Circle cx="24" cy="24" r="16" fill={color} stroke={badgeColor} strokeWidth="2.5" />
      {/* Sleek Car Icon */}
      <Path
        d="M17 25.5C17.5 23 18.8 20.8 20 20.5H28C29.2 20.8 30.5 23 31 25.5H33C33.6 25.5 34 26 34 26.6V28.5C34 28.8 33.8 29 33.5 29H33V30.5C33 31.1 32.6 31.5 32 31.5H31C30.4 31.5 30 31.1 30 30.5V29.5H18V30.5C18 31.1 17.6 31.5 17 31.5H16C15.4 31.5 15 31.1 15 30.5V29H14.5C14.2 29 14 28.8 14 28.5V26.6C14 26 14.4 25.5 15 25.5H17ZM19.2 22C18.6 22.5 18 23.8 17.6 25H30.4C30 23.8 29.4 22.5 28.8 22H19.2ZM17.5 28C18.05 28 18.5 27.55 18.5 27C18.5 26.45 18.05 26 17.5 26C16.95 26 16.5 26.45 16.5 27C16.5 27.55 16.95 28 17.5 28ZM30.5 28C31.05 28 31.5 27.55 31.5 27C31.5 26.45 31.05 26 30.5 26C29.95 26 29.5 26.45 29.5 27C29.5 27.55 29.95 28 30.5 28Z"
        fill={badgeColor}
      />
    </Svg>
  );
};

// Mail / Envelope Icon
export const MailIcon: React.FC<IconProps> = ({ size = 20, color = '#072C36' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 6L12 13L2 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Lock / Password Icon
export const LockIcon: React.FC<IconProps> = ({ size = 20, color = '#072C36' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x="3"
      y="11"
      width="18"
      height="11"
      rx="2"
      ry="2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Eye Toggle Icon
export const EyeIcon: React.FC<IconProps> = ({ size = 20, color = '#9CA3AF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Eye Off / Hidden Icon
export const EyeOffIcon: React.FC<IconProps> = ({ size = 20, color = '#9CA3AF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17.94 17.94A10.07 10.07 0 0 1 12 20C5 20 1 12 1 12A18.45 18.45 0 0 1 5.06 6.06L17.94 17.94ZM9.9 4.24A9.12 9.12 0 0 1 12 4C19 4 23 12 23 12A18.5 18.5 0 0 1 19.42 16.42L9.9 4.24Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1 1L23 23"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// User / Person Icon
export const UserIcon: React.FC<IconProps> = ({ size = 20, color = '#072C36' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Phone Icon
export const PhoneIcon: React.FC<IconProps> = ({ size = 20, color = '#072C36' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 16.92V19.92C22.0011 20.1986 21.9441 20.4742 21.8325 20.7294C21.7209 20.9846 21.5573 21.2137 21.3521 21.4019C21.1468 21.5902 20.9046 21.7336 20.6407 21.8228C20.3769 21.912 20.0974 21.9452 19.82 21.92C16.7428 21.5857 13.787 20.5342 11.19 18.85C8.77382 17.3148 6.72533 15.2663 5.19 12.85C3.49997 10.2413 2.44824 7.27109 2.12 4.18C2.095 3.90353 2.12787 3.62489 2.21649 3.36171C2.30512 3.09852 2.44754 2.85679 2.63476 2.65207C2.82198 2.44735 3.0498 2.28424 3.30379 2.17302C3.55777 2.0618 3.83227 2.00504 4.11 2.006H7.11C7.5953 1.99524 8.06579 2.16708 8.43376 2.48936C8.80173 2.81164 9.04207 3.26244 9.11 3.76C9.23662 4.68007 9.47144 5.58048 9.81 6.44C9.96762 6.83734 9.99908 7.27218 9.90098 7.68817C9.80288 8.10416 9.57946 8.48151 9.26 8.77L7.99 10.04C9.41297 12.5406 11.4594 14.587 13.96 16.01L15.23 14.74C15.5185 14.4205 15.8958 14.1971 16.3118 14.099C16.7278 14.0009 17.1627 14.0324 17.56 14.19C18.4195 14.5286 19.3199 14.7634 20.24 14.89C20.7431 14.9587 21.1986 15.2036 21.5222 15.5791C21.8458 15.9546 22.0145 16.4347 22 16.92Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Right Arrow Icon (for Buttons)
export const ArrowRightIcon: React.FC<IconProps> = ({ size = 18, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 12H19M19 12L12 5M19 12L12 19"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Google 'G' Icon
export const GoogleIcon: React.FC<IconProps> = ({ size = 22 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <Path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <Path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <Path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </Svg>
);

// Facebook 'f' Icon
export const FacebookIcon: React.FC<IconProps> = ({ size = 22 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
      fill="#1877F2"
    />
  </Svg>
);

// Instagram Camera Glyph Icon
export const InstagramIcon: React.FC<IconProps> = ({ size = 22 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="5"
      stroke="#072C36"
      strokeWidth="2"
    />
    <Circle cx="12" cy="12" r="4" stroke="#072C36" strokeWidth="2" />
    <Circle cx="17.5" cy="6.5" r="1.5" fill="#072C36" />
  </Svg>
);

// Checkmark Icon (for Terms checkbox)
export const CheckIcon: React.FC<IconProps> = ({ size = 16, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 6L9 17L4 12"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Supervision / GTT-US Badge Icon (from the Splash screen)
export const GTTBadge: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <Circle cx="30" cy="30" r="28" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeDasharray="3 3" />
    <Circle cx="30" cy="30" r="24" stroke="#FFFFFF" strokeWidth="1.5" />
    {/* Stylized Globe/Shield grid lines */}
    <Path d="M30 6V54M12 18H48M8 30H52M12 42H48" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
  </Svg>
);
