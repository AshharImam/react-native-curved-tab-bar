import React from 'react';
import { View, Animated } from 'react-native';
import Svg, {
  Path,
  Defs,
  LinearGradient as SvgGradient,
  Stop,
} from 'react-native-svg';
import { vw, vh } from '../utils';
export const TabBarBackground = ({
  curvePosition,
  gradientColors,
  heightPercentage,
}) => {
  const screenWidth = Math.ceil(vw * 100);
  const height = Math.ceil(vh * heightPercentage);
  // Create a wider background that can slide without showing gaps
  const totalWidth = screenWidth * 3;
  const centerOffset = screenWidth;
  const origWidth = 394;
  const origHeight = 86;
  // Scale curve proportionally to screen width
  const curveWidth = screenWidth;
  const leftEdge = (133 / origWidth) * curveWidth;
  const rightEdge = (258 / origWidth) * curveWidth;
  const center = (197 / origWidth) * curveWidth;
  const notchHeight = (43.5 / origHeight) * height;
  const leftControl1 = (159.724 / origWidth) * curveWidth;
  const leftControl2 = (172.684 / origWidth) * curveWidth;
  const rightControl1 = (220.932 / origWidth) * curveWidth;
  const rightControl2 = (235.992 / origWidth) * curveWidth;
  // Create path with curve positioned at center of the wide background
  const path = `
    M0 0
    L${centerOffset} 0
    C${centerOffset} 0 ${centerOffset + leftEdge * 0.8} 0 ${centerOffset + leftEdge} 0
    C${centerOffset + leftControl1} 0 ${centerOffset + leftControl2} ${notchHeight} ${centerOffset + center} ${notchHeight}
    C${centerOffset + rightControl1} ${notchHeight * 0.99} ${centerOffset + rightControl2} 0 ${centerOffset + rightEdge} 0
    C${centerOffset + rightEdge + (curveWidth - rightEdge) * 0.1} 0 ${centerOffset + curveWidth} 0 ${centerOffset + curveWidth} 0
    L${totalWidth} 0
    V${height}
    H0
    V0
    Z
  `;
  return (
    <View style={{ overflow: 'hidden', width: screenWidth }}>
      <Animated.View style={{ transform: [{ translateX: curvePosition }] }}>
        <Svg
          width={totalWidth}
          height={height}
          preserveAspectRatio="none"
          viewBox={`0 0 ${totalWidth} ${height}`}
          fill="none"
        >
          <Path d={path} fill="url(#curveGradient)" />
          <Defs>
            <SvgGradient
              id="curveGradient"
              x1={0}
              y1={height * 0.8}
              x2={totalWidth}
              y2={height * 0.8}
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset={0.0576923} stopColor={gradientColors[0]} />
              <Stop offset={0.903846} stopColor={gradientColors[1]} />
            </SvgGradient>
          </Defs>
        </Svg>
      </Animated.View>
    </View>
  );
};
