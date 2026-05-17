import {View, Text} from 'react-native'
import React from 'react'
import useTheme from "@/hooks/useTheme";
import {createHomeStyles} from "@/assets/styles/home.styles";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from "@expo/vector-icons";

const EmptyState = () => {
    const {colors} = useTheme();
    const homeStyles = createHomeStyles(colors);
    return (
        <View style={homeStyles.emptyContainer}>
            <LinearGradient colors={colors.gradients.empty}
                            style={homeStyles.emptyIconContainer}
            >
                <Ionicons name="clipboard-outline"
                          size={60}
                          color={colors.textMuted} />
            </LinearGradient>
            <Text style={homeStyles.emptyText}>Henüz Yapılacak Bir Şey Yok</Text>
            <Text style={homeStyles.emptySubtext}>Başlamak için ilk yapılacağınızı ekleyin</Text>
        </View>
    )
}
export default EmptyState
