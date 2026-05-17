import {Alert, FlatList, StatusBar, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Link} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import useTheme from "@/hooks/useTheme";
import {createHomeStyles} from "@/assets/styles/home.styles";
import {LinearGradient} from "expo-linear-gradient";
import Header from "@/components/Header";
import YapilcakGiris from "@/components/YapilcakGiris";
import LoadingScreen from "@/components/LoadingScreen";
import {useMutation, useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {Doc, Id} from "@/convex/_generated/dataModel";
import {Ionicons} from "@expo/vector-icons";
import EmptyState from "@/components/EmptyState";
import {useState} from "react";

type Yapilacak = Doc<"yapilacaklar">

export default function Index() {
    const {colors} = useTheme();
    const homeStyles = createHomeStyles(colors);
    const [idDuzenle, setIdDuzenle] = useState<Id<"yapilacaklar"> | null>(null);
    const [textDuzenle, setTextDuzenle] = useState("");

    const yapilacaklar = useQuery(api.yapilacaklar.getYapilacaklar);
    const isLoading = yapilacaklar === undefined
    const toggleYapilacak = useMutation(api.yapilacaklar.toggleYapilacak);
    const yapilacakSil = useMutation(api.yapilacaklar.yapilacakSil);
    const yapilacakUpdate = useMutation(api.yapilacaklar.yapilacakUpdate);
    
    if(isLoading) return <LoadingScreen/>

    const handleKaydetDuzenle = async () => {
        if(idDuzenle){
            try {
                await yapilacakUpdate({id:idDuzenle,text:textDuzenle.trim()});
                handleIptalDuzenle();
            }catch (e) {
                console.log("Düzenleme Hatası",e);
                Alert.alert("HATA", "Düzenleme Hatası");
            }
        }
    }

    const handleYapilacakDuzenle = (yapilacak : Yapilacak) => {
        setTextDuzenle(yapilacak.text);
        setIdDuzenle(yapilacak._id);
    }
    const handleIptalDuzenle = () =>{
        setTextDuzenle("");
        setIdDuzenle(null);
    }
    const handleYapilacakSil = async (id : Id<"yapilacaklar">) => {
        Alert.alert("Yapılacağı Sil","Silmek istediğinize emin misiniz?",[
            {text:"Hayır",style : "cancel"},
            {text:"Evet",style : "destructive",onPress: () => yapilacakSil({id})},
        ])
    }

    const handleToggleYapilacak = async (id : Id<"yapilacaklar">) => {
        try {
            await toggleYapilacak({id});
        }catch (e) {
            console.log("Toggle Hatası",e);
            Alert.alert("HATA", "Toggle Yapılacak Hatası");
        }
    }
    const renderYapilacakItem = ({item} : {item:Yapilacak}) => {
        const isEditing = idDuzenle === item._id;
        return(
            <View style={homeStyles.todoItemWrapper}>
                <LinearGradient 
                    colors={colors.gradients.surface}
                    style={homeStyles.todoItem}
                    start={{x:0,y:0}}
                    end={{x:1,y:1}}
                >
                    <TouchableOpacity
                        style={homeStyles.checkbox}
                        activeOpacity={0.7}
                        onPress={()=>handleToggleYapilacak(item._id)}
                    >
                        <LinearGradient 
                            colors={item.isCompleted ?
                        colors.gradients.success : colors.gradients.muted}
                            style={[
                                homeStyles.checkboxInner,
                                {borderColor : item.isCompleted ?
                                        "transparent" : colors.border}
                            ]}
                        >
                            {item.isCompleted &&
                                <Ionicons name="checkmark" size={18} color="#fff"/>}
                        </LinearGradient>
                    </TouchableOpacity>

                    {isEditing ?
                        (<View style={homeStyles.editContainer}>
                            <TextInput style={homeStyles.editInput}
                                       value={textDuzenle}
                                       onChangeText={setTextDuzenle}
                                       autoFocus
                                       multiline
                                       placeholder="Yapilacağı Düzenle"
                                       placeholderTextColor={colors.textMuted}
                            />
                            <View style={homeStyles.editButtons}>
                                <TouchableOpacity onPress={handleKaydetDuzenle}
                                                  activeOpacity={0.8}>
                                    <LinearGradient colors={colors.gradients.success}
                                                    style={homeStyles.editButton}>
                                        <Ionicons name="checkmark" size={16} color="#fff"/>
                                        <Text style={homeStyles.editButtonText}>Kaydet</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleIptalDuzenle}
                                                  activeOpacity={0.8}>
                                    <LinearGradient colors={colors.gradients.muted}
                                                    style={homeStyles.editButton}>
                                        <Ionicons name="close" size={16} color="#fff"/>
                                        <Text style={homeStyles.editButtonText}>İptal</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>)
                        :
                        (<View style={homeStyles.todoTextContainer}>
                            <Text
                                style={[
                                    homeStyles.todoText,
                                    item.isCompleted &&{
                                        textDecorationLine : "line-through",
                                        color : colors.textMuted,
                                        opacity : 0.6,
                                    },
                                ]}
                            >
                                {item.text}
                            </Text>
                            <View style={homeStyles.todoActions}>
                                <TouchableOpacity onPress={()=>handleYapilacakDuzenle(item)} activeOpacity={0.8}>
                                    <LinearGradient colors={colors.gradients.warning}
                                                    style={homeStyles.actionButton}
                                    >
                                        <Ionicons name="pencil" size={14} color="#fff"/>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>handleYapilacakSil(item._id)} activeOpacity={0.8}>
                                    <LinearGradient colors={colors.gradients.danger}
                                                    style={homeStyles.actionButton}
                                    >
                                        <Ionicons name="trash" size={14} color="#fff"/>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>)
                    }


                </LinearGradient>
            </View>
        )
    }
    
  return (
      <LinearGradient
          colors={colors.gradients.background}
          style={homeStyles.container}
      >
          <StatusBar barStyle={colors.statusBarStyle}/>
          <SafeAreaView style= {homeStyles.safeArea}>
              <Header/>
              <YapilcakGiris/>
              <FlatList
                  data={yapilacaklar}
                  renderItem={renderYapilacakItem}
                  keyExtractor={(item) => item._id}
                  style={homeStyles.todoList}
                  contentContainerStyle={homeStyles.todoListContent}
                  ListEmptyComponent={EmptyState}
                  showsVerticalScrollIndicator = {false}
              />
          </SafeAreaView>
      </LinearGradient>
  );
}
