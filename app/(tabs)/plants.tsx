import { useAuth } from '@clerk/clerk-expo';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Platform,
  StatusBar,
  Text,
  ActivityIndicator,
  Pressable,
  Modal,
  Image,
} from 'react-native';

import CreatePlant from '~/components/CreatePlant';
import { usePlantStore } from '~/store/plantStore';

export default function PlantCollection() {
  const { userId } = useAuth();
  const { fetchPlants, plants, loading, error, deletePlant } = usePlantStore();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (userId) fetchPlants(userId);
  }, [userId]);

  if (loading)
    return (
      <SafeAreaView
        className="flex-1 bg-[#C8D8C4]"
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        <View className="border-b-hairline flex-row items-center border-gray-500 p-4">
          <Text className="flex-1 text-xl font-bold text-gray-500">Plant Collection</Text>
        </View>
        <ActivityIndicator size="large" className="self-center" />
      </SafeAreaView>
    );
  if (error)
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-center text-lg font-semibold text-red-500">
          Error while fetching plants.
        </Text>
      </View>
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
          <Pressable onPress={() => setModalVisible(true)}>
            <Text className="text-2xl font-bold text-blue-500">+</Text>
          </Pressable>
        </View>
        {plants.length === 0 ? (
          <View className="p-4">
            <Text className="text-gray-500">
              This is the plant collection screen. You can add, remove, or view plants here. For
              adding plant, click on the + button on the top right.
            </Text>
          </View>
        ) : (
          <View className="p-4">
            {plants.map((plant) => (
              <View
                key={plant.id}
                className="m-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <View className="flex-row items-center">
                  <View>
                    <Image
                      source={{
                        uri: 'https://png.pngtree.com/template/20191024/ourmid/pngtree-flower-pot-and-plant-logo-growth-vector-logo-image_322946.jpg',
                      }}
                      className="h-20 w-20"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-md mb-1 font-semibold text-green-900">
                      🌿 {plant.name}
                    </Text>
                    {plant.description ? (
                      <Text className="text-md text-gray-600">📍 {plant.description}</Text>
                    ) : (
                      <Text className="text-sm italic text-gray-400">No description added</Text>
                    )}
                  </View>
                  <View className="flex-row gap-3">
                    <AntDesign name="edit" size={20} color="grey" />
                    <FontAwesome
                      name="trash"
                      size={20}
                      color="darkred"
                      onPress={() => deletePlant(plant.id)}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
        <Modal
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
          presentationStyle="formSheet"
          className="rounded-xl bg-[#c8d8c4]"
          visible={modalVisible}
          transparent={false}>
          <CreatePlant />
        </Modal>
      </SafeAreaView>
      <StatusBar barStyle="dark-content" />
    </View>
  );
}
