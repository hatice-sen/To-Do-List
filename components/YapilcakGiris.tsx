import {View, Text, TextInput, Alert, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import useTheme from "@/hooks/useTheme";
import {createHomeStyles} from "@/assets/styles/home.styles";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from "@expo/vector-icons";

const YapilcakGiris = () => {
    const {colors} = useTheme();
    const homeStyles = createHomeStyles(colors);
    const [yeniYapilacak, setYapilacak] = useState("");
    const yapilacakEkle = useMutation(api.yapilacaklar.yapilacakEkle);
    //handle kullanarak hata ayıklayalım.
    const handleYapilacakEkle = async () => {
        if(yeniYapilacak.trim()){
            try {
                await yapilacakEkle({text : yeniYapilacak.trim()});
                setYapilacak("");
            }catch (error) {
                console.log("Ekleme yapılırken hata oluştu",error);
                Alert.alert("HATA","Ekleme yapılırken hata oluştu");
            }
        }
    }
    return (
        <View style={homeStyles.inputSection}>
            <View style={homeStyles.inputWrapper}>
                <TextInput
                style={homeStyles.input}
                placeholder="Ne Yapilacak?"
                placeholderTextColor={colors.textMuted}
                multiline
                value={yeniYapilacak}
                onChangeText={setYapilacak}
                onSubmitEditing={handleYapilacakEkle}/>

                <TouchableOpacity
                    onPress={handleYapilacakEkle}
                    activeOpacity={0.8}
                    disabled={!yeniYapilacak.trim()}
                >
                    <LinearGradient
                        colors={yeniYapilacak.trim() ?
                    colors.gradients.primary : colors.gradients.muted}
                        style={[homeStyles.addButton,
                        !yeniYapilacak.trim() && homeStyles.addButtonDisabled]}
                    >
                        <Ionicons name="add" size={24} color="#fff"/>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default YapilcakGiris
