// src/utils.ts
import { Dimensions } from 'react-native';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export const vw = screenWidth / 100;
export const vh = screenHeight / 100;
export const getGradientColors = (colors) => {
  if (!colors || colors.length === 0) {
    return ['#6366f1', '#8b5cf6']; // Default gradient
  }
  if (colors.length === 1) {
    return [colors[0], colors[0]];
  }
  return [colors[0], colors[1]];
};
