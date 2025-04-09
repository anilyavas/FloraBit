import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';
import { ActivityIndicator } from 'react-native';

export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (isSignedIn) {
    return <Redirect href="/(tabs)" />;
  }

  if (!isLoaded) {
    return <ActivityIndicator />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
