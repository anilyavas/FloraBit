import * as ImagePicker from 'expo-image-picker';
import { create } from 'zustand';

import { supabase } from '../utils/supabase';

type Plant = {
  id: string;
  user_id: string;
  name: string;
  image_url?: string | null;
  created_at: string;
};

type PlantStore = {
  plants: Plant[];
  loading: boolean;
  error: string | null;
  fetchPlants: (userId: string) => Promise<void>;
  addPlant: (userId: string, plant: Omit<Plant, 'id' | 'created_at' | 'user_id'>) => Promise<void>;
  pickImage: () => Promise<string | null>;
};

export const usePlantStore = create<PlantStore>((set) => ({
  plants: [],
  loading: false,
  error: null,

  fetchPlants: async (userId: string) => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase
        .from('plants')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      set({ plants: data || [], loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  addPlant: async (userId, plant) => {
    try {
      set({ loading: true, error: null });

      let imageUrl = plant.image_url || null;

      if (plant.image_url) {
        const { data: imageData, error: imageError } = await supabase.storage
          .from('plant-images')
          .upload(`${userId}-${Date.now()}.jpg`, plant.image_url);

        if (imageError) throw imageError;

        const { data: urlData } = supabase.storage
          .from('plant-images')
          .getPublicUrl(imageData!.path);

        imageUrl = urlData.publicUrl;
      }

      const { data, error } = await supabase
        .from('plants')
        .insert([{ ...plant, user_id: userId, image_url: imageUrl }])
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        plants: [data!, ...state.plants],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  pickImage: async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) return null;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      return result.assets[0].uri;
    }

    return null;
  },
}));
