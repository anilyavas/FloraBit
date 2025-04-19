import { useAuth, useUser } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, SafeAreaView, Alert, StyleSheet, Image, TextInput } from 'react-native';

import { Button } from '~/components/Button';

export default function Settings() {
  const { user } = useUser();
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signOut } = useAuth();

  const handleChangePassword = async () => {
    if (!currentPassword || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill out all password fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    try {
      await user?.updatePassword({
        currentPassword,
        newPassword: password,
      });
      Alert.alert('Success', 'Password updated successfully!');
      setCurrentPassword('');
      setPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.message || 'Failed to update password.');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/(auth)/sign-in');
  };

  const handleDeleteUser = async () => {
    try {
      await user?.delete();
      Alert.alert('Account Deleted', 'Your account has been deleted successfully.');
      router.push('/(auth)/sign-in');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.message || 'Failed to delete account.');
    }
  };

  return (
    <View className="flex-1 bg-[#C8D8C4]">
      <SafeAreaView>
        <View className="border-b-hairline flex-row items-center gap-5 border-gray-500 p-6">
          <Text className="text-xl font-bold text-gray-700">Profile</Text>
        </View>

        <View className="p-4">
          {user?.imageUrl && <Image source={{ uri: user.imageUrl }} style={styles.image} />}

          <View className="rounded-xl bg-white/20 p-4">
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Email Address:</Text>
              <Text style={styles.infoText}>{user?.primaryEmailAddress?.emailAddress}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Current Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter current password"
                placeholderTextColor="#e0e0e0"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>New Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter new password"
                placeholderTextColor="#e0e0e0"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Confirm Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                placeholderTextColor="#e0e0e0"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Update Password" onPress={handleChangePassword} className="mx-5" />
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Sign Out" onPress={handleSignOut} className="mx-5 bg-red-600" />
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Delete User" onPress={handleDeleteUser} className="mx-5 bg-red-600" />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 16,
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoTitle: {
    color: '#2f4f2f',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  infoText: {
    color: '#2f4f2f',
    fontSize: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  input: {
    color: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 15,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
