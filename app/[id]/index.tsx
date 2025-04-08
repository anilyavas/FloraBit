import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, Image, ScrollView, Pressable } from 'react-native';

import plants from '../../assets/plants.json';

export default function PlantDetails() {
  const { id } = useLocalSearchParams();
  const plant = plants.find((p) => p.id === id);

  return (
    <View className="flex-1 bg-[#C8D8C4]">
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 px-4 py-6">
          <View className="mb-4 flex-row items-center">
            <Text className="flex-1 text-center text-3xl font-semibold text-neutral-800">
              {plant?.name}
            </Text>
            <Pressable className="absolute right-5 justify-end" onPress={() => router.back()}>
              <Text className="text-xl">X</Text>
            </Pressable>
          </View>

          {plant?.image && (
            <Image
              source={{ uri: plant.image }}
              className="mb-6 h-72 w-full rounded-2xl shadow-md"
              resizeMode="cover"
            />
          )}

          <View className="space-y-3 rounded-xl bg-white p-4 shadow-sm">
            <Text className="text-base text-gray-700">
              <Text className="font-medium text-gray-900">Scientific Name: </Text>
              <Text className="italic">{plant?.scientific_name}</Text>
            </Text>

            <View className="space-y-2 border-t border-gray-200 pt-3">
              <Text className="text-base text-gray-700">
                <Text className="font-medium">🌞 Light: </Text>
                {plant?.care?.light}
              </Text>
              <Text className="text-base text-gray-700">
                <Text className="font-medium">💧 Water: </Text>
                {plant?.care?.water}
              </Text>
              <Text className="text-base text-gray-700">
                <Text className="font-medium">🌡️ Temperature: </Text>
                {plant?.care?.temperature}
              </Text>
              <Text className="text-base text-gray-700">
                <Text className="font-medium">💦 Humidity: </Text>
                {plant?.care?.humidity}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
