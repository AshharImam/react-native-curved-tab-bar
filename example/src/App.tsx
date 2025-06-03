import React, { useState } from 'react';
import { View } from 'react-native';
//@ts-expect-error
import CurvedTabBar, { TabItem } from 'react-native-curved-tab-bar';

const tabs: TabItem[] = [
  {
    key: 'home',
    label: 'Home',
    icon: {
      uri: 'https://cdn-icons-png.flaticon.com/128/1946/1946488.png',
    },
  },
  {
    key: 'search',
    label: 'Search',
    icon: {
      uri: 'https://cdn-icons-png.flaticon.com/128/622/622669.png',
    },
  },
  {
    key: 'profile',
    label: 'Profile',
    icon: {
      uri: 'https://cdn-icons-png.flaticon.com/128/1144/1144760.png',
    },
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
