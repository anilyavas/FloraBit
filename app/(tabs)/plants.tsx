import { SafeAreaView, View, Platform, StatusBar, Text } from 'react-native';

export default function PlantCollection() {
  return (
    <View className="flex-1 bg-[#C8D8C4]">
      <SafeAreaView
        className="flex-1"
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        <View className="border-b-hairline border-gray-500 p-4">
          <Text className="text-xl font-bold text-gray-500">Plant Collection</Text>
        </View>
        <View className="p-4">
          <Text className="text-gray-500">
            This is the plant collection screen. You can add, remove, or view plants here.
          </Text>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="dark-content" />
    </View>
  );
}
