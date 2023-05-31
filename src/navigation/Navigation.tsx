import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Home from '../components/Home';
import MyPage from '../components/MyPage';
import Bookmarked from '../components/Bookmarked';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="MY" component={MyPage} />
    </Tab.Navigator>
  );
};

function Navigation() {
  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={BottomTabNavigator} />
        <Stack.Screen name="BookMark" component={Bookmarked} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

export default Navigation;
