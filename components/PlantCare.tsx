import { View, Text } from 'react-native';

export default function PlantCare() {
  return (
    <View className="p-4 pb-8">
      {/* Watering */}
      <View className="mb-4 rounded-lg bg-gray-100 p-4 shadow-md">
        <Text className="mb-2 text-xl font-semibold">💧 Watering</Text>
        <Text className="text-base text-gray-700">
          Water your plants when the top 1–2 inches of soil feel dry. Always ensure that excess
          water can drain away to prevent root rot.
        </Text>
      </View>

      {/* Light Requirements */}
      <View className="mb-4 rounded-lg bg-gray-100 p-4 shadow-md">
        <Text className="mb-2 text-xl font-semibold">☀️ Light Requirements</Text>
        <Text className="text-base text-gray-700">
          Most houseplants thrive in bright, indirect light. If you’re unsure, place your plant near
          a window but out of direct sunlight to avoid burning the leaves.
        </Text>
      </View>

      {/* Humidity and Temperature */}
      <View className="mb-4 rounded-lg bg-gray-100 p-4 shadow-md">
        <Text className="mb-2 text-xl font-semibold">🌡️ Humidity and Temperature</Text>
        <Text className="text-base text-gray-700">
          Tropical plants, like ferns and philodendrons, thrive in higher humidity. Consider placing
          your plants on a humidity tray or using a room humidifier.
        </Text>
      </View>

      {/* Soil Quality */}
      <View className="mb-4 rounded-lg bg-gray-100 p-4 shadow-md">
        <Text className="mb-2 text-xl font-semibold">🌱 Soil Quality</Text>
        <Text className="text-base text-gray-700">
          Use well-draining soil suited to your plant’s needs. For example, cactus and succulents
          need sandy, fast-draining soil, while tropical plants prefer richer, moisture-retentive
          soil.
        </Text>
      </View>

      {/* Pruning and Maintenance */}
      <View className="mb-4 rounded-lg bg-gray-100 p-4 shadow-md">
        <Text className="mb-2 text-xl font-semibold">✂️ Pruning and Maintenance</Text>
        <Text className="text-base text-gray-700">
          Remove dead or yellowing leaves to keep your plants looking healthy and encourage new
          growth.
        </Text>
      </View>

      {/* Fertilization */}
      <View className="mb-4 rounded-lg bg-gray-100 p-4 shadow-md">
        <Text className="mb-2 text-xl font-semibold">🌿 Fertilization</Text>
        <Text className="text-base text-gray-700">
          During the growing season (spring and summer), fertilize your plants every 4–6 weeks with
          a balanced liquid fertilizer. Reduce feeding in the fall and winter when plants are
          dormant.
        </Text>
      </View>
    </View>
  );
}
