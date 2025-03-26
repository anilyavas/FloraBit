import { View, Text, SafeAreaView, StatusBar, Platform } from 'react-native';

export default function Home() {
  return (
    <View className="bg-backgroundDark flex-1">
      <SafeAreaView
        className="flex-1"
        style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
        <Text className="text-primaryGreen p-6 text-2xl font-bold">Home</Text>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
