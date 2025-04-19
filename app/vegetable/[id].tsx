import { FontAwesome } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, Image, ScrollView, Pressable } from 'react-native';

import vegetable from '../../assets/vegetables.json';

export default function PlantDetails() {
  const { id } = useLocalSearchParams();
  const plant = vegetable.find((p) => p.id === id);

  return (
    <View className="flex-1 bg-[#E7F0DC]">
      <SafeAreaView className="flex-1">
        <View className="px-4 pb-1 pt-2">
          <Pressable onPress={() => router.back()} className="flex-row items-center gap-1">
            <FontAwesome size={20} color="#4B6C4A" name="arrow-left" />
            <Text className="text-lg font-medium text-[#4B6C4A]">Back</Text>
          </Pressable>
        </View>

        <ScrollView className="flex-1 px-4 pb-12 pt-2" showsVerticalScrollIndicator={false}>
          {plant?.image && (
            <Image
              source={{ uri: plant.image }}
              className="mb-6 h-96 w-full rounded-3xl shadow-lg"
              resizeMode="cover"
            />
          )}

          <Text className="mb-2 text-3xl font-bold text-[#2F3E2E]">{plant?.name}</Text>
          <Text className="mb-6 text-base italic text-gray-700">{plant?.scientific_name}</Text>

          {/* Care Sections */}
          <View className="gap-2 space-y-4">
            {/* Description */}
            <View className="rounded-xl bg-white/90 p-4 shadow">
              <Text className="mb-1 text-lg font-semibold text-[#4B6C4A]">📖 Description</Text>
              <Text className="text-base text-gray-700">{plant?.description}</Text>
            </View>
            {/* Light */}
            <View className="rounded-xl bg-white/90 p-4 shadow">
              <Text className="mb-1 text-lg font-semibold text-[#4B6C4A]">🌞 Light</Text>
              <Text className="text-base text-gray-700">{plant?.care?.light}</Text>
            </View>

            {/* Water */}
            <View className="rounded-xl bg-white/90 p-4 shadow">
              <Text className="mb-1 text-lg font-semibold text-[#4B6C4A]">💧 Water</Text>
              <Text className="text-base text-gray-700">{plant?.care?.water}</Text>
            </View>

            {/* Temperature */}
            <View className="rounded-xl bg-white/90 p-4 shadow">
              <Text className="mb-1 text-lg font-semibold text-[#4B6C4A]">📏 Spacing</Text>
              <Text className="text-base text-gray-700">{plant?.care?.spacing}</Text>
            </View>

            {/* Humidity */}
            <View className="rounded-xl bg-white/90 p-4 shadow">
              <Text className="mb-1 text-lg font-semibold text-[#4B6C4A]">🌱 Soil</Text>
              <Text className="text-base text-gray-700">{plant?.care?.soil}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
