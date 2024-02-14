import * as Localization from 'expo-localization'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useColorScheme } from '@/components/use-color-scheme';

import TypesafeI18n from '@/components/i18n/i18n-react'
import { Locales } from '@/components/i18n/i18n-types'
import { isLocale } from '@/components/i18n/i18n-util'
import { loadLocaleAsync } from '@/components/i18n/i18n-util.async'
import { getUserLocale } from '@/components/async-storage'
import { Config } from '@/configs/configs'
import { countries } from '@/constants/countries'
import '@/components/polyfill/Intl'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const [localeLoaded, setLocaleLoaded] = useState<Locales | null>(null)

  useEffect(() => {
    getUserLocale()
      .then(async locale => { await loadLocaleAsync(locale); return locale })
      .then(setLocaleLoaded)
  }, [])

  // Note: All hooks are called regardless of conditions now.
  if (!loaded || localeLoaded === null) {
    return null; // You might want to render a loading indicator instead of null.
  }

  return <RootLayoutNav localeLoaded={localeLoaded} />;
}

interface RootLayoutNavProps {
  localeLoaded: Locales;
}

function RootLayoutNav({ localeLoaded }: RootLayoutNavProps) {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <TypesafeI18n locale={localeLoaded}>
        <Stack>
          <Stack.Screen name="(settings)/settings" options={{ title: 'Settings', headerBackTitle: 'Back' }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'Tabs' }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </TypesafeI18n>
    </ThemeProvider>
  );
}
