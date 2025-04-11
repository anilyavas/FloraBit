import { Platform, SafeAreaView, StatusBar, View, Text } from 'react-native';

import PlantScanner from '~/components/PlantScanner';

export default function Scanner() {
  return (
    <View className="flex-1 bg-[#C8D8C4]">
      <SafeAreaView
        className="flex-1"
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        <Text className="border-b-hairline border-gray-500 p-4 text-xl font-bold text-gray-500">
          Plant Doctor
        </Text>
        <PlantScanner />
      </SafeAreaView>
      <StatusBar barStyle="dark-content" />
    </View>
  );
}
