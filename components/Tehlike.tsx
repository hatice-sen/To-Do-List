import {View, Text, Alert, TouchableOpacity} from 'react-native'
import React from 'react'
import useTheme from "@/hooks/useTheme";
import {createSettingsStyles} from "@/assets/styles/settings.styles";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from "@expo/vector-icons";

const Tehlike = () => {
    const {colors} = useTheme();
    const settingsStyles = createSettingsStyles(colors);
    const yapilacakTemizle = useMutation(api.yapilacaklar.yapilacakTemizle);
    const handleReset = async () => {
        Alert.alert(
            "Uygulamayı Sıfırla",
            "⚠️ Tüm yaptıklarınız kalıcı olarak silinecek. Bu işlem geri alınamaz!",
            [
                {text:"İptal", style: "cancel"},
                {
                    text:"Hepsini Sil",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const sonuc = await yapilacakTemizle();
                            Alert.alert(
                              "Uygulama Sıfırla",
                              `${sonuc.deleteCount} yapilacak silindi. Uygulama sıfırlandı.`
                            );
                        }catch (e) {
                            console.log("Sıfırlama Hatası",e);
                            Alert.alert("HATA", "Sıfırlama Hatası");
                        }
                    }
                }
            ]
        )
    }
    return (
        <LinearGradient style={settingsStyles.section}
            colors={colors.gradients.surface}>
            <Text style={settingsStyles.sectionTitleDanger}>Tehlike</Text>
            <TouchableOpacity onPress={handleReset}
                              style={[settingsStyles.actionButton,
                                  {borderBottomWidth: 0}]}
                              activeOpacity={0.7}
            >
                <View style={settingsStyles.actionLeft}>
                    <LinearGradient colors={colors.gradients.danger}
                    style={settingsStyles.actionIcon}>
                        <Ionicons name="trash" size={18} color="#fff" />
                    </LinearGradient>
                    <Text style={settingsStyles.actionTextDanger}>Uygulamayı Sıfırla</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
        </LinearGradient>
    )
}
export default Tehlike
