import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import EditScreenInfo from '@/components/edit-screen-info';
import { Text, View } from '@/components/themed';
import { useI18nContext } from '@/components/i18n/i18n-react'

export default function CountryLanguages() {
  const router = useNavigation();
  const { LL } = useI18nContext()

  useEffect(() => {
    router.setOptions({ title: LL.LANAGUAGES(), headerBackTitle: LL.BACK() });
  }, [LL]); // Add dependency array to re-execute only when `LL` changes

  return (
    <View style={styles.container}>
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
    marginLeft: 15,
    fontSize: 15,
  },
  separator: {
    marginTop: 15,
    height: 1,
    width: '100%',
  },
});
