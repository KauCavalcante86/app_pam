import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Pressable, Image } from "react-native";
import { styles } from "./style";
import ModalAtualizar from "./components/modalAtualizar/modalAtualizar";
import ModalParabens from "./components/modalParabens/modalParabens";
import Porcentagem from "./components/porcentagem/porcentagem";
import Ml from "./components/ml/ml";
import CampoBtn from "./components/CampoBtn/campoBtn";

export default function Agua() {
  const [agua, setAgua] = useState(0);
  const [meta, setMeta] = useState(0);
  const [selecionado, setSelecionado] = useState("ml");

  const carregarDados = useCallback(async () => {
    try {
      const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
      const diaAtual = dias[new Date().getDay()];

      // 🔹 Puxa metas do AsyncStorage
      const metasData = await AsyncStorage.getItem("@metas_por_dia");
      if (metasData) {
        const metas = JSON.parse(metasData);
        setMeta(metas[diaAtual] || 0);
      }

      // 🔹 Verifica a data do último registro
      const ultimaData = await AsyncStorage.getItem("@ultima_data");
      const hoje = new Date().toDateString(); // Ex: "Tue Nov 04 2025"

      if (ultimaData !== hoje) {
        // Dia virou ➜ reseta a água
        await AsyncStorage.setItem("@agua_diaria", "0");
        await AsyncStorage.setItem("@ultima_data", hoje);
        setAgua(0);
        return;
      }

      // 🔹 Se for o mesmo dia, mantém o valor salvo
      const aguaSalva = await AsyncStorage.getItem("@agua_diaria");
      if (aguaSalva) setAgua(parseInt(aguaSalva));
    } catch (error) {
      console.log("Erro ao carregar dados:", error);
    }
  }, []);

  // 🔹 Executa sempre que a tela focar
  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [carregarDados])
  );

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
  };

  const handleResetAgua = async () => {
    setAgua(0);
    await AsyncStorage.setItem("@agua_diaria", "0");
    await AsyncStorage.setItem("@ultima_data", new Date().toDateString());
  };

  return (
    <View style={styles.container}>
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
