import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import { usePlantScanStore } from '~/store/plantScanStore';

export default function PlantScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const ref = useRef<CameraView>(null);
  const { scan, setScan, loading, setLoading, reset } = usePlantScanStore();

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#EEF2E5]">
        <Text className="mb-4">We need your permission to use the camera</Text>
        <Pressable onPress={requestPermission} className="rounded-lg bg-green-600 px-4 py-2">
          <Text className="font-medium text-white">Grant Permission</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const analyzePhoto = async (uri: string) => {
    setLoading(true);
    setScan({
      uri: '',
      issue: '',
      cause: '',
      solution: '',
    });

    try {
      console.log('Reading image as base64...');
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
      console.log('API KEY EXISTS:', !!apiKey);

      console.log('Sending request to OpenAI...');
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'You are a plant disease expert. Analyze the plant in this image and describe any visible issues, possible causes, and suggested treatments. If the plant appears healthy, say so clearly.',
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: `data:image/jpg;base64,${base64}`,
                  },
                },
              ],
            },
          ],
          max_tokens: 500,
        }),
      });

      console.log('API response status:', response.status);

      const data = await response.json();
      console.log('API response:', JSON.stringify(data, null, 2));

      if (!data?.choices || !data.choices[0]?.message?.content) {
        console.warn('Invalid response format:', data);
        setScan({
          uri,
          issue: 'No meaningful response from AI.',
          cause: '',
          solution: '',
        });
        return;
      }

      const resultText = data.choices[0].message.content;

      setScan({
        uri,
        issue: resultText,
        cause: '',
        solution: '',
      });
    } catch (e) {
      console.error('AI analysis failed:', e);
      setScan({
        uri,
        issue: 'Error analyzing image',
        cause: '',
        solution: '',
      });
    } finally {
      setLoading(false);
    }
  };

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    if (photo?.uri) {
      analyzePhoto(photo.uri);
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-start px-4 pt-6">
      {loading ? (
        <View className="w-full flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#16a34a" />
          <Text className="mt-4 font-medium text-gray-700">Analyzing image...</Text>
        </View>
      ) : scan?.uri ? (
        <View className="w-full items-center">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              source={{ uri: scan.uri }}
              className="h-96 w-full rounded-xl"
              resizeMode="cover"
            />
            <View className="mt-4 w-full rounded-lg bg-white p-4 shadow">
              <Text className="mb-2 text-lg font-bold text-green-700">Diagnosis Result</Text>
              <Text className="text-sm text-gray-800">{scan.issue}</Text>
            </View>
            <Pressable
              onPress={reset}
              className="mt-6 items-center self-center rounded-lg bg-green-600 px-4 py-2">
              <Text className="font-semibold text-white">Scan Another</Text>
            </Pressable>
          </ScrollView>
        </View>
      ) : (
        <>
          <View className="h-[80%] w-full overflow-hidden rounded-xl">
            <CameraView ref={ref} facing={facing} style={{ flex: 1 }} className="w-full">
              <View className="flex-1 justify-between bg-transparent p-4">
                <View className="items-end">
                  <Pressable onPress={toggleCameraFacing}>
                    <Text className="text-lg font-semibold text-white">Flip</Text>
                  </Pressable>
                </View>
              </View>
            </CameraView>
          </View>

          <View className="mt-6 items-center">
            <Pressable
              onPress={takePicture}
              className="h-16 w-16 rounded-full border-4 border-green-600 bg-white"
            />
            <Text className="mt-2 text-center font-medium text-gray-700">Scan Plant</Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
