import React, { createContext, useState, useContext } from 'react';

// Creates theme context - accessible throughout app
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = (selectedTheme) => {
        if (selectedTheme !== theme) {
            setTheme(selectedTheme);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

//custom hook to access theme context, Provides easy access to theme state and toggle fuction
export function useTheme() {
    return useContext(ThemeContext);
}


/**
 * Flow:
 * 1. App.jsx wraps entire application with <ThemeProvider>
 * 2. Sidebar.jsx contains theme toggle buttons
 * 3. Components use useTheme() hook to access current theme
 */