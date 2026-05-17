import {View, Text, ActivityIndicator} from 'react-native'
import React from 'react'
import useTheme from "@/hooks/useTheme";
import {createHomeStyles} from "@/assets/styles/home.styles";
import {LinearGradient} from "expo-linear-gradient";

const LoadingScreen = () => {
    const {colors} = useTheme();
    const homeStyles = createHomeStyles(colors)
    return (
        <LinearGradient
            colors={colors.gradients.background}
            style={homeStyles.container}
        >
            <View style={homeStyles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary}/>
                <Text style={homeStyles.loadingText}>
                    Yapılacaklar Yükleniyor...</Text>
            </View>
        </LinearGradient>
    )
}
export default LoadingScreen
