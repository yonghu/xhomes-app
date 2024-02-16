import { Button, StyleSheet } from 'react-native';
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { Text, View } from '@/components/themed';
import SignUpScreen from "@/components/authentication/signup";
import Register from "@/components/authentication/register";
import SignInScreen from "@/components/authentication/signin";
import SignInWithOAuth from "@/components/authentication/signin-with-oauth";

export default function Menu() {

  const SignOut = () => {
    const { isLoaded, signOut } = useAuth();
    if (!isLoaded) {
      return null;
    }
    return (
      <View>
        <Button
          title="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SignedIn>
        <Text>You are Signed in</Text>
      </SignedIn>
      <SignedOut>
        <SignUpScreen />
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
