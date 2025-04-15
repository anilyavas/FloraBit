import { SafeAreaView, View, Text, Platform, StatusBar, ScrollView } from 'react-native';

import WateringCalendarScreen from '~/components/WaterCalendar';

export default function WaterTrack() {
  return (
    <View className="flex-1 bg-[#C8D8C4]">
      <SafeAreaView
        className="flex-1"
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        <View className="border-b-hairline border-gray-500 p-4">
          <Text className="text-xl font-bold text-gray-500">Water Tracking</Text>
        </View>
        <ScrollView className="flex-1 p-4">
          <WateringCalendarScreen />
          <Text className="p-2 text-center font-semibold text-gray-500">
            Select your already existed plant and keep track on your watering days with clicking and
            marking them.
          </Text>
        </ScrollView>
      </SafeAreaView>
      <StatusBar barStyle="dark-content" />
    </View>
  );
}
