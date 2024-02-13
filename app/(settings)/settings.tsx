import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import EditScreenInfo from '@/components/edit-screen-info';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/use-color-scheme';
import { Text, View } from '@/components/themed';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useI18nContext } from '@/components/i18n/i18n-react'

export default function Settings() {
  const colorScheme = useColorScheme();
  const router = useNavigation();
  const { LL } = useI18nContext()

  useEffect(() => {
    router.setOptions({ title: LL.SETTINGS(), headerBackTitle: LL.BACK() });
  }, [LL]); // Add dependency array to re-execute only when `LL` changes

  return (
    <View style={styles.container}>
      <Link href='/country-languages' asChild>
        <Pressable>
          {({ pressed }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome5
                name='language'
                size={25}
                color={Colors[colorScheme ?? 'light'].text}
                style={{ marginTop: 15, marginLeft: 15, marginRight: 5, opacity: pressed ? 0.5 : 1 }}
              />
              <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text style={styles.title}>{LL.LANAGUAGES()}</Text>
                <Text style={styles.value}>{LL.LANAGUAGES()}</Text>
              </View>
            </View>
          )}
        </Pressable>
      </Link>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>settings...</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>settings...</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>settings...</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>settings...</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>settings...</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>settings...</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>settings...</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/search.tsx" />
    </View>
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
    fontSize: 15,
  },
  separator: {
    marginTop: 15,
    height: 1,
    width: '100%',
  },
});
