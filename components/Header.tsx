import {View, Text} from 'react-native'
import React from 'react'
import useTheme from "@/hooks/useTheme";
import {createHomeStyles} from "@/assets/styles/home.styles";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from "@expo/vector-icons";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";

const Header = () => {
    const {colors} = useTheme();
    const homeStyles = createHomeStyles(colors);
    const yapilacaklar = useQuery(api.yapilacaklar.getYapilacaklar);
    const tamamlanmisSayisi =
        yapilacaklar ?
            yapilacaklar.filter((yapilacak) => yapilacak.isCompleted).length
            : 0;
    const toplamSayi = yapilacaklar ? yapilacaklar.length : 0;
    const yuzde = toplamSayi > 0 ? (tamamlanmisSayisi / toplamSayi)*100 : 0;
    // @ts-ignore
    // @ts-ignore
    return (
        <View style={homeStyles.header}>
            <View style={homeStyles.titleContainer}>
                <LinearGradient
                    colors={colors.gradients.primary}
                    style={homeStyles.iconContainer}>
                    <Ionicons name="flash-outline" size={28}
                              color="#ffffff"/>
                </LinearGradient>
                <View style={homeStyles.titleTextContainer}>
                    <Text style={homeStyles.title}>
                        Yapilacaklar 👀
                    </Text>
                    <Text style={homeStyles.subtitle}>
                        {toplamSayi} tane işten {tamamlanmisSayisi} tanesi tamamlanmıştır
                    </Text>
                </View>
            </View>

            <View style={homeStyles.progressContainer}>
                <View style={homeStyles.progressBarContainer}>
                    <View style={homeStyles.progressBar}>
                        <LinearGradient
                            colors={colors.gradients.success}
                            style={[homeStyles.progressFill, {width: `${yuzde}%`}]}/>
                    </View>
                    <Text style={homeStyles.progressText}>
                        %{Math.round(yuzde)}
                    </Text>
                </View>
            </View>
        </View>
    )
}
export default Header
