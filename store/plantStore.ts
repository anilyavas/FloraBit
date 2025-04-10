// stores/usePlantStore.ts
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
      const { data, error } = await supabase
        .from('plants')
        .insert([{ ...plant, user_id: userId }])
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        plants: [data!, ...state.plants],
      }));
    } catch (err: any) {
      set({ error: err.message });
    }
  },
}));
