import React from 'react';
import ThemeContext from './ThemeContext';

export default function ThemeProvider({ value, children }) {
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}