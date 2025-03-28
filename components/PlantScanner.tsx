import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { View, Text, ActivityIndicator, Button, Alert } from 'react-native';

export default function PlantScanner() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);

  const handleImagePick = async (fromCamera: boolean) => {
    const permissionResult = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.status !== 'granted') {
      Alert.alert('Permission Required', 'You need to grant permission to use this feature.');
    }

    const pickerResult = fromCamera
      ? await ImagePicker.launchCameraAsync({ base64: true })
      : await ImagePicker.launchImageLibraryAsync({ base64: true });
    if (!pickerResult.canceled) {
      setImage(pickerResult.assets[0].uri);
      analyzeImage(pickerResult.assets[0].base64);
    }
  };

  const analyzeImage = async (base64Image: string | undefined) => {
    if (!base64Image) return;
    setLoading(true);

    try {
      const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
      const response = await fetch('https://api.openai.com/v1/completions', {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo-vision',
          messages: [
            { role: 'system', content: 'You are an AI botanist that analyzes plant health.' },
            {
              role: 'user',
              content:
                'Analyze this plant and provide details on its health, potential diseases, and care suggestions.',
            },
            { role: 'user', content: { image: base64Image } },
          ],
          max_tokens: 300,
        }),
      });

      const data = await response.json();
      setResult(data.choices[0].message.content);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return <View />;
}
