import React from 'react';
import { StyleSheet } from 'react-native';

import { Link, Tabs } from 'expo-router';
import { Pressable, Text } from 'react-native';
import { colors } from '@/constants/colors';
import { useColorScheme } from '@/components/use-color-scheme';
import { useClientOnlyValue } from '@/components/use-client-only-value';

import { useI18nContext } from '@/components/i18n/i18n-react'
import { MaterialCommunityIcons, MaterialIcons, Feather } from '@expo/vector-icons';

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
        tabBarActiveTintColor: colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name='search'
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
                    color={colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name='index'
        options={{
          title: `${LL.HOME()}`,
          tabBarIcon: ({ color }) => <TabBarIconMaterialIcons name='home' color={color} />,
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
                    color={colors[colorScheme ?? 'light'].text}
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
    fontSize: 20,
    fontWeight: 'bold',
  }
});
