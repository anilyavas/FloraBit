import { Modal, View, Text, TouchableOpacity } from 'react-native';

export default function ConfirmDeleteModal({
  visible,
  onClose,
  onConfirm,
  plantName,
}: {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  plantName: string;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/50 px-8">
        <View className="w-full rounded-xl bg-white p-6 shadow-lg">
          <Text className="mb-4 text-lg font-bold text-red-600">Delete Plant</Text>
          <Text className="mb-6 text-gray-700">Are you sure you want to delete "{plantName}"?</Text>
          <View className="flex-row justify-end gap-4">
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-600">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm}>
              <Text className="font-semibold text-red-600">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
