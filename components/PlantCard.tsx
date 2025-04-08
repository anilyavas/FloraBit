import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View, Text, Image } from 'react-native';

export default function PlantCard() {
  const [loading, setLoading] = useState(false);
  const [plants, setPlants] = useState<any[]>([]);

  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/anilyavas/plant-database/master/json'
        );
        const data = await response.json();
        setPlants(data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching plant data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlants();
  }, []);

  if (loading) return <ActivityIndicator size="large" />;
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={plants}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{ borderRadius: 12, backgroundColor: '#C8D8C4', padding: 10, marginRight: 12 }}>
            {item.image ? (
              <Image
                source={{
                  uri: item.image.startsWith('data:image')
                    ? item.image
                    : `data:image/jpeg;base64,${item.image}`,
                }}
                style={{ width: 100, height: 100, borderRadius: 8 }}
              />
            ) : (
              <View style={{ width: 100, height: 100, backgroundColor: '#ccc', borderRadius: 8 }} />
            )}
            <Text style={{ color: '#2C2C2C', fontWeight: 'bold' }}>
              {item.common_name || 'Unknown'}
            </Text>
            <Text style={{ color: '#2C2C2C' }}>{item.scientific_name}</Text>
          </View>
        )}
      />
    </View>
  );
}
