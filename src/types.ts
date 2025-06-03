// src/types.ts
export interface TabItem {
  /** Unique key for the tab */
  key: string;
  /** Display label for the tab */
  label: string;
  /** Icon source (can be require() or URI) */
  icon: any;
  /** Optional badge count */
  badgeCount?: number;
}

export interface CurvedTabBarProps {
  /** Array of tab items */
  tabs: TabItem[];
  /** Currently active tab index */
  activeIndex: number;
  /** Callback when tab is pressed */
  onTabPress: (index: number, tab: TabItem) => void;
  /** Background gradient colors [start, end] - if single color provided, uses same color for both */
  gradientColors?: string[];
  /** Tab bar height as percentage of screen height (default: 9) */
  heightPercentage?: number;
  /** Floating button size as percentage of screen height (default: 6) */
  floatingButtonSize?: number;
  /** Active tab icon tint color (default: white) */
  activeIconColor?: string;
  /** Inactive tab icon tint color (default: #ccc) */
  inactiveIconColor?: string;
  /** Inactive tab text color (default: #ccc) */
  inactiveTextColor?: string;
  /** Tab label font size (default: 12) */
  fontSize?: number;
  /** Custom font family for labels */
  fontFamily?: string;
  /** Hide tab bar when keyboard is visible (default: false) */
  hideOnKeyboard?: boolean;
  /** Animation spring config */
  springConfig?: {
    damping?: number;
    stiffness?: number;
  };
  /** Shadow configuration for floating button */
  shadowConfig?: {
    shadowColor?: string;
    shadowOffset?: { width: number; height: number };
    shadowOpacity?: number;
    shadowRadius?: number;
    elevation?: number;
  };
}
