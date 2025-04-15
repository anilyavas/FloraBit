import { useAuth } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

import { usePlantStore } from '../store/plantStore';
import { supabase } from '../utils/supabase';

export default function WateringCalendarScreen() {
  const { userId } = useAuth();
  const { plants } = usePlantStore();
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const [markedDates, setMarkedDates] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedPlantId) {
      fetchWateringLogs();
    }
  }, [selectedPlantId]);

  const fetchWateringLogs = async () => {
    if (!userId || !selectedPlantId) return;
    setLoading(true);

    const { data, error } = await supabase
      .from('watering_logs')
      .select('watered_date')
      .eq('user_id', userId)
      .eq('plant_id', selectedPlantId);

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    const marked: Record<string, any> = {};
    data.forEach((log) => {
      marked[log.watered_date] = {
        marked: true,
        dotColor: 'green',
      };
    });

    setMarkedDates(marked);
    setLoading(false);
  };

  const toggleWateringDate = async (date: string) => {
    if (!userId || !selectedPlantId) return;

    const alreadyMarked = markedDates[date];

    if (alreadyMarked) {
      // remove log
      await supabase
        .from('watering_logs')
        .delete()
        .eq('user_id', userId)
        .eq('plant_id', selectedPlantId)
        .eq('watered_date', date);
    } else {
      // add log
      await supabase.from('watering_logs').insert([
        {
          user_id: userId,
          plant_id: selectedPlantId,
          watered_date: date,
        },
      ]);
    }

    fetchWateringLogs();
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="mb-2 text-xl font-semibold">🗓️ Watering Calendar</Text>

      {plants.length === 0 && <Text>You have no plants yet.</Text>}

      {/* PLANT SELECTOR */}
      <View className="mb-4 flex-row flex-wrap">
        {plants.map((plant) => (
          <TouchableOpacity
            key={plant.id}
            className={`mb-2 mr-2 rounded-full px-3 py-2 ${
              selectedPlantId === plant.id ? 'bg-green-600' : 'bg-gray-300'
            }`}
            onPress={() => setSelectedPlantId(plant.id)}>
            <Text className="font-medium text-white">{plant.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedPlantId && (
        <>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Calendar
              markedDates={markedDates}
              onDayPress={(day: any) => toggleWateringDate(day.dateString)}
              theme={{
                selectedDayBackgroundColor: 'green',
                todayTextColor: 'green',
                dotColor: 'green',
                arrowColor: 'green',
              }}
            />
          )}
        </>
      )}
    </View>
  );
}
