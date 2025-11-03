import { useEffect, useState } from "react";
import { View, Text, Pressable, TextInput, Modal, Alert, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { styles } from "./style";

export default function ModalAtualizar({ meta, setMeta, agua }) {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const [showModal, setShowModal] = useState(false);
  const [showModalDate, setShowModalDate] = useState(false);
  const [inputMeta, setInputMeta] = useState(meta ? meta.toString() : "");
  const [diasSelecionados, setDiasSelecionados] = useState([]);
  const [metasPorDia, setMetasPorDia] = useState({});
  const [metaHoje, setMetaHoje] = useState(null);

  const dias = ["Dom", "Seg", "Ter", "Quar", "Quin", "Sex", "Sab"];

  // Carrega metas e determina o dia atual
  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem("@metas_por_dia");
      const metas = data ? JSON.parse(data) : {};
      setMetasPorDia(metas);

      const diaAtualIndex = new Date().getDay();
      const nomeDia = dias[diaAtualIndex];
      setMetaHoje(metas[nomeDia] || null);
    })();
  }, []);

  // Marcar meta automaticamente assim que for atingida
  useEffect(() => {
    const marcarAutomaticamente = async () => {
      if (!meta || !agua) return;

      if (agua >= meta) {
        const hoje = new Date();
        const dataKey = `${hoje.getFullYear()}-${hoje.getMonth() + 1}-${hoje.getDate()}`;

        const dados = await AsyncStorage.getItem("@metas_por_dia");
        const metas = dados ? JSON.parse(dados) : {};

        if (!metas[dataKey]) {
          metas[dataKey] = true;
          await AsyncStorage.setItem("@metas_por_dia", JSON.stringify(metas));
          setMetasPorDia(metas);
        }
      }
    };

    

    marcarAutomaticamente();
  }, [agua, meta]);

  const abrirModal = () => setShowModal(true);
  const fecharModal = () => setShowModal(false);
  const abrirModalDate = () => setShowModalDate(true);
  const fecharModalDate = () => setShowModalDate(false);

  const toggleDia = (dia) => {
    setDiasSelecionados((prev) =>
      prev.includes(dia)
        ? prev.filter((item) => item !== dia)
        : [...prev, dia]
    );
  };

  const salvarMeta = async () => {
    if (diasSelecionados.length === 0) {
      Alert.alert("Selecione pelo menos um dia!");
      return;
    }

    const num = parseInt(inputMeta);
    if (isNaN(num) || num <= 0) {
      Alert.alert("Digite uma meta válida!");
      return;
    }

    const novasMetas = { ...metasPorDia };
    diasSelecionados.forEach((dia) => {
      novasMetas[dia] = num;
    });

    setMetasPorDia(novasMetas);
    await AsyncStorage.setItem("@metas_por_dia", JSON.stringify(novasMetas));

    const diaAtual = dias[new Date().getDay()];
    const metaDoDia = novasMetas[diaAtual] || null;

    setMetaHoje(metaDoDia);
    setMeta(metaDoDia);

    Alert.alert("Sucesso", "Meta aplicada aos dias selecionados!");
    setDiasSelecionados([]);
    fecharModal();
  };

  const resetarMeta = async () => {
    try {
      const hoje = new Date();
      const ano = hoje.getFullYear();
      const mes = hoje.getMonth();
      const totalDias = new Date(ano, mes + 1, 0).getDate();

      const dados = await AsyncStorage.getItem("@metas_por_dia");
      const metas = dados ? JSON.parse(dados) : {};

      for (let dia = 1; dia <= totalDias; dia++) {
        const dataKey = `${ano}-${mes + 1}-${dia}`;
        if (metas[dataKey]) delete metas[dataKey];
      }

      await AsyncStorage.setItem("@metas_por_dia", JSON.stringify(metas));
      setMetasPorDia(metas);
      Alert.alert("Resetado", "As metas do mês foram desmarcadas!");
    } catch (error) {
      console.error("Erro ao resetar metas:", error);
    }
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      {/* Botões principais */}
      <View style={styles.areaBtnModal}>
        <Pressable style={styles.btnCalendario} onPress={abrirModalDate}>
          <Image
            source={require("../../../../../assets/date.png")}
            style={{ width: 30, height: 30 }}
          />
          <Text style={{ fontSize: 18, color: "#687CFF" }}>
            <Text style={{ fontWeight: "bold" }}>
              {dias[new Date().getDay()]}
            </Text>
          </Text>
        </Pressable>
        <Pressable style={styles.btnEditarMeta} onPress={abrirModal}>
          <Image
            source={require("../../../../../assets/edit.png")}
            style={{ width: 30, height: 30 }}
          />
        </Pressable>
      </View>

      {/* Meta do dia */}
      <View style={styles.areaTitulo}>
        {metaHoje ? (
          <Text style={styles.meta}>Sua meta hoje: {metaHoje} ml</Text>
        ) : (
          <Text style={styles.meta}>Nenhuma meta definida para hoje</Text>
        )}
      </View>

  
      {/* Modal atualizar metas */}
      <Modal visible={showModal} animationType="fade" transparent>
        <View style={styles.containerModal}>
          <View style={styles.appModal}>
            <Text style={styles.titleModal}>Atualizar Meta Diária</Text>

            <View style={styles.areaSemana}>
              {dias.map((dia) => {
                const selecionado = diasSelecionados.includes(dia);
                return (
                  <Pressable
                    key={dia}
                    onPress={() => toggleDia(dia)}
                    style={[
                      styles.btnSemana,
                      selecionado && { backgroundColor: "#63a7ecff" },
                    ]}
                  >
                    <Text
                      style={[styles.txtSemana, selecionado && { color: "#fff" }]}
                    >
                      {dia}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <TextInput
              keyboardType="numeric"
              placeholder="Defina sua meta (ml)"
              value={inputMeta}
              onChangeText={setInputMeta}
              style={styles.campoMeta}
            />

            <View style={styles.botoes}>
              <Pressable style={styles.btn} onPress={fecharModal}>
                <Text>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.btn} onPress={salvarMeta}>
                <Text>Salvar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal calendário mensal */}
      <Modal visible={showModalDate} animationType="fade" transparent>
        <View style={styles.containerModal}>
          <View style={styles.appModal}>
            <Text style={styles.titleModal}>Progresso do Mês</Text>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                marginVertical: 15,
              }}
            >
              {(() => {
                const hoje = new Date();
                const ano = hoje.getFullYear();
                const mes = hoje.getMonth();
                const totalDias = new Date(ano, mes + 1, 0).getDate();
                const diasArray = Array.from({ length: totalDias }, (_, i) => i + 1);

                return diasArray.map((dia) => {
                  const dataKey = `${ano}-${mes + 1}-${dia}`;
                  const cumpriu = metasPorDia[dataKey];

                  return (
                    <View
                      key={dia}
                      style={{
                        width: "13%",
                        aspectRatio: 1,
                        borderRadius: 8,
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: 5,
                        backgroundColor: cumpriu ? "#687CFF" : "#E6E6E6",
                      }}
                    >
                      <Text
                        style={{
                          color: cumpriu ? "#fff" : "#333",
                          fontFamily: "Poppins_500Medium",
                        }}
                      >
                        {dia}
                      </Text>
                    </View>
                  );
                });
              })()}
            </View>

            {/* Botão resetar metas */}
            <Pressable
              style={[styles.btn, { backgroundColor: "#FF5C5C", marginBottom: 10 }]}
              onPress={resetarMeta}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Resetar metas</Text>
            </Pressable>

            <Pressable style={styles.btn} onPress={fecharModalDate}>
              <Text>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
