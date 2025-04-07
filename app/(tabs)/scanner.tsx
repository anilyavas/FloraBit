import { Platform, SafeAreaView, StatusBar, View } from 'react-native';

import PlantScanner from '~/components/PlantScanner';

export default function Scanner() {
  return (
    <View className="flex-1 bg-[#C8D8C4]">
      <SafeAreaView
        className="flex-1"
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        <PlantScanner />
      </SafeAreaView>
      <StatusBar barStyle="dark-content" />
    </View>
  );
}
