import { useAuth } from '@clerk/clerk-expo';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

import { usePlantStore } from '../store/plantStore';

export default function AddPlantScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const { userId } = useAuth();
  const { addPlant } = usePlantStore();

  const handleAddPlant = async () => {
    if (!name || !userId) {
      return Alert.alert('Error', 'Please provide a plant name and ensure you are logged in.');
    }

    try {
      setUploading(true);

      await addPlant(userId, {
        name,
        description: description.trim() || null,
      });

      setName('');
      setDescription('');
      Alert.alert('Success', 'Plant added!');
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Something went wrong. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="mb-4 text-2xl font-bold">🌿 Add New Plant</Text>

      <TextInput
        className="mb-4 rounded-lg border border-gray-300 p-3 text-base"
        placeholder="Enter plant name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#999"
      />

      <TextInput
        className="mb-4 rounded-lg border border-gray-300 p-3 text-base"
        placeholder="Optional description / placement"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#999"
        multiline
        numberOfLines={3}
      />

      <TouchableOpacity
        onPress={handleAddPlant}
        className="rounded-lg bg-green-600 p-4"
        disabled={uploading}>
        {uploading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-center font-semibold text-white">Add Plant</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
