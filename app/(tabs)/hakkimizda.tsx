import {View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking} from 'react-native' // <-- Linking buraya eklendi
import React from 'react'
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const AboutScreen = () => {
    const { colors } = useTheme();

    // Hata veren ve eksik olan fonksiyonu buraya tanımladık:
    const openLink = (url: string) => {
        Linking.openURL(url).catch((err) =>
            console.error("Bağlantı açılırken bir hata oluştu:", err)
        );
    };

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: colors.bg }]}
            showsVerticalScrollIndicator={false}
        >
            {/* Üst Profil Kartı */}
            <View style={[styles.profileCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <LinearGradient
                    colors={colors.gradients.primary}
                    style={styles.avatarPlaceholder}
                >
                    <Ionicons name="code-slash" size={40} color="#ffffff" />
                </LinearGradient>

                <Text style={[styles.name, { color: colors.text }]}>Hatice Şen</Text>
                <Text style={[styles.title, { color: colors.primary }]}>Bilgisayar Programcılığı Öğrencisi</Text>
                <Text style={[styles.bio, { color: colors.textMuted }]}>
                    Tasarım gözümü kodun gücüyle birleştirmeyi seviyorum. İzmir Ekonomi Üniversitesi'nde başlayan Grafik Tasarım yolculuğumu, Bilgisayar Programcılığı ile harmanlayarak modern, kullanıcı dostu mobil ve web uygulamaları geliştiriyorum.
                </Text>
            </View>

            {/* Eğitim Bölümü */}
            <View style={styles.section}>
                <View style={styles.sectionTitleContainer}>
                    <Ionicons name="school-outline" size={20} color={colors.primary} />
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Eğitim</Text>
                </View>

                <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={[styles.infoMain, { color: colors.text }]}>Bilgisayar Programcılığı | 2024 - 2026</Text>
                    <Text style={[styles.infoSub, { color: colors.textMuted }]}>İzmir Ekonomi Üniversitesi</Text>

                    <View style={[styles.divider, { backgroundColor: colors.border }]} />

                    <Text style={[styles.infoMain, { color: colors.text }]}>Grafik Tasarım | 2023 - 2024</Text>
                    <Text style={[styles.infoSub, { color: colors.textMuted }]}>İzmir Ekonomi Üniversitesi</Text>
                </View>
            </View>

            {/* Yetenekler Bölümü */}
            <View style={styles.section}>
                <View style={styles.sectionTitleContainer}>
                    <Ionicons name="hardware-chip-outline" size={20} color={colors.primary} />
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Yetenekler & Teknolojiler</Text>
                </View>

                <View style={styles.skillsGrid}>
                    <View style={[styles.skillTag, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <Ionicons name="logo-javascript" size={16} color="#f7df1e" style={styles.skillIcon} />
                        <Text style={[styles.skillText, { color: colors.text }]}>JavaScript</Text>
                    </View>

                    <View style={[styles.skillTag, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <Ionicons name="logo-react" size={16} color={colors.primary} style={styles.skillIcon} />
                        <Text style={[styles.skillText, { color: colors.text }]}>React Native & Expo</Text>
                    </View>

                    <View style={[styles.skillTag, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <Ionicons name="apps-outline" size={16} color="#00d2ff" style={styles.skillIcon} />
                        <Text style={[styles.skillText, { color: colors.text }]}>Kuika Low-Code Platform</Text>
                    </View>

                    <View style={[styles.skillTag, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <Ionicons name="logo-python" size={16} color="#3776ab" style={styles.skillIcon} />
                        <Text style={[styles.skillText, { color: colors.text }]}>Python</Text>
                    </View>

                    <View style={[styles.skillTag, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <Ionicons name="server-outline" size={16} color={colors.success} style={styles.skillIcon} />
                        <Text style={[styles.skillText, { color: colors.text }]}>SQL & Convex</Text>
                    </View>

                    <View style={[styles.skillTag, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <Ionicons name="color-palette-outline" size={16} color={colors.danger} style={styles.skillIcon} />
                        <Text style={[styles.skillText, { color: colors.text }]}>Photoshop & Illustrator</Text>
                    </View>
                </View>
            </View>

            {/* İletişim / Linkler */}
            <View style={[styles.section, { marginBottom: 40 }]}>
                <View style={styles.sectionTitleContainer}>
                    <Ionicons name="link-outline" size={20} color={colors.primary} />
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>İletişim & Bağlantılar</Text>
                </View>

                <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    {/* E-posta */}
                    <TouchableOpacity
                        style={styles.linkRow}
                        onPress={() => openLink('mailto:haticesen0405@gmail.com')}
                    >
                        <Ionicons name="mail-outline" size={20} color={colors.primary} />
                        <Text style={[styles.linkText, { color: colors.text }]}>haticesen0405@gmail.com</Text>
                    </TouchableOpacity>

                    <View style={[styles.divider, { backgroundColor: colors.border }]} />

                    {/* LinkedIn */}
                    <TouchableOpacity
                        style={styles.linkRow}
                        onPress={() => openLink('https://www.linkedin.com/in/sen-hatice/')}
                    >
                        <Ionicons name="logo-linkedin" size={20} color="#0a66c2" />
                        <Text style={[styles.linkText, { color: colors.text }]}>linkedin.com/in/sen-hatice</Text>
                    </TouchableOpacity>

                    <View style={[styles.divider, { backgroundColor: colors.border }]} />


                    <TouchableOpacity
                        style={styles.linkRow}
                        onPress={() => openLink('https://github.com/hatice-sen')} // Buraya kendi github linkini tam da ekleyebilirsin
                    >
                        <Ionicons name="logo-github" size={20} color={colors.text} />
                        <Text style={[styles.linkText, { color: colors.textMuted }]}>GitHub Sayfam</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    profileCard: {
        padding: 24,
        borderRadius: 24,
        borderWidth: 1,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 2,
        marginBottom: 24,
    },
    avatarPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    name: {
        fontSize: 22,
        fontWeight: '600',
        fontFamily: 'Poppins',
        marginBottom: 6,
    },
    title: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Poppins',
        textAlign: 'center',
        marginBottom: 16,
        paddingHorizontal: 10,
    },
    bio: {
        fontSize: 14,
        fontFamily: 'Poppins',
        textAlign: 'center',
        lineHeight: 22,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        paddingLeft: 4,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Poppins',
        marginLeft: 8,
    },
    infoCard: {
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
    },
    infoMain: {
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'Poppins',
        marginBottom: 2,
    },
    infoSub: {
        fontSize: 13,
        fontFamily: 'Poppins',
    },
    divider: {
        height: 1,
        marginVertical: 14,
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    skillTag: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 14,
        borderWidth: 1,
    },
    skillIcon: {
        marginRight: 8,
    },
    skillText: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'Poppins',
    },
    linkRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    linkText: {
        fontSize: 14,
        fontFamily: 'Poppins',
        marginLeft: 12,
    }
})

export default AboutScreen;