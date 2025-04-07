import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PlantScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [uri, setUri] = useState<string | undefined>(undefined);
  const ref = useRef<CameraView>(null);

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

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    if (photo?.uri) setUri(photo.uri);
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const retake = () => setUri(undefined);

  return (
    <SafeAreaView className="flex-1 items-center justify-start bg-[#EEF2E5] px-4 pt-6">
      {uri ? (
        <View className="w-full items-center">
          <Image source={{ uri }} className="h-96 w-full rounded-xl" resizeMode="cover" />
          <Text className="mt-4 text-center text-base font-medium">Photo captured!</Text>
          <Pressable onPress={retake} className="mt-4 rounded-lg bg-green-600 px-4 py-2">
            <Text className="font-semibold text-white">Retake</Text>
          </Pressable>
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
