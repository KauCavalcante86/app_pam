import React, { useState } from "react";
import { 
  View, 
  Text, 
  Pressable, 
  FlatList, 
  Image, 
  StyleSheet, 
  Modal, 
  TouchableOpacity,
  Dimensions 
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";

import { usePlayer } from '../../../context/PlayerContext'; 

const { width } = Dimensions.get('window');

export default function SonsScreen() {
    const [modalVisible, setModalVisible] = useState(false);

    const { 
        sons, 
        tocando, 
        isPlaying, 
        volume,
        somAtual, 
        temAnterior,
        temProximo,
        selecionarMusica, 
        togglePlayPause,
        tocarAnterior,
        tocarProximo,
        ajustarVolume,
       
    } = usePlayer(); 

    async function handleSelecionarMusica(item) {
        if (tocando === item.id) {
            setModalVisible(true);
            return;
        }
        await selecionarMusica(item); 
        setModalVisible(true);
    }


    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Sons Relaxantes</Text>
            <Text style={styles.subtitulo}>Toque para ouvir</Text>

            <FlatList
                data={sons}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                contentContainerStyle={{ paddingBottom: 150 }}
                renderItem={({ item }) => (
                    <Pressable 
                        onPress={() => handleSelecionarMusica(item)} 
                        style={[styles.card, tocando === item.id && styles.cardAtivo]}
                    >
                        <Image source={item.img} style={styles.imgCard} />
                        <Text style={styles.nomeCard}>{item.nome}</Text>
                        {tocando === item.id && (
                            <Ionicons name="musical-notes" size={20} color="#4CAF50" style={{marginTop: 5}} />
                        )}
                    </Pressable>
                )}
            />

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    
                    {/* VÍDEO DE FUNDO */}
                    {somAtual?.bgVideo && (
                        <Video
                            source={{ uri: somAtual.bgVideo }} 
                            style={StyleSheet.absoluteFill}
                            resizeMode={ResizeMode.COVER}
                            shouldPlay={true}
                            isLooping={true}
                            isMuted={true}
                        />
                    )}

                    <View style={styles.overlay} />

                    <View style={styles.modalSafeArea}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.btnMinimizar}>
                                <Ionicons name="chevron-down" size={35} color="#fff" />
                            </TouchableOpacity>
                            <Text style={styles.modalHeaderTitle}>Tocando Agora</Text>
                            <View style={{width: 35}} /> 
                        </View>

                        <View style={styles.modalContent}>
                            <View style={{flex: 1}} /> 
                            <View style={{alignItems: 'center', marginBottom: 30}}>
                                <Text style={styles.modalTitulo}>{somAtual?.nome}</Text>
                                <Text style={styles.modalSubtitulo}>Relaxe e aproveite</Text>
                            </View>

                            <View style={styles.controlesContainer}>
                                <View style={styles.sliderWrapper}>
                                    <Ionicons name="volume-low" size={20} color="#ddd" />
                                    <Slider
                                        style={{ flex: 1, marginHorizontal: 10 }}
                                        value={volume}
                                        minimumValue={0}
                                        maximumValue={1}
                                        minimumTrackTintColor="#4CAF50"
                                        maximumTrackTintColor="rgba(255,255,255,0.3)"
                                        thumbTintColor="#fff"
                                        onValueChange={ajustarVolume}
                                    />
                                    <Ionicons name="volume-high" size={20} color="#ddd" />
                                </View>

                                <View style={styles.botoesRow}>
                                    <View style={styles.btnSideContainer}>
                                        {temAnterior && (
                                            <TouchableOpacity onPress={tocarAnterior}>
                                                <Ionicons name="play-skip-back" size={40} color="#fff" />
                                            </TouchableOpacity>
                                        )}
                                    </View>

                                    <TouchableOpacity onPress={togglePlayPause} style={styles.btnPlayGrande}>
                                        <Ionicons 
                                            name={isPlaying ? "pause" : "play"} 
                                            size={50} 
                                            color="#fff" 
                                            style={{marginLeft: isPlaying ? 0 : 5}}
                                        />
                                    </TouchableOpacity>

                                    <View style={styles.btnSideContainer}>
                                        {temProximo && (
                                            <TouchableOpacity onPress={tocarProximo}>
                                                <Ionicons name="play-skip-forward" size={40} color="#fff" />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0d0d0d",
        padding: 20,
        paddingTop: 50,
    },
    titulo: { color: "#fff", fontSize: 28, fontWeight: "bold" },
    subtitulo: { color: "#bbb", fontSize: 15, marginBottom: 20 },
    card: {
        backgroundColor: "#1a1a1a",
        width: "48%",
        borderRadius: 16,
        padding: 15,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    cardAtivo: { borderWidth: 1, borderColor: "#4CAF50" },
    imgCard: { width: 80, height: 80, borderRadius: 10 },
    nomeCard: { color: "#fff", fontSize: 16, marginTop: 10, fontWeight: "600", textAlign: 'center' },
    
    miniPlayer: {
        position: "absolute",
        bottom: 20,
        left: 10,
        right: 10,
        backgroundColor: "#222",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#333",
        elevation: 10,
    },
    miniImg: { width: 45, height: 45, borderRadius: 8 },
    miniTitulo: { color: "#fff", fontWeight: "bold", fontSize: 14 },
    miniStatus: { color: "#4CAF50", fontSize: 12 },

    modalContainer: {
        flex: 1,
        backgroundColor: "#000",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalSafeArea: {
        flex: 1,
        justifyContent: "space-between",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    modalHeaderTitle: { color: "#fff", fontSize: 16, fontWeight: "600", letterSpacing: 1, textShadowColor: 'rgba(0,0,0,0.7)', textShadowRadius: 3 },
    btnMinimizar: { padding: 5 },
    
    modalContent: {
        flex: 1,
        justifyContent: "flex-end",
        paddingBottom: 60,
    },
    modalTitulo: { 
        color: "#fff", 
        fontSize: 32, 
        fontWeight: "bold", 
        marginBottom: 5,
        textShadowColor: 'rgba(0,0,0,0.7)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 5
    },
    modalSubtitulo: { 
        color: "#ddd", 
        fontSize: 18, 
        marginBottom: 20,
        textShadowColor: 'rgba(0,0,0,0.7)',
        textShadowRadius: 5
    },
    controlesContainer: {
        width: "100%",
        alignItems: "center",
    },
    sliderWrapper: {
        flexDirection: "row",
        alignItems: "center",
        width: "85%",
        marginBottom: 40,
    },
    botoesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    btnPlayGrande: {
        width: 80,
        height: 80,
        backgroundColor: "rgba(76, 175, 80, 0.9)",
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.3)"
    },
    btnSideContainer: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }
});