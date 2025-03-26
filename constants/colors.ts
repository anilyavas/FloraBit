export const lightTheme = {
  primaryGreen: '#4CAF50',
  darkGreen: '#388E3C',
  lightGreen: '#A5D6A7',

  background: '#F1F8E9',
  textPrimary: '#212121',
  textSecondary: '#757575',
  white: '#FFFFFF',
  black: '#000000',

  accentYellow: '#FFEB3B',
  accentOrange: '#FF9800',
  accentBlue: '#2196F3',
  accentPurple: '#9C27B0',

  softBrown: '#8D6E63',
  softGray: '#B0BEC5',
};

export const darkTheme = {
  primaryGreen: '#81C784',
  darkGreen: '#66BB6A',
  lightGreen: '#388E3C',

  background: '#121212',
  textPrimary: '#E0E0E0',
  textSecondary: '#BDBDBD',
  white: '#FFFFFF',
  black: '#000000',

  accentYellow: '#FBC02D',
  accentOrange: '#FB8C00',
  accentBlue: '#64B5F6',
  accentPurple: '#BA68C8',

  softBrown: '#A1887F',
  softGray: '#78909C',
};

export const getTheme = (isDarkMode: boolean) => (isDarkMode ? darkTheme : lightTheme);
