import { useAuth } from '@clerk/clerk-expo';
import { Platform, Pressable, SafeAreaView, StatusBar, View, Text } from 'react-native';

export default function Settings() {
  const { signOut } = useAuth();
  return (
    <View className="flex-1 bg-[#C8D8C4]">
      <SafeAreaView
        className="flex-1"
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        <Pressable onPress={() => signOut()}>
          <Text>Sign out</Text>
        </Pressable>
      </SafeAreaView>
      <StatusBar barStyle="dark-content" />
    </View>
  );
}
