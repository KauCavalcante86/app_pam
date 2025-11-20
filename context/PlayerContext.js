import React, { createContext, useState, useEffect, useContext } from 'react';
import { Audio } from "expo-av";

const sons = [
  {
    id: 1,
    nome: "Chuva Suave",
    img: require("../assets/chuva.png"),
    arquivo: require("../assets/sons/chuva.wav"),
    bgVideo: "https://drive.google.com/uc?export=download&id=1H60VqY6qVBrAGZm4GL9iV1Tghq3EFEGd"
  },
  {
    id: 2,
    nome: "Mar / Ondas",
    img: require("../assets/mar.png"),
    arquivo: require("../assets/sons/mar.wav"),
    bgVideo: "https://drive.google.com/uc?export=download&id=1CaGiWbvpQ3G5PgosCWYYCbwIGQnSBJR6"
  },
  {
    id: 3,
    nome: "Floresta",
    img: require("../assets/floresta.png"),
    arquivo: require("../assets/sons/floresta.wav"),
    bgVideo: "https://drive.google.com/uc?export=download&id=1L0oQ3d_DPqvSg2PpaXfOTS1QvzMfMRge"
  },
  {
    id: 4,
    nome: "Lareira",
    img: require("../assets/fogo.png"),
    arquivo: require("../assets/sons/fogo.wav"),
    bgVideo: "https://drive.google.com/uc?export=download&id=1_t-jk_t9OBbvrHeAMDaDTaHtYQATP1lh"
  },
];


const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
    const [tocando, setTocando] = useState(null);
    const [player, setPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);

    const indexAtual = sons.findIndex((s) => s.id === tocando);
    const somAtual = sons[indexAtual]; 
    const temAnterior = indexAtual > 0;
    const temProximo = indexAtual < sons.length - 1;

    useEffect(() => {
        async function configureAudio() {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                playsInSilentModeIOS: true,
                staysActiveInBackground: true,
                shouldDuckAndroid: true,
                playThroughEarpieceAndroid: false,
            });
        }
        configureAudio();
    }, []);

    useEffect(() => {
        return () => {
            if (player) player.unloadAsync();
        };
    }, [player]);

    async function pararTudo() {
        if (player) {
            await player.unloadAsync();
        }
        setPlayer(null);
        setTocando(null);
        setIsPlaying(false);
    }
    
    async function togglePlayPause() {
        if (!player) return;
        if (isPlaying) {
            await player.pauseAsync();
            setIsPlaying(false);
        } else {
            await player.playAsync();
            setIsPlaying(true);
        }
    }

    async function selecionarMusica(item) {
        try {
            if (player) {
                await player.unloadAsync();
            }

            const { sound } = await Audio.Sound.createAsync(
                item.arquivo,
                { shouldPlay: true, isLooping: true, volume: volume }
            );
            
            // Adicionar Listener para fim da música (se não for loop infinito)
            // Como usamos isLooping: true, ele nunca acaba, mas é bom ter o código:
            // sound.setOnPlaybackStatusUpdate((status) => {
            //     if (status.didJustFinish && !status.isLooping) { pararTudo(); }
            // });

            await sound.setVolumeAsync(volume);
            setPlayer(sound);
            setTocando(item.id);
            setIsPlaying(true);
            
        } catch (error) {
            console.log("Erro ao carregar", error);
        }
    }

    async function tocarAnterior() {
        if (temAnterior) {
            selecionarMusica(sons[indexAtual - 1]);
        }
    }

    async function tocarProximo() {
        if (temProximo) {
            selecionarMusica(sons[indexAtual + 1]);
        }
    }

    async function ajustarVolume(v) {
        setVolume(v);
        if (player) await player.setVolumeAsync(v);
    }

    const value = {
        sons,
        tocando,
        isPlaying,
        volume,
        somAtual,
        temAnterior,
        temProximo,
        togglePlayPause,
        selecionarMusica,
        tocarAnterior,
        tocarProximo,
        ajustarVolume,
        pararTudo,
    };

    return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};