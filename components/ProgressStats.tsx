import {View, Text} from 'react-native'
import React from 'react'
import useTheme from "@/hooks/useTheme";
import {createSettingsStyles} from "@/assets/styles/settings.styles";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from "@expo/vector-icons";

const ProgressStats = () => {
    const {colors} = useTheme();
    const settingsStyles = createSettingsStyles(colors);
    const yapilacaklar = useQuery(api.yapilacaklar.getYapilacaklar);
    const tamamlanmisSayisi =
        yapilacaklar ?
            yapilacaklar.filter((yapilacak) => yapilacak.isCompleted).length
            : 0;
    const toplamSayi = yapilacaklar ? yapilacaklar.length : 0;
    const aktifYapilacaklar = toplamSayi - tamamlanmisSayisi;
    return (
        <LinearGradient colors={colors.gradients.surface}
                        style={settingsStyles.section}
        >
            <Text style={settingsStyles.sectionTitle}>İlerleme Durumu</Text>
            <View style={settingsStyles.statsContainer}>
                {/* Toplam Yapılacaklar */}
                <LinearGradient colors={colors.gradients.background}
                                style={[settingsStyles.statCard, {
                                    borderLeftColor : colors.primary
                                }]}
                >
                    <View style={settingsStyles.statIconContainer}>
                        <LinearGradient colors={colors.gradients.primary}
                                        style={settingsStyles.statIcon}
                        >
                            <Ionicons name="list" size={20} color="#fff"/>
                        </LinearGradient>
                    </View>
                    <View>
                        <Text style={settingsStyles.statNumber}>{toplamSayi}</Text>
                        <Text style={settingsStyles.statLabel}>Toplam Yapılacaklar</Text>
                    </View>
                </LinearGradient>
                {/* Tamamlanmış Yapılacaklar */}
                <LinearGradient colors={colors.gradients.background}
                                style={[settingsStyles.statCard, {
                                    borderLeftColor : colors.success
                                }]}
                >
                    <View style={settingsStyles.statIconContainer}>
                        <LinearGradient colors={colors.gradients.success}
                                        style={settingsStyles.statIcon}
                        >
                            <Ionicons name="checkmark-circle" size={20} color="#fff"/>
                        </LinearGradient>
                    </View>
                    <View>
                        <Text style={settingsStyles.statNumber}>{tamamlanmisSayisi}</Text>
                        <Text style={settingsStyles.statLabel}>Tamamlanmış Yapılacaklar</Text>
                    </View>
                </LinearGradient>
                {/* Aktif Yapılacaklar */}
                <LinearGradient colors={colors.gradients.background}
                                style={[settingsStyles.statCard, {
                                    borderLeftColor : colors.warning
                                }]}
                >
                    <View style={settingsStyles.statIconContainer}>
                        <LinearGradient colors={colors.gradients.warning}
                                        style={settingsStyles.statIcon}
                        >
                            <Ionicons name="time" size={20} color="#fff"/>
                        </LinearGradient>
                    </View>
                    <View>
                        <Text style={settingsStyles.statNumber}>{aktifYapilacaklar}</Text>
                        <Text style={settingsStyles.statLabel}>Aktif Yapılacaklar</Text>
                    </View>
                </LinearGradient>
            </View>
        </LinearGradient>
    )
}
export default ProgressStats
