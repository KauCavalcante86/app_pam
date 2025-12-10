import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Pressable, Image } from "react-native";
import { styles } from "./style";
import ModalAtualizar from "./components/modalAtualizar/modalAtualizar";
import ModalParabens from "./components/modalParabens/modalParabens";
import Porcentagem from "./components/porcentagem/porcentagem";
import Ml from "./components/ml/ml";
import CampoBtn from "./components/CampoBtn/campoBtn";

import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Agua() {
  const [agua, setAgua] = useState(0);
  const [meta, setMeta] = useState(0);
  const [selecionado, setSelecionado] = useState("ml");

  const navigation = useNavigation();

  const carregarDados = useCallback(async () => {
    try {
      const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
      const diaAtual = dias[new Date().getDay()];

      const metasData = await AsyncStorage.getItem("@metas_por_dia");
      if (metasData) {
        const metas = JSON.parse(metasData);
        setMeta(metas[diaAtual] || 0);
      }

      const ultimaData = await AsyncStorage.getItem("@ultima_data");
      const hoje = new Date().toDateString(); 

      if (ultimaData !== hoje) {
        await AsyncStorage.setItem("@agua_diaria", "0");
        await AsyncStorage.setItem("@ultima_data", hoje);
        setAgua(0);
        return;
      }

      const aguaSalva = await AsyncStorage.getItem("@agua_diaria");
      if (aguaSalva) setAgua(parseInt(aguaSalva));
    } catch (error) {
      console.log("Erro ao carregar dados:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [carregarDados])
  );

  // Pedir permissão para notificações
  useEffect(() => {
    const pedirPermissao = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Você negou a permissão para as notificações!');
        return;
      }
    };
    pedirPermissao();
  }, []);

  // Monitorar água e meta para agendar ou parar notificações
  useEffect(() => {
    if (meta === 0) return;

    if (agua >= meta) {
      pararNotificacoes();
    } else {
      agendarNotificacoes();
    }
  }, [agua, meta]);

  // Agendar notificações quando meta não atingida
  const agendarNotificacoes = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync(); // Cancela notificações antigas

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hora de beber água! 💧",
        body: "Você ainda não atingiu sua meta hoje!",
        sound: true,
        vibrationPattern: [0, 500, 250, 500],
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        seconds: 3600,
        repeats: true,
      }
    });

    console.log("🔔 Notificação ativada (Meta não atingida)");
  };

  // Salvar água no AsyncStorage
  const salvarAgua = async (valor) => {
    try {
      await AsyncStorage.setItem("@agua_diaria", valor.toString());
      await AsyncStorage.setItem("@ultima_data", new Date().toDateString());
    } catch (error) {
      console.log("Erro ao salvar água:", error);
    }
  };

  const handleAddAgua = (quantidade) => {
    const novoValor = Math.min(agua + quantidade, meta);
    setAgua(novoValor);
    salvarAgua(novoValor);

    if (novoValor >= meta) {
      pararNotificacoes();
    }
  };

  // Parar todas as notificações
  const pararNotificacoes = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log("🔕 Notificações canceladas (Meta atingida)");
  };

  const handleResetAgua = async () => {
    setAgua(0);
    await AsyncStorage.setItem("@agua_diaria", "0");
    await AsyncStorage.setItem("@ultima_data", new Date().toDateString());
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonVoltarContainer}>
        <Pressable
          style={styles.btnVoltar}
          onPress={() => navigation.goBack()}
        >
          <Image style={styles.imgVoltar} source={require('../../../assets/btnVoltar.png')} />
        </Pressable>
      </View>
      <ModalParabens agua={agua} meta={meta} />

      <View style={styles.header}>
        <ModalAtualizar meta={meta} setMeta={setMeta} agua={agua} />
      </View>

      {/* Botões ml / porcentagem */}
      <View style={styles.containerBtn}>
        <View style={styles.btnOpcao}>
          <Pressable
            style={[styles.btn, selecionado === "ml" && styles.btnSelecionado]}
            onPress={() => setSelecionado("ml")}
          >
            <Image
              style={[styles.icon, selecionado === "ml" && styles.iconSelecionado]}
              source={require("../../../assets/ml_icon.png")}
            />
          </Pressable>

          <Pressable
            style={[styles.btn, selecionado === "porcentagem" && styles.btnSelecionado]}
            onPress={() => setSelecionado("porcentagem")}
          >
            <Image
              style={[styles.icon, selecionado === "porcentagem" && styles.iconSelecionado]}
              source={require("../../../assets/porcen_icon.png")}
            />
          </Pressable>
        </View>
      </View>

      {/* Exibição */}
      <View style={styles.areaComponente}>
        {selecionado === "porcentagem" ? (
          <Porcentagem meta={meta} agua={agua} />
        ) : (
          <Ml meta={meta} agua={agua} />
        )}
      </View>

      <View style={styles.btnBottom}>
        <CampoBtn onAddAgua={handleAddAgua} onResetAgua={handleResetAgua} />
      </View>
    </View>
  );
}
