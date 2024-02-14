import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from 'expo-router'; // Import useFocusEffect
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import { colors } from '@/constants/colors';
import { useColorScheme } from '@/components/use-color-scheme';
import { Text, View } from '@/components/themed';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useI18nContext } from '@/components/i18n/i18n-react';
import { countries, Language, findLanguageByCode, findCountryByCurrencyCode } from '@/constants/countries';
import { Locales } from '@/components/i18n/i18n-types';
import { getUserCountry, getUserCurrency, getUserLocale } from '@/components/async-storage';
import { loadLocaleAsync } from '@/components/i18n/i18n-util.async';

export default function Settings() {
  const colorScheme = useColorScheme();
  const router = useNavigation();
  const { LL } = useI18nContext();

  const [localeLoaded, setLocaleLoaded] = useState<Locales | null>(null)
  const [countryLoaded, setCountryLoaded] = useState<string | null>(null)
  const [currencyLoaded, setCurrencyLoaded] = useState<string | null>(null)

  useEffect(() => {
    getUserLocale().then(async locale => { await loadLocaleAsync(locale); return locale }).then(setLocaleLoaded);
    getUserCountry().then(setCountryLoaded);
    getUserCurrency().then(setCurrencyLoaded);
  }, []);

  useEffect(() => {
    router.setOptions({ title: LL.SETTINGS(), headerBackTitle: LL.BACK() });
  }, [LL]);

  // Handle refresh logic when the screen is focused again
  useFocusEffect(() => {
    // Fetch necessary data again or perform any refresh actions here
    // For example, you can reload data from AsyncStorage or make API calls
    getUserLocale().then(async locale => { await loadLocaleAsync(locale); return locale }).then(setLocaleLoaded);
    getUserCountry().then(setCountryLoaded);
    getUserCurrency().then(setCurrencyLoaded);
  });

  if (localeLoaded === null || countryLoaded === null || currencyLoaded === null) {
    return null;
  }

  const country = countries[countryLoaded].name;
  const languageObj: Language | undefined = findLanguageByCode(countries[countryLoaded].languages, localeLoaded);
  let language = countries[countryLoaded].languages[0].language;
  if (languageObj) {
    language = languageObj.language;
  }

  const countryCurrency = findCountryByCurrencyCode(currencyLoaded);
  if (countryCurrency === undefined) {
    return null;
  }

  const currencyCode = countryCurrency.currency_code;
  const currencySymbol = countryCurrency.currency_symbol;

  return (
    <View style={styles.container}>
      <Link href='/country-languages' asChild>
        <Pressable>
          {({ pressed }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome
                name='language'
                size={25}
                color={colors[colorScheme ?? 'light'].text}
                style={[styles.icon, { opacity: pressed ? 0.5 : 1 }]}
              />
              <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text style={styles.title}>{LL.COUNTRYANDLANAGUAGE()}</Text>
                <Text style={styles.value} lightColor={colors.light.tint}>{`${country}, ${language}`}</Text>
              </View>
            </View>
          )}
        </Pressable>
      </Link>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Link href='/currencies' asChild>
        <Pressable>
          {({ pressed }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons
                name='currency-usd'
                size={25}
                color={colors[colorScheme ?? 'light'].text}
                style={[styles.icon, { opacity: pressed ? 0.5 : 1 }]}
              />
              <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text style={styles.title}>{LL.CURRENCY()}</Text>
                <Text style={styles.value} lightColor={colors.light.tint}>{`${currencyCode} (${currencySymbol})`}</Text>
              </View>
            </View>
          )}
        </Pressable>
      </Link>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 17,
  },
  value: {
    fontSize: 14,
  },
  separator: {
    height: 1,
    width: '100%',
  },
  icon: {
    marginVertical: 20,
    marginHorizontal: 15,
  },
});
