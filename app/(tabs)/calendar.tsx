import { SafeAreaView, View, Text, Platform, StatusBar } from 'react-native';
import { Calendar } from 'react-native-calendars';

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
        <View className="p-4">
          <Calendar
            style={{
              borderWidth: 1,
              borderColor: 'gray',
            }}
            markingType="custom"
          />
          <Text className="mt-4 text-gray-500">
            This is the water tracking screen. You can track your watering schedule here.
          </Text>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="dark-content" />
    </View>
  );
}
