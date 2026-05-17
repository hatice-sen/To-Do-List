import {StyleSheet, Switch, Text, View} from 'react-native'
import React, {useState} from 'react'
import useTheme from "@/hooks/useTheme";
import {createSettingsStyles} from "@/assets/styles/settings.styles";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from "@expo/vector-icons";

const Tercihler = () => {
    const {colors, isDarkMode, toggleDarkMode} = useTheme();
    const [isAutoSync, setIsAutoSync] = useState(true);
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
    const settingsStyles = createSettingsStyles(colors);

    return (
        <LinearGradient colors={colors.gradients.surface}
        style={settingsStyles.section}>
            <Text style={settingsStyles.sectionTitle}>Tercihler</Text>
            {/* Karanlık Mod */}
            <View style={settingsStyles.settingItem}>
                <View style={settingsStyles.settingLeft}>
                    <LinearGradient colors={colors.gradients.primary}
                    style={settingsStyles.settingIcon} >
                        <Ionicons name="moon" size={18} color="#fff"/>
                    </LinearGradient>
                    <Text style={settingsStyles.settingText}>Karanlık/Aydınlık Mod</Text>
                </View>
                <Switch
                    value={isDarkMode}
                    onValueChange={toggleDarkMode}
                    thumbColor={"#fff"}
                    trackColor={{false : colors.border, true : colors.primary}}
                />
            </View>
            {/* Bildirimler */}
            <View style={settingsStyles.settingItem}>
                <View style={settingsStyles.settingLeft}>
                    <LinearGradient colors={colors.gradients.warning}
                                    style={settingsStyles.settingIcon} >
                        <Ionicons name="notifications" size={18} color="#fff"/>
                    </LinearGradient>
                    <Text style={settingsStyles.settingText}>Bildirimler</Text>
                </View>
                <Switch
                    value={isNotificationEnabled}
                    onValueChange={setIsNotificationEnabled}
                    thumbColor={"#fff"}
                    trackColor={{false : colors.border, true : colors.warning}}
                />
            </View>
            {/* Senkronizasyon */}
            <View style={settingsStyles.settingItem}>
                <View style={settingsStyles.settingLeft}>
                    <LinearGradient colors={colors.gradients.success}
                                    style={settingsStyles.settingIcon} >
                        <Ionicons name="sync" size={18} color="#fff"/>
                    </LinearGradient>
                    <Text style={settingsStyles.settingText}>Senkronizasyon</Text>
                </View>
                <Switch
                    value={isAutoSync}
                    onValueChange={setIsAutoSync}
                    thumbColor={"#fff"}
                    trackColor={{false : colors.border, true : colors.success}}
                />
            </View>
        </LinearGradient>
    )
}
export default Tercihler
