import { useAuth } from '@clerk/clerk-expo';
import { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Platform,
  StatusBar,
  Text,
  ActivityIndicator,
  Pressable,
} from 'react-native';

import { usePlantStore } from '~/store/plantStore';

export default function PlantCollection() {
  const { userId } = useAuth();
  const { fetchPlants, plants, loading, error } = usePlantStore();

  useEffect(() => {
    if (userId) fetchPlants(userId);
  }, [userId]);

  if (loading) return <ActivityIndicator size="large" className="self-center" />;
  if (error)
    return (
      <Text className="text-center text-lg font-semibold text-red-500">
        Error while fetching plants.
      </Text>
    );
  return (
    <View className="flex-1 bg-[#C8D8C4]">
      <SafeAreaView
        className="flex-1"
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        <View className="border-b-hairline flex-row items-center border-gray-500 p-4">
          <Text className="flex-1 text-xl font-bold text-gray-500">Plant Collection</Text>
          <Pressable>
            <Text className="text-2xl font-bold text-blue-500">+</Text>
          </Pressable>
        </View>
        {plants.length === 0 && (
          <View className="p-4">
            <Text className="text-gray-500">
              This is the plant collection screen. You can add, remove, or view plants here. For
              adding plant, click on + button on the top right.
            </Text>
          </View>
        )}
      </SafeAreaView>
      <StatusBar barStyle="dark-content" />
    </View>
  );
}
