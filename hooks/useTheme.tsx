import {View, Text} from 'react-native'
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ColorScheme{
    bg: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
    primary: string;
    success: string;
    warning: string;
    danger: string;
    shadow: string;
    gradients: {
        background: [string, string];
        surface: [string, string];
        primary: [string, string];
        success: [string, string];
        warning: [string, string];
        danger: [string, string];
        muted: [string, string];
        empty: [string, string];
    };
    backgrounds: {
        input: string;
        editInput: string;
    };
    statusBarStyle: "light-content" | "dark-content";
}
const lightColors: ColorScheme = {
    bg: "#fdfbf7",            // Sıcak ve çok soft minimalist krem zemin
    surface: "#ffffff",
    text: "#2b221a",           // Derin kahve-siyah tonu (Gözü hiç yormaz)
    textMuted: "#8a817c",
    border: "#f0eae4",
    primary: "#d4a373",        // Estetik Soft Latte / Karamel tonu
    success: "#7fa47f",        // Adaçayı yeşili (Pastel ve çok kibar)
    warning: "#e1a95f",
    danger: "#e07a5f",         // Kiremit/Terrakotta kırmızısı
    shadow: "#1c1612",
    gradients: {
        background: ["#fdfbf7", "#f4efe9"],
        surface: ["#ffffff", "#fdfbf7"],
        primary: ["#d4a373", "#b98353"],
        success: ["#7fa47f", "#5b845b"],
        warning: ["#e1a95f", "#c68b43"],
        danger: ["#e07a5f", "#c95d40"],
        muted: ["#b7b0aa", "#8a817c"],
        empty: ["#f0eae4", "#e3dad0"],
    },
    backgrounds: {
        input: "#ffffff",
        editInput: "#fdfbf7",
    },
    statusBarStyle: "dark-content" as const,
};
const darkColors: ColorScheme = {
    bg: "#090514",            // Derin, lüks bir gece moru/siyahı
    surface: "#140e28",        // Paneller için harika bir gece tonu
    text: "#f5f3f7",
    textMuted: "#968fa3",
    border: "#251b40",
    primary: "#b39ddb",        // Kadifemsi pastel lavanta moru
    success: "#4ecdc4",        // Parlak, estetik turkuaz-yeşil
    warning: "#ffb74d",
    danger: "#ff8a80",
    shadow: "#000000",
    gradients: {
        background: ["#090514", "#140e28"],
        surface: ["#140e28", "#251b40"],
        primary: ["#b39ddb", "#7e57c2"],
        success: ["#4ecdc4", "#1a938a"],
        warning: ["#ffb74d", "#ffa726"],
        danger: ["#ff8a80", "#ff5252"],
        muted: ["#251b40", "#382b5c"],
        empty: ["#251b40", "#382b5c"],
    },
    backgrounds: {
        input: "#140e28",
        editInput: "#090514",
    },
    statusBarStyle: "light-content" as const,
};

interface ThemeContextType{
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    colors : ColorScheme;
}

const ThemeContext = createContext<undefined | ThemeContextType>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // get the user's choice
        AsyncStorage.getItem("darkMode").then((value) => {
            if (value) setIsDarkMode(JSON.parse(value));
        });
    }, []);

    const toggleDarkMode = async () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
    };

    const colors = isDarkMode ? darkColors : lightColors;

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
            {children}
        </ThemeContext.Provider>
    );
};


const UseTheme = () => {
    const context = useContext(ThemeContext);
    if(context === undefined) {
        throw new Error("useTheme, ThemeProvider ile kullanılmalıdır.");
    }
    return context;
}
export default UseTheme