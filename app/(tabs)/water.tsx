import { SafeAreaView, View, Platform, StatusBar } from 'react-native';

export default function WaterTrack() {
  return (
    <View className="flex-1 bg-[#C8D8C4]">
      <SafeAreaView
        className="flex-1"
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}
      />
      <StatusBar barStyle="dark-content" />
    </View>
  );
}
