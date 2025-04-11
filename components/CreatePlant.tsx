import { useAuth } from '@clerk/clerk-expo';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { usePlantStore } from '../store/plantStore';
import { supabase } from '../utils/supabase';

export default function AddPlantScreen() {
  const [name, setName] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const { userId } = useAuth();
  const { addPlant } = usePlantStore();

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) return Alert.alert('Permission required', 'We need access to your media.');

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddPlant = async () => {
    if (!name || !userId)
      return Alert.alert('Error', 'Please provide a plant name and ensure you are logged in.');

    try {
      setUploading(true);
      let imageUrl = null;

      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();

        const fileName = `${userId}-${Date.now()}.jpg`;

        const { error: uploadError } = await supabase.storage
          .from('plant-images')
          .upload(fileName, blob, {
            contentType: 'image/jpeg',
            upsert: true,
          });

        if (uploadError) throw new Error(uploadError.message);

        const { data: urlData, error: urlError } = supabase.storage
          .from('plant-images')
          .getPublicUrl(fileName);

        if (urlError) throw new Error(urlError.message);

        imageUrl = urlData?.publicUrl || null;
      }

      await addPlant(userId, { name, image_url: imageUrl });

      setName('');
      setImage(null);
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

      <TouchableOpacity
        onPress={pickImage}
        className="mb-4 items-center rounded-lg border border-green-400 bg-green-100 p-3">
        <Text className="font-medium text-green-700">
          {image ? '📸 Change Image' : '📷 Pick an Image (optional)'}
        </Text>
      </TouchableOpacity>

      {image && (
        <Image source={{ uri: image }} className="mb-4 h-48 w-full rounded-lg" resizeMode="cover" />
      )}

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
