import { create } from 'zustand';

import { supabase } from '../utils/supabase';

type Plant = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  created_at: string;
};

type PlantStore = {
  plants: Plant[];
  loading: boolean;
  error: string | null;
  fetchPlants: (userId: string) => Promise<void>;
  addPlant: (
    userId: string,
    plant: {
      name: string;
      description?: string | null;
    }
  ) => Promise<void>;
  deletePlant: (plantId: string) => Promise<void>;
  updatePlant: (
    plantId: string,
    updatedFields: {
      name?: string;
      description?: string | null;
    }
  ) => Promise<void>;
};

export const usePlantStore = create<PlantStore>((set, get) => ({
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

      const { data, error } = await supabase
        .from('plants')
        .insert([{ ...plant, user_id: userId }])
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

  deletePlant: async (plantId) => {
    try {
      set({ loading: true, error: null });

      const { error } = await supabase.from('plants').delete().eq('id', plantId);

      if (error) throw error;

      set((state) => ({
        plants: state.plants.filter((plant) => plant.id !== plantId),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  updatePlant: async (plantId, updatedFields) => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase
        .from('plants')
        .update(updatedFields)
        .eq('id', plantId)
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        plants: state.plants.map((plant) => (plant.id === plantId ? { ...plant, ...data } : plant)),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
