import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/edit-screen-info';
import { Text, View } from '@/components/themed';

export default function Search() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search...</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/search.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
