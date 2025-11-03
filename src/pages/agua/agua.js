import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Pressable, Image } from "react-native";
import { styles } from "./style";
import ModalAtualizar from "./components/modalAtualizar/modalAtualizar";
import Porcentagem from "./components/porcentagem/porcentagem";
import Ml from "./components/ml/ml";
import CampoBtn from "./components/CampoBtn/campoBtn";

export default function Agua() {
  const [agua, setAgua] = useState(0);
  const [meta, setMeta] = useState(0);
  const [selecionado, setSelecionado] = useState("ml"); // valor padrão

  // Carregar meta do dia atual
  const carregarMetaHoje = useCallback(async () => {
    const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
    const diaAtual = dias[new Date().getDay()];

    const data = await AsyncStorage.getItem("@metas_por_dia");
    if (data) {
      const metas = JSON.parse(data);
      setMeta(metas[diaAtual] || 0);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarMetaHoje();
    }, [carregarMetaHoje])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ModalAtualizar meta={meta} setMeta={setMeta} />
      </View>

      {/* Botões de seleção */}
      <View style={styles.containerBtn}>
        <View style={styles.btnOpcao}>
          <Pressable
            style={[
              styles.btn,
              selecionado === "ml" && styles.btnSelecionado,
            ]}
            onPress={() => setSelecionado("ml")}
          >
            <Image
              style={[
                styles.icon,
                selecionado === "ml" && styles.iconSelecionado,
              ]}
              source={require("../../../assets/ml_icon.png")}
            />
          </Pressable>

          <Pressable
            style={[
              styles.btn,
              selecionado === "porcentagem" && styles.btnSelecionado,
            ]}
            onPress={() => setSelecionado("porcentagem")}
          >
            <Image
              style={[
                styles.icon,
                selecionado === "porcentagem" && styles.iconSelecionado,
              ]}
              source={require("../../../assets/porcen_icon.png")}
            />
          </Pressable>
        </View>
      </View>

      {/* Exibe um componente de acordo com o selecionado */}

      <View style={styles.areaComponente}>
      {selecionado === "porcentagem" ? (
        <Porcentagem meta={meta} agua={agua} />
      ) : (
        <Ml meta={meta} agua={agua} />
      )}
      </View>

      <CampoBtn meta={meta} setMeta={setMeta} setAgua={setAgua} />
    </View>
  );
}
