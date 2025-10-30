import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";
import { styles } from "./style";
import ModalAtualizar from "./components/modalAtualizar/modalAtualizar";
import Porcentagem from "./components/porcentagem/porcentagem";
import Ml from "./components/ml/ml";
import CampoBtn from "./components/CampoBtn/campoBtn";

export default function Agua() {
  const [agua, setAgua] = useState(0);
  const [meta, setMeta] = useState(0);

  // Função para carregar a meta do dia atual
  const carregarMetaHoje = useCallback(async () => {
    const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
    const diaAtual = dias[new Date().getDay()];

    const data = await AsyncStorage.getItem("@metas_por_dia");
    if (data) {
      const metas = JSON.parse(data);
      setMeta(metas[diaAtual] || 0);
    }
  }, []);

  // Recarrega sempre que a tela ganhar foco
  useFocusEffect(
    useCallback(() => {
      carregarMetaHoje();
    }, [carregarMetaHoje])
  );

  return (
    <View style={styles.container}>
      <ModalAtualizar meta={meta} setMeta={setMeta} />
      <Porcentagem meta={meta} agua={agua} />
      <Ml meta={meta} agua={agua} />
      <CampoBtn meta={meta} setMeta={setMeta} setAgua={setAgua} />
    </View>
  );
}
