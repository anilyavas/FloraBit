import { View, Text } from 'react-native';

import { getTheme } from '~/constants/colors';

export default function Home() {
  return (
    <View style={{ backgroundColor: getTheme(false).background }}>
      <Text>Home</Text>
    </View>
  );
}
