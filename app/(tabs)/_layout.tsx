import React from 'react'
import {Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import useTheme from "@/hooks/useTheme";

const TabsLayout = () => {
    const {colors} = useTheme();
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textMuted,
            tabBarLabelStyle :{
                fontSize: 15,
                fontWeight: "600",
            },
            tabBarStyle :{
                backgroundColor: colors.surface,
                borderTopWidth:1,
                borderTopColor:colors.border,
                height: 90,
                paddingBottom : 30,
                paddingTop: 10,
            },
            headerShown: false,
        }}
        >
            <Tabs.Screen name = "index"
                         options={{
                             title: "Yapilacaklar",
                             tabBarIcon : ({color,size})=>(
                                 <Ionicons name="flash-outline"
                                           size={size} color={color}/>
                             )
                         }}/>
            <Tabs.Screen name = "ayarlar"
                         options={{
                             title: "Ayarlar",
                             tabBarIcon : ({color,size})=>(
                                 <Ionicons name="settings-outline"
                                           size={size} color={color}/>
                             )
                         }}/>
            <Tabs.Screen name = "hakkimizda"
                         options={{
                             title: "Hakkımızda",
                             tabBarIcon : ({color,size})=>(
                                 <Ionicons name="person-outline"
                                           size={size} color={color}/>
                             )
                         }}/>
        </Tabs>
    )
}
export default TabsLayout