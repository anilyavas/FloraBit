import { Slot } from 'expo-router';
import '../global.css';
import { useColorScheme } from 'react-native';

import { getTheme } from '~/constants/colors';
import { ThemeProvider } from '~/context/ThemeProvider';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme === 'dark');
  return (
    <ThemeProvider value={theme}>
      <Slot />
    </ThemeProvider>
  );
}
