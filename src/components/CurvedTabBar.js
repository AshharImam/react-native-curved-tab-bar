/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Text,
  Image,
  Platform,
  Keyboard,
} from 'react-native';
import { TabBarBackground } from './TabBarBackground';
import { FloatingButton } from './FloatingButton';
import { vw, vh, getGradientColors } from '../utils';
export const CurvedTabBar = ({
  tabs,
  activeIndex,
  onTabPress,
  gradientColors,
  heightPercentage = 9,
  floatingButtonSize = 6,
  activeIconColor = '#ffffff',
  inactiveIconColor = '#cccccc',
  activeTextColor,
  inactiveTextColor = '#cccccc',
  fontSize = 12,
  fontFamily,
  hideOnKeyboard = false,
  springConfig = { damping: 12, stiffness: 120 },
  shadowConfig = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
}) => {
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  // Animation values
  const curvePosition = useRef(new Animated.Value(0)).current;
  const floatingAnims = useRef(tabs.map(() => new Animated.Value(0))).current;
  const processedGradientColors = getGradientColors(gradientColors);
  const finalActiveTextColor = activeTextColor || activeIconColor;
  // Keyboard visibility handling
  useEffect(() => {
    if (!hideOnKeyboard) return;
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );
    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, [hideOnKeyboard]);
  // Calculate tab positions
  const getTabPosition = (index) => {
    const screenWidth = Math.ceil(vw * 100);
    const tabWidth = screenWidth / tabs.length;
    const tabCenter = index * tabWidth + tabWidth / 2;
    const screenCenter = screenWidth / 2;
    return -screenWidth + (tabCenter - screenCenter);
  };
  // Animate curve and floating icon
  const animateToTab = (targetIndex) => {
    const targetPosition = getTabPosition(targetIndex);
    // Animate curve position
    Animated.spring(curvePosition, {
      toValue: targetPosition,
      useNativeDriver: true,
      damping: springConfig.damping,
      stiffness: springConfig.stiffness,
    }).start();
    // Reset all floating animations
    floatingAnims.forEach((anim, index) => {
      Animated.spring(anim, {
        toValue: index === targetIndex ? -vh * 4.2 : 0,
        useNativeDriver: true,
        damping: 10,
        stiffness: 100,
      }).start();
    });
  };
  // Initialize with focused tab
  useEffect(() => {
    const timer = setTimeout(() => {
      animateToTab(activeIndex);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  // Animate when tab changes
  useEffect(() => {
    animateToTab(activeIndex);
  }, [activeIndex]);
  const styles = createStyles({
    heightPercentage,
    fontSize,
    fontFamily,
    inactiveIconColor,
    inactiveTextColor,
  });
  if (hideOnKeyboard && isKeyboardVisible) {
    return null;
  }
  return (
    <View style={styles.wrapper}>
      <View style={styles.tabBackground}>
        <TabBarBackground
          curvePosition={curvePosition}
          gradientColors={processedGradientColors}
          heightPercentage={heightPercentage}
        />
      </View>

      {tabs.map((tab, index) => {
        const isFocused = activeIndex === index;
        const handlePress = () => {
          onTabPress(index, tab);
        };
        return (
          <Animated.View
            key={tab.key}
            style={[
              styles.tabContainer,
              {
                transform: [{ translateY: floatingAnims[index] }],
              },
            ]}
          >
            <TouchableOpacity onPress={handlePress} style={styles.tabButton}>
              {isFocused ? (
                // Floating button with gradient background
                <FloatingButton
                  icon={tab.icon}
                  iconTintColor={activeIconColor}
                  gradientColors={processedGradientColors}
                  size={floatingButtonSize}
                  shadowConfig={shadowConfig}
                  badgeCount={tab.badgeCount}
                />
              ) : (
                // Regular tab button
                <>
                  <View style={styles.iconContainer}>
                    <Image
                      style={[styles.icon, { tintColor: inactiveIconColor }]}
                      source={tab.icon}
                    />
                    {tab.badgeCount && tab.badgeCount > 0 && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                          {tab.badgeCount > 99
                            ? '99+'
                            : tab.badgeCount.toString()}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.tabText, { color: inactiveTextColor }]}>
                    {tab.label}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};
const createStyles = ({
  heightPercentage,
  floatingButtonSize,
  fontSize,
  fontFamily,
  shadowConfig,
}) =>
  StyleSheet.create({
    wrapper: {
      position: 'absolute',
      bottom: 0,
      alignSelf: 'center',
      backgroundColor: 'transparent',
      justifyContent: 'space-between',
      height: Math.ceil(vh * heightPercentage),
      flexDirection: 'row',
      width: '100%',
    },
    tabBackground: {
      position: 'absolute',
      bottom: 0,
      zIndex: 20,
      width: '100%',
    },
    tabContainer: {
      flex: 1,
      zIndex: 30,
    },
    tabButton: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      paddingBottom: Platform.OS === 'ios' ? vh * 0.98 : 0,
    },
    tabText: {
      fontSize,
      fontFamily,
      textAlign: 'center',
    },
    iconContainer: {
      position: 'relative',
    },
    icon: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
      marginBottom: 2,
    },
    badge: {
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
    },
    badgeText: {
      color: 'white',
      fontSize: 10,
      fontWeight: 'bold',
    },
  });
