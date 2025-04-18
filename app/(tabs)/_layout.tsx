import { useUser } from '@clerk/clerk-expo';
import { Redirect, Tabs } from 'expo-router';

import { TabBarIcon } from '../../components/TabBarIcon';

export default function TabLayout() {
  const { user } = useUser();

  if (!user) {
    return <Redirect href="/(auth)/sign-in" />;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: 60,
          marginVertical: 30,
          marginHorizontal: 20,
          position: 'absolute',
          borderRadius: 30,
          paddingBottom: 10,
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        tabBarIconStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          marginTop: 5,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="plants"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="leaf" color={color} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{ tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} /> }}
      />
      <Tabs.Screen
        name="scanner"
        options={{ tabBarIcon: ({ color }) => <TabBarIcon name="camera" color={color} /> }}
      />
      <Tabs.Screen
        name="settings"
        options={{ tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} /> }}
      />
    </Tabs>
  );
}
