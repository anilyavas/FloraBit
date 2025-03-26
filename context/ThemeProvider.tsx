import { createContext, useContext } from 'react';

import { lightTheme, darkTheme } from '../constants/colors';

const ThemeContext = createContext(lightTheme);

export const ThemeProvider = ThemeContext.Provider;
export const useTheme = () => useContext(ThemeContext);
