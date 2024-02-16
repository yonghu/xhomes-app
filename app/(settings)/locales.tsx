import { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { useNavigation } from 'expo-router';
import { Pressable } from 'react-native';
import { ScrollView } from 'react-native';
import { colors } from '@/constants/colors';
import { useColorScheme } from '@/components/use-color-scheme';
import { Text, View } from '@/components/themed';
import { useI18nContext } from '@/components/i18n/i18n-react';
import { countries, supportedCountryCodes } from '@/constants/countries';
import React from 'react';
import flagUS from '@/assets/flags/us.png';
import flagCA from '@/assets/flags/ca.png';
import flagMX from '@/assets/flags/mx.png';
import flagAR from '@/assets/flags/ar.png';
import flagCN from '@/assets/flags/cn.png';
import flagGB from '@/assets/flags/gb.png';
import flagRU from '@/assets/flags/ru.png';
import flagFR from '@/assets/flags/fr.png';
import flagDE from '@/assets/flags/de.png';
import flagIT from '@/assets/flags/it.png';
import flagSA from '@/assets/flags/sa.png';
import { getUserLocale, setUserLocale } from '@/components/secure-storage';
import { loadLocaleAsync } from '@/components/i18n/i18n-util.async';
import { Locales } from '@/components/i18n/i18n-types';

export default function SelectLocale() {
  const colorScheme = useColorScheme();
  const router = useNavigation();
  const { LL, setLocale } = useI18nContext()

  const selectLocale = async (locale: Locales) => {
    setUserLocale(locale as Locales)
      .then(async locale => { await loadLocaleAsync(locale); return locale })
      .then(setLocale)
  };

  // Now when you use countryCode to index Countries, TypeScript knows it is safe.
  // const country = countries[Config.countryCode ?? 'US'].name;
  // const language = countries[Config.countryCode ?? 'US'].languages[0].language;

  useEffect(() => {
    router.setOptions({ title: LL.COUNTRYANDLANAGUAGE(), headerBackTitle: LL.BACK() });
  }, [LL]); // Add dependency array to re-execute only when `LL` changes

  const [localeLoaded, setLocaleLoaded] = useState<Locales | null>(null)

  useEffect(() => {
    getUserLocale().then(async locale => { await loadLocaleAsync(locale); return locale }).then(setLocaleLoaded);
  });

  if (localeLoaded === null) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {supportedCountryCodes.map((countryCode, countryIndex) => {
        return countries[countryCode].languages.map((language, languageIndex) => {
          let flagImage;
          switch (countryCode) {
            case 'US':
              flagImage = flagUS;
              break;
            case 'CA':
              flagImage = flagCA;
              break;
            case 'MX':
              flagImage = flagMX;
              break;
            case 'AR':
              flagImage = flagAR;
              break;
            case 'CN':
              flagImage = flagCN;
              break;
            case 'GB':
              flagImage = flagGB;
              break;
            case 'RU':
              flagImage = flagRU;
              break;
            case 'FR':
              flagImage = flagFR;
              break;
            case 'DE':
              flagImage = flagDE;
              break;
            case 'IT':
              flagImage = flagIT;
              break;
            case 'SA':
              flagImage = flagSA;
              break;
            // Add cases for other country codes and corresponding image imports
            default:
              flagImage = null;
              break;
          }

          let styleSelected = {};
          if (localeLoaded === `${language.language_code}-${countryCode}`) {
            styleSelected = { backgroundColor: "#999" }
          }

          return (
            <View key={`locale-${countryIndex}-${languageIndex}`} style={[styles.container, styleSelected]}>
              <Pressable onPress={() => selectLocale(`${countries[countryCode].languages[languageIndex].language_code}-${countryCode}` as Locales)}>
                {({ pressed }) => (
                  <View style={[{ flexDirection: 'row', alignItems: 'center' }, styleSelected]}>
                    <Image
                      style={[styles.flag, { opacity: pressed ? 0.5 : 1 }]}
                      source={flagImage}
                    />
                    <View style={[{ flexDirection: 'column', alignItems: 'flex-start' }, styleSelected]}>
                      <Text style={styles.title}>{`${countries[countryCode].name}`}</Text>
                      <Text style={styles.value} lightColor={colors.light.tint}>{`${countries[countryCode].languages[languageIndex].language}`}</Text>
                    </View>
                  </View>
                )}
              </Pressable>
              <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            </View>
          );
        });
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'flex-start', // Or your desired alignment
    justifyContent: 'flex-start', // Or your desired alignment
  },
  container: {
    width: '100%',
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
  flag: {
    width: 40,
    height: 20,
    marginVertical: 20,
    marginHorizontal: 15,
  },
});
