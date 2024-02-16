import { StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/edit-screen-info';
import { Text, View } from '@/components/themed';
import { SignedIn, SignedOut } from "@clerk/clerk-expo";

export default function Menu() {
  return (
    <View style={styles.container}>
      <SignedIn>
        <Text>You are Signed in</Text>
      </SignedIn>
      <SignedOut>
        <Text>You are Signed out</Text>
        <Text style={styles.title}>Menu</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <EditScreenInfo path="app/(tabs)/two.tsx" />
      </SignedOut>
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
    marginVertical: 15,
    height: 1,
    width: '100%',
  },
});
