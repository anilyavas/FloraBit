import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { useRef, useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4-vision-preview',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Identify any visible disease or problem in this plant image and suggest a cause and a possible solution.',
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

      const data = await response.json();
      const resultText = data?.choices?.[0]?.message?.content || 'No response';

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
      {scan?.uri ? (
        <View className="w-full items-center">
          <Image source={{ uri: scan.uri }} className="h-96 w-full rounded-xl" resizeMode="cover" />
          {loading ? (
            <Text className="mt-4 text-center text-base font-medium">Analyzing...</Text>
          ) : (
            <View className="mt-4 w-full rounded-lg bg-white p-4 shadow">
              <Text className="mb-2 text-lg font-bold text-green-700">Diagnosis Result</Text>
              <Text className="text-sm text-gray-800">{scan.issue}</Text>
            </View>
          )}

          {!loading && (
            <Pressable onPress={reset} className="mt-6 rounded-lg bg-green-600 px-4 py-2">
              <Text className="font-semibold text-white">Scan Another</Text>
            </Pressable>
          )}
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
