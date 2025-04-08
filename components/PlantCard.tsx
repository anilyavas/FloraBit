import { FlatList, View, Text, Image } from 'react-native';

import plants from '../assets/plants.json';

export default function PlantCard() {
  return (
    <View className="flex-1 bg-[#C8D8C4] py-4">
      <FlatList
        data={plants}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <View className="mr-4 w-40 items-center rounded-2xl bg-white p-4 shadow shadow-black/10">
            {item.image ? (
              <Image
                source={{ uri: item.image }}
                className="mb-3 h-32 w-32 rounded-xl"
                resizeMode="cover"
              />
            ) : (
              <View className="mb-3 h-32 w-32 rounded-xl bg-gray-300" />
            )}
            <Text className="text-center text-base font-semibold text-[#2C2C2C]">{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
