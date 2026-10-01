
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";

import {
  createAudioPlayer,
  setAudioModeAsync,
} from "expo-audio";

const sons = [
  {
    id: 1,
    nome: "Chuva Suave",
    img: require("../assets/chuva.png"),
    arquivo: require("../assets/sons/chuva.wav"),
    bgVideo:
      "https://drive.google.com/uc?export=download&id=1H60VqY6qVBrAGZm4GL9iV1Tghq3EFEGd",
  },
  {
    id: 2,
    nome: "Mar / Ondas",
    img: require("../assets/mar.png"),
    arquivo: require("../assets/sons/mar.wav"),
    bgVideo:
      "https://drive.google.com/uc?export=download&id=1CaGiWbvpQ3G5PgosCWYYCbwIGQnSBJR6",
  },
  {
    id: 3,
    nome: "Floresta",
    img: require("../assets/floresta.png"),
    arquivo: require("../assets/sons/floresta.wav"),
    bgVideo:
      "https://drive.google.com/uc?export=download&id=1L0oQ3d_DPqvSg2PpaXfOTS1QvzMfMRge",
  },
  {
    id: 4,
    nome: "Lareira",
    img: require("../assets/fogo.png"),
    arquivo: require("../assets/sons/fogo.wav"),
    bgVideo:
      "https://drive.google.com/uc?export=download&id=1_t-jk_t9OBbvrHeAMDaDTaHtYQATP1lh",
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
      try {
        await setAudioModeAsync({
          playsInSilentMode: true,
          shouldPlayInBackground: true,
          interruptionMode: "doNotMix",
        });
      } catch (error) {
        console.log("Erro ao configurar áudio:", error);
      }
    }

    configureAudio();
  }, []);

  useEffect(() => {
    return () => {
      if (player) {
        player.remove();
      }
    };
  }, [player]);

  async function pararTudo() {
    try {
      if (player) {
        player.pause();
        player.remove();
      }

      setPlayer(null);
      setTocando(null);
      setIsPlaying(false);
    } catch (error) {
      console.log("Erro ao parar áudio:", error);
    }
  }

  function togglePlayPause() {
    if (!player) return;

    try {
      if (isPlaying) {
        player.pause();
        setIsPlaying(false);
      } else {
        player.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log("Erro ao reproduzir áudio:", error);
    }
  }

  function selecionarMusica(item) {
    try {
      if (player) {
        player.pause();
        player.remove();
      }

      const novoPlayer = createAudioPlayer(item.arquivo);

      novoPlayer.loop = true;
      novoPlayer.volume = volume;

      novoPlayer.play();

      setPlayer(novoPlayer);
      setTocando(item.id);
      setIsPlaying(true);
    } catch (error) {
      console.log("Erro ao carregar áudio:", error);
    }
  }

  function tocarAnterior() {
    if (temAnterior) {
      selecionarMusica(sons[indexAtual - 1]);
    }
  }

  function tocarProximo() {
    if (temProximo) {
      selecionarMusica(sons[indexAtual + 1]);
    }
  }

  function ajustarVolume(v) {
    setVolume(v);

    if (player) {
      player.volume = v;
    }
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

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};

