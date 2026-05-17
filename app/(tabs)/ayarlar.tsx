import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import useTheme from "@/hooks/useTheme";
import {createHomeStyles} from "@/assets/styles/home.styles";
import {createSettingsStyles} from "@/assets/styles/settings.styles";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from "@expo/vector-icons";
import ScrollView = Animated.ScrollView;
import ProgressStats from "@/components/ProgressStats";
import Tercihler from "@/components/Tercihler";
import Tehlike from "@/components/Tehlike";


const Ayarlar = () => {
    const {colors} = useTheme();
    const settingsStyles = createSettingsStyles(colors);
    return (
        <LinearGradient colors={colors.gradients.background}
        style={settingsStyles.container}>
            <SafeAreaView style={settingsStyles.safeArea}>
                {/* HEADER */}
                <View style={settingsStyles.header}>
                    <View style={settingsStyles.titleContainer}>
                        <LinearGradient colors={colors.gradients.primary}
                        style={settingsStyles.iconContainer}>
                            <Ionicons name="settings" size={28} color="#fff"/>
                        </LinearGradient>
                        <Text style={settingsStyles.title}>Ayarlar</Text>
                    </View>
                </View>
                <ScrollView
                    style={settingsStyles.scrollView}
                    contentContainerStyle={settingsStyles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <ProgressStats/>
                    <Tercihler/>
                    <Tehlike/>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>

    )
}
export default Ayarlar