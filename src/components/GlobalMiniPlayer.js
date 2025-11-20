import React from 'react';
import { View, Text, Image, Pressable, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { usePlayer } from '../../context/PlayerContext';

const { height } = Dimensions.get('window');

export default function GlobalMiniPlayer({ onOpenModal }) {
    const { tocando, isPlaying, somAtual, togglePlayPause, pararTudo } = usePlayer();

    if (!tocando) {
        return null;
    }

    return (
        <Pressable style={styles.miniPlayer} onPress={onOpenModal}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={somAtual?.img} style={styles.miniImg} />
                <View style={{marginLeft: 10, maxWidth: '60%'}}>
                   <Text style={styles.miniTitulo} numberOfLines={1}>{somAtual?.nome}</Text>
                   <Text style={styles.miniStatus}>{isPlaying ? "Tocando" : "Pausado"}</Text>
                </View>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={(e) => { 
                    e.stopPropagation(); 
                    pararTudo(); 
                }}>
                    <Ionicons name="close-circle-outline" size={30} color="#ddd" style={{marginRight: 8}} />
                </TouchableOpacity>

                <TouchableOpacity onPress={(e) => { 
                    e.stopPropagation(); 
                    togglePlayPause();
                }}>
                    <Ionicons 
                        name={isPlaying ? "pause-circle" : "play-circle"} 
                        size={45} 
                        color="#4CAF50" 
                    />
                </TouchableOpacity>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    miniPlayer: {
        position: "absolute",
        bottom: 0, 
        left: 0,
        right: 0,
        backgroundColor: "#222",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        paddingHorizontal: 15,
        borderTopWidth: 1,
        borderTopColor: "#333",
        paddingBottom: 20, 
    },
    miniImg: { width: 40, height: 40, borderRadius: 8 },
    miniTitulo: { color: "#fff", fontWeight: "bold", fontSize: 14 },
    miniStatus: { color: "#4CAF50", fontSize: 12 },
});