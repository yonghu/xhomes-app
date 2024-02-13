import React from 'react';
import { StyleSheet } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, Tabs } from 'expo-router';
import { Pressable, Text } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

import { useI18nContext } from '../../services/i18n/i18n-react'
import { Feather } from '@expo/vector-icons';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIconMaterialIcons(props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) {
  return <MaterialIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { LL } = useI18nContext()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: `${LL.SEARCH()}`,
          tabBarIcon: ({ color }) => <TabBarIconMaterialIcons name='search' color={color} />,
          headerRight: () => (
            <Link href='/modal' asChild>
              <Pressable>
                {({ pressed }) => (
                  <MaterialCommunityIcons
                    name='face-agent'
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name='dashboard'
        options={{
          title: `${LL.DASHBOARD()}`,
          tabBarIcon: ({ color }) => <TabBarIconMaterialIcons name='dashboard' color={color} />,
        }}
      />
      <Tabs.Screen
        name='menu'
        options={{
          title: `${LL.MENU()}`,
          tabBarIcon: ({ color }) => <TabBarIconMaterialIcons name='menu' color={color} />,
          headerRight: () => (
            <Link href='/settings' asChild>
              <Pressable>
                {({ pressed }) => (
                  <Feather
                    name='settings'
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  title: {
    marginRight: 15,
    fontSize: 15,
    fontWeight: 'bold',
  }
});
