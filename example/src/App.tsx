import React, { useState } from 'react';
import { View } from 'react-native';
//@ts-expect-error
import CurvedTabBar, { TabItem } from 'react-native-curved-tab-bar';

const tabs: TabItem[] = [
  {
    key: 'home',
    label: 'Home',
    icon: require('./assets/home-icon.png'),
  },
  {
    key: 'search',
    label: 'Search',
    icon: require('./assets/search-icon.png'),
  },
  {
    key: 'profile',
    label: 'Profile',
    icon: require('./assets/profile-icon.png'),
    badgeCount: 3,
  },
];

const App = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabPress = (index: number, tab: TabItem) => {
    setActiveTab(index);
    // Handle navigation or other logic here
    console.log('Tab pressed:', tab.key);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Your app content */}

      <CurvedTabBar
        tabs={tabs}
        activeIndex={activeTab}
        onTabPress={handleTabPress}
        gradientColors={['#6366f1', '#8b5cf6']}
      />
    </View>
  );
};

export default App;
