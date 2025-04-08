import { useClerk } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import { View, SafeAreaView, StatusBar, Platform, Text, Image, ScrollView } from 'react-native';

import PlantCard from '~/components/PlantCard';

export default function Home() {
  const { user } = useClerk();
  return (
    <View className="flex-1 bg-[#C8D8C4]">
      <SafeAreaView
        className="flex-1"
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        <View className="border-b-hairline flex-row items-center gap-5 border-gray-500 p-6">
          <Image source={{ uri: user?.imageUrl }} className="h-10 w-10 rounded-full" />
          <Text className="flex-1 text-xl font-bold text-gray-700">Welcome {user?.firstName}</Text>
          <FontAwesome name="sign-out" size={20} color="darkred" />
        </View>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="p-2">
            <Text className="pl-4 text-xl font-bold text-gray-500">Explore Plants</Text>
            <PlantCard />
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar barStyle="dark-content" />
    </View>
  );
}
