import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const BackgroundPattern: React.FC = () => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%" viewBox="0 0 375 812" preserveAspectRatio="none">
        {/* Subtle radiating curved lines from bottom-left across the screen */}
        <Path
          d="M-50 850 C50 650, 150 400, 420 150"
          stroke="rgba(7, 44, 54, 0.04)"
          strokeWidth="1.2"
          fill="none"
        />
        <Path
          d="M-50 820 C60 620, 170 380, 420 180"
          stroke="rgba(7, 44, 54, 0.04)"
          strokeWidth="1.2"
          fill="none"
        />
        <Path
          d="M-50 790 C70 590, 190 360, 420 210"
          stroke="rgba(7, 44, 54, 0.04)"
          strokeWidth="1.2"
          fill="none"
        />
        <Path
          d="M-50 760 C80 560, 210 340, 420 240"
          stroke="rgba(7, 44, 54, 0.04)"
          strokeWidth="1.2"
          fill="none"
        />
        <Path
          d="M-50 730 C90 530, 230 320, 420 270"
          stroke="rgba(7, 44, 54, 0.04)"
          strokeWidth="1.2"
          fill="none"
        />
        <Path
          d="M-50 700 C100 500, 250 300, 420 300"
          stroke="rgba(7, 44, 54, 0.03)"
          strokeWidth="1.2"
          fill="none"
        />
        <Path
          d="M-50 670 C110 470, 270 280, 420 330"
          stroke="rgba(7, 44, 54, 0.03)"
          strokeWidth="1.2"
          fill="none"
        />
      </Svg>
    </View>
  );
};
