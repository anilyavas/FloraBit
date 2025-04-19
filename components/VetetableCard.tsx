import { Link } from 'expo-router';
import { FlatList, View, Text, Image, Pressable } from 'react-native';

import vegetables from '../assets/vegetables.json';

export default function VegetableCard() {
  return (
    <View className="flex-1 bg-[#C8D8C4] py-4">
      <FlatList
        data={vegetables}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <Link asChild href={`/vegetable/${item.id}`}>
            <Pressable className="mr-4 w-40 items-center rounded-2xl bg-white p-4 shadow shadow-black/10">
              {item.image ? (
                <Image
                  source={{ uri: item.image }}
                  className="mb-3 h-32 w-32 rounded-xl"
                  resizeMode="cover"
                />
              ) : (
                <View className="mb-3 h-32 w-32 rounded-xl bg-gray-300" />
              )}
              <Text className="text-center text-base font-semibold text-[#2C2C2C]">
                {item.name}
              </Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}
