import { View, Text, SafeAreaView, StatusBar, Platform } from 'react-native';

export default function Home() {
  return (
    <View className="flex-1 bg-backgroundDark">
      <SafeAreaView
        className="flex-1"
        style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
        <Text className="border-b-hairline border-gray-300 p-6 text-3xl font-bold text-primaryGreen">
          PlantBit
        </Text>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
