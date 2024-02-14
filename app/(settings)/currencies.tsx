import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import { colors } from '@/constants/colors';
import { useColorScheme } from '@/components/use-color-scheme';
import { Text, View } from '@/components/themed';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useI18nContext } from '@/components/i18n/i18n-react';
import { Config } from '@/configs/configs';
import { countries } from '@/constants/countries';

export default function Currencies() {
  const colorScheme = useColorScheme();
  const router = useNavigation();
  const { LL } = useI18nContext()
  const country = countries[Config.countryCode ?? 'US'].name;
  const language = countries[Config.countryCode ?? 'US'].languages[0].language;
  const currencyCode = countries[Config.countryCode ?? 'US'].currency_code;
  const currencySymbol = countries[Config.countryCode ?? 'US'].currency_symbol;

  useEffect(() => {
    router.setOptions({ title: LL.CURRENCY(), headerBackTitle: LL.BACK() });
  }, [LL]); // Add dependency array to re-execute only when `LL` changes

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
                style={{ marginTop: 15, marginLeft: 15, marginRight: 7, opacity: pressed ? 0.5 : 1 }}
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
                style={{ marginTop: 15, marginLeft: 15, marginRight: 7, opacity: pressed ? 0.5 : 1 }}
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
    marginTop: 15,
    fontSize: 17,
  },
  value: {
    fontSize: 14,
  },
  separator: {
    marginTop: 15,
    height: 1,
    width: '100%',
  },
});
