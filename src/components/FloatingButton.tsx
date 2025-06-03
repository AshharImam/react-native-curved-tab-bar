import React from 'react';
import { View, Image, Text } from 'react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient as SvgGradient,
  Stop,
} from 'react-native-svg';
import { vh } from '../utils';

interface FloatingButtonProps {
  icon: any;
  iconTintColor: string;
  gradientColors: [string, string];
  size: number;
  shadowConfig: any;
  badgeCount?: number;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  icon,
  iconTintColor,
  gradientColors,
  size,
  shadowConfig,
  badgeCount,
}) => {
  const buttonSize = vh * size;
  const iconSize = buttonSize * 0.48;

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        ...shadowConfig,
      }}
    >
      <Svg width={buttonSize} height={buttonSize}>
        <Defs>
          <SvgGradient
            id="floatingButtonGradient"
            x1="0%"
            y1="25%"
            x2="80%"
            y2="100%"
          >
            <Stop offset="0%" stopColor={gradientColors[0]} />
            <Stop offset="100%" stopColor={gradientColors[1]} />
          </SvgGradient>
        </Defs>
        <Circle
          cx={buttonSize / 2}
          cy={buttonSize / 2}
          r={buttonSize / 2}
          fill="url(#floatingButtonGradient)"
        />
      </Svg>

      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          width: buttonSize,
          height: buttonSize,
        }}
      >
        <Image
          style={{
            width: iconSize,
            height: iconSize,
            resizeMode: 'contain',
            tintColor: iconTintColor,
          }}
          source={icon}
        />
      </View>

      {badgeCount && badgeCount > 0 && (
        <View
          style={{
            position: 'absolute',
            top: -5,
            right: -10,
            backgroundColor: '#ff4444',
            borderRadius: 10,
            minWidth: 20,
            height: 20,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 4,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 10,
              fontWeight: 'bold',
            }}
          >
            {badgeCount > 99 ? '99+' : badgeCount.toString()}
          </Text>
        </View>
      )}
    </View>
  );
};
